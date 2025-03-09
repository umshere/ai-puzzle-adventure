"use client";

import { ReactNode } from "react";

interface StatItemProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  loading?: boolean;
  highlight?: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ 
  label, 
  value, 
  icon, 
  loading = false,
  highlight = false 
}) => {
  return (
    <div className={`
      group relative flex items-center justify-between overflow-hidden rounded-lg
      border border-indigo-500/30 bg-gradient-to-r from-indigo-900/20 to-violet-900/20
      p-3 transition-all duration-500 
      hover:border-indigo-400/50 hover:from-indigo-900/30 hover:to-violet-900/30 
      hover:shadow-lg hover:shadow-indigo-500/10
      ${loading ? 'animate-pulse' : ''}
      ${highlight ? 'border-indigo-400/50 shadow-lg shadow-indigo-500/20' : ''}
      before:absolute before:inset-0 before:bg-gradient-to-r 
      before:from-indigo-500/10 before:to-transparent before:opacity-0 
      before:transition-opacity before:duration-500 hover:before:opacity-100
    `}>
      <div className="flex items-center gap-3 text-indigo-200">
        <div className={`
          transition-all duration-300 transform
          ${loading ? 'opacity-50' : 'group-hover:scale-110'}
        `}>
          {icon}
        </div>
        <span className={`
          text-sm font-medium text-indigo-100/80 transition-colors duration-300
          group-hover:text-indigo-100
          ${loading ? 'animate-pulse' : ''}
        `}>
          {label}
        </span>
      </div>
      <span className={`
        text-lg font-semibold bg-clip-text text-transparent
        bg-gradient-to-r from-indigo-200 to-violet-200
        transition-all duration-300
        ${!loading && 'animate-count-up'}
        ${highlight && 'from-yellow-200 to-orange-200 font-bold'}
      `}>
        {value}
      </span>
    </div>
  );
};

export default StatItem;
