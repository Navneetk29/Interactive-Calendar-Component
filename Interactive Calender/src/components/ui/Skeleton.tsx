'use client';

import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
}

const Skeleton = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
}: SkeletonProps) => {
  const baseClasses = 'bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%] animate-pulse';

  const variantClasses = {
    text: 'rounded',
    rectangular: 'rounded-lg',
    circular: 'rounded-full',
  };

  const style = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1em' : 'auto'),
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
};

export const CalendarSkeleton = () => (
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
    {/* Header skeleton */}
    <div className="flex items-center justify-between mb-8">
      <Skeleton variant="circular" width={48} height={48} />
      <Skeleton variant="text" width={120} height={24} />
      <Skeleton variant="circular" width={48} height={48} />
    </div>

    {/* Days of week skeleton */}
    <div className="grid grid-cols-7 gap-3 mb-6">
      {Array.from({ length: 7 }).map((_, i) => (
        <Skeleton key={i} variant="text" height={20} />
      ))}
    </div>

    {/* Calendar grid skeleton */}
    <div className="grid grid-cols-7 gap-3">
      {Array.from({ length: 35 }).map((_, i) => (
        <Skeleton key={i} variant="circular" width={56} height={56} />
      ))}
    </div>
  </div>
);

export const NotesSkeleton = () => (
  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8">
    <Skeleton variant="text" width={80} height={24} className="mb-6" />
    <Skeleton variant="rectangular" height={16} className="mb-6" />
    <Skeleton variant="rectangular" height={120} className="mb-6" />
    <Skeleton variant="rectangular" height={48} />
  </div>
);

export default Skeleton;