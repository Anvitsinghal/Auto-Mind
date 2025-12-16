import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Route, Play, Pause, RotateCcw, AlertTriangle, CheckCircle, ChevronRight, MapPin, Mountain, Building2 } from 'lucide-react';

type TerrainType = 'city' | 'highway' | 'mixed';

interface ComponentHealth {
  name: string;
  initialHealth: number;
  currentHealth: number;
  degradationRate: number;
  threshold: number;
}

const initialComponents: ComponentHealth[] = [
  { name: 'Front Brakes', initialHealth: 58, currentHealth: 58, degradationRate: 0.08, threshold: 35 },
  { name: 'Rear Brakes', initialHealth: 78, currentHealth: 78, degradationRate: 0.04, threshold: 40 },
  { name: 'Battery', initialHealth: 94, currentHealth: 94, degradationRate: 0.01, threshold: 70 },
  { name: 'Tires', initialHealth: 72, currentHealth: 72, degradationRate: 0.05, threshold: 40 },
  { name: 'Suspension', initialHealth: 85, currentHealth: 85, degradationRate: 0.02, threshold: 50 },
];

export function TripSimulatorTab() {
  const [distance, setDistance] = useState(200);
  const [terrain, setTerrain] = useState<TerrainType>('mixed');
  const [isSimulating, setIsSimulating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [components, setComponents] = useState<ComponentHealth[]>(initialComponents);
  const [warnings, setWarnings] = useState<string[]>([]);

  const getTerrainMultiplier = (t: TerrainType) => {
    switch (t) {
      case 'city': return 1.2;
      case 'highway': return 0.8;
      case 'mixed': return 1.0;
    }
  };

  const calculateRisk = useCallback(() => {
    const criticalComponents = components.filter(c => c.currentHealth <= c.threshold);
    const atRiskComponents = components.filter(c => c.currentHealth <= c.threshold + 15 && c.currentHealth > c.threshold);
    
    if (criticalComponents.length > 0) return 'high';
    if (atRiskComponents.length > 0) return 'medium';
    return 'low';
  }, [components]);

  const resetSimulation = () => {
    setIsSimulating(false);
    setProgress(0);
    setComponents(initialComponents);
    setWarnings([]);
  };

  const startSimulation = () => {
    if (progress > 0) resetSimulation();
    setTimeout(() => setIsSimulating(true), 100);
  };

  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 1;
        if (next >= 100) {
          setIsSimulating(false);
          return 100;
        }
        return next;
      });

      // Update component health
      setComponents(prev => {
        const distanceCovered = (progress / 100) * distance;
        const multiplier = getTerrainMultiplier(terrain);
        
        return prev.map(comp => {
          const degradation = (distanceCovered / 100) * comp.degradationRate * multiplier;
          const newHealth = Math.max(0, comp.initialHealth - degradation * 100);
          
          return {
            ...comp,
            currentHealth: newHealth,
          };
        });
      });

      // Check for warnings
      setComponents(prev => {
        const newWarnings: string[] = [];
        prev.forEach(comp => {
          if (comp.currentHealth <= comp.threshold && !warnings.includes(comp.name)) {
            newWarnings.push(comp.name);
          }
        });
        if (newWarnings.length > 0) {
          setWarnings(w => [...w, ...newWarnings]);
        }
        return prev;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isSimulating, progress, distance, terrain, warnings]);

  const risk = calculateRisk();
  const distanceCovered = Math.round((progress / 100) * distance);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 animate-fade-in-up">
        <div className="p-3 rounded-xl bg-primary/20">
          <Route className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Trip Simulator</h2>
          <p className="text-sm text-muted-foreground">Predict component stress for planned journeys</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls & Animation */}
        <div className="lg:col-span-2 space-y-6">
          {/* Trip Configuration */}
          <div className="glass-panel p-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h3 className="font-semibold text-foreground mb-4">Trip Configuration</h3>
            
            <div className="space-y-6">
              {/* Distance Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Trip Distance</span>
                  <span className="text-lg font-display font-bold text-primary">{distance} km</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="800"
                  step="10"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  disabled={isSimulating}
                  className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary 
                    [&::-webkit-slider-thumb]:shadow-[0_0_10px_hsl(190,95%,45%,0.5)]
                    [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform
                    [&::-webkit-slider-thumb]:hover:scale-110
                    disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                  <span>50 km</span>
                  <span>800 km</span>
                </div>
              </div>

              {/* Terrain Selection */}
              <div>
                <span className="text-sm text-muted-foreground mb-3 block">Terrain Type</span>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'city', label: 'City', icon: Building2, desc: 'Urban traffic' },
                    { id: 'highway', label: 'Highway', icon: ChevronRight, desc: 'Interstate' },
                    { id: 'mixed', label: 'Mixed', icon: Mountain, desc: 'Combined' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTerrain(t.id as TerrainType)}
                      disabled={isSimulating}
                      className={cn(
                        "p-4 rounded-lg border transition-all text-center",
                        terrain === t.id 
                          ? 'bg-primary/20 border-primary text-foreground' 
                          : 'bg-secondary/30 border-border/50 text-muted-foreground hover:bg-secondary/50',
                        "disabled:opacity-50 disabled:cursor-not-allowed"
                      )}
                    >
                      <t.icon className="h-5 w-5 mx-auto mb-2" />
                      <p className="text-sm font-medium">{t.label}</p>
                      <p className="text-xs opacity-70">{t.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={startSimulation}
                  disabled={isSimulating}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  <Play className="h-4 w-4" />
                  Start Simulation
                </button>
                <button
                  onClick={() => setIsSimulating(false)}
                  disabled={!isSimulating}
                  className="p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors disabled:opacity-50"
                >
                  <Pause className="h-5 w-5" />
                </button>
                <button
                  onClick={resetSimulation}
                  className="p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  <RotateCcw className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Animation Area */}
          <div className="glass-panel-elevated p-8 relative overflow-hidden animate-scale-in" style={{ minHeight: '280px' }}>
            {/* Road Background */}
            <div className="absolute inset-0">
              {/* Sky gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
              
              {/* Road */}
              <div className="absolute bottom-16 left-0 right-0 h-20 bg-secondary/50">
                {/* Road lines */}
                <div className="absolute top-1/2 left-0 right-0 h-1 flex gap-8 overflow-hidden">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="w-16 h-full bg-warning/50 flex-shrink-0"
                      style={{
                        animation: isSimulating ? `slide-left 0.5s linear infinite` : 'none',
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Distance markers */}
              <div className="absolute bottom-8 left-8 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-success" />
                <span className="text-xs text-muted-foreground">Start</span>
              </div>
              <div className="absolute bottom-8 right-8 flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{distance} km</span>
                <MapPin className="h-4 w-4 text-danger" />
              </div>
            </div>

            {/* Car Icon */}
            <div 
              className="absolute bottom-20 transition-all duration-100 ease-linear z-10"
              style={{ left: `calc(${Math.min(progress, 95)}% - 30px)` }}
            >
              <div className={cn(
                "relative",
                isSimulating && "animate-bounce"
              )}>
                <svg viewBox="0 0 60 30" className="w-16 h-8">
                  <rect x="5" y="10" width="50" height="15" rx="5" fill="hsl(var(--primary))" />
                  <rect x="12" y="5" width="30" height="12" rx="3" fill="hsl(190, 95%, 35%)" />
                  <circle cx="15" cy="25" r="5" fill="hsl(var(--muted))" />
                  <circle cx="45" cy="25" r="5" fill="hsl(var(--muted))" />
                  <rect x="48" y="15" width="8" height="4" rx="1" fill="hsl(0, 72%, 51%, 0.8)" />
                </svg>
                {risk === 'high' && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <AlertTriangle className="h-5 w-5 text-danger animate-pulse" />
                  </div>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-4 left-8 right-8">
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full transition-all duration-100",
                    risk === 'low' ? 'bg-success' : risk === 'medium' ? 'bg-warning' : 'bg-danger'
                  )}
                  style={{ 
                    width: `${progress}%`,
                    boxShadow: risk !== 'low' ? `0 0 15px ${risk === 'medium' ? 'hsl(38, 92%, 50%)' : 'hsl(0, 72%, 51%)'}` : undefined,
                  }}
                />
              </div>
            </div>

            {/* Stats Overlay */}
            <div className="absolute top-4 left-4 glass-panel px-4 py-2">
              <p className="text-xs text-muted-foreground">Distance Covered</p>
              <p className="text-xl font-display font-bold text-foreground">{distanceCovered} km</p>
            </div>

            <div className="absolute top-4 right-4 glass-panel px-4 py-2">
              <p className="text-xs text-muted-foreground">Risk Level</p>
              <p className={cn(
                "text-xl font-display font-bold capitalize",
                risk === 'low' ? 'text-success' : risk === 'medium' ? 'text-warning' : 'text-danger'
              )}>
                {risk}
              </p>
            </div>
          </div>
        </div>

        {/* Component Health Panel */}
        <div className="space-y-4">
          {/* Risk Summary */}
          <div className={cn(
            "glass-panel p-6 border-l-4 animate-fade-in-up",
            risk === 'low' ? 'border-l-success' : risk === 'medium' ? 'border-l-warning' : 'border-l-danger'
          )} style={{ animationDelay: '200ms' }}>
            <div className="flex items-center gap-3 mb-3">
              {risk === 'low' ? (
                <CheckCircle className="h-6 w-6 text-success" />
              ) : (
                <AlertTriangle className={cn("h-6 w-6", risk === 'medium' ? 'text-warning' : 'text-danger')} />
              )}
              <div>
                <h3 className="font-semibold text-foreground">Trip Assessment</h3>
                <p className="text-xs text-muted-foreground">{distance} km {terrain} route</p>
              </div>
            </div>
            <p className={cn(
              "text-sm",
              risk === 'low' ? 'text-success' : risk === 'medium' ? 'text-warning' : 'text-danger'
            )}>
              {risk === 'low' && 'Safe to proceed. All components within acceptable limits.'}
              {risk === 'medium' && 'Monitor recommended. Some components approaching service threshold.'}
              {risk === 'high' && 'Trip completion risk detected. Service recommended before journey.'}
            </p>
          </div>

          {/* Component Health List */}
          <div className="glass-panel p-6 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <h3 className="font-semibold text-foreground mb-4">Post-Trip Condition</h3>
            <div className="space-y-4">
              {components.map((comp, i) => {
                const isCritical = comp.currentHealth <= comp.threshold;
                const isWarning = comp.currentHealth <= comp.threshold + 15;
                
                return (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {isCritical && <AlertTriangle className="h-3 w-3 text-danger" />}
                        <span className="text-sm text-foreground">{comp.name}</span>
                      </div>
                      <span className={cn(
                        "text-sm font-bold font-display",
                        isCritical ? 'text-danger' : isWarning ? 'text-warning' : 'text-success'
                      )}>
                        {Math.round(comp.currentHealth)}%
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-300",
                          isCritical ? 'bg-danger' : isWarning ? 'bg-warning' : 'bg-success'
                        )}
                        style={{ width: `${comp.currentHealth}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Start: {comp.initialHealth}%</span>
                      <span>Threshold: {comp.threshold}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Warnings */}
          {warnings.length > 0 && (
            <div className="glass-panel p-4 border border-danger/30 bg-danger/10 animate-scale-in">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-danger" />
                <span className="text-sm font-medium text-danger">Service Alerts</span>
              </div>
              <ul className="text-xs text-danger/80 space-y-1">
                {warnings.map((w, i) => (
                  <li key={i}>• {w} exceeded threshold</li>
                ))}
              </ul>
              <button className="w-full mt-3 py-2 rounded bg-danger/20 text-danger text-sm font-medium hover:bg-danger/30 transition-colors">
                Schedule Service
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slide-left {
          from { transform: translateX(0); }
          to { transform: translateX(-100px); }
        }
      `}</style>
    </div>
  );
}
