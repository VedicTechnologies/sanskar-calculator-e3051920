import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, SelectSingleEventHandler} from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { set } from "date-fns";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [month, setMonth] = React.useState<Date>(props.defaultMonth || new Date());

  // function to jump to today
  const handleTodayClick = () => {
    setMonth(new Date());
    // If onMonthChange is provided in props, call it
    if (props.onMonthChange) {
      props.onMonthChange(new Date());
    }
  }

  // Current year and years for dropdown (10 years before and after current year)
  const currentYear = new Date().getFullYear();
  // const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);
  const years = Array.from({ length: 151 }, (_, i) => currentYear - 150 + i);

  // Months for dropdown
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  // Function to handle year change
  const handleYearSelect = (year: string) => {
    const newMonth = new Date(month);
    newMonth.setFullYear(parseInt(year));
    setMonth(newMonth);

    // if onMonthChange is provided in props, call it
    if (props.onMonthChange) {
      props.onMonthChange(newMonth);
    }
  };

  // Handle Month Select
  const handleMonthSelect = (monthName: string) => {
    const newMonth = new Date(month);
    newMonth.setMonth(months.indexOf(monthName));
    setMonth(newMonth);
    
    // If onMonthChange is provided in props, call it
    if (props.onMonthChange) {
      props.onMonthChange(newMonth);
    }
  }; 

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 pointer-events-auto", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center gap-1",
        caption_label: "hidden", // Hide default caption as we're using custom selectors
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
        Caption: ({ displayMonth }) => (
          <div className="flex justify-center items-center gap-1 px-8">
            <Select
              value={months[displayMonth.getMonth()]}
              onValueChange={handleMonthSelect}
            >
              <SelectTrigger className="h-7 w-[90px] text-xs font-normal">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month} value={month} className="text-xs">
                    {month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select
              value={displayMonth.getFullYear().toString()}
              onValueChange={handleYearSelect}
            >
              <SelectTrigger className="h-7 w-[65px] text-xs font-normal">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()} className="text-xs">
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <button
              onClick={handleTodayClick}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "h-7 text-xs ml-1"
              )}
            >
              Today
            </button>
          </div>
        )
      }}
      month={month}
      onMonthChange={setMonth}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
