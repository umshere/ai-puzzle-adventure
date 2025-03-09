import * as Icon from '@/components/icons';
import StatItem from '@/components/StatItem';

interface LevelStatsProps {
  level: any;
  score: number;
}

const LevelStats: React.FC<LevelStatsProps> = ({ level, score }) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center group">
        <h2 className="text-lg font-semibold text-indigo-100">Level Stats</h2>
        {level && (
          <span className="text-xs px-3 py-1.5 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 rounded-full text-indigo-200 border border-indigo-500/30 shadow-sm transition-all duration-300 group-hover:border-indigo-400/40 group-hover:shadow-indigo-500/20">
            {level.theme || "sci-fi"} theme
          </span>
        )}
      </div>
      <div className="space-y-3">
        <StatItem 
          label="Level ID" 
          value={level?.levelId || 'Generating...'}
          icon={<Icon.hash className="h-4 w-4 text-indigo-400" />}
          loading={!level}
        />
        <StatItem
          label="Difficulty"
          value={level ? `${level.difficultyRating}/10` : '--'}
          icon={<Icon.difficulty className="h-4 w-4 text-violet-400" />}
          loading={!level}
        />
        <StatItem
          label="Score"
          value={score}
          icon={<Icon.star className="h-4 w-4 text-yellow-400" />}
          highlight={score > 0}
        />
      </div>
    </div>
  );
};

export default LevelStats;
