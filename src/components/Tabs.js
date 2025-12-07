import React from 'react';

const tabs = [
  { id: 'requirement', label: 'Requerimiento FinOps', icon: '🎯', color: 'purple' },
  { id: 'optimization', label: 'Optimización Cloud', icon: '⚡', color: 'blue' },
  { id: 'adoption', label: 'Adopción FinOps', icon: '📊', color: 'green' },
];

export default function Tabs({ activeTab, onTabChange }) {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative px-6 py-4 font-semibold text-sm transition-all duration-200
                ${activeTab === tab.id
                  ? `text-${tab.color}-600 border-b-4 border-${tab.color}-600 bg-${tab.color}-50`
                  : 'text-gray-600 border-b-4 border-transparent hover:text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              <span className="mr-2 text-lg">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
