export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface Note {
  id: string;
  dateRange: DateRange;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isInRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
}

export interface CalendarState {
  currentMonth: Date;
  dateRange: DateRange;
  selectedDate: Date | null;
}

export interface NotesState {
  notes: Note[];
  isLoading: boolean;
  error: string | null;
}

export interface CalendarActions {
  setCurrentMonth: (date: Date) => void;
  setDateRange: (range: DateRange) => void;
  selectDate: (date: Date) => void;
  clearSelection: () => void;
}

export interface NotesActions {
  saveNote: (dateRange: DateRange, content: string) => void;
  deleteNote: (id: string) => void;
  updateNote: (id: string, content: string) => void;
}

// Component Props Types
export interface CalendarProps {
  className?: string;
}

export interface DayCellProps {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isInRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  onClick: (date: Date) => void;
  disabled?: boolean;
}

export interface HeaderProps {
  currentMonth: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  disabled?: boolean;
}

export interface NotesPanelProps {
  dateRange: DateRange;
  note?: Note | null;
  onSaveNote: (content: string) => Promise<boolean>;
  isLoading?: boolean;
  isSaving?: boolean;
  error?: string | null;
}