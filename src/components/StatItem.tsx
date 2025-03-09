"use client";

import { ReactNode } from "react";

interface StatItemProps {
  label: string;
  value: string | number;
  icon: ReactNode;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, icon }) => {
  return (
    <div className="group relative flex items-center justify-between overflow-hidden rounded-md border border-blue-800/30 bg-gradient-to-r from-blue-900/20 to-indigo-900/20 p-4 transition-all duration-300 hover:border-blue-700/50 hover:from-blue-900/30 hover:to-indigo-900/30 hover:shadow-lg before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-500/10 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100">
      <div className="flex items-center gap-3 text-blue-200">
        <div className="text-blue-400/80 transition-colors duration-300 group-hover:text-blue-300">
          {icon}
        </div>
        <span className="text-sm font-medium text-blue-100/80 transition-colors duration-300 group-hover:text-blue-100">
          {label}
        </span>
      </div>
      <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-400 transition-all duration-300 animate-count-up">
        {value}
      </span>
    </div>
  );
};

export default StatItem;
