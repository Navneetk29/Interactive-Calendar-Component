import { useState, useCallback } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { getCalendarDays } from '@/lib/utils';
import type { DateRange } from '@/lib/types';

export const useCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handlePreviousMonth = useCallback(() => {
    setCurrentMonth(prev => subMonths(prev, 1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth(prev => addMonths(prev, 1));
  }, []);

  const calendarDays = getCalendarDays(currentMonth);

  return {
    currentMonth,
    calendarDays,
    handlePreviousMonth,
    handleNextMonth,
  };
};

export const useDateRange = () => {
  const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });

  const handleDateClick = useCallback((date: Date) => {
    setDateRange(prev => {
      if (!prev.start || (prev.start && prev.end)) {
        // Start new range
        return { start: date, end: null };
      } else {
        // Complete the range
        if (date < prev.start) {
          return { start: date, end: prev.start };
        } else {
          return { start: prev.start, end: date };
        }
      }
    });
  }, []);

  const clearDateRange = useCallback(() => {
    setDateRange({ start: null, end: null });
  }, []);

  return {
    dateRange,
    handleDateClick,
    clearDateRange,
    setDateRange,
  };
};