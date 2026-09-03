/**
 * ==============================================================================
 * CRYPTS'26 - GOOGLE APPS SCRIPT BACKEND
 * ==============================================================================
 * NOTE: This local file is a direct replica of the code published in the
 * Google Apps Script Web App Editor.
 *
 * - Changes made here will NOT auto-sync to the live Google Apps Script deployment.
 * - After editing this file, copy its contents into the Google Apps Script editor
 *   and perform a "New Deployment" to update the live SCRIPT_URL backend.
 * ==============================================================================
 */

// ──────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ──────────────────────────────────────────────────────────────────────────────
var OTP_EXPIRY_MS     = 10 * 60 * 1000;  // 10 minutes
var SESSION_EXPIRY_MS = 30 * 60 * 1000;  // 30 minutes
var FROM_ADDRESS      = "shivan.cryptsopg@gmail.com";
var FROM_NAME         = "Shivan Chowdhry & The CRYPTS'26 Team (via Admin Console)";


// ──────────────────────────────────────────────────────────────────────────────
// ROUTER
// ──────────────────────────────────────────────────────────────────────────────
function doPost(e) {
  var data = JSON.parse(e.postData.contents);

  if (data.action === "sendOtp")           return handleSendOtp(data);
  if (data.action === "verifyOtpAndFetch") return handleVerifyOtpAndFetch(data);
  if (data.action === "updateTeam")        return handleUpdateTeam(data);

  // Default: original registration flow
  return handleRegistration(data, e);
}


// ──────────────────────────────────────────────────────────────────────────────
// SHARED HELPERS
// ──────────────────────────────────────────────────────────────────────────────
function getAdminEmails(ss) {
  var adminSheet = ss.getSheetByName("ORGANISERS");
  var adminEmails = [];
  if (adminSheet) {
    var adminData = adminSheet.getDataRange().getValues();
    for (var i = 1; i < adminData.length; i++) {
      if (adminData[i][1]) adminEmails.push(adminData[i][1]);
    }
  } else {
    adminEmails = ["chowdhryshivan@gmail.com"];
  }
  return adminEmails;
}

function getCommonStyles() {
  return `
    body { font-family: 'Courier New', Consolas, monospace; background-color: #08090c; color: #a0aab0; margin: 0; padding: 20px; }
    .card { max-width: 580px; margin: 0 auto; background-color: #0d1117; border: 1px solid #1f2937; border-radius: 8px; overflow: hidden; box-shadow: 0 0 25px rgba(0, 243, 255, 0.1); }
    .header { background: #05070a; padding: 35px 20px; text-align: center; border-bottom: 2px solid #00f3ff; position: relative; }
    .glitch-title { font-size: 28px; font-weight: 900; color: #00f3ff; text-transform: uppercase; letter-spacing: 4px; margin: 0; text-shadow: -2px 0 #ff0055, 2px 0 #00f3ff; }
    .header-sub { color: #ff0055; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-top: 6px; font-weight: bold; }
    .body-content { padding: 30px 25px; }
    .greeting { font-size: 16px; color: #ffffff; font-weight: bold; margin-bottom: 15px; }
    .text { font-size: 13px; line-height: 1.6; color: #8b949e; margin-bottom: 25px; }
    .details-box { background-color: #05070a; border: 1px solid #1f2937; border-left: 4px solid #00f3ff; padding: 18px; border-radius: 4px; margin-bottom: 25px; }
    .detail-item { font-size: 13px; margin-bottom: 12px; }
    .detail-item:last-child { margin-bottom: 0; }
    .detail-label { color: #484f58; font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; display: block; margin-bottom: 3px; }
    .detail-value { font-weight: bold; color: #58a6ff; font-size: 14px; }
    .cta-button { display: inline-block; width: 80%; max-width: 250px; padding: 12px 20px; text-align: center; background-color: #00f3ff; color: #000000; font-weight: bold; text-decoration: none; border-radius: 4px; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; box-shadow: 0 0 10px rgba(0,243,255,0.3); }
    .footer { text-align: center; padding: 18px; background-color: #05070a; border-top: 1px solid #1f2937; font-size: 11px; color: #484f58; }
  `;
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}


// ──────────────────────────────────────────────────────────────────────────────
// ACTION: sendOtp
// ──────────────────────────────────────────────────────────────────────────────
function handleSendOtp(data) {
  var email = (data.email || "").trim().toLowerCase();
  if (!email) return jsonResponse({ success: false, error: "INVALID_EMAIL" });

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("CRYPTS_26_FORMS_DATABASE");
  if (!sheet) return jsonResponse({ success: false, error: "EMAIL_NOT_FOUND" });

  // Look up email in column 3 (index 2)
  var rows = sheet.getDataRange().getValues();
  var found = false;
  for (var i = 1; i < rows.length; i++) {
    if ((rows[i][2] || "").toString().trim().toLowerCase() === email) { found = true; break; }
  }
  if (!found) return jsonResponse({ success: false, error: "EMAIL_NOT_FOUND" });

  // Generate and store OTP
  var otp = Math.floor(100000 + Math.random() * 900000).toString();
  var expiry = new Date().getTime() + OTP_EXPIRY_MS;
  PropertiesService.getScriptProperties().setProperty(
    "OTP_" + email,
    JSON.stringify({ otp: otp, expiry: expiry })
  );

  // Send OTP email
  var styles = getCommonStyles();
  var html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>${styles}
.otp-box { text-align: center; padding: 24px; background: #05070a; border: 2px solid #00f3ff;
           border-radius: 6px; margin: 20px 0; box-shadow: 0 0 20px rgba(0,243,255,0.2); }
.otp-code { font-size: 42px; font-weight: 900; color: #00f3ff; letter-spacing: 18px;
            text-shadow: 0 0 20px rgba(0,243,255,0.6); }
.otp-label { color: #484f58; font-size: 10px; text-transform: uppercase; letter-spacing: 2px;
             margin-bottom: 10px; display: block; }
.expiry-note { font-size: 11px; color: #484f58; text-align: center; margin-top: 6px; }
</style></head>
<body>
  <div class="card">
    <div class="header">
      <h1 class="glitch-title">CRYPTS'26</h1>
      <div class="header-sub">[ TEAM MANAGEMENT — IDENTITY VERIFICATION ]</div>
    </div>
    <div class="body-content">
      <div class="greeting">Verification Request Received</div>
      <div class="text">
        A team update request was initiated for your registered account.<br><br>
        Use the one-time passcode below to authenticate. <strong>Do not share this code.</strong>
      </div>
      <div class="otp-box">
        <span class="otp-label">ONE-TIME PASSCODE</span>
        <div class="otp-code">${otp}</div>
      </div>
      <p class="expiry-note">This code expires in <strong style="color:#00f3ff">10 minutes</strong>. If you did not request this, ignore this email.</p>
    </div>
    <div class="footer">
      CRYPTS'26 INTERNAL CONSOLE &bull; AUTOMATED SECURITY NOTIFICATION
    </div>
  </div>
</body></html>`;

  var plain = "CRYPTS'26 — Team Management OTP\n\nYour one-time passcode is: " + otp +
              "\n\nThis code expires in 10 minutes.\nIf you did not request this, ignore this email.";

  GmailApp.sendEmail(email, "CRYPTS'26 | Team Management — Your OTP", plain, {
    from: FROM_ADDRESS,
    name: FROM_NAME,
    htmlBody: html
  });

  return jsonResponse({ success: true });
}


// ──────────────────────────────────────────────────────────────────────────────
// ACTION: verifyOtpAndFetch
// ──────────────────────────────────────────────────────────────────────────────
function handleVerifyOtpAndFetch(data) {
  var email = (data.email || "").trim().toLowerCase();
  var otp   = (data.otp   || "").trim();
  if (!email || !otp) return jsonResponse({ success: false, error: "MISSING_PARAMS" });

  // Retrieve stored OTP
  var stored = PropertiesService.getScriptProperties().getProperty("OTP_" + email);
  if (!stored) return jsonResponse({ success: false, error: "INVALID_OTP" });

  var parsed;
  try { parsed = JSON.parse(stored); } catch(ex) { return jsonResponse({ success: false, error: "INVALID_OTP" }); }

  if (parsed.otp !== otp) return jsonResponse({ success: false, error: "INVALID_OTP" });
  if (new Date().getTime() > parsed.expiry) {
    PropertiesService.getScriptProperties().deleteProperty("OTP_" + email);
    return jsonResponse({ success: false, error: "OTP_EXPIRED" });
  }

  // OTP valid — clear it
  PropertiesService.getScriptProperties().deleteProperty("OTP_" + email);

  // Issue session token (30-min lifespan)
  var token = Utilities.getUuid();
  var sessionExpiry = new Date().getTime() + SESSION_EXPIRY_MS;
  PropertiesService.getScriptProperties().setProperty(
    "SESSION_" + email,
    JSON.stringify({ token: token, expiry: sessionExpiry })
  );

  // Fetch row from sheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("CRYPTS_26_FORMS_DATABASE");
  var rows = sheet.getDataRange().getValues();
  // Columns: [0]Timestamp [1]Operator Name [2]Email [3]Class [4]Section [5]Events
  for (var i = 1; i < rows.length; i++) {
    if ((rows[i][2] || "").toString().trim().toLowerCase() === email) {
      return jsonResponse({
        success: true,
        sessionToken: token,
        name:    rows[i][1] || "",
        class:   rows[i][3] || "",
        section: rows[i][4] || "",
        events:  rows[i][5] || ""
      });
    }
  }

  // Row not found (shouldn't happen since sendOtp already verified)
  return jsonResponse({ success: false, error: "EMAIL_NOT_FOUND" });
}


// ──────────────────────────────────────────────────────────────────────────────
// ACTION: updateTeam
// ──────────────────────────────────────────────────────────────────────────────
function handleUpdateTeam(data) {
  var email        = (data.email        || "").trim().toLowerCase();
  var sessionToken = (data.sessionToken || "").trim();
  var newName      = (data.name         || "").trim();
  var newClass     = (data.class        || "").toString().trim();
  var newSection   = (data.section      || "").trim();
  var newEvents    = (data.events       || "").trim();
  if (!email || !newName) return jsonResponse({ success: false, error: "MISSING_PARAMS" });

  // Validate session token (skip for no-cors fallback)
  if (sessionToken !== "no-cors-session") {
    var stored = PropertiesService.getScriptProperties().getProperty("SESSION_" + email);
    if (!stored) return jsonResponse({ success: false, error: "SESSION_EXPIRED" });
    var session;
    try { session = JSON.parse(stored); } catch(ex) { return jsonResponse({ success: false, error: "SESSION_INVALID" }); }
    if (session.token !== sessionToken) return jsonResponse({ success: false, error: "SESSION_INVALID" });
    if (new Date().getTime() > session.expiry) {
      PropertiesService.getScriptProperties().deleteProperty("SESSION_" + email);
      return jsonResponse({ success: false, error: "SESSION_EXPIRED" });
    }
  }

  // Find the row
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("CRYPTS_26_FORMS_DATABASE");
  if (!sheet) return jsonResponse({ success: false, error: "SHEET_NOT_FOUND" });

  var rows = sheet.getDataRange().getValues();
  var rowIndex = -1;
  var oldName = "", oldClass = "", oldSection = "", oldEvents = "";
  for (var i = 1; i < rows.length; i++) {
    if ((rows[i][2] || "").toString().trim().toLowerCase() === email) {
      rowIndex   = i + 1;
      oldName    = rows[i][1] || "";
      oldClass   = rows[i][3] || "";
      oldSection = rows[i][4] || "";
      oldEvents  = rows[i][5] || "";
      break;
    }
  }
  if (rowIndex < 0) return jsonResponse({ success: false, error: "EMAIL_NOT_FOUND" });

  // Write updated values (keep old if not provided)
  sheet.getRange(rowIndex, 2).setValue(newName);
  if (newClass)   sheet.getRange(rowIndex, 4).setValue(newClass);
  if (newSection) sheet.getRange(rowIndex, 5).setValue(newSection);
  if (newEvents)  sheet.getRange(rowIndex, 6).setValue(newEvents);

  // Resolve final values for emails (use new if provided, else keep old)
  var finalClass   = newClass   || oldClass;
  var finalSection = newSection || oldSection;
  var finalEvents  = newEvents  || oldEvents;

  // Audit log
  var logSheet = ss.getSheetByName("TEAM_UPDATE_LOG") || ss.insertSheet("TEAM_UPDATE_LOG");
  if (logSheet.getLastRow() === 0) {
    logSheet.appendRow(["Timestamp", "Email", "Old Name", "New Name", "Old Class", "New Class", "Old Section", "New Section", "Old Events", "New Events"]);
    logSheet.getRange("1:1").setFontWeight("bold").setBackground("#00f3ff").setFontColor("#000");
  }
  logSheet.appendRow([new Date().toLocaleString(), email, oldName, newName, oldClass, newClass, oldSection, newSection, oldEvents, newEvents]);

  // Clear session
  PropertiesService.getScriptProperties().deleteProperty("SESSION_" + email);

  // ── Email: team confirmation ──────────────────────────────────────────────
  var styles = getCommonStyles();
  var teamHtml = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>${styles}</style></head>
<body>
  <div class="card">
    <div class="header">
      <h1 class="glitch-title">CRYPTS'26</h1>
      <div class="header-sub">[ REGISTRATION — UPDATE CONFIRMED ]</div>
    </div>
    <div class="body-content">
      <div class="greeting">Registration Updated</div>
      <div class="text">
        Your registration details have been updated in the CRYPTS'26 central database.
        Review the changes below.
      </div>
      <div class="details-box">
        <div class="detail-item">
          <span class="detail-label">CLASS / SECTION</span>
          <span class="detail-value" style="color:#ffffff;">Class ${finalClass} — ${finalSection}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">EVENTS</span>
          <span class="detail-value" style="color:#00f3ff;">${finalEvents}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">UPDATED SQUAD ROSTER</span>
          <span class="detail-value" style="color:#ffffff;">${newName}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">REGISTERED EMAIL</span>
          <span class="detail-value" style="color:#00f3ff;">${email}</span>
        </div>
      </div>
      <div style="text-align:center; margin-bottom:25px;">
        <a href="https://crypts26.vercel.app/" class="cta-button">Access Cyber Portal</a>
      </div>
      <div class="text" style="font-size:11px; color:#484f58; text-align:center;">
        If you did not make this change, contact the organizers immediately.
      </div>
    </div>
    <div class="footer">
      &copy; CRYPTS'26 TEAM &bull; ALL SYSTEMS OPERATIONAL
    </div>
  </div>
</body></html>`;

  var teamPlain = "CRYPTS'26 — Registration Update Confirmed\n\n" +
    "Your registration has been updated.\n" +
    "Class/Section: " + finalClass + "-" + finalSection + "\n" +
    "Events: " + finalEvents + "\n" +
    "Updated Roster: " + newName + "\n\n" +
    "Portal: https://crypts26.vercel.app/\n\n" +
    "If you did not make this change, contact the organizers immediately.";

  GmailApp.sendEmail(email, "CRYPTS'26 | Registration Updated", teamPlain, {
    from: FROM_ADDRESS,
    name: FROM_NAME,
    htmlBody: teamHtml
  });

  var adminEmails = getAdminEmails(ss);
  var adminHtml = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>${styles}
.admin-card { border-color: #ff0055; box-shadow: 0 0 25px rgba(255,0,85,0.15); }
.admin-header { border-bottom-color: #ff0055; }
.admin-badge { display:inline-block; background-color:rgba(255,0,85,0.1); border:1px solid #ff0055;
               color:#ff0055; font-size:10px; font-weight:bold; padding:4px 8px;
               border-radius:3px; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:15px; }
.admin-box { border-left-color: #ff0055; }
.diff-old { color:#ff6060; font-size:13px; font-weight:bold; }
.diff-new { color:#00f3ff; font-size:13px; font-weight:bold; }
</style></head>
<body>
  <div class="card admin-card">
    <div class="header admin-header">
      <h1 class="glitch-title">CRYPTS'26</h1>
      <div class="header-sub">[ ADMIN ALERT &bull; REGISTRATION MODIFIED ]</div>
    </div>
    <div class="body-content">
      <div class="admin-badge">SYSTEM ALERT</div>
      <div class="text">A registered operator has updated their registration via the self-service portal.</div>
      <div class="details-box admin-box">
        <div class="detail-item">
          <span class="detail-label">EMAIL</span>
          <span class="detail-value" style="color:#00f3ff;">${email}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">CLASS / SECTION</span>
          <span class="diff-old">${oldClass}-${oldSection}</span>
          <span style="color:#484f58; font-size:11px;"> → </span>
          <span class="diff-new">${finalClass}-${finalSection}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">EVENTS</span>
          <span class="diff-old">${oldEvents || "(empty)"}</span>
          <span style="color:#484f58; font-size:11px;"> → </span>
          <span class="diff-new">${finalEvents}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">SQUAD ROSTER</span>
          <span class="diff-old">${oldName || "(empty)"}</span>
          <span style="color:#484f58; font-size:11px;"> → </span>
          <span class="diff-new">${newName}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">TIMESTAMP</span>
          <span class="detail-value" style="color:#8b949e;">${new Date().toLocaleString()}</span>
        </div>
      </div>
      <div style="text-align:center; margin-bottom:20px;">
        <a href="${ss.getUrl()}" class="cta-button" style="background:transparent; color:#ff0055; border:1px solid #ff0055;">
          Open Live Database
        </a>
      </div>
    </div>
    <div class="footer">
      CRYPTS'26 INTERNAL CONSOLE &bull; AUTOMATED SYSTEM NOTIFICATION
    </div>
  </div>
</body></html>`;

  var adminPlain = "ALERT: REGISTRATION UPDATED\n\n" +
    "Email: " + email + "\n" +
    "Class/Section: " + oldClass + "-" + oldSection + " → " + finalClass + "-" + finalSection + "\n" +
    "Events: " + (oldEvents || "(empty)") + " → " + finalEvents + "\n" +
    "Roster: " + (oldName || "(empty)") + " → " + newName + "\n" +
    "Timestamp: " + new Date().toLocaleString() + "\n\n" +
    "Live DB: " + ss.getUrl();

  if (adminEmails.length > 0) {
    GmailApp.sendEmail(adminEmails.join(","), "ALERT: SQUAD UPDATED — " + email, adminPlain, {
      from: FROM_ADDRESS,
      name: FROM_NAME,
      htmlBody: adminHtml
    });
  }

  return jsonResponse({ success: true });
}


// ──────────────────────────────────────────────────────────────────────────────
// ACTION: handleRegistration (original registration flow, unchanged)
// ──────────────────────────────────────────────────────────────────────────────
function handleRegistration(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. DATABASE SETUP
  var databaseSheet = ss.getSheetByName("CRYPTS_26_FORMS_DATABASE") || ss.getSheets()[0];
  databaseSheet.setName("CRYPTS_26_FORMS_DATABASE");

  if (databaseSheet.getLastRow() === 0) {
    databaseSheet.appendRow(["Timestamp", "Operator Name", "Email", "Class", "Section", "Events Selected"]);
    databaseSheet.getRange("1:1").setFontWeight("bold").setBackground("#00f3ff").setFontColor("#000000");
  }

  databaseSheet.appendRow([data.timestamp, data.name, data.email, data.class, data.section, data.events]);

  var firstName = data.name ? data.name.split(' ')[0] : "Operator";
  var adminEmails = getAdminEmails(ss);
  var commonStyles = getCommonStyles();

  // 4. REGISTRANT HTML TEMPLATE
  var userHtmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>${commonStyles}</style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1 class="glitch-title">CRYPTS'26</h1>
          <div class="header-sub">[ REGISTRATION SYNCHRONIZED ]</div>
        </div>
        <div class="body-content">
          <div class="greeting">Greetings, ${firstName}</div>
          <div class="text">
            Shivan this side from Team CRYPTS! Welcome aboard.<br><br>
            Your entry packet for the <strong>CRYPTS'26</strong> cyber simulation has been received and committed to our primary servers.
          </div>

          <div class="details-box">
            <div class="detail-item">
              <span class="detail-label">OPERATOR NAME</span>
              <span class="detail-value" style="color:#ffffff;">${data.name}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">SECTOR / CLASS</span>
              <span class="detail-value" style="color:#ffffff;">Class ${data.class}-${data.section}</span>
            </div>
            <div class="detail-item" style="margin-top: 12px;">
              <span class="detail-label">SELECTED MODULES</span>
              <span class="detail-value" style="color: #00f3ff;">${data.events}</span>
            </div>
          </div>

          <div style="text-align: center; margin-bottom: 25px;">
            <a href="https://crypts26.vercel.app/" class="cta-button">Access Cyber Portal</a>
          </div>

          <div class="text" style="font-size: 11px; color: #484f58; text-align: center;">
            Maintain comms readiness. Updates will follow shortly on the site.
          </div>
        </div>
        <div class="footer">
          &copy; CRYPTS'26 TEAM &bull; ALL SYSTEMS OPERATIONAL
        </div>
      </div>
    </body>
    </html>
  `;

  var userBodyPlain = "Greetings " + firstName + ",\n\nShivan this side from Team CRYPTS!\n\n" +
                      "Your registration for CRYPTS'26 has been received:\n" +
                      "- Operator: " + data.name + "\n" +
                      "- Sector: Class " + data.class + "-" + data.section + "\n" +
                      "- Modules: " + data.events + "\n\n" +
                      "- Portal: https://crypts26.vercel.app/\n\n" +
                      "Best regards,\nShivan Chowdhry & Team CRYPTS'26";

  GmailApp.sendEmail(data.email, "Welcome to CRYPTS'26 | Registration Synchronized", userBodyPlain, {
    from: FROM_ADDRESS,
    name: FROM_NAME,
    htmlBody: userHtmlTemplate
  });

  // 5. ADMIN HTML TEMPLATE
  var adminHtmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        ${commonStyles}
        .admin-card { border-color: #ff0055; box-shadow: 0 0 25px rgba(255, 0, 85, 0.15); }
        .admin-header { border-bottom-color: #ff0055; }
        .admin-badge { display: inline-block; background-color: rgba(255,0,85,0.1); border: 1px solid #ff0055; color: #ff0055; font-size: 10px; font-weight: bold; padding: 4px 8px; border-radius: 3px; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 15px; }
        .admin-box { border-left-color: #ff0055; }
        .admin-btn { background-color: transparent; color: #ff0055; border: 1px solid #ff0055; box-shadow: 0 0 10px rgba(255,0,85,0.2); }
      </style>
    </head>
    <body>
      <div class="card admin-card">
        <div class="header admin-header">
          <h1 class="glitch-title">CRYPTS'26</h1>
          <div class="header-sub">[ ADMIN ALERT &bull; INCOMING REGISTRATION ]</div>
        </div>
        <div class="body-content">
          <div class="admin-badge">SYSTEM ALERT</div>
          <div class="text">
            A new data packet has been uploaded to the registry by an incoming operator.
          </div>

          <div class="details-box admin-box">
            <div class="detail-item">
              <span class="detail-label">OPERATOR NAME</span>
              <span class="detail-value" style="color:#ffffff;">${data.name}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">EMAIL ADDRESS</span>
              <span class="detail-value" style="color:#00f3ff;">${data.email}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">SECTOR / CLASS</span>
              <span class="detail-value" style="color:#ffffff;">Class ${data.class}-${data.section}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">MODULES REGISTERED</span>
              <span class="detail-value" style="color:#ff0055;">${data.events}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">TIMESTAMP</span>
              <span class="detail-value" style="color:#8b949e;">${data.timestamp}</span>
            </div>
          </div>

          <div style="text-align: center; margin-bottom: 20px;">
            <a href="${ss.getUrl()}" class="cta-button admin-btn">Open Live Database</a>
          </div>
        </div>
        <div class="footer">
          CRYPTS'26 INTERNAL CONSOLE &bull; AUTOMATED SYSTEM NOTIFICATION
        </div>
      </div>
    </body>
    </html>
  `;

  var adminBodyPlain = "ALERT: NEW OPERATOR REGISTERED\n\n" +
                       "Operator: " + data.name + "\n" +
                       "Email: " + data.email + "\n" +
                       "Sector: Class " + data.class + "-" + data.section + "\n" +
                       "Modules: " + data.events + "\n" +
                       "Timestamp: " + data.timestamp + "\n\n" +
                       "Live DB: " + ss.getUrl();

  if (adminEmails.length > 0) {
    GmailApp.sendEmail(adminEmails.join(","), "ALERT: NEW OPERATOR REGISTERED - " + data.name, adminBodyPlain, {
      from: FROM_ADDRESS,
      name: FROM_NAME,
      htmlBody: adminHtmlTemplate
    });
  }

  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}