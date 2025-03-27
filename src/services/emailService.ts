// This file is no longer used as the Email PDF functionality has been removed
// We're keeping it as a placeholder in case the functionality needs to be restored in the future

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
