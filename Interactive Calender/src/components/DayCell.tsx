'use client';

import { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getAriaLabel, getDateButtonRole } from '@/lib/utils';
import type { DayCellProps } from '@/lib/types';

const DayCell = memo<DayCellProps>(({
  date,
  isCurrentMonth,
  isToday,
  isInRange,
  isRangeStart,
  isRangeEnd,
  onClick,
  disabled = false,
}) => {
  const handleClick = useCallback(() => {
    if (isCurrentMonth && !disabled) {
      onClick(date);
    }
  }, [date, isCurrentMonth, disabled, onClick]);

  const ariaLabel = getAriaLabel(date, isCurrentMonth, isToday, isRangeStart || isRangeEnd);
  const role = getDateButtonRole(isCurrentMonth);

  return (
    <motion.div
      className={`
        relative h-14 w-14 flex items-center justify-center text-sm font-semibold cursor-pointer
        transition-all duration-300 ease-out
        ${isCurrentMonth ? 'text-slate-800 hover:text-slate-900' : 'text-slate-400'}
        ${isToday ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-lg shadow-blue-200' : ''}
        ${isInRange ? 'bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-700 border border-blue-200' : ''}
        ${isRangeStart ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-200 border-2 border-emerald-300' : ''}
        ${isRangeEnd ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-200 border-2 border-emerald-300' : ''}
        ${!isToday && !isInRange && !isRangeStart && !isRangeEnd ? 'hover:bg-slate-50 hover:shadow-md border border-transparent hover:border-slate-200' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        rounded-xl
      `}
      whileHover={{ scale: isCurrentMonth && !disabled ? 1.08 : 1, y: isCurrentMonth && !disabled ? -2 : 0 }}
      whileTap={{ scale: isCurrentMonth && !disabled ? 0.95 : 1 }}
      onClick={handleClick}
      role={role}
      aria-label={ariaLabel}
      aria-selected={isRangeStart || isRangeEnd}
      aria-disabled={disabled || !isCurrentMonth}
      tabIndex={isCurrentMonth && !disabled ? 0 : -1}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && isCurrentMonth && !disabled) {
          e.preventDefault();
          onClick(date);
        }
      }}
    >
      {date.getDate()}
      {isToday && (
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-sm"></div>
      )}
    </motion.div>
  );
});

DayCell.displayName = 'DayCell';

export default DayCell;