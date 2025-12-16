import { useState } from 'react';
import { 
  LayoutDashboard, 
  Brain, 
  Box, 
  Route, 
  Gauge, 
  Factory,
  Settings,
  ChevronDown,
  Shield,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'intelligence', label: 'AutoMind Intelligence', icon: Brain },
  { id: 'twin', label: 'Digital Twin', icon: Box },
  { id: 'simulator', label: 'Trip Simulator', icon: Route },
  { id: 'rul', label: 'RUL & Components', icon: Gauge },
  { id: 'oem', label: 'OEM Insights', icon: Factory },
];

export function TopNav({ activeTab, onTabChange }: TopNavProps) {
  const [isVehicleOpen, setIsVehicleOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo & Vehicle Selector */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="h-9 w-9 rounded-lg bg-primary/20 flex items-center justify-center">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-success border-2 border-background" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold tracking-wider text-foreground">
                AUTO<span className="text-primary">MIND</span>
              </h1>
              <p className="text-[10px] text-muted-foreground tracking-widest">PREDICTIVE INTELLIGENCE</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-border/50" />

          {/* Vehicle Selector */}
          <button 
            onClick={() => setIsVehicleOpen(!isVehicleOpen)}
            className="flex items-center gap-3 px-4 py-2 rounded-lg bg-secondary/50 border border-border/50 hover:bg-secondary transition-colors"
          >
            <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary" fill="currentColor">
                <path d="M5 11l1.5-4.5h11L19 11M3 15h1a2 2 0 002-2V9a2 2 0 00-2-2H3a1 1 0 00-1 1v6a1 1 0 001 1zm18 0h-1a2 2 0 01-2-2V9a2 2 0 012-2h1a1 1 0 011 1v6a1 1 0 01-1 1zM6.5 15a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm11 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
              </svg>
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">Tata Nexon EV</p>
              <p className="text-xs text-muted-foreground">MH 12 AB 1234</p>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground ml-2" />
          </button>

          {/* Health Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full status-safe">
            <Shield className="h-3.5 w-3.5" />
            <span className="text-xs font-semibold">System Active</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "nav-tab flex items-center gap-2 text-sm font-medium",
                activeTab === tab.id && "active"
              )}
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden xl:inline">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
            <Settings className="h-5 w-5" />
          </button>
          <div className="h-8 w-px bg-border/50" />
          <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground hidden sm:inline">Owner</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden flex items-center gap-1 px-4 pb-3 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
              activeTab === tab.id 
                ? "bg-primary/20 text-primary" 
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </header>
  );
}
