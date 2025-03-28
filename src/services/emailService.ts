
import { UserData, Sanskar } from '../utils/sanskarCalculator';
import { toast } from 'sonner';

// Email functionality has been disabled as per requirements
export const sendEmailWithPDF = async (
  userData: UserData, 
  sanskars: Sanskar[], 
  pdfBase64: string
): Promise<boolean> => {
  console.log('Email functionality has been disabled');
  return false;
};
