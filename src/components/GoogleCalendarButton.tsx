
import React from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useGoogleCalendar } from '@/hooks/useGoogleCalendar';
import { Separator } from '@/components/ui/separator';

interface GoogleCalendarButtonProps {
  onDateSelect: (date: Date) => void;
}

const GoogleCalendarButton: React.FC<GoogleCalendarButtonProps> = ({ onDateSelect }) => {
  const { login, events, isLoading, error, token, getEventDate } = useGoogleCalendar();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 text-xs"
          onClick={() => !token && login()}
        >
          <Calendar className="h-3.5 w-3.5" />
          {token ? 'Select from Calendar' : 'Connect Google Calendar'}
        </Button>
      </PopoverTrigger>
      
      {token && (
        <PopoverContent className="w-80 p-0" align="start">
          <div className="p-3 font-medium">
            Your upcoming events
          </div>
          <Separator />
          <div className="max-h-96 overflow-auto p-2">
            {isLoading ? (
              <div className="flex justify-center p-4">Loading events...</div>
            ) : error ? (
              <div className="text-red-500 p-4">{error}</div>
            ) : events.length === 0 ? (
              <div className="text-center p-4 text-sm text-gray-500">No upcoming events found</div>
            ) : (
              <ul className="space-y-1">
                {events.map((event) => (
                  <li key={event.id}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left p-2 h-auto"
                      onClick={() => {
                        const date = getEventDate(event);
                        onDateSelect(date);
                      }}
                    >
                      <div>
                        <div className="font-medium">{event.summary}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(event.start.dateTime || event.start.date!).toLocaleString()}
                        </div>
                      </div>
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
};

export default GoogleCalendarButton;
