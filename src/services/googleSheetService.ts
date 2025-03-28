
import { UserData, Sanskar } from '../utils/sanskarCalculator';
import { format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { toast } from 'sonner';

// This is the URL for your Google Sheets web app script
// You need to replace this with your actual deployed Google Script Web App URL
const GOOGLE_SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxPLM5ffEDRIiit_P8zu3zhUzECXXZY78GDMR59luW10bXzc-GXSk1jGhliNoPjZ8kPOQ/exec';

// Indian Standard Time zone
const IST_TIMEZONE = 'Asia/Kolkata';

export const saveToGoogleSheet = async (
  userData: UserData,
  sanskars: Sanskar[]
): Promise<boolean> => {
  try {
    // Format calculated date for the first Sanskar to include in Google Sheet
    const firstSanskarDate = sanskars.length > 0 ? sanskars[0].calculatedDate : '';
    
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
      dob: dobIST, // Format date as YYYY-MM-DD in IST
      firstSanskarDate: firstSanskarDate,
      timestamp: formattedDateIST // Current time in IST
    };

    console.log('Sending data to Google Sheet:', data);
    
    // Use XMLHttpRequest instead of fetch to avoid CORS issues with no-cors mode
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', GOOGLE_SHEET_WEBHOOK_URL);
      xhr.setRequestHeader('Content-Type', 'application/json');
      
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          console.log('Google Sheets response:', xhr.responseText);
          toast.success('Your information has been saved to our records');
          resolve(true);
        } else {
          console.error('Error saving to Google Sheets. Status:', xhr.status);
          toast.error('Failed to save your information');
          resolve(false); // Still resolve to allow local backup to work
        }
      };
      
      xhr.onerror = function() {
        console.error('Network error while saving to Google Sheets');
        toast.error('Network error while saving your information');
        resolve(false); // Still resolve to allow local backup to work
      };
      
      xhr.send(JSON.stringify(data));
    });
  } catch (error) {
    console.error('Error saving data to Google Sheet:', error);
    toast.error('Failed to save your information');
    return false;
  }
};
