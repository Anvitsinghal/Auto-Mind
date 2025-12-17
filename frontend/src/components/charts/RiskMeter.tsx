import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface RiskMeterProps {
  value: number;
  label?: string;
  showLabels?: boolean;
}

export function RiskMeter({ value, label = 'Risk Level', showLabels = true }: RiskMeterProps) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const steps = 40;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setAnimatedValue(value);
        clearInterval(timer);
      } else {
        setAnimatedValue(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  const getRiskColor = (val: number) => {
    if (val <= 30) return 'hsl(160, 84%, 39%)'; // success
    if (val <= 60) return 'hsl(38, 92%, 50%)'; // warning
    return 'hsl(0, 72%, 51%)'; // danger
  };

  const getRiskLabel = (val: number) => {
    if (val <= 30) return 'Low Risk';
    if (val <= 60) return 'Moderate Risk';
    return 'High Risk';
  };

  return (
    <div className="w-full">
      {/* Label and Value */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground font-medium">{label}</span>
        <span 
          className="text-lg font-bold font-display"
          style={{ color: getRiskColor(animatedValue) }}
        >
          {Math.round(animatedValue)}%
        </span>
      </div>

      {/* Meter Bar */}
      <div className="relative h-3 bg-secondary rounded-full overflow-hidden">
        {/* Gradient Background */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'linear-gradient(to right, hsl(160, 84%, 39%), hsl(38, 92%, 50%), hsl(0, 72%, 51%))',
          }}
        />
        
        {/* Progress Fill */}
        <div 
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ 
            width: `${animatedValue}%`,
            backgroundColor: getRiskColor(animatedValue),
            boxShadow: `0 0 10px ${getRiskColor(animatedValue)}`,
          }}
        />

        {/* Needle Indicator */}
        <div 
          className="absolute top-0 w-1 h-full bg-foreground rounded-full transition-all duration-500 ease-out"
          style={{ 
            left: `calc(${animatedValue}% - 2px)`,
            boxShadow: '0 0 4px hsl(var(--foreground))',
          }}
        />
      </div>

      {/* Scale Labels */}
      {showLabels && (
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-success">Low</span>
          <span className="text-xs text-warning">Moderate</span>
          <span className="text-xs text-danger">High</span>
        </div>
      )}

      {/* Risk Status */}
      <div className="mt-3 flex items-center gap-2">
        <div 
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: getRiskColor(animatedValue) }}
        />
        <span 
          className="text-sm font-medium"
          style={{ color: getRiskColor(animatedValue) }}
        >
          {getRiskLabel(animatedValue)}
        </span>
      </div>
    </div>
  );
}
