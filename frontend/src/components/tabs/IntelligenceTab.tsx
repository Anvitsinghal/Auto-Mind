import { RadarChart } from '@/components/charts/RadarChart';
import { RiskMeter } from '@/components/charts/RiskMeter';
import { Brain, Users, TrendingUp, AlertTriangle, Info, Zap, Shield } from 'lucide-react';

const driverDnaData = [
  { label: 'Aggressiveness', value: 35, description: 'Measures sudden acceleration and lane changes' },
  { label: 'Braking', value: 42, description: 'Frequency and intensity of hard braking events' },
  { label: 'Load Stress', value: 28, description: 'Vehicle load relative to rated capacity' },
  { label: 'Terrain', value: 55, description: 'Exposure to rough roads and off-road conditions' },
  { label: 'Speed', value: 48, description: 'Average speed relative to speed limits' },
  { label: 'Distance', value: 62, description: 'Daily driving distance patterns' },
];

const failurePredictions = [
  {
    component: 'Front Brake Pads',
    probability: 72,
    timeWindow: '15-25 days',
    status: 'warning',
    cause: 'Higher than average braking intensity detected',
  },
  {
    component: 'Tire Wear (Front Left)',
    probability: 34,
    timeWindow: '45-60 days',
    status: 'neutral',
    cause: 'Normal wear pattern based on mileage',
  },
  {
    component: 'Battery Capacity',
    probability: 12,
    timeWindow: '180+ days',
    status: 'success',
    cause: 'Excellent charging habits maintained',
  },
];

export function IntelligenceTab() {
  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-6">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 animate-fade-in-up">
        <div className="p-2 sm:p-3 rounded-xl bg-primary/20">
          <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-foreground">AutoMind Intelligence</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">AI-powered predictive analytics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Driver DNA Panel */}
        <div className="glass-panel-elevated p-4 sm:p-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <h3 className="font-semibold text-foreground text-sm sm:text-base">Driver DNA Profile</h3>
            </div>
            <span className="text-[10px] sm:text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">Updated Today</span>
          </div>

          <div className="flex justify-center mb-4 sm:mb-6 overflow-hidden">
            <div className="w-full max-w-[280px] sm:max-w-[300px] aspect-square">
              <RadarChart data={driverDnaData} size={280} />
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-lg bg-secondary/30 border border-border/50">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm text-foreground font-medium">Your Driving Style</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                  Your profile indicates conservative driving with moderate terrain exposure. 
                  Braking intensity is slightly elevated—consider smoother deceleration.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Predictive Intelligence Panel */}
        <div className="space-y-4 sm:space-y-6">
          {/* Risk Assessment */}
          <div className="glass-panel p-4 sm:p-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-warning" />
              <h3 className="font-semibold text-foreground text-sm sm:text-base">Predictive Risk Assessment</h3>
            </div>
            <RiskMeter value={28} label="Overall Failure Risk (30 days)" />
          </div>

          {/* Peer Comparison */}
          <div className="glass-panel p-4 sm:p-6 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <h3 className="font-semibold text-foreground text-sm sm:text-base">Peer Comparison</h3>
            </div>
            
            <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
              Your vehicle compared to similar Tata Nexon EV owners
            </p>

            <div className="space-y-3 sm:space-y-4">
              {[
                { label: 'Component Health', yours: 87, average: 78 },
                { label: 'Driving Efficiency', yours: 92, average: 85 },
                { label: 'Maintenance Score', yours: 94, average: 71 },
              ].map((item, i) => (
                <div key={i} className="space-y-1.5 sm:space-y-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-muted-foreground">{item.label}</span>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-primary font-medium">You: {item.yours}%</span>
                      <span className="text-muted-foreground text-[10px] sm:text-xs">Avg: {item.average}%</span>
                    </div>
                  </div>
                  <div className="relative h-1.5 sm:h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="absolute h-full bg-muted-foreground/30 rounded-full"
                      style={{ width: `${item.average}%` }}
                    />
                    <div 
                      className="absolute h-full bg-primary rounded-full"
                      style={{ 
                        width: `${item.yours}%`,
                        boxShadow: '0 0 8px hsl(var(--primary))',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 sm:mt-4 p-2 sm:p-3 rounded-lg bg-success/10 border border-success/30 flex items-center gap-2">
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-success flex-shrink-0" />
              <span className="text-xs sm:text-sm text-success">Your vehicle ranks in the top 15% of peers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Failure Prediction Cards */}
      <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <h3 className="font-semibold text-foreground text-sm sm:text-base">Component Failure Predictions</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {failurePredictions.map((pred, i) => (
            <div 
              key={i} 
              className={`glass-panel p-3 sm:p-5 border-l-4 animate-slide-in-right ${
                pred.status === 'warning' ? 'border-l-warning' :
                pred.status === 'success' ? 'border-l-success' : 'border-l-primary'
              }`}
              style={{ animationDelay: `${500 + i * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <h4 className="font-medium text-foreground text-xs sm:text-base">{pred.component}</h4>
                <span className={`text-xl sm:text-2xl font-display font-bold ${
                  pred.status === 'warning' ? 'text-warning' :
                  pred.status === 'success' ? 'text-success' : 'text-primary'
                }`}>
                  {pred.probability}%
                </span>
              </div>
              
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Time Window</span>
                  <span className="text-foreground font-medium">{pred.timeWindow}</span>
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground border-t border-border/50 pt-1.5 sm:pt-2 mt-1.5 sm:mt-2">
                  {pred.cause}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
