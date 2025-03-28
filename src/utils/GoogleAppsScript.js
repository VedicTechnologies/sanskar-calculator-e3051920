
// This is a Google Apps Script file that you would need to copy into the Google Apps Script editor
// Once deployed as a web app, copy its URL and replace the GOOGLE_SHEET_WEBHOOK_URL in googleSheetService.ts

function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet and the first sheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheets()[0];
    
    // Check if headers exist, if not add them
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 
        'Name', 
        'Email', 
        'Phone', 
        'Gender', 
        'Date of Birth', 
        'First Sanskar Date'
      ]);
    }
    
    // Append the new data row
    sheet.appendRow([
      new Date(), // Current timestamp
      data.name,
      data.email,
      data.phone,
      data.gender,
      data.dob,
      data.firstSanskarDate
    ]);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Data added to spreadsheet'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// This function allows the web app to handle GET requests for testing
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    'result': 'success',
    'message': 'The web app is running correctly'
  })).setMimeType(ContentService.MimeType.JSON);
}
