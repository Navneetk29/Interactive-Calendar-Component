import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isToday, addMonths, subMonths } from 'date-fns';
import { DATE_FORMATS } from '@/constants';

export const getCalendarDays = (date: Date): Date[] => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
};

export const formatMonthYear = (date: Date): string => {
  return format(date, DATE_FORMATS.MONTH_YEAR);
};

export const formatDateRange = (start: Date | null, end: Date | null): string => {
  if (!start || !end) return 'Select a date range';
  return `${format(start, DATE_FORMATS.DATE_RANGE)} - ${format(end, DATE_FORMATS.FULL_DATE)}`;
};

export const isDateInRange = (date: Date, start: Date | null, end: Date | null): boolean => {
  if (!start || !end) return false;
  return date >= start && date <= end;
};

export const isDateRangeStart = (date: Date, start: Date | null): boolean => {
  return start ? isSameDay(date, start) : false;
};

export const isDateRangeEnd = (date: Date, end: Date | null): boolean => {
  return end ? isSameDay(date, end) : false;
};

// Accessibility helpers
export const getAriaLabel = (date: Date, isCurrentMonth: boolean, isToday: boolean, isSelected: boolean): string => {
  const dateString = format(date, 'MMMM d, yyyy');
  const parts = [dateString];

  if (isToday) parts.push('Today');
  if (isSelected) parts.push('Selected');
  if (!isCurrentMonth) parts.push('Not in current month');

  return parts.join(', ');
};

export const getDateButtonRole = (isCurrentMonth: boolean): string => {
  return isCurrentMonth ? 'button' : 'presentation';
};

// Performance helpers
export const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map();
  return ((...args: any[]) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
};