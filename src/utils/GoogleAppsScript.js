
// This is a Google Apps Script file that you would need to copy into the Google Apps Script editor
// Once deployed as a web app, copy its URL and replace the GOOGLE_SHEET_WEBHOOK_URL in googleSheetService.ts

function doPost(e) {
  try {
    // Set CORS headers for the preflight request
    var headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    };

    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet and the first sheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheets()[0];
    
    // Check if headers exist, if not add them
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp (IST)', 
        'Name', 
        'Email', 
        'Phone', 
        'Gender', 
        'Date of Birth (IST)', 
        'First Sanskar Date'
      ]);
    }
    
    // Append the new data row
    sheet.appendRow([
      data.timestamp, // Current timestamp in IST format
      data.name,
      data.email,
      data.phone,
      data.gender,
      data.dob, // DOB in IST format
      data.firstSanskarDate
    ]);
    
    // Return success response with CORS headers
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Data added to spreadsheet'
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);
    
  } catch(error) {
    // Set CORS headers
    var headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400'
    };
    
    // Return error response with CORS headers
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);
  }
}

// Handle OPTIONS requests for CORS preflight
function doOptions() {
  var headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
  };
  
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders(headers);
}

// This function allows the web app to handle GET requests for testing
function doGet() {
  var headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  return ContentService.createTextOutput(JSON.stringify({
    'result': 'success',
    'message': 'The web app is running correctly'
  }))
  .setMimeType(ContentService.MimeType.JSON)
  .setHeaders(headers);
}
