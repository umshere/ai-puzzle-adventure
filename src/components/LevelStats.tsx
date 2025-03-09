import * as Icon from '@/components/icons';
import StatItem from '@/components/StatItem';

const LevelStats = ({ level, score }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-blue-100">Level Stats</h2>
        {level && (
          <span className="text-xs px-2 py-1 bg-blue-500/20 rounded-full text-blue-300 border border-blue-500/30">
            {level.theme || "sci-fi"} theme
          </span>
        )}
      </div>
      <div className="space-y-2">
        <StatItem 
          label="Level ID" 
          value={level?.levelId || 'Generating...'} 
          icon={<Icon.hash className="h-4 w-4" />}
        />
        <StatItem
          label="Difficulty"
          value={level ? `${level.difficultyRating}/10` : '--'}
          icon={<Icon.difficulty className="h-4 w-4" />}
        />
        <StatItem
          label="Score"
          value={score}
          icon={<Icon.star className="h-4 w-4" />}
        />
      </div>
    </div>
  );
};

export default LevelStats;
