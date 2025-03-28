
import { UserData, Sanskar } from '../utils/sanskarCalculator';
import { toast } from 'sonner';
import { saveToGoogleSheet } from './googleSheetService';

interface StoredData extends UserData {
  id: string;
  pdfUrl: string;
  createdAt: string;
}

// Modified to save data to Google Sheets and localStorage as backup
export const saveToDatabase = async (
  userData: UserData, 
  sanskars: Sanskar[], 
  pdfBase64: string
): Promise<boolean> => {
  try {
    // First, try to save to Google Sheet
    await saveToGoogleSheet(userData, sanskars);
    
    // Still save to localStorage as a backup
    const record: StoredData = {
      ...userData,
      id: Date.now().toString(),
      pdfUrl: pdfBase64,
      createdAt: new Date().toISOString()
    };
    
    // Get existing data
    const existingData = localStorage.getItem('sanskarRecords');
    const records: StoredData[] = existingData ? JSON.parse(existingData) : [];
    
    // Add new record
    records.push(record);
    
    // Save back to storage
    localStorage.setItem('sanskarRecords', JSON.stringify(records));
    
    console.log('Data saved successfully to localStorage (backup):', record);
    return true;
  } catch (error) {
    console.error('Error saving data:', error);
    toast.error('Failed to save your information');
    return false;
  }
};

// Function to retrieve a specific record (from localStorage backup)
export const getRecord = (id: string): StoredData | null => {
  try {
    const existingData = localStorage.getItem('sanskarRecords');
    if (!existingData) return null;
    
    const records: StoredData[] = JSON.parse(existingData);
    return records.find(record => record.id === id) || null;
  } catch (error) {
    console.error('Error retrieving record:', error);
    return null;
  }
};

// Function to get all records (from localStorage backup)
export const getAllRecords = (): StoredData[] => {
  try {
    const existingData = localStorage.getItem('sanskarRecords');
    return existingData ? JSON.parse(existingData) : [];
  } catch (error) {
    console.error('Error retrieving records:', error);
    return [];
  }
};
