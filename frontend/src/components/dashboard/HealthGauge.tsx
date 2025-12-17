import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface HealthGaugeProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  showLabel?: boolean;
  animated?: boolean;
}

export function HealthGauge({ 
  value, 
  size = 'md', 
  label = 'Health Score',
  showLabel = true,
  animated = true 
}: HealthGaugeProps) {
  const [displayValue, setDisplayValue] = useState(0);
  
  const sizes = {
    sm: { container: 120, stroke: 8, text: 'text-2xl' },
    md: { container: 180, stroke: 12, text: 'text-4xl' },
    lg: { container: 240, stroke: 14, text: 'text-5xl' },
  };

  const { container, stroke, text } = sizes[size];
  const radius = (container - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (displayValue / 100) * circumference;

  const getHealthColor = (val: number) => {
    if (val >= 80) return 'hsl(160, 84%, 39%)'; // success
    if (val >= 60) return 'hsl(190, 95%, 45%)'; // primary
    if (val >= 40) return 'hsl(38, 92%, 50%)'; // warning
    return 'hsl(0, 72%, 51%)'; // danger
  };

  const getHealthStatus = (val: number) => {
    if (val >= 80) return 'Excellent';
    if (val >= 60) return 'Good';
    if (val >= 40) return 'Fair';
    return 'Critical';
  };

  useEffect(() => {
    if (animated) {
      const duration = 1500;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.round(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    } else {
      setDisplayValue(value);
    }
  }, [value, animated]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: container, height: container }}>
        {/* Background Ring */}
        <svg
          className="transform -rotate-90"
          width={container}
          height={container}
        >
          <circle
            cx={container / 2}
            cy={container / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={stroke}
            opacity={0.3}
          />
          {/* Animated Progress Ring */}
          <circle
            cx={container / 2}
            cy={container / 2}
            r={radius}
            fill="none"
            stroke={getHealthColor(displayValue)}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="gauge-ring"
            style={{
              filter: `drop-shadow(0 0 10px ${getHealthColor(displayValue)})`,
            }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span 
            className={cn("font-display font-bold", text)}
            style={{ color: getHealthColor(displayValue) }}
          >
            {displayValue}
          </span>
          <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            {getHealthStatus(displayValue)}
          </span>
        </div>

        {/* Glow Effect */}
        <div 
          className="absolute inset-0 rounded-full opacity-20 blur-xl"
          style={{ backgroundColor: getHealthColor(displayValue) }}
        />
      </div>

      {showLabel && (
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
      )}
    </div>
  );
}
