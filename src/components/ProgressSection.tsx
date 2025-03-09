import { Progress } from '@/components/ui/progress';

const ProgressSection = ({ gameCompleted }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-blue-100">Progress</h2>
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-blue-200">
          <span>Completion</span>
          <span>{gameCompleted ? "100%" : "45%"}</span>
        </div>
        <Progress value={gameCompleted ? 100 : 45} className="h-2 bg-blue-900/20" />
      </div>
    </div>
  );
};

export default ProgressSection;
