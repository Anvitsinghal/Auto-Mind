import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatusCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  status?: 'success' | 'warning' | 'danger' | 'neutral';
  className?: string;
  delay?: number;
}

export function StatusCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  status = 'neutral',
  className,
  delay = 0,
}: StatusCardProps) {
  const statusStyles = {
    success: 'border-success/30 bg-success/5',
    warning: 'border-warning/30 bg-warning/5',
    danger: 'border-danger/30 bg-danger/5',
    neutral: 'border-border/50',
  };

  const statusTextStyles = {
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-danger',
    neutral: 'text-foreground',
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  return (
    <div 
      className={cn(
        "glass-panel p-5 animate-fade-in-up opacity-0",
        statusStyles[status],
        className
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        {icon && (
          <div className={cn(
            "p-2 rounded-lg",
            status === 'success' && "bg-success/10 text-success",
            status === 'warning' && "bg-warning/10 text-warning",
            status === 'danger' && "bg-danger/10 text-danger",
            status === 'neutral' && "bg-primary/10 text-primary"
          )}>
            {icon}
          </div>
        )}
      </div>

      <p className={cn("text-2xl font-bold mb-1", statusTextStyles[status])}>
        {value}
      </p>

      {(subtitle || trend) && (
        <div className="flex items-center gap-2">
          {subtitle && (
            <span className="text-xs text-muted-foreground">{subtitle}</span>
          )}
          {trend && trendValue && (
            <div className={cn(
              "flex items-center gap-1 text-xs font-medium",
              trend === 'up' && "text-success",
              trend === 'down' && "text-danger",
              trend === 'stable' && "text-muted-foreground"
            )}>
              <TrendIcon className="h-3 w-3" />
              <span>{trendValue}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
