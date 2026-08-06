/**
 * ==============================================================================
 * CRYPTS 5.0 - GOOGLE APPS SCRIPT BACKEND
 * ==============================================================================
 * NOTE: This local file is a direct replica of the code published in the 
 * Google Apps Script Web App Editor. 
 * 
 * - Changes made here will NOT auto-sync to the live Google Apps Script deployment.
 * - After editing this file, copy its contents into the Google Apps Script editor 
 *   and perform a "New Deployment" to update the live SCRIPT_URL backend.
 * ==============================================================================
 */


function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. DATABASE SETUP
  var databaseSheet = ss.getSheetByName("CRYPTS_5.0_FORMS_DATABASE") || ss.getSheets()[0];
  databaseSheet.setName("CRYPTS_5.0_FORMS_DATABASE");
  
  if (databaseSheet.getLastRow() === 0) {
    databaseSheet.appendRow(["Timestamp", "Operator Name", "Email", "Class", "Section", "Events Selected"]);
    databaseSheet.getRange("1:1").setFontWeight("bold").setBackground("#00f3ff").setFontColor("#000000");
  }

  // 2. PARSE INCOMING PACKET
  var data = JSON.parse(e.postData.contents);
  databaseSheet.appendRow([data.timestamp, data.name, data.email, data.class, data.section, data.events]);

  // Extract first name for a friendlier greeting
  var firstName = data.name ? data.name.split(' ')[0] : "Operator";

  // 3. FETCH ADMIN LIST
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

  // COMMON STYLES & GLITCH HEADER BUILDER
  var commonStyles = `
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
          <h1 class="glitch-title">CRYPTS 5.0</h1>
          <div class="header-sub">[ REGISTRATION SYNCHRONIZED ]</div>
        </div>
        <div class="body-content">
          <div class="greeting">Greetings, ${firstName}</div>
          <div class="text">
            Shivan this side from Team CRYPTS! Welcome aboard.<br><br>
            Your entry packet for the <strong>CRYPTS 5.0</strong> cyber simulation has been received and committed to our primary servers.
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
            <a href="https://crypts5.vercel.app/" class="cta-button">Access Cyber Portal</a>
          </div>

          <div class="text" style="font-size: 11px; color: #484f58; text-align: center;">
            Maintain comms readiness. Updates will follow shortly on the site.
          </div>
        </div>
        <div class="footer">
          &copy; CRYPTS 5.0 TEAM &bull; ALL SYSTEMS OPERATIONAL
        </div>
      </div>
    </body>
    </html>
  `;

  var userBodyPlain = "Greetings " + firstName + ",\n\nShivan this side from Team CRYPTS!\n\n" +
                      "Your registration for CRYPTS 5.0 has been received:\n" +
                      "- Operator: " + data.name + "\n" +
                      "- Sector: Class " + data.class + "-" + data.section + "\n" +
                      "- Modules: " + data.events + "\n\n" +
                      "- Portal: https://crypts5.vercel.app/\n\n" +
                      "Best regards,\nShivan Chowdhry & Team CRYPTS 5.0";

  // SEND REGISTRANT EMAIL
  GmailApp.sendEmail(data.email, "Welcome to CRYPTS 5.0 | Registration Synchronized", userBodyPlain, {
    from: "shivan.cryptsopg@gmail.com",
    name: "Shivan Chowdhry & The CRYPTS 5.0 Team (via Admin Console)",
    htmlBody: userHtmlTemplate
  });

  // 5. ADMIN HTML TEMPLATE (NEW: Styled alert for organizers)
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
          <h1 class="glitch-title">CRYPTS 5.0</h1>
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
          CRYPTS 5.0 INTERNAL CONSOLE &bull; AUTOMATED SYSTEM NOTIFICATION
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

  // SEND ADMIN EMAIL
  if (adminEmails.length > 0) {
    GmailApp.sendEmail(adminEmails.join(","), "ALERT: NEW OPERATOR REGISTERED - " + data.name, adminBodyPlain, {
      from: "shivan.cryptsopg@gmail.com",
      name: "Shivan Chowdhry & The CRYPTS 5.0 Team (via Admin Console)",
      htmlBody: adminHtmlTemplate
    });
  }

  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}