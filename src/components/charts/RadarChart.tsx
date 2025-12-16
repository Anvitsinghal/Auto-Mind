import { useEffect, useState } from 'react';

interface RadarChartProps {
  data: {
    label: string;
    value: number;
    description?: string;
  }[];
  size?: number;
}

export function RadarChart({ data, size = 280 }: RadarChartProps) {
  const [animatedValues, setAnimatedValues] = useState(data.map(() => 0));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const center = size / 2;
  const radius = (size - 60) / 2;
  const angleStep = (Math.PI * 2) / data.length;

  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const increments = data.map(d => d.value / steps);
    let step = 0;

    const timer = setInterval(() => {
      step++;
      if (step >= steps) {
        setAnimatedValues(data.map(d => d.value));
        clearInterval(timer);
      } else {
        setAnimatedValues(prev => prev.map((v, i) => Math.min(v + increments[i], data[i].value)));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [data]);

  const getPoint = (index: number, value: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const getLabelPoint = (index: number) => {
    const angle = angleStep * index - Math.PI / 2;
    const r = radius + 25;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const polygonPoints = animatedValues
    .map((value, index) => {
      const point = getPoint(index, value);
      return `${point.x},${point.y}`;
    })
    .join(' ');

  return (
    <div className="relative">
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid circles */}
        {[20, 40, 60, 80, 100].map((level) => (
          <circle
            key={level}
            cx={center}
            cy={center}
            r={(level / 100) * radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth={1}
            strokeDasharray={level === 100 ? "0" : "4 4"}
            opacity={0.5}
          />
        ))}

        {/* Axis lines */}
        {data.map((_, index) => {
          const point = getPoint(index, 100);
          return (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="hsl(var(--border))"
              strokeWidth={1}
              opacity={0.3}
            />
          );
        })}

        {/* Data polygon */}
        <polygon
          points={polygonPoints}
          fill="hsl(190, 95%, 45%, 0.2)"
          stroke="hsl(190, 95%, 45%)"
          strokeWidth={2}
          style={{
            filter: 'drop-shadow(0 0 8px hsl(190, 95%, 45%, 0.4))',
          }}
        />

        {/* Data points */}
        {animatedValues.map((value, index) => {
          const point = getPoint(index, value);
          const isHovered = hoveredIndex === index;
          return (
            <g key={index}>
              <circle
                cx={point.x}
                cy={point.y}
                r={isHovered ? 8 : 6}
                fill="hsl(190, 95%, 45%)"
                stroke="hsl(var(--background))"
                strokeWidth={2}
                className="cursor-pointer transition-all duration-200"
                style={{
                  filter: isHovered ? 'drop-shadow(0 0 12px hsl(190, 95%, 45%, 0.8))' : 'drop-shadow(0 0 6px hsl(190, 95%, 45%, 0.5))',
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            </g>
          );
        })}

        {/* Labels */}
        {data.map((item, index) => {
          const labelPoint = getLabelPoint(index);
          const isHovered = hoveredIndex === index;
          return (
            <g key={`label-${index}`}>
              <text
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className={`text-xs font-medium transition-colors duration-200 ${
                  isHovered ? 'fill-primary' : 'fill-muted-foreground'
                }`}
              >
                {item.label}
              </text>
              <text
                x={labelPoint.x}
                y={labelPoint.y + 14}
                textAnchor="middle"
                dominantBaseline="middle"
                className={`text-[10px] font-semibold transition-colors duration-200 ${
                  isHovered ? 'fill-primary' : 'fill-foreground'
                }`}
              >
                {Math.round(animatedValues[index])}%
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hoveredIndex !== null && data[hoveredIndex].description && (
        <div 
          className="absolute z-10 px-3 py-2 bg-card border border-border rounded-lg shadow-lg text-xs max-w-[180px] animate-fade-in"
          style={{
            left: '50%',
            bottom: '10px',
            transform: 'translateX(-50%)',
          }}
        >
          <p className="font-medium text-foreground mb-1">{data[hoveredIndex].label}</p>
          <p className="text-muted-foreground">{data[hoveredIndex].description}</p>
        </div>
      )}
    </div>
  );
}
