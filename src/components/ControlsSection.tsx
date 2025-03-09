import { Button } from '@/components/ui/button';
import * as Icon from '@/components/icons';

const ControlsSection = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-blue-100">Controls</h2>
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" className="gap-2">
          <Icon.keyboard className="h-4 w-4" />
          Key Bindings
        </Button>
        <Button variant="outline" className="gap-2">
          <Icon.help className="h-4 w-4" />
          Tutorial
        </Button>
      </div>
    </div>
  );
};

export default ControlsSection;
