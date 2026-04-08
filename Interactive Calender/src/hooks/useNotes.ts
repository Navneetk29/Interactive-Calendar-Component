import { useState, useEffect, useCallback } from 'react';
import type { DateRange, Note } from '@/lib/types';
import { STORAGE_KEYS } from '@/constants';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Load notes from localStorage on mount
  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem(STORAGE_KEYS.CALENDAR_NOTES);
      if (savedNotes) {
        const parsedNotes = JSON.parse(savedNotes).map((note: any) => ({
          ...note,
          dateRange: {
            start: note.dateRange.start ? new Date(note.dateRange.start) : null,
            end: note.dateRange.end ? new Date(note.dateRange.end) : null,
          },
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt),
        }));
        setNotes(parsedNotes);
      }
    } catch (err) {
      setError('Failed to load notes from storage');
      console.error('Error loading notes:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    if (!isLoading && !isSaving) {
      try {
        localStorage.setItem(STORAGE_KEYS.CALENDAR_NOTES, JSON.stringify(notes));
      } catch (err) {
        setError('Failed to save notes to storage');
        console.error('Error saving notes:', err);
      }
    }
  }, [notes, isLoading, isSaving]);

  const saveNote = useCallback(async (dateRange: DateRange, content: string): Promise<boolean> => {
    if (!dateRange.start || !dateRange.end || !content.trim()) return false;

    setIsSaving(true);
    try {
      const now = new Date();
      const existingIndex = notes.findIndex(note =>
        note.dateRange.start && note.dateRange.end &&
        note.dateRange.start.getTime() === dateRange.start!.getTime() &&
        note.dateRange.end.getTime() === dateRange.end!.getTime()
      );

      const newNote: Note = {
        id: existingIndex >= 0 ? notes[existingIndex].id : crypto.randomUUID(),
        dateRange,
        content: content.trim(),
        createdAt: existingIndex >= 0 ? notes[existingIndex].createdAt : now,
        updatedAt: now,
      };

      setNotes(prev => existingIndex >= 0
        ? prev.map((note, index) => index === existingIndex ? newNote : note)
        : [...prev, newNote]
      );

      setError(null);
      return true; // Success
    } catch (err) {
      setError('Failed to save note');
      console.error('Error saving note:', err);
      return false; // Failure
    } finally {
      setIsSaving(false);
    }
  }, [notes]);

  const deleteNote = useCallback((noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
  }, []);

  const getNoteForDateRange = useCallback((dateRange: DateRange) => {
    if (!dateRange.start || !dateRange.end) return null;

    return notes.find(note =>
      note.dateRange.start && note.dateRange.end &&
      note.dateRange.start.getTime() === dateRange.start!.getTime() &&
      note.dateRange.end.getTime() === dateRange.end!.getTime()
    ) || null;
  }, [notes]);

  return {
    notes,
    isLoading,
    isSaving,
    error,
    saveNote,
    deleteNote,
    getNoteForDateRange,
  };
};