import { Button } from '@/components/ui/button';
import * as Icon from '@/components/icons';

interface ControlsSectionProps {}

const ControlsSection: React.FC<ControlsSectionProps> = () => {
  const keyBindings = [
    { key: '↑', action: 'Move Up' },
    { key: '↓', action: 'Move Down' },
    { key: '←', action: 'Move Left' },
    { key: '→', action: 'Move Right' },
    { key: 'R', action: 'Reset Level' },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-indigo-100">Controls</h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            className="px-3 py-1.5 h-8 text-xs bg-indigo-900/30 border-indigo-500/30 hover:bg-indigo-800/40 hover:border-indigo-400/40 transition-all duration-300"
          >
            <Icon.keyboard className="h-4 w-4 text-indigo-400 mr-2" />
            <span className="text-indigo-200 text-sm">Keys</span>
          </Button>
          <Button 
            variant="outline"
            className="px-3 py-1.5 h-8 text-xs bg-indigo-900/30 border-indigo-500/30 hover:bg-indigo-800/40 hover:border-indigo-400/40 transition-all duration-300"
          >
            <Icon.help className="h-4 w-4 text-indigo-400 mr-2" />
            <span className="text-indigo-200 text-sm">Help</span>
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        {keyBindings.map(({ key, action }) => (
          <div 
            key={key}
            className="flex justify-between items-center p-2 rounded-lg bg-indigo-900/30 border border-indigo-500/30 transition-all duration-300 hover:border-indigo-400/40 hover:bg-indigo-800/40 group"
          >
            <span className="text-sm text-indigo-200/80 group-hover:text-indigo-200 transition-colors duration-300">
              {action}
            </span>
            <kbd className="px-2.5 py-1 text-xs font-semibold text-indigo-200 bg-indigo-950/50 rounded border border-indigo-500/30 group-hover:border-indigo-400/40 transition-all duration-300 inline-flex items-center justify-center min-w-[2rem]">
              {key}
            </kbd>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlsSection;
