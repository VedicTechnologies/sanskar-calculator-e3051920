
import { useState, useEffect, useCallback } from 'react';
import { useGoogleLogin } from '@react-oauth/google';

interface CalendarEvent {
  id: string;
  summary: string;
  start: {
    dateTime: string;
    date?: string;
  };
  end: {
    dateTime: string;
    date?: string;
  };
}

export const useGoogleCalendar = () => {
  const [token, setToken] = useState<string | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize Google login
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setToken(tokenResponse.access_token);
    },
    onError: (errorResponse) => {
      setError(errorResponse.error_description || 'Failed to login with Google');
    },
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
  });

  // Fetch user's calendar events
  const fetchEvents = useCallback(async () => {
    if (!token) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=10&orderBy=startTime&singleEvents=true&timeMin=' +
          new Date().toISOString(),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch calendar events');
      }
      
      const data = await response.json();
      setEvents(data.items || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch calendar events');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // Fetch events when token changes
  useEffect(() => {
    if (token) {
      fetchEvents();
    }
  }, [token, fetchEvents]);

  // Convert an event date to a Date object
  const getEventDate = (event: CalendarEvent): Date => {
    if (event.start.date) {
      return new Date(event.start.date);
    }
    return new Date(event.start.dateTime);
  };

  return {
    login,
    events,
    isLoading,
    error,
    token: !!token,
    getEventDate,
  };
};
