import { useState } from 'react';
import { cn } from '@/lib/utils';
import { X, TrendingDown, TrendingUp, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface ComponentData {
  id: string;
  name: string;
  health: number;
  status: 'excellent' | 'good' | 'moderate' | 'critical';
  degradationTrend: 'up' | 'down' | 'stable';
  lastChecked: string;
  riskContribution: number;
  details: string;
}

const componentsData: ComponentData[] = [
  {
    id: 'battery',
    name: 'Battery Pack',
    health: 94,
    status: 'excellent',
    degradationTrend: 'stable',
    lastChecked: '2 hours ago',
    riskContribution: 5,
    details: 'Battery capacity remains optimal. Cell balancing within specifications. Estimated 8+ years remaining lifespan.',
  },
  {
    id: 'motor',
    name: 'Electric Motor',
    health: 96,
    status: 'excellent',
    degradationTrend: 'stable',
    lastChecked: '1 day ago',
    riskContribution: 3,
    details: 'Motor performance nominal. No bearing wear detected. Thermal management functioning correctly.',
  },
  {
    id: 'brakes-front',
    name: 'Front Brakes',
    health: 58,
    status: 'moderate',
    degradationTrend: 'down',
    lastChecked: '4 hours ago',
    riskContribution: 42,
    details: 'Brake pad thickness at 4.2mm (minimum: 3mm). Higher than average wear rate due to braking patterns. Replacement recommended within 15-25 days.',
  },
  {
    id: 'brakes-rear',
    name: 'Rear Brakes',
    health: 78,
    status: 'good',
    degradationTrend: 'stable',
    lastChecked: '4 hours ago',
    riskContribution: 12,
    details: 'Brake pad thickness at 6.1mm. Wear rate within normal parameters. Estimated 45+ days remaining.',
  },
  {
    id: 'suspension',
    name: 'Suspension',
    health: 85,
    status: 'good',
    degradationTrend: 'stable',
    lastChecked: '2 days ago',
    riskContribution: 8,
    details: 'Shock absorber response within specifications. Minor wear on front bushings detected. No immediate action required.',
  },
  {
    id: 'tires',
    name: 'Tires',
    health: 72,
    status: 'good',
    degradationTrend: 'down',
    lastChecked: '1 day ago',
    riskContribution: 18,
    details: 'Tread depth: FL 4.8mm, FR 5.1mm, RL 5.5mm, RR 5.4mm. Front left showing accelerated wear. Rotation recommended.',
  },
];

const componentPositions: Record<string, { x: string; y: string }> = {
  'battery': { x: '50%', y: '55%' },
  'motor': { x: '35%', y: '45%' },
  'brakes-front': { x: '20%', y: '65%' },
  'brakes-rear': { x: '80%', y: '65%' },
  'suspension': { x: '50%', y: '75%' },
  'tires': { x: '50%', y: '85%' },
};

export function DigitalTwinTab() {
  const [selectedComponent, setSelectedComponent] = useState<ComponentData | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-success';
      case 'good': return 'bg-primary';
      case 'moderate': return 'bg-warning';
      case 'critical': return 'bg-danger';
      default: return 'bg-muted';
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'text-success';
    if (health >= 60) return 'text-primary';
    if (health >= 40) return 'text-warning';
    return 'text-danger';
  };

  const getGlowColor = (status: string) => {
    switch (status) {
      case 'excellent': return '0 0 20px hsl(160, 84%, 39%, 0.6)';
      case 'good': return '0 0 20px hsl(190, 95%, 45%, 0.6)';
      case 'moderate': return '0 0 20px hsl(38, 92%, 50%, 0.6)';
      case 'critical': return '0 0 20px hsl(0, 72%, 51%, 0.8)';
      default: return 'none';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div>
          <h2 className="text-xl font-bold text-foreground">Digital Twin</h2>
          <p className="text-sm text-muted-foreground">Interactive 3D vehicle health visualization</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-muted-foreground">Excellent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Good</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span className="text-muted-foreground">Monitor</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-danger" />
            <span className="text-muted-foreground">Critical</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vehicle Visualization */}
        <div className="lg:col-span-2 glass-panel-elevated p-8 animate-scale-in relative overflow-hidden" style={{ minHeight: '500px' }}>
          {/* Background Grid */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />

          {/* Vehicle SVG */}
          <div className="relative w-full h-full flex items-center justify-center">
            <svg 
              viewBox="0 0 400 200" 
              className="w-full max-w-2xl h-auto float"
              style={{ filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))' }}
            >
              {/* Car Body */}
              <defs>
                <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(220, 40%, 20%)" />
                  <stop offset="100%" stopColor="hsl(220, 40%, 12%)" />
                </linearGradient>
                <linearGradient id="windowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(190, 95%, 45%, 0.3)" />
                  <stop offset="100%" stopColor="hsl(190, 95%, 35%, 0.1)" />
                </linearGradient>
              </defs>

              {/* Car outline - Top view style */}
              <path
                d="M 60 100 Q 60 60 120 50 L 280 50 Q 340 60 340 100 Q 340 140 280 150 L 120 150 Q 60 140 60 100"
                fill="url(#bodyGradient)"
                stroke="hsl(190, 95%, 45%)"
                strokeWidth="2"
                className="animate-glow-pulse"
              />

              {/* Roof/Windows */}
              <path
                d="M 100 85 Q 100 65 140 60 L 260 60 Q 300 65 300 85 Q 300 115 260 120 L 140 120 Q 100 115 100 85"
                fill="url(#windowGradient)"
                stroke="hsl(190, 95%, 45%, 0.5)"
                strokeWidth="1"
              />

              {/* Wheels */}
              <circle cx="110" cy="100" r="25" fill="hsl(220, 40%, 8%)" stroke="hsl(var(--muted-foreground))" strokeWidth="3" />
              <circle cx="110" cy="100" r="15" fill="none" stroke="hsl(190, 95%, 45%, 0.3)" strokeWidth="2" />
              
              <circle cx="290" cy="100" r="25" fill="hsl(220, 40%, 8%)" stroke="hsl(var(--muted-foreground))" strokeWidth="3" />
              <circle cx="290" cy="100" r="15" fill="none" stroke="hsl(190, 95%, 45%, 0.3)" strokeWidth="2" />

              {/* Headlights */}
              <ellipse cx="70" cy="90" rx="8" ry="15" fill="hsl(190, 95%, 45%, 0.4)" />
              <ellipse cx="70" cy="110" rx="8" ry="15" fill="hsl(190, 95%, 45%, 0.4)" />

              {/* Taillights */}
              <ellipse cx="330" cy="90" rx="6" ry="12" fill="hsl(0, 72%, 51%, 0.4)" />
              <ellipse cx="330" cy="110" rx="6" ry="12" fill="hsl(0, 72%, 51%, 0.4)" />
            </svg>

            {/* Component Hotspots */}
            {componentsData.map((component) => {
              const pos = componentPositions[component.id];
              return (
                <button
                  key={component.id}
                  onClick={() => setSelectedComponent(component)}
                  className={cn(
                    "absolute w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-125",
                    getStatusColor(component.status),
                    selectedComponent?.id === component.id && "ring-4 ring-foreground/50 scale-125"
                  )}
                  style={{
                    left: pos.x,
                    top: pos.y,
                    transform: 'translate(-50%, -50%)',
                    boxShadow: getGlowColor(component.status),
                    animation: component.status === 'moderate' || component.status === 'critical' 
                      ? 'pulse 2s ease-in-out infinite' 
                      : undefined,
                  }}
                >
                  <span className="text-xs font-bold text-white">{component.health}</span>
                </button>
              );
            })}
          </div>

          {/* Info Text */}
          <div className="absolute bottom-4 left-4 text-xs text-muted-foreground">
            <p>Click on a component to view detailed health information</p>
          </div>
        </div>

        {/* Component Details Panel */}
        <div className="space-y-4">
          {selectedComponent ? (
            <div className="glass-panel-elevated p-6 animate-slide-in-right">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground text-lg">{selectedComponent.name}</h3>
                  <p className="text-xs text-muted-foreground">Last checked: {selectedComponent.lastChecked}</p>
                </div>
                <button 
                  onClick={() => setSelectedComponent(null)}
                  className="p-1 rounded hover:bg-secondary"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>

              {/* Health Display */}
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className={cn(
                    "text-5xl font-display font-bold",
                    getHealthColor(selectedComponent.health)
                  )}
                >
                  {selectedComponent.health}%
                </div>
                <div className="flex flex-col gap-1">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-xs font-medium capitalize",
                    selectedComponent.status === 'excellent' && 'bg-success/20 text-success',
                    selectedComponent.status === 'good' && 'bg-primary/20 text-primary',
                    selectedComponent.status === 'moderate' && 'bg-warning/20 text-warning',
                    selectedComponent.status === 'critical' && 'bg-danger/20 text-danger',
                  )}>
                    {selectedComponent.status}
                  </span>
                  <div className="flex items-center gap-1 text-xs">
                    {selectedComponent.degradationTrend === 'down' ? (
                      <>
                        <TrendingDown className="h-3 w-3 text-warning" />
                        <span className="text-warning">Degrading</span>
                      </>
                    ) : selectedComponent.degradationTrend === 'up' ? (
                      <>
                        <TrendingUp className="h-3 w-3 text-success" />
                        <span className="text-success">Improving</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-3 w-3 text-primary" />
                        <span className="text-primary">Stable</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Risk Contribution */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Risk Contribution</span>
                  <span className="font-medium text-foreground">{selectedComponent.riskContribution}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      selectedComponent.riskContribution > 30 ? 'bg-warning' :
                      selectedComponent.riskContribution > 50 ? 'bg-danger' : 'bg-primary'
                    )}
                    style={{ width: `${selectedComponent.riskContribution}%` }}
                  />
                </div>
              </div>

              {/* Details */}
              <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedComponent.details}
                  </p>
                </div>
              </div>

              {selectedComponent.status === 'moderate' && (
                <button className="w-full mt-4 py-2 rounded-lg bg-warning/20 text-warning font-medium text-sm hover:bg-warning/30 transition-colors">
                  Schedule Service
                </button>
              )}
            </div>
          ) : (
            <div className="glass-panel p-6 text-center">
              <AlertTriangle className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Select a component on the vehicle to view details</p>
            </div>
          )}

          {/* Component List */}
          <div className="glass-panel p-4 space-y-2 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <h4 className="font-medium text-foreground text-sm mb-3">All Components</h4>
            {componentsData.map((component) => (
              <button
                key={component.id}
                onClick={() => setSelectedComponent(component)}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-lg transition-colors",
                  selectedComponent?.id === component.id 
                    ? 'bg-primary/20 border border-primary/30' 
                    : 'bg-secondary/30 hover:bg-secondary/50'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn("w-3 h-3 rounded-full", getStatusColor(component.status))} />
                  <span className="text-sm font-medium text-foreground">{component.name}</span>
                </div>
                <span className={cn("text-sm font-bold", getHealthColor(component.health))}>
                  {component.health}%
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
