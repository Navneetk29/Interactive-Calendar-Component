'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { formatDateRange } from '@/lib/utils';
import { useCalendarContext } from '@/context/CalendarContext';
import type { NotesPanelProps } from '@/lib/types';

const NotesPanel = memo<NotesPanelProps>(({
  dateRange,
  note,
  onSaveNote,
  isLoading = false,
  isSaving = false,
  error = null,
}) => {
  const { showSuccess, showError } = useCalendarContext();
  const [currentNote, setCurrentNote] = useState('');
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

  useEffect(() => {
    setCurrentNote(note?.content || '');
  }, [note]);

  const handleSave = useCallback(async () => {
    if (dateRange.start && dateRange.end && currentNote.trim()) {
      const success = await onSaveNote(currentNote.trim());
      if (success) {
        showSuccess('Note saved successfully!', 'Your note has been saved for this date range.');
        setShowSuccessAnimation(true);
        setTimeout(() => setShowSuccessAnimation(false), 2000);
      } else {
        showError('Failed to save note', 'Please try again.');
      }
    }
  }, [dateRange, currentNote, onSaveNote, showSuccess, showError]);

  const isDisabled = !dateRange.start || !dateRange.end || isLoading || isSaving;

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/50 border border-white/20 p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      role="complementary"
      aria-label="Notes panel"
    >
      <h3 className="text-2xl font-bold mb-6 text-slate-800 tracking-tight">Notes</h3>

      <div className="mb-6">
        <p className="text-sm text-slate-600 mb-2 font-medium">Date Range:</p>
        <p className="text-base font-semibold text-slate-800 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">
          {formatDateRange(dateRange.start, dateRange.end)}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <textarea
        className="w-full h-40 p-4 border border-slate-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm placeholder:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
        placeholder="Add notes for this date range..."
        value={currentNote}
        onChange={(e) => setCurrentNote(e.target.value)}
        disabled={isDisabled}
        aria-label="Notes content"
      />

      <motion.button
        className={`mt-6 w-full px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200 ${
          showSuccessAnimation
            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-green-200/50'
            : !isDisabled
            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-blue-200/50 hover:shadow-xl hover:shadow-blue-300/50'
            : 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-slate-200/50'
        }`}
        whileHover={{ scale: !isDisabled && !showSuccessAnimation ? 1.02 : 1, y: !isDisabled && !showSuccessAnimation ? -1 : 0 }}
        whileTap={{ scale: !isDisabled && !showSuccessAnimation ? 0.98 : 1 }}
        animate={showSuccessAnimation ? { scale: [1, 1.05, 1] } : {}}
        transition={showSuccessAnimation ? { duration: 0.6, ease: 'easeInOut' } : {}}
        onClick={handleSave}
        disabled={isDisabled}
        aria-label="Save note"
        type="button"
      >
        {showSuccessAnimation ? (
          <motion.div
            className="flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            ✓ Saved!
          </motion.div>
        ) : isSaving ? (
          'Saving...'
        ) : (
          'Save Note'
        )}
      </motion.button>
    </motion.div>
  );
});

NotesPanel.displayName = 'NotesPanel';

export default NotesPanel;