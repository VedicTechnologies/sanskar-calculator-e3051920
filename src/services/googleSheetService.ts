
import { UserData, Sanskar } from '../utils/sanskarCalculator';
import { toast } from 'sonner';

// This is the URL for your Google Sheets web app script
// You need to replace this with your actual deployed Google Script Web App URL
const GOOGLE_SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec';

export const saveToGoogleSheet = async (
  userData: UserData,
  sanskars: Sanskar[]
): Promise<boolean> => {
  try {
    // Format calculated date for the first Sanskar to include in Google Sheet
    const firstSanskarDate = sanskars.length > 0 ? sanskars[0].calculatedDate : '';
    
    // Prepare the data to be sent to Google Sheets
    const data = {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      gender: userData.gender,
      dob: userData.dob.toISOString().split('T')[0], // Format date as YYYY-MM-DD
      firstSanskarDate: firstSanskarDate,
      timestamp: new Date().toISOString()
    };

    console.log('Sending data to Google Sheet:', data);
    
    // Make the fetch request to the Google Script Web App
    const response = await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors', // This is required for Google Script Web Apps
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    // Since no-cors mode doesn't return readable response
    // we'll just assume it worked if no error was thrown
    toast.success('Your information has been saved to our records');
    return true;
  } catch (error) {
    console.error('Error saving data to Google Sheet:', error);
    toast.error('Failed to save your information');
    return false;
  }
};
