'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useCalendar, useDateRange } from '@/hooks/useCalendar';
import { useNotes } from '@/hooks/useNotes';
import { useToast } from '@/components/ui/Toast';
import type { DateRange } from '@/lib/types';

interface CalendarContextType {
  // Calendar state
  currentMonth: Date;
  calendarDays: Date[];
  handlePreviousMonth: () => void;
  handleNextMonth: () => void;

  // Date range state
  dateRange: DateRange;
  handleDateClick: (date: Date) => void;
  clearDateRange: () => void;

  // Notes state
  notes: any[];
  isLoadingNotes: boolean;
  isSavingNotes: boolean;
  notesError: string | null;
  saveNote: (dateRange: DateRange, content: string) => Promise<boolean>;
  deleteNote: (noteId: string) => void;
  getNoteForDateRange: (dateRange: DateRange) => any;

  // Toast notifications
  showSuccess: (title: string, message?: string) => void;
  showError: (title: string, message?: string) => void;
  showInfo: (title: string, message?: string) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendarContext must be used within a CalendarProvider');
  }
  return context;
};

interface CalendarProviderProps {
  children: ReactNode;
}

export const CalendarProvider = ({ children }: CalendarProviderProps) => {
  const calendar = useCalendar();
  const dateRange = useDateRange();
  const notes = useNotes();
  const { success: showSuccess, error: showError, info: showInfo } = useToast();

  const value: CalendarContextType = {
    // Calendar
    currentMonth: calendar.currentMonth,
    calendarDays: calendar.calendarDays,
    handlePreviousMonth: calendar.handlePreviousMonth,
    handleNextMonth: calendar.handleNextMonth,

    // Date range
    dateRange: dateRange.dateRange,
    handleDateClick: dateRange.handleDateClick,
    clearDateRange: dateRange.clearDateRange,

    // Notes
    notes: notes.notes,
    isLoadingNotes: notes.isLoading,
    isSavingNotes: notes.isSaving,
    notesError: notes.error,
    saveNote: notes.saveNote,
    deleteNote: notes.deleteNote,
    getNoteForDateRange: notes.getNoteForDateRange,

    // Toast
    showSuccess,
    showError,
    showInfo,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};;