import { useState } from 'react';
import { TopNav } from '@/components/layout/TopNav';
import { OverviewTab } from '@/components/tabs/OverviewTab';
import { IntelligenceTab } from '@/components/tabs/IntelligenceTab';
import { DigitalTwinTab } from '@/components/tabs/DigitalTwinTab';
import { TripSimulatorTab } from '@/components/tabs/TripSimulatorTab';
import { RULTab } from '@/components/tabs/RULTab';
import { OEMInsightsTab } from '@/components/tabs/OEMInsightsTab';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTab = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'intelligence':
        return <IntelligenceTab />;
      case 'twin':
        return <DigitalTwinTab />;
      case 'simulator':
        return <TripSimulatorTab />;
      case 'rul':
        return <RULTab />;
      case 'oem':
        return <OEMInsightsTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNav activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-[1600px] mx-auto">
        {renderTab()}
      </main>
    </div>
  );
};

export default Index;
