import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';

interface ProgressSectionProps {
  gameCompleted: boolean;
}

const ProgressSection: React.FC<ProgressSectionProps> = ({ gameCompleted }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Animate progress value change
    const targetValue = gameCompleted ? 100 : 45;
    const duration = 1000; // 1 second
    const steps = 60;
    const increment = (targetValue - progress) / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      if (currentStep < steps) {
        setProgress(prev => Math.min(targetValue, prev + increment));
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [gameCompleted]);

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-indigo-100">Progress</h2>
        <span className={`
          text-xs px-3 py-1 rounded-full 
          transition-all duration-500
          ${gameCompleted 
            ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-emerald-200 border border-emerald-500/30' 
            : 'bg-gradient-to-r from-indigo-500/20 to-violet-500/20 text-indigo-200 border border-indigo-500/30'}
        `}>
          {gameCompleted ? 'Completed' : 'In Progress'}
        </span>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-indigo-200/80">Completion</span>
          <span className={`
            font-medium transition-colors duration-300
            ${gameCompleted ? 'text-emerald-300' : 'text-indigo-300'}
          `}>
            {Math.round(progress)}%
          </span>
        </div>
        <div className="relative">
          <Progress 
            value={progress} 
            className={`
              h-2.5 rounded-full transition-all duration-500
              ${gameCompleted 
                ? 'bg-emerald-900/20' 
                : 'bg-indigo-900/20'}
            `}
          />
          <div className={`
            absolute inset-0 rounded-full opacity-25
            ${gameCompleted 
              ? 'animate-pulse bg-gradient-to-r from-green-500/10 to-emerald-500/10' 
              : 'animate-pulse bg-gradient-to-r from-indigo-500/10 to-violet-500/10'}
          `} />
        </div>
      </div>
    </div>
  );
};

export default ProgressSection;
