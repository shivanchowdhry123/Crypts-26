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

  // 4. USER CONFIRMATION (WITH GREETING)
  var userSubject = "Welcome to CRYPTS 5.0! | Registration Synchronized";
  var userBody = "Hey " + firstName + ",\n\n" +
                 "Shivan this side from Team CRYPTS! Welcome aboard.\n\n" +
                 "Your registration for the CRYPTS 5.0 simulation has been successfully processed. " +
                 "We're excited to have you join us for this edition!\n\n" +
                 "--- REGISTRATION SUMMARY ---\n" +
                 "NAME: " + data.name + "\n" +
                 "EVENTS: " + data.events + "\n" +
                 "SECTOR: Class " + data.class + "-" + data.section + "\n" +
                 "---------------------------\n\n" +
                 "Keep an eye on your inbox for further updates regarding event schedules and guidelines.\n\n" +
                 "Best regards,\n" +
                 "Shivan Chowdhry & The CRYPTS 5.0 Team (via Admin Console)";
  
  GmailApp.sendEmail(data.email, userSubject, userBody, {
    from: "shivan.cryptsopg@gmail.com", // Must match your verified alias
    name: "CRYPTS 5.0 Team"
  });

  // 5. ADMIN NOTIFICATION
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
      name: "CRYPTS 5.0 System"
    });
  }

  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}