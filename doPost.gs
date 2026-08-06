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

  // 4. RICH HTML EMAIL TEMPLATE
  var htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #0d0f12; color: #e0e0e0; margin: 0; padding: 20px; }
        .card { max-width: 600px; margin: 0 auto; background-color: #161920; border: 1px solid #00f3ff; border-radius: 12px; overflow: hidden; box-shadow: 0 0 20px rgba(0,243,255,0.15); }
        .header { background: linear-gradient(135deg, #00f3ff 0%, #7000ff 100%); padding: 30px 20px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 28px; letter-spacing: 2px; text-transform: uppercase; }
        .header p { margin: 5px 0 0; font-size: 14px; opacity: 0.9; }
        .body-content { padding: 30px 25px; }
        .greeting { font-size: 18px; color: #00f3ff; font-weight: bold; margin-bottom: 15px; }
        .text { font-size: 15px; line-height: 1.6; color: #cccccc; margin-bottom: 25px; }
        .details-box { background-color: #0d0f12; border-left: 4px solid #00f3ff; padding: 20px; border-radius: 6px; margin-bottom: 25px; }
        .detail-item { font-size: 14px; margin-bottom: 10px; color: #e0e0e0; }
        .detail-item:last-child { margin-bottom: 0; }
        .detail-label { color: #888888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; }
        .detail-value { font-weight: bold; color: #ffffff; font-size: 15px; }
        .cta-button { display: block; width: 200px; margin: 0 auto 25px; padding: 12px 24px; text-align: center; background-color: #00f3ff; color: #000000; font-weight: bold; text-decoration: none; border-radius: 6px; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; }
        .footer { text-align: center; padding: 20px; background-color: #0d0f12; border-top: 1px solid #222; font-size: 12px; color: #666666; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <h1>CRYPTS 5.0</h1>
          <p>Registration Synchronized</p>
        </div>
        <div class="body-content">
          <div class="greeting">Hey ${firstName},</div>
          <div class="text">
            Shivan this side from Team CRYPTS! Welcome aboard. Your request to enter the <strong>CRYPTS 5.0</strong> simulation has been successfully logged into our servers.
          </div>
          
          <div class="details-box">
            <div class="detail-item">
              <span class="detail-label">Operator Name</span>
              <span class="detail-value">${data.name}</span>
            </div>
            <div class="detail-item" style="margin-top: 12px;">
              <span class="detail-label">Sector / Class</span>
              <span class="detail-value">Class ${data.class}-${data.section}</span>
            </div>
            <div class="detail-item" style="margin-top: 12px;">
              <span class="detail-label">Selected Modules</span>
              <span class="detail-value" style="color: #00f3ff;">${data.events}</span>
            </div>
          </div>

          <a href="https://yourwebsite.com" class="cta-button">Access Portal</a>

          <div class="text" style="font-size: 13px; color: #888888; text-align: center;">
            Keep an eye on the website for further official updates.
          </div>
        </div>
        <div class="footer">
          &copy; CRYPTS 5.0 Team | All Systems Operational
        </div>
      </div>
    </body>
    </html>
  `;

  // Fallback plain-text for legacy email clients
  var userBodyPlain = "Hey " + firstName + ",\n\nShivan this side from Team CRYPTS! Welcome aboard.\n\n" +
                      "Your registration for CRYPTS 5.0 has been received:\n" +
                      "- Name: " + data.name + "\n" +
                      "- Sector: Class " + data.class + "-" + data.section + "\n" +
                      "- Modules: " + data.events + "\n\n" +
                      "Best regards,\nShivan Chowdhry & Team CRYPTS 5.0";

  // 5. SEND HTML EMAIL TO USER
  GmailApp.sendEmail(data.email, "Welcome to CRYPTS 5.0! | Registration Synchronized", userBodyPlain, {
    from: "shivan.cryptsopg@gmail.com", // Must match your verified alias
    name: "Shivan Chowdhry & The CRYPTS 5.0 Team (via Admin Console)",
    htmlBody: htmlTemplate
  });

  // 6. ADMIN NOTIFICATION
  if (adminEmails.length > 0) {
    var adminSubject = "ALERT: NEW OPERATOR REGISTERED - " + data.name;
    var adminBody = "A new data packet has been received.\n\n" +
                    "Name: " + data.name + "\n" +
                    "Email: " + data.email + "\n" +
                    "Class: " + data.class + "-" + data.section + "\n" +
                    "Modules: " + data.events + "\n\n" +
                    "Full audit log updated in CRYPTS_5.0_FORMS_DATABASE.";
    
    GmailApp.sendEmail(adminEmails.join(","), adminSubject, adminBody, {
      from: "shivan.cryptsopg@gmail.com",
      name: "Shivan Chowdhry & The CRYPTS 5.0 Team (via Admin Console)"
    });
  }

  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}