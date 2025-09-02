// import React from "react";
// import { useParams } from "react-router-dom";

// const GenericServicePage: React.FC = () => {
//   const { serviceId } = useParams<{ serviceId: string }>();

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">
//         Welcome to {serviceId?.toUpperCase()}
//       </h1>
//       <p className="text-muted-foreground">
//         Currently you don’t have any requests or data here for {serviceId}.
//       </p>
//     </div>
//   );
// };

// export default GenericServicePage;



import React from "react";
import { useParams } from "react-router-dom";

const GenericServicePage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();

  const formatServiceName = (id: string) => {
    return id
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getServiceIcon = (id: string) => {
    const icons: { [key: string]: string } = {
      'analytics': '📊',
      'dashboard': '📈',
      'reports': '📋',
      'settings': '⚙️',
      'users': '👥',
      'orders': '🛒',
      'products': '📦',
      'billing': '💳',
      'support': '🎧',
      'notifications': '🔔'
    };
    return icons[id?.toLowerCase() || ''] || '🚀';
  };

  const serviceName = serviceId ? formatServiceName(serviceId) : 'Service';
  const serviceIcon = serviceId ? getServiceIcon(serviceId) : '🚀';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <span className="text-2xl">{serviceIcon}</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to {serviceName}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your centralized hub for managing {serviceName.toLowerCase()} operations and insights.
          </p>
        </div>

        {/* Status Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Current Status</h2>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Getting Started
            </span>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  No data available yet
                </h3>
                <p className="mt-1 text-sm text-blue-700">
                  You don't have any requests or data in your {serviceName.toLowerCase()} section yet. Start by exploring the available features below.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-green-600">📝</span>
              </div>
              <h3 className="font-semibold text-gray-900">Create New</h3>
            </div>
            <p className="text-sm text-gray-600">Start your first {serviceName.toLowerCase()} entry</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-blue-600">📚</span>
              </div>
              <h3 className="font-semibold text-gray-900">Documentation</h3>
            </div>
            <p className="text-sm text-gray-600">Learn how to use {serviceName.toLowerCase()}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-purple-600">⚙️</span>
              </div>
              <h3 className="font-semibold text-gray-900">Settings</h3>
            </div>
            <p className="text-sm text-gray-600">Configure your preferences</p>
          </div>
        </div>

        {/* Getting Started Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Getting Started</h2>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                1
              </div>
              <span className="text-gray-700">Set up your {serviceName.toLowerCase()} configuration</span>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                2
              </div>
              <span className="text-gray-700">Import or create your first data entries</span>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                3
              </div>
              <span className="text-gray-700">Explore analytics and reporting features</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericServicePage;