import { format, addYears, addMonths, addDays } from 'date-fns';

// Defining the types for our sanskars
export interface Sanskar {
  name: string;
  description: string;
  timing: string;
  calculatedDate?: string;
  calculatedAge?: string;
}

export interface UserData {
  name: string;
  email: string;
  phone?: string;
  gender: 'male' | 'female' | 'other';
  dob: Date;
}

// Define the 16 sanskars with their timing rules
export const SANSKARS: Sanskar[] = [
  {
    name: "Garbhadhana",
    description: "Conception ceremony",
    timing: "Before conception"
  },
  {
    name: "Pumsavana",
    description: "Fetus protection ceremony",
    timing: "3rd month of pregnancy"
  },
  {
    name: "Simantonnayana",
    description: "Parting of hair ceremony",
    timing: "7th month of pregnancy"
  },
  {
    name: "Jatakarma",
    description: "Birth ceremony",
    timing: "At birth"
  },
  {
    name: "Namakarana",
    description: "Naming ceremony",
    timing: "11th day after birth"
  },
  {
    name: "Nishkramana",
    description: "First outing ceremony",
    timing: "4th month after birth"
  },
  {
    name: "Annaprashana",
    description: "First feeding ceremony",
    timing: "6th month after birth"
  },
  {
    name: "Chudakarana",
    description: "First haircut ceremony",
    timing: "3rd year"
  },
  {
    name: "Karnavedha",
    description: "Ear-piercing ceremony",
    timing: "3rd or 5th year"
  },
  {
    name: "Vidyarambha",
    description: "Learning ceremony",
    timing: "5th year"
  },
  {
    name: "Upanayana",
    description: "Sacred thread ceremony",
    timing: "8th year for Brahmins, 11th for Kshatriyas, 12th for Vaishyas"
  },
  {
    name: "Vedarambha",
    description: "Beginning Vedic study",
    timing: "After Upanayana"
  },
  {
    name: "Samavartana",
    description: "End of formal education",
    timing: "16th to 24th year"
  },
  {
    name: "Vivaha",
    description: "Marriage ceremony",
    timing: "After Samavartana"
  },
  {
    name: "Grihastha",
    description: "Becoming a householder",
    timing: "After Vivaha"
  },
  {
    name: "Vanaprastha",
    description: "Retirement ceremony",
    timing: "After 50 years or when grandchildren arrive"
  }
];

// Function to calculate sanskar dates based on date of birth
export function calculateSanskarDates(userData: UserData): Sanskar[] {
  const { dob, gender } = userData;
  const birthDate = new Date(dob);
  
  return SANSKARS.map(sanskar => {
    const calculatedSanskar = { ...sanskar };
    
    switch (sanskar.name) {
      case "Garbhadhana":
        // This is conceptual and doesn't have a calculated date
        calculatedSanskar.calculatedDate = "Ceremonial date determined by astrologer";
        calculatedSanskar.calculatedAge = "Before birth";
        break;
        
      case "Pumsavana":
        // 3 months before birth (approximate conception date + 3 months)
        const pumsavanaDate = new Date(birthDate);
        pumsavanaDate.setMonth(pumsavanaDate.getMonth() - 6);
        calculatedSanskar.calculatedDate = format(pumsavanaDate, 'MMMM dd, yyyy');
        calculatedSanskar.calculatedAge = "During pregnancy";
        break;
        
      case "Simantonnayana":
        // 2 months before birth
        const simantonnayana = new Date(birthDate);
        simantonnayana.setMonth(simantonnayana.getMonth() - 2);
        calculatedSanskar.calculatedDate = format(simantonnayana, 'MMMM dd, yyyy');
        calculatedSanskar.calculatedAge = "During pregnancy";
        break;
        
      case "Jatakarma":
        // At birth
        calculatedSanskar.calculatedDate = format(birthDate, 'MMMM dd, yyyy');
        calculatedSanskar.calculatedAge = "At birth";
        break;
        
      case "Namakarana":
        // 11 days after birth
        const namakaranaDate = addDays(birthDate, 11);
        calculatedSanskar.calculatedDate = format(namakaranaDate, 'MMMM dd, yyyy');
        calculatedSanskar.calculatedAge = "11 days";
        break;
        
      case "Nishkramana":
        // 4 months after birth
        const nishkramanaDate = addMonths(birthDate, 4);
        calculatedSanskar.calculatedDate = format(nishkramanaDate, 'MMMM dd, yyyy');
        calculatedSanskar.calculatedAge = "4 months";
        break;
        
      case "Annaprashana":
        // 6 months after birth
        const annaprashanaDate = addMonths(birthDate, 6);
        calculatedSanskar.calculatedDate = format(annaprashanaDate, 'MMMM dd, yyyy');
        calculatedSanskar.calculatedAge = "6 months";
        break;
        
      case "Chudakarana":
        // 3 years after birth
        const chudakaranaDate = addYears(birthDate, 3);
        calculatedSanskar.calculatedDate = format(chudakaranaDate, 'MMMM dd, yyyy');
        calculatedSanskar.calculatedAge = "3 years";
        break;
        
      case "Karnavedha":
        // 3 or 5 years after birth (using 3 for simplicity)
        const karnavedhaDate = addYears(birthDate, 3);
        calculatedSanskar.calculatedDate = format(karnavedhaDate, 'MMMM dd, yyyy');
        calculatedSanskar.calculatedAge = "3 years";
        break;
        
      case "Vidyarambha":
        // 5 years after birth
        const vidyarambhaDate = addYears(birthDate, 5);
        calculatedSanskar.calculatedDate = format(vidyarambhaDate, 'MMMM dd, yyyy');
        calculatedSanskar.calculatedAge = "5 years";
        break;
        
      case "Upanayana":
        // Different for different varnas, using 8 as default
        let upanayana = 8;
        const upanayanaDate = addYears(birthDate, upanayana);
        calculatedSanskar.calculatedDate = format(upanayanaDate, 'MMMM dd, yyyy');
        calculatedSanskar.calculatedAge = `${upanayana} years`;
        break;
        
      case "Vedarambha":
        // After Upanayana, so 8+1 years
        const vedarambhaDate = addYears(birthDate, 9);
        calculatedSanskar.calculatedDate = format(vedarambhaDate, 'MMMM dd, yyyy');
        calculatedSanskar.calculatedAge = "9 years";
        break;
        
      case "Samavartana":
        // Between 16-24 years, using 18 as average
        const samavartanaDate = addYears(birthDate, 18);
        calculatedSanskar.calculatedDate = format(samavartanaDate, 'MMMM dd, yyyy');
        calculatedSanskar.calculatedAge = "18 years";
        break;
        
      case "Vivaha":
        // After Samavartana, typically in twenties
        const vivahaAge = gender === 'male' ? 25 : 22;
        const vivahaDate = addYears(birthDate, vivahaAge);
        calculatedSanskar.calculatedDate = format(vivahaDate, 'MMMM dd, yyyy');
        calculatedSanskar.calculatedAge = `${vivahaAge} years`;
        break;
        
      case "Grihastha":
        // After Vivaha, so marriage age + 1
        const grihasthaAge = gender === 'male' ? 26 : 23;
        const grihasthaDate = addYears(birthDate, grihasthaAge);
        calculatedSanskar.calculatedDate = format(grihasthaDate, 'MMMM dd, yyyy');
        calculatedSanskar.calculatedAge = `${grihasthaAge} years`;
        break;
        
      case "Vanaprastha":
        // After 50 years or when grandchildren arrive
        const vanaprasthaDate = addYears(birthDate, 50);
        calculatedSanskar.calculatedDate = format(vanaprasthaDate, 'MMMM dd, yyyy');
        calculatedSanskar.calculatedAge = "50 years";
        break;
        
      default:
        calculatedSanskar.calculatedDate = "Date to be determined";
        calculatedSanskar.calculatedAge = "Age to be determined";
    }
    
    return calculatedSanskar;
  });
}
