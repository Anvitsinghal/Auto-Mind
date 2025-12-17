import { Factory, AlertTriangle, TrendingUp, Map, BarChart3, Shield, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeatmapCell {
  component: string;
  region: string;
  failureRate: number;
}

const heatmapData: HeatmapCell[] = [
  { component: 'Brake Pads', region: 'North', failureRate: 12 },
  { component: 'Brake Pads', region: 'South', failureRate: 8 },
  { component: 'Brake Pads', region: 'East', failureRate: 15 },
  { component: 'Brake Pads', region: 'West', failureRate: 10 },
  { component: 'Battery', region: 'North', failureRate: 3 },
  { component: 'Battery', region: 'South', failureRate: 2 },
  { component: 'Battery', region: 'East', failureRate: 4 },
  { component: 'Battery', region: 'West', failureRate: 2 },
  { component: 'Suspension', region: 'North', failureRate: 7 },
  { component: 'Suspension', region: 'South', failureRate: 5 },
  { component: 'Suspension', region: 'East', failureRate: 9 },
  { component: 'Suspension', region: 'West', failureRate: 6 },
  { component: 'Motor', region: 'North', failureRate: 1 },
  { component: 'Motor', region: 'South', failureRate: 1 },
  { component: 'Motor', region: 'East', failureRate: 2 },
  { component: 'Motor', region: 'West', failureRate: 1 },
];

const capaRecommendations = [
  {
    id: 'CAPA-2024-047',
    severity: 'high',
    component: 'Brake Pad Batch B7',
    finding: 'Early wear pattern detected in aggressive driving profiles',
    recommendation: 'Material composition review recommended. Consider titanium-ceramic blend for high-stress applications.',
    affectedUnits: 1247,
    dateIdentified: '2024-01-15',
  },
  {
    id: 'CAPA-2024-039',
    severity: 'medium',
    component: 'Battery Cell Module M4',
    finding: 'Accelerated degradation in high-temperature regions (>35°C average)',
    recommendation: 'Enhanced thermal management system for southern distribution.',
    affectedUnits: 892,
    dateIdentified: '2024-01-08',
  },
  {
    id: 'CAPA-2024-031',
    severity: 'low',
    component: 'Suspension Bushings',
    finding: 'Minor wear variance in mixed terrain usage',
    recommendation: 'Update supplier QC parameters. No immediate action required.',
    affectedUnits: 456,
    dateIdentified: '2023-12-22',
  },
];

const fleetStats = [
  { label: 'Fleet Size', value: '24,560', change: '+12%' },
  { label: 'Monitoring', value: '23,891', change: '+8%' },
  { label: 'Avg. Health', value: '84.2%', change: '+2.1%' },
  { label: 'Prevented', value: '1,247', change: '+34%' },
];

const getHeatColor = (rate: number) => {
  if (rate >= 12) return 'bg-danger/60';
  if (rate >= 8) return 'bg-warning/60';
  if (rate >= 5) return 'bg-warning/30';
  return 'bg-success/30';
};

export function OEMInsightsTab() {
  const components = [...new Set(heatmapData.map(d => d.component))];
  const regions = [...new Set(heatmapData.map(d => d.region))];

  return (
    <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in-up">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-2 sm:p-3 rounded-xl bg-primary/20">
            <Factory className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground">OEM Insights</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">Fleet-wide analytics</p>
          </div>
        </div>
        <div className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-secondary border border-border text-[10px] sm:text-xs text-muted-foreground self-start sm:self-auto">
          Read-Only View
        </div>
      </div>

      {/* Fleet Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        {fleetStats.map((stat, i) => (
          <div key={i} className="glass-panel p-3 sm:p-4">
            <p className="text-[10px] sm:text-xs text-muted-foreground mb-1">{stat.label}</p>
            <div className="flex items-end gap-1 sm:gap-2">
              <p className="text-lg sm:text-2xl font-display font-bold text-foreground">{stat.value}</p>
              <span className="text-[10px] sm:text-xs text-success font-medium mb-0.5 sm:mb-1">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Failure Heatmap */}
        <div className="glass-panel-elevated p-4 sm:p-6 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <Map className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <h3 className="font-semibold text-foreground text-sm sm:text-base">Regional Failure Heatmap</h3>
          </div>

          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[280px]">
              <thead>
                <tr>
                  <th className="text-left text-[10px] sm:text-xs text-muted-foreground font-medium p-1.5 sm:p-2">Component</th>
                  {regions.map(region => (
                    <th key={region} className="text-center text-[10px] sm:text-xs text-muted-foreground font-medium p-1.5 sm:p-2">{region}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {components.map(component => (
                  <tr key={component}>
                    <td className="text-xs sm:text-sm text-foreground font-medium p-1.5 sm:p-2">{component}</td>
                    {regions.map(region => {
                      const cell = heatmapData.find(d => d.component === component && d.region === region);
                      return (
                        <td key={region} className="p-1 sm:p-2">
                          <div className={cn(
                            "w-full h-8 sm:h-10 rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-bold",
                            getHeatColor(cell?.failureRate || 0)
                          )}>
                            {cell?.failureRate}%
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-4 sm:mt-6 text-[10px] sm:text-xs">
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-success/30" />
              <span className="text-muted-foreground">&lt;5%</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-warning/30" />
              <span className="text-muted-foreground">5-8%</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-warning/60" />
              <span className="text-muted-foreground">8-12%</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-danger/60" />
              <span className="text-muted-foreground">&gt;12%</span>
            </div>
          </div>
        </div>

        {/* Component Defect Clusters */}
        <div className="glass-panel p-4 sm:p-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <h3 className="font-semibold text-foreground text-sm sm:text-base">Defect Cluster Analysis</h3>
          </div>

          <div className="space-y-2 sm:space-y-4">
            {[
              { category: 'Braking System', issues: 847, trend: 'up', severity: 'high' },
              { category: 'Battery & Powertrain', issues: 234, trend: 'down', severity: 'low' },
              { category: 'Suspension & Chassis', issues: 412, trend: 'stable', severity: 'medium' },
              { category: 'Electrical Systems', issues: 156, trend: 'down', severity: 'low' },
              { category: 'HVAC & Comfort', issues: 89, trend: 'stable', severity: 'low' },
            ].map((item, i) => (
              <div key={i} className="p-3 sm:p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <span className="text-xs sm:text-sm font-medium text-foreground">{item.category}</span>
                  <span className={cn(
                    "px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium",
                    item.severity === 'high' && 'bg-danger/20 text-danger',
                    item.severity === 'medium' && 'bg-warning/20 text-warning',
                    item.severity === 'low' && 'bg-success/20 text-success',
                  )}>
                    {item.severity}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-lg sm:text-xl font-display font-bold text-foreground">{item.issues}</span>
                    <span className="text-[10px] sm:text-xs text-muted-foreground">issues</span>
                  </div>
                  <div className={cn(
                    "flex items-center gap-1 text-[10px] sm:text-xs",
                    item.trend === 'up' && 'text-danger',
                    item.trend === 'down' && 'text-success',
                    item.trend === 'stable' && 'text-muted-foreground',
                  )}>
                    <TrendingUp className={cn(
                      "h-3 w-3",
                      item.trend === 'down' && 'rotate-180'
                    )} />
                    <span className="hidden sm:inline">{item.trend}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CAPA Recommendations */}
      <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <h3 className="font-semibold text-foreground text-sm sm:text-base">CAPA Recommendations</h3>
          <span className="text-[10px] sm:text-xs text-muted-foreground hidden sm:inline">(Corrective and Preventive Actions)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {capaRecommendations.map((capa, i) => (
            <div 
              key={i}
              className={cn(
                "glass-panel p-3 sm:p-5 border-t-4",
                capa.severity === 'high' && 'border-t-danger',
                capa.severity === 'medium' && 'border-t-warning',
                capa.severity === 'low' && 'border-t-success',
              )}
            >
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <div>
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                    <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                    <span className="text-[10px] sm:text-xs font-mono text-muted-foreground">{capa.id}</span>
                  </div>
                  <h4 className="font-medium text-foreground text-xs sm:text-base">{capa.component}</h4>
                </div>
                <span className={cn(
                  "px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium uppercase",
                  capa.severity === 'high' && 'bg-danger/20 text-danger',
                  capa.severity === 'medium' && 'bg-warning/20 text-warning',
                  capa.severity === 'low' && 'bg-success/20 text-success',
                )}>
                  {capa.severity}
                </span>
              </div>

              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1">Finding</p>
                  <p className="text-foreground text-xs sm:text-sm">{capa.finding}</p>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1">Recommendation</p>
                  <p className="text-foreground text-xs sm:text-sm">{capa.recommendation}</p>
                </div>
                <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-border/50 text-[10px] sm:text-xs">
                  <span className="text-muted-foreground">
                    <AlertTriangle className="h-3 w-3 inline mr-1" />
                    {capa.affectedUnits.toLocaleString()} units
                  </span>
                  <span className="text-muted-foreground">{capa.dateIdentified}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center py-4 sm:py-6 border-t border-border/30 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
        <p className="text-[10px] sm:text-xs text-muted-foreground">
          OEM Insights provides aggregated fleet intelligence for manufacturer quality improvement.
        </p>
        <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
          Data from {(24560).toLocaleString()} connected vehicles • Last sync: 15 min ago
        </p>
      </div>
    </div>
  );
}
