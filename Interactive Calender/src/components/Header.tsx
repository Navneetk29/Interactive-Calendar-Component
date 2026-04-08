'use client';

import { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatMonthYear } from '@/lib/utils';
import type { HeaderProps } from '@/lib/types';

const Header = memo<HeaderProps>(({
  currentMonth,
  onPreviousMonth,
  onNextMonth,
  disabled = false,
}) => {
  const handlePreviousClick = useCallback(() => {
    if (!disabled) onPreviousMonth();
  }, [disabled, onPreviousMonth]);

  const handleNextClick = useCallback(() => {
    if (!disabled) onNextMonth();
  }, [disabled, onNextMonth]);

  return (
    <header className="flex items-center justify-between mb-8" role="banner">
      <motion.button
        className={`p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-200 group ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        whileHover={{ scale: !disabled ? 1.05 : 1, x: !disabled ? -2 : 0 }}
        whileTap={{ scale: !disabled ? 0.95 : 1 }}
        onClick={handlePreviousClick}
        disabled={disabled}
        aria-label="Previous month"
        type="button"
      >
        <ChevronLeft className="w-5 h-5 text-slate-600 group-hover:text-slate-800 transition-colors" />
      </motion.button>
      <h2
        className="text-3xl font-bold text-slate-800 tracking-tight"
        aria-live="polite"
        aria-atomic="true"
      >
        {formatMonthYear(currentMonth)}
      </h2>
      <motion.button
        className={`p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-200 group ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        whileHover={{ scale: !disabled ? 1.05 : 1, x: !disabled ? 2 : 0 }}
        whileTap={{ scale: !disabled ? 0.95 : 1 }}
        onClick={handleNextClick}
        disabled={disabled}
        aria-label="Next month"
        type="button"
      >
        <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-slate-800 transition-colors" />
      </motion.button>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;