
import React, { useState } from 'react';
import SanskarForm from '@/components/SanskarForm';
import SanskarResults from '@/components/SanskarResults';
import { UserData, Sanskar, calculateSanskarDates } from '@/utils/sanskarCalculator';
import { generatePDF } from '@/utils/pdfGenerator';
import { saveToDatabase } from '@/services/dbService';
import { Toaster } from '@/components/ui/sonner';

const Index = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [sanskars, setSanskars] = useState<Sanskar[]>([]);
  const [pdfBase64, setPdfBase64] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleFormSubmit = async (data: UserData) => {
    setIsLoading(true);
    try {
      // Calculate sanskar dates
      const calculatedSanskars = calculateSanskarDates(data);
      
      // Generate PDF
      const pdfString = generatePDF(data, calculatedSanskars);
      
      // Save to database
      await saveToDatabase(data, calculatedSanskars, pdfString);
      
      // Update state
      setUserData(data);
      setSanskars(calculatedSanskars);
      setPdfBase64(pdfString);
      setShowResults(true);
    } catch (error) {
      console.error('Error processing data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setShowResults(false);
  };

  return (
    <div className="min-h-screen sanskar-container flex items-center justify-center">
      <Toaster />
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sanskrit-cream via-white to-white opacity-70"></div>
      </div>
      
      <div className="w-full max-w-4xl z-10">
        <div className="text-center mb-8 animate-entry" style={{ "--delay": "1" } as React.CSSProperties}>
          <h1 className="text-4xl sm:text-5xl font-medium text-sanskrit-deep mb-4">
            16 Sanskars Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the auspicious timings for the sixteen sanskars based on your birth details
          </p>
        </div>
        
        {!showResults ? (
          <SanskarForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        ) : (
          <SanskarResults 
            userData={userData!} 
            sanskars={sanskars} 
            pdfBase64={pdfBase64} 
            onBack={handleBack}
          />
        )}
        
        <div className="text-center mt-10 text-xs text-gray-500 animate-entry" style={{ "--delay": "8" } as React.CSSProperties}>
          <p>The dates provided are approximations based on traditional guidelines.</p>
          <p>For the most accurate timings, please consult with a qualified astrologer.</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
