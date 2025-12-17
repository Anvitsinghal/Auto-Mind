import { Shield, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RiskBannerProps {
  level: 'safe' | 'attention' | 'high';
  message: string;
  details?: string;
}

export function RiskBanner({ level, message, details }: RiskBannerProps) {
  const config = {
    safe: {
      icon: Shield,
      bg: 'bg-success/10 border-success/30',
      iconBg: 'bg-success/20',
      iconColor: 'text-success',
      title: 'All Systems Normal',
      pulse: false,
    },
    attention: {
      icon: AlertTriangle,
      bg: 'bg-warning/10 border-warning/30',
      iconBg: 'bg-warning/20',
      iconColor: 'text-warning',
      title: 'Attention Required',
      pulse: true,
    },
    high: {
      icon: AlertCircle,
      bg: 'bg-danger/10 border-danger/30',
      iconBg: 'bg-danger/20',
      iconColor: 'text-danger',
      title: 'High Risk Detected',
      pulse: true,
    },
  };

  const { icon: Icon, bg, iconBg, iconColor, title, pulse } = config[level];

  return (
    <div 
      className={cn(
        "glass-panel border p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 animate-fade-in-up",
        bg,
        pulse && (level === 'attention' ? 'pulse-warning' : level === 'high' && 'animate-pulse')
      )}
    >
      <div className={cn("p-2 sm:p-3 rounded-xl flex-shrink-0", iconBg)}>
        <Icon className={cn("h-5 w-5 sm:h-6 sm:w-6", iconColor)} />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h3 className={cn("font-semibold text-sm sm:text-base", iconColor)}>{title}</h3>
          {level !== 'safe' && (
            <span className={cn(
              "px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium uppercase tracking-wider",
              level === 'attention' ? 'bg-warning/20 text-warning' : 'bg-danger/20 text-danger'
            )}>
              {level === 'attention' ? 'Monitor' : 'Action'}
            </span>
          )}
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground">{message}</p>
        {details && (
          <p className="text-[10px] sm:text-xs text-muted-foreground/70 mt-1 flex items-center gap-1">
            <Info className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{details}</span>
          </p>
        )}
      </div>

      {level !== 'safe' && (
        <button className={cn(
          "w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex-shrink-0",
          level === 'attention' 
            ? 'bg-warning/20 text-warning hover:bg-warning/30' 
            : 'bg-danger/20 text-danger hover:bg-danger/30'
        )}>
          View Details
        </button>
      )}
    </div>
  );
}
