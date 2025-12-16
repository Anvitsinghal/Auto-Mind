import { HealthGauge } from '@/components/dashboard/HealthGauge';
import { StatusCard } from '@/components/dashboard/StatusCard';
import { RiskBanner } from '@/components/dashboard/RiskBanner';
import { 
  Calendar, 
  Gauge, 
  AlertTriangle, 
  Wrench, 
  Battery, 
  Thermometer,
  Activity,
  Clock
} from 'lucide-react';

export function OverviewTab() {
  return (
    <div className="space-y-6 p-6">
      {/* Risk Banner */}
      <RiskBanner 
        level="safe"
        message="Your Tata Nexon EV is operating within optimal parameters. All predictive systems indicate stable performance."
        details="Last updated: 2 minutes ago • Next scheduled check: 4 hours"
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vehicle Health Card - Large */}
        <div className="lg:col-span-1 glass-panel-elevated p-8 flex flex-col items-center justify-center animate-scale-in">
          <h2 className="text-lg font-semibold text-foreground mb-6">Overall Vehicle Health</h2>
          <HealthGauge value={87} size="lg" />
          <div className="mt-6 w-full">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Last Service</span>
              <span className="text-foreground font-medium">45 days ago</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Mileage</span>
              <span className="text-foreground font-medium">24,560 km</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
          <StatusCard
            title="Next Service"
            value="12 Days"
            subtitle="Based on predictive analysis"
            icon={<Calendar className="h-5 w-5" />}
            status="neutral"
            delay={100}
          />
          <StatusCard
            title="Failure Probability"
            value="3.2%"
            subtitle="Next 30 days"
            icon={<AlertTriangle className="h-5 w-5" />}
            trend="down"
            trendValue="0.8%"
            status="success"
            delay={200}
          />
          <StatusCard
            title="Components at Risk"
            value="1"
            subtitle="Front brake pads - Monitor"
            icon={<Wrench className="h-5 w-5" />}
            status="warning"
            delay={300}
          />
          <StatusCard
            title="Battery Health"
            value="94%"
            subtitle="Estimated range: 312 km"
            icon={<Battery className="h-5 w-5" />}
            trend="stable"
            trendValue="Optimal"
            status="success"
            delay={400}
          />
          <StatusCard
            title="Motor Temperature"
            value="42°C"
            subtitle="Within optimal range"
            icon={<Thermometer className="h-5 w-5" />}
            status="success"
            delay={500}
          />
          <StatusCard
            title="Drive Efficiency"
            value="92%"
            subtitle="Above peer average"
            icon={<Activity className="h-5 w-5" />}
            trend="up"
            trendValue="4%"
            status="success"
            delay={600}
          />
        </div>
      </div>

      {/* Recent Activity & Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Predictions */}
        <div className="glass-panel p-6 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Recent Predictions</h3>
            <span className="text-xs text-muted-foreground">Last 7 days</span>
          </div>
          <div className="space-y-3">
            {[
              { title: 'Brake Pad Wear', status: 'warning', confidence: 89, time: '2h ago' },
              { title: 'Battery Degradation Check', status: 'success', confidence: 96, time: '1d ago' },
              { title: 'Tire Pressure Anomaly', status: 'success', confidence: 94, time: '2d ago' },
              { title: 'Suspension Analysis', status: 'success', confidence: 91, time: '4d ago' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className={`w-2 h-2 rounded-full ${item.status === 'success' ? 'bg-success' : 'bg-warning'}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">Confidence: {item.confidence}%</p>
                </div>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Maintenance */}
        <div className="glass-panel p-6 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Maintenance Schedule</h3>
            <button className="text-xs text-primary hover:text-primary/80 transition-colors">View All</button>
          </div>
          <div className="space-y-3">
            {[
              { title: 'Brake Pad Replacement', due: '12 days', priority: 'high' },
              { title: 'Tire Rotation', due: '28 days', priority: 'medium' },
              { title: 'Coolant Check', due: '45 days', priority: 'low' },
              { title: 'Annual Inspection', due: '60 days', priority: 'low' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30">
                <div className={`p-2 rounded-lg ${
                  item.priority === 'high' ? 'bg-warning/20' : 
                  item.priority === 'medium' ? 'bg-primary/20' : 'bg-muted'
                }`}>
                  <Clock className={`h-4 w-4 ${
                    item.priority === 'high' ? 'text-warning' : 
                    item.priority === 'medium' ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">Due in {item.due}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  item.priority === 'high' ? 'bg-warning/20 text-warning' :
                  item.priority === 'medium' ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                }`}>
                  {item.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
