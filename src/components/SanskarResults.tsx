
import React, { useState } from 'react';
import { UserData, Sanskar } from '@/utils/sanskarCalculator';
import { downloadPDF } from '@/utils/pdfGenerator';
import { sendEmailWithPDF } from '@/services/emailService';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Download, Mail, ArrowLeft, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SanskarResultsProps {
  userData: UserData;
  sanskars: Sanskar[];
  pdfBase64: string;
  onBack: () => void;
}

// Animation variants for framer-motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const SanskarResults: React.FC<SanskarResultsProps> = ({ 
  userData, 
  sanskars, 
  pdfBase64, 
  onBack 
}) => {
  const [isSending, setIsSending] = useState(false);
  
  const handleDownloadPDF = () => {
    downloadPDF(userData, sanskars);
  };
  
  const handleSendEmail = async () => {
    setIsSending(true);
    try {
      await sendEmailWithPDF(userData, sanskars, pdfBase64);
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Button 
        variant="ghost" 
        className="mb-4 text-sanskrit-deep hover:text-sanskrit-gold transition-colors"
        onClick={onBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Form
      </Button>
      
      <Card className="bg-white/90 backdrop-blur-md border-sanskrit-gold/30 mb-6 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-sanskrit-gold to-sanskrit-ochre text-white">
          <CardTitle className="text-2xl font-medium">Your Sanskar Timeline</CardTitle>
          <CardDescription className="text-white/90">
            Based on your birth date: {userData.dob.toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-sanskrit-deep">Personal Information</h3>
              <p><span className="font-medium">Name:</span> {userData.name}</p>
              <p><span className="font-medium">Email:</span> {userData.email}</p>
              <p><span className="font-medium">Gender:</span> {userData.gender}</p>
            </div>
            <div className="flex md:justify-end items-start space-x-3 mt-4 md:mt-0">
              <Button 
                onClick={handleDownloadPDF} 
                className="bg-sanskrit-gold hover:bg-sanskrit-deep transition-colors"
              >
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </Button>
              <Button 
                onClick={handleSendEmail} 
                disabled={isSending} 
                variant="outline" 
                className="border-sanskrit-gold text-sanskrit-deep hover:bg-sanskrit-gold/10"
              >
                <Mail className="mr-2 h-4 w-4" /> 
                {isSending ? "Sending..." : "Email PDF"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <TooltipProvider>
        <motion.div 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sanskars.map((sanskar, index) => (
            <motion.div 
              key={sanskar.name} 
              variants={itemVariants}
              className="sanskar-card group hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4">
                <div>
                  <div className="flex items-center">
                    <h3 className="text-lg font-medium text-sanskrit-deep mr-2">{sanskar.name}</h3>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-sanskrit-gold cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">{sanskar.description}</p>
                        <p className="text-xs mt-1 text-muted-foreground">Traditional timing: {sanskar.timing}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{sanskar.description}</p>
                </div>
                
                <div className="mt-3 md:mt-0 md:text-right">
                  <div className="text-sm font-medium text-sanskrit-deep">{sanskar.calculatedAge}</div>
                  <div className="text-sm mt-1 group-hover:text-sanskrit-gold transition-colors">
                    {sanskar.calculatedDate}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </TooltipProvider>
      
      <div className="flex justify-center mt-8">
        <Button 
          onClick={handleDownloadPDF} 
          className="bg-sanskrit-gold hover:bg-sanskrit-deep transition-colors mx-2"
        >
          <Download className="mr-2 h-4 w-4" /> Download PDF
        </Button>
        <Button 
          onClick={handleSendEmail} 
          disabled={isSending} 
          variant="outline" 
          className="border-sanskrit-gold text-sanskrit-deep hover:bg-sanskrit-gold/10 mx-2"
        >
          <Mail className="mr-2 h-4 w-4" /> 
          {isSending ? "Sending..." : "Email PDF"}
        </Button>
      </div>
    </div>
  );
};

export default SanskarResults;
