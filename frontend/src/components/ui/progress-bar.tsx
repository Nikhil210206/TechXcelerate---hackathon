import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  animated?: boolean;
  showValue?: boolean;
  label?: string;
  variant?: 'default' | 'success' | 'warning';
  className?: string;
}

const ProgressBar = ({
  value,
  max = 100,
  animated = false,
  showValue = true,
  label,
  variant = 'default',
  className
}: ProgressBarProps) => {
  return (
    <div className={cn("w-full", className)}>
      {label && <div className="text-sm font-medium mb-2">{label}</div>}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-300",
            animated && "animate-pulse",
            variant === 'success' && "bg-green-500",
            variant === 'warning' && "bg-yellow-500",
            variant === 'default' && "bg-primary"
          )}
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
      {showValue && (
        <div className="text-sm text-muted-foreground mt-1">
          {value}%
        </div>
      )}
    </div>
  );
};

export default ProgressBar; 