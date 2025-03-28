
import { UserData, Sanskar } from '../utils/sanskarCalculator';
import { format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { toast } from 'sonner';

// This is the URL for your Google Sheets web app script
// const GOOGLE_SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec';
const GOOGLE_SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxPLM5ffEDRIiit_P8zu3zhUzECXXZY78GDMR59luW10bXzc-GXSk1jGhliNoPjZ8kPOQ/exec';

// Indian Standard Time zone
const IST_TIMEZONE = 'Asia/Kolkata';

export const saveToGoogleSheet = async (
  userData: UserData,
  sanskars: Sanskar[] 
): Promise<boolean> => {
  try {

    // Get current date and time in IST
    const currentTimeIST = new Date();
    const formattedDateIST = formatInTimeZone(
      currentTimeIST,
      IST_TIMEZONE,
      'yyyy-MM-dd HH:mm:ss'
    );
    
    // Format DOB in IST
    const dobIST = formatInTimeZone(
      userData.dob,
      IST_TIMEZONE,
      'yyyy-MM-dd'
    );
    
    // Prepare the data to be sent to Google Sheets
    const data = {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      gender: userData.gender,
      dob: dobIST,
      timestamp: formattedDateIST
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
    toast.success('Your information has been saved');
    return true;
  } catch (error) {
    console.error('Error saving data to Google Sheet:', error);
    toast.error('Failed to save your information');
    return false;
  }
};