'use client';

import { motion } from 'framer-motion';
import { CalendarProvider, useCalendarContext } from '@/context/CalendarContext';
import Calendar from '@/components/Calendar';
import NotesPanel from '@/components/NotesPanel';
import { ToastProvider } from '@/components/ui/Toast';
import ErrorBoundary from '@/components/ErrorBoundary';

const CalendarContent = () => {
  const {
    dateRange,
    getNoteForDateRange,
    saveNote,
    isLoadingNotes,
    isSavingNotes,
    notesError,
  } = useCalendarContext();

  const currentNote = getNoteForDateRange(dateRange);

  const handleSaveNote = async (content: string) => {
    return await saveNote(dateRange, content);
  };

  const heroImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          className="mb-12 rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/50 border border-white/20 backdrop-blur-sm"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="h-80 md:h-96 bg-cover bg-center flex items-center justify-center relative"
            style={{ backgroundImage: `url(${heroImage})` }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/50"></div>
            <div className="relative z-10 text-center px-6 py-8">
              <motion.h1
                className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-lg"
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Interactive Calendar
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-white/90 font-light tracking-wide drop-shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                Plan your days with elegance
              </motion.p>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Calendar */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Calendar />
          </motion.div>

          {/* Notes Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <NotesPanel
              dateRange={dateRange}
              note={currentNote}
              onSaveNote={handleSaveNote}
              isLoading={isLoadingNotes}
              isSaving={isSavingNotes}
              error={notesError}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <CalendarProvider>
          <CalendarContent />
        </CalendarProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}