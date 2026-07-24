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
  if (ss.getName() !== "CRYPTS_5.0_FORMS_DATABASE") ss.rename("CRYPTS_5.0_FORMS_DATABASE");
  
  if (databaseSheet.getLastRow() === 0) {
    databaseSheet.appendRow(["Timestamp", "Operator Name", "Email", "Class", "Section", "Events Selected"]);
    databaseSheet.getRange("1:1").setFontWeight("bold").setBackground("#00f3ff").setFontColor("#000000");
  }

  // 2. PARSE INCOMING PACKET
  var data = JSON.parse(e.postData.contents);
  databaseSheet.appendRow([data.timestamp, data.name, data.email, data.class, data.section, data.events]);

  // 3. FETCH ADMIN LIST (The "Simpler" Way)
  var adminSheet = ss.getSheetByName("ORGANISERS");
  var adminEmails = [];
  
  if (adminSheet) {
    var adminData = adminSheet.getDataRange().getValues();
    // Assuming Column A is Name, Column B is Email. Skip header row 1.
    for (var i = 1; i < adminData.length; i++) {
      if (adminData[i][1]) adminEmails.push(adminData[i][1]);
    }
  } else {
    // Fallback if you forget to create the sheet
    adminEmails = ["chowdhryshivan@gmail.com"];
  }

  // 4. USER CONFIRMATION
  var userSubject = "CRYPTS 5.0 | Registration Synchronized";
  var userBody = "Greetings Operator " + data.name + ",\n\n" +
                 "Your request to enter the CRYPTS 5.0 simulation has been processed.\n\n" +
                 "--- REGISTRATION DETAILS ---\n" +
                 "EVENTS: " + data.events + "\n" +
                 "SECTOR: Class " + data.class + "-" + data.section + "\n" +
                 "---------------------------\n\n" +
                 "Regards,\nCRYPTS 5.0 Admin Console";
  
  GmailApp.sendEmail(data.email, userSubject, userBody);

  // 5. ADMIN NOTIFICATION (Sent to everyone in the ORGANISERS sheet)
  if (adminEmails.length > 0) {
    var adminSubject = "ALERT: NEW OPERATOR REGISTERED - " + data.name;
    var adminBody = "A new data packet has been received.\n\n" +
                    "Name: " + data.name + "\n" +
                    "Modules: " + data.events + "\n\n" +
                    "Full audit log updated in CRYPTS_5.0_FORMS_DATABASE.";
    
    GmailApp.sendEmail(adminEmails.join(","), adminSubject, adminBody);
  }

  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}