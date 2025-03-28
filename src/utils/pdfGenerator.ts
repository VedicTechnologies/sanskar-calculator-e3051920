
import { UserData, Sanskar } from './sanskarCalculator';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';

// Add type definition for jsPDF with autotable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export const generatePDF = (userData: UserData, sanskars: Sanskar[]): string => {
  const doc = new jsPDF();

  // Add decorative header
  doc.setFillColor(212, 175, 55); // Sanskrit gold color
  doc.rect(0, 0, 210, 25, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text('Vedic Academy 16 Sanskars', 105, 15, { align: 'center' });
  
  // Add tagline
  doc.setFontSize(14);
  doc.text('Know Correct Time for Each Sanskar', 105, 23, { align: 'center' });
  
  // Add user information
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.text('Personal Information', 14, 35);
  
  doc.setFontSize(12);
  doc.text(`Name: ${userData.name}`, 14, 45);
  doc.text(`Email: ${userData.email}`, 14, 52);
  doc.text(`Gender: ${userData.gender}`, 14, 59);
  doc.text(`Date of Birth: ${format(new Date(userData.dob), 'MMMM dd, yyyy')}`, 14, 66);
  
  // Add current date
  doc.text(`Generated on: ${format(new Date(), 'MMMM dd, yyyy')}`, 14, 73);
  
  // Add a decorative line
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.5);
  doc.line(14, 80, 196, 80);
  
  // Prepare data for table
  const tableData = sanskars.map(sanskar => [
    sanskar.name,
    sanskar.calculatedDate,
    sanskar.calculatedAge
  ]);
  
  // Add the table
  doc.autoTable({
    startY: 85,
    head: [['Sanskar', 'Proposed Date', 'Age']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [212, 175, 55],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    alternateRowStyles: {
      fillColor: [247, 243, 232] // Sanskrit cream color
    },
    styles: {
      fontSize: 10,
      cellPadding: 3
    }
  });
  
  // Add a footer
  const pageCount = doc.internal.pages.length - 1;
  doc.setFontSize(10);
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.5);
    doc.line(14, 280, 196, 280);
    doc.text(
      '© 2025 | Vedic Academy Sanskars Calculator - The dates provided are approximations based on traditional guidelines.',
      105,
      285,
      { align: 'center' }
    );
  }
  
  // Return base64 string of the PDF
  return doc.output('datauristring');
};

export const downloadPDF = (userData: UserData, sanskars: Sanskar[]) => {
  const doc = new jsPDF();
  
  // Add decorative header
  doc.setFillColor(212, 175, 55); // Sanskrit gold color
  doc.rect(0, 0, 210, 25, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text('Vedic Academy 16 Sanskars', 105, 15, { align: 'center' });
  
  // Add tagline
  doc.setFontSize(14);
  doc.text('Know Correct Time for Each Sanskar', 105, 23, { align: 'center' });
  
  // Add user information
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.text('Personal Information', 14, 35);
  
  doc.setFontSize(12);
  doc.text(`Name: ${userData.name}`, 14, 45);
  doc.text(`Email: ${userData.email}`, 14, 52);
  doc.text(`Gender: ${userData.gender}`, 14, 59);
  doc.text(`Date of Birth: ${format(new Date(userData.dob), 'MMMM dd, yyyy')}`, 14, 66);
  
  // Add current date
  doc.text(`Generated on: ${format(new Date(), 'MMMM dd, yyyy')}`, 14, 73);
  
  // Add a decorative line
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(0.5);
  doc.line(14, 80, 196, 80);
  
  // Prepare data for table
  const tableData = sanskars.map(sanskar => [
    sanskar.name,
    sanskar.calculatedDate,
    sanskar.calculatedAge
  ]);
  
  // Add the table
  doc.autoTable({
    startY: 85,
    head: [['Sanskar', 'Proposed Date', 'Age']],   
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [212, 175, 55],
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    alternateRowStyles: {
      fillColor: [247, 243, 232] // Sanskrit cream color
    },
    styles: {
      fontSize: 10,
      cellPadding: 3
    }
  });
  
  // Add a footer
  const pageCount = doc.internal.pages.length - 1;
  doc.setFontSize(10);
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.5);
    doc.line(14, 280, 196, 280);
    doc.text(
      '© 2025 | Vedic Academy Sanskars Calculator - The dates provided are approximations based on traditional guidelines.',
      105,
      285,
      { align: 'center' }
    );
  }
  
  // Trigger download of the PDF
  const fileName = `${userData.name.replace(/\s+/g, '_')}_VedicAcademy_Sanskar_Calculator.pdf`;
  doc.save(fileName);
  
  return fileName;
};
