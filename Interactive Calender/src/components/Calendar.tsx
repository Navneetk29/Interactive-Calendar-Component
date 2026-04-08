'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { useCalendarContext } from '@/context/CalendarContext';
import { DAYS_OF_WEEK, ANIMATION_CONFIG } from '@/constants';
import DayCell from './DayCell';
import Header from './Header';
import type { CalendarProps } from '@/lib/types';

const Calendar = memo<CalendarProps>(({ className = '' }) => {
  const {
    currentMonth,
    calendarDays,
    handlePreviousMonth,
    handleNextMonth,
    dateRange,
    handleDateClick,
  } = useCalendarContext();

  return (
    <motion.div
      className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/50 border border-white/20 p-8 ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: ANIMATION_CONFIG.DURATION }}
      role="application"
      aria-label="Calendar"
    >
      <Header
        currentMonth={currentMonth}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
      />

      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-3 mb-6" role="row">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-slate-600 py-3 uppercase tracking-wider"
            role="columnheader"
            aria-label={`${day} column`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <motion.div
        className="grid grid-cols-7 gap-3"
        key={currentMonth.toISOString()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: ANIMATION_CONFIG.DURATION }}
        role="grid"
        aria-label={`Calendar grid for ${currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`}
      >
        {calendarDays.map((date, index) => (
          <motion.div
            key={date.toISOString()}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: ANIMATION_CONFIG.DURATION,
              delay: index * 0.02,
              ease: ANIMATION_CONFIG.EASE
            }}
          >
            <DayCell
              date={date}
              isCurrentMonth={date.getMonth() === currentMonth.getMonth()}
              isToday={date.toDateString() === new Date().toDateString()}
              isInRange={date >= (dateRange.start || new Date(8640000000000000)) && date <= (dateRange.end || new Date(-8640000000000000))}
              isRangeStart={dateRange.start ? date.toDateString() === dateRange.start.toDateString() : false}
              isRangeEnd={dateRange.end ? date.toDateString() === dateRange.end.toDateString() : false}
              onClick={handleDateClick}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
});

Calendar.displayName = 'Calendar';

export default Calendar;