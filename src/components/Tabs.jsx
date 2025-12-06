import React, { memo } from 'react';

const tabs = [
  { id: 'adoption', label: 'Adopción FinOps', icon: '📊' },
  { id: 'optimization', label: 'Optimización Cloud', icon: '⚡' },
  { id: 'service', label: 'Servicio FinOps Gestionado', icon: '🎯' },
];

const Tabs = memo(({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-6 py-4 font-semibold text-sm transition-all duration-300 border-b-4
                ${activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }
              `}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});

Tabs.displayName = 'Tabs';

export default Tabs;
