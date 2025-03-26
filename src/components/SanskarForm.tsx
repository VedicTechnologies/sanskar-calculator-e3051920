
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserData } from '@/utils/sanskarCalculator';

// Define the form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select your gender.",
  }),
  dob: z.date({
    required_error: "Please select your date of birth.",
  }),
});

interface SanskarFormProps {
  onSubmit: (data: UserData) => void;
  isLoading?: boolean;
}

const SanskarForm: React.FC<SanskarFormProps> = ({ onSubmit, isLoading = false }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  // Handle form submission
  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsProcessing(true);
    try {
      // Convert to UserData type
      const userData: UserData = {
        name: values.name,
        email: values.email,
        gender: values.gender as UserData['gender'],
        dob: values.dob,
      };
      
      await onSubmit(userData);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="sanskar-form animate-entry bg-white/90 backdrop-blur-md" style={{ "--delay": "2" } as React.CSSProperties}>
      <h2 className="sanskar-form-title">Sanskar Calculator</h2>
      <div className="text-center mb-6 text-sm text-gray-600">
        Enter your details to calculate the auspicious dates for the 16 sanskars
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="animate-entry" style={{ "--delay": "3" } as React.CSSProperties}>
                <FormLabel className="sanskar-label">Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your full name" 
                    {...field} 
                    className="sanskar-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="animate-entry" style={{ "--delay": "4" } as React.CSSProperties}>
                <FormLabel className="sanskar-label">Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter your email" 
                    type="email" 
                    {...field} 
                    className="sanskar-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="animate-entry" style={{ "--delay": "5" } as React.CSSProperties}>
                <FormLabel className="sanskar-label">Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="sanskar-input">
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col animate-entry" style={{ "--delay": "6" } as React.CSSProperties}>
                <FormLabel className="sanskar-label">Date of Birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "sanskar-input pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-70" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription className="text-xs text-gray-500">
                  Your date of birth is used to calculate sanskar dates
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="sanskar-button animate-entry" 
            disabled={isLoading || isProcessing}
            style={{ "--delay": "7" } as React.CSSProperties}
          >
            {isLoading || isProcessing ? "Processing..." : "Calculate Sanskars"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SanskarForm;
