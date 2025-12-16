import { Gauge, TrendingDown, TrendingUp, Minus, Info, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ComponentRUL {
  name: string;
  usedLife: number;
  remainingDays: number;
  remainingKm: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
  category: string;
}

const rulData: ComponentRUL[] = [
  {
    name: 'Front Brake Pads',
    usedLife: 65,
    remainingDays: 18,
    remainingKm: 2200,
    confidence: 94,
    trend: 'down',
    lastUpdated: '4 hours ago',
    category: 'Braking System',
  },
  {
    name: 'Rear Brake Pads',
    usedLife: 42,
    remainingDays: 45,
    remainingKm: 5500,
    confidence: 91,
    trend: 'stable',
    lastUpdated: '4 hours ago',
    category: 'Braking System',
  },
  {
    name: 'Battery Pack',
    usedLife: 8,
    remainingDays: 2920,
    remainingKm: 180000,
    confidence: 89,
    trend: 'stable',
    lastUpdated: '2 hours ago',
    category: 'Powertrain',
  },
  {
    name: 'Electric Motor',
    usedLife: 5,
    remainingDays: 3650,
    remainingKm: 250000,
    confidence: 92,
    trend: 'stable',
    lastUpdated: '1 day ago',
    category: 'Powertrain',
  },
  {
    name: 'Front Tires',
    usedLife: 48,
    remainingDays: 52,
    remainingKm: 6400,
    confidence: 88,
    trend: 'down',
    lastUpdated: '1 day ago',
    category: 'Wheels & Tires',
  },
  {
    name: 'Rear Tires',
    usedLife: 35,
    remainingDays: 78,
    remainingKm: 9600,
    confidence: 87,
    trend: 'stable',
    lastUpdated: '1 day ago',
    category: 'Wheels & Tires',
  },
  {
    name: 'Front Suspension',
    usedLife: 22,
    remainingDays: 280,
    remainingKm: 35000,
    confidence: 85,
    trend: 'stable',
    lastUpdated: '2 days ago',
    category: 'Suspension',
  },
  {
    name: 'Rear Suspension',
    usedLife: 18,
    remainingDays: 320,
    remainingKm: 40000,
    confidence: 86,
    trend: 'stable',
    lastUpdated: '2 days ago',
    category: 'Suspension',
  },
  {
    name: 'Cabin Air Filter',
    usedLife: 75,
    remainingDays: 25,
    remainingKm: 3000,
    confidence: 95,
    trend: 'down',
    lastUpdated: '3 days ago',
    category: 'HVAC',
  },
  {
    name: 'Coolant',
    usedLife: 30,
    remainingDays: 180,
    remainingKm: 22000,
    confidence: 90,
    trend: 'stable',
    lastUpdated: '5 days ago',
    category: 'Cooling System',
  },
];

const getUsedLifeColor = (used: number) => {
  if (used >= 70) return 'text-danger';
  if (used >= 50) return 'text-warning';
  return 'text-success';
};

const getConfidenceColor = (conf: number) => {
  if (conf >= 90) return 'text-success';
  if (conf >= 80) return 'text-primary';
  return 'text-warning';
};

const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'stable' }) => {
  if (trend === 'down') return <TrendingDown className="h-3 w-3 text-warning" />;
  if (trend === 'up') return <TrendingUp className="h-3 w-3 text-success" />;
  return <Minus className="h-3 w-3 text-muted-foreground" />;
};

export function RULTab() {
  const categories = [...new Set(rulData.map(d => d.category))];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in-up">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-primary/20">
            <Gauge className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Remaining Useful Life</h2>
            <p className="text-sm text-muted-foreground">Component lifespan predictions based on usage patterns</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors text-sm font-medium">
          <Download className="h-4 w-4" />
          Export Report
        </button>
      </div>

      {/* Info Banner */}
      <div className="glass-panel p-4 flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm text-foreground font-medium">About RUL Predictions</p>
          <p className="text-xs text-muted-foreground mt-1">
            These estimations are based on observed usage patterns, driving behavior analysis, and predictive degradation models. 
            Confidence levels indicate the statistical reliability of each prediction. Actual lifespan may vary based on future usage conditions.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
        <div className="glass-panel p-4">
          <p className="text-xs text-muted-foreground mb-1">Components Monitored</p>
          <p className="text-2xl font-display font-bold text-foreground">{rulData.length}</p>
        </div>
        <div className="glass-panel p-4">
          <p className="text-xs text-muted-foreground mb-1">Requiring Attention</p>
          <p className="text-2xl font-display font-bold text-warning">
            {rulData.filter(d => d.usedLife >= 60).length}
          </p>
        </div>
        <div className="glass-panel p-4">
          <p className="text-xs text-muted-foreground mb-1">Avg. Confidence</p>
          <p className="text-2xl font-display font-bold text-success">
            {Math.round(rulData.reduce((a, b) => a + b.confidence, 0) / rulData.length)}%
          </p>
        </div>
        <div className="glass-panel p-4">
          <p className="text-xs text-muted-foreground mb-1">Next Service Item</p>
          <p className="text-lg font-display font-bold text-danger">
            {rulData.reduce((a, b) => a.remainingDays < b.remainingDays ? a : b).name.split(' ').slice(0, 2).join(' ')}
          </p>
        </div>
      </div>

      {/* Component Table by Category */}
      {categories.map((category, catIndex) => (
        <div 
          key={category} 
          className="glass-panel overflow-hidden animate-fade-in-up"
          style={{ animationDelay: `${200 + catIndex * 50}ms` }}
        >
          <div className="px-6 py-4 border-b border-border/50 bg-secondary/30">
            <h3 className="font-semibold text-foreground">{category}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/30 text-left">
                  <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Component</th>
                  <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Used Life</th>
                  <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Remaining (Days)</th>
                  <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Remaining (km)</th>
                  <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Confidence</th>
                  <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Trend</th>
                  <th className="px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Updated</th>
                </tr>
              </thead>
              <tbody>
                {rulData.filter(d => d.category === category).map((item, i) => (
                  <tr 
                    key={i} 
                    className="border-b border-border/20 hover:bg-secondary/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-foreground">{item.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full",
                              item.usedLife >= 70 ? 'bg-danger' : item.usedLife >= 50 ? 'bg-warning' : 'bg-success'
                            )}
                            style={{ width: `${item.usedLife}%` }}
                          />
                        </div>
                        <span className={cn("text-sm font-medium", getUsedLifeColor(item.usedLife))}>
                          {item.usedLife}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "text-sm font-display font-bold",
                        item.remainingDays <= 30 ? 'text-danger' : item.remainingDays <= 60 ? 'text-warning' : 'text-foreground'
                      )}>
                        {item.remainingDays.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-foreground font-medium">
                        {item.remainingKm.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full",
                              item.confidence >= 90 ? 'bg-success' : item.confidence >= 80 ? 'bg-primary' : 'bg-warning'
                            )}
                            style={{ width: `${item.confidence}%` }}
                          />
                        </div>
                        <span className={cn("text-sm font-medium", getConfidenceColor(item.confidence))}>
                          {item.confidence}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <TrendIcon trend={item.trend} />
                        <span className="text-xs text-muted-foreground capitalize">{item.trend}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-muted-foreground">{item.lastUpdated}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Methodology Note */}
      <div className="text-center text-xs text-muted-foreground py-4 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
        <p>RUL predictions use ensemble machine learning models trained on fleet-wide data.</p>
        <p>Individual results calibrated using vehicle-specific telemetry and driver behavior profiles.</p>
      </div>
    </div>
  );
}
