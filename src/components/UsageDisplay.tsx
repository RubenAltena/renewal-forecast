
import React from "react";
import { AppRenewal } from "@/utils/dummyData";

interface UsageDisplayProps {
  app: AppRenewal;
  onClose: () => void;
}

const UsageDisplay: React.FC<UsageDisplayProps> = ({ app, onClose }) => {
  const { usageData } = app;
  
  if (!usageData) {
    return (
      <div className="p-8 text-center">
        <p>No usage data available</p>
      </div>
    );
  }
  
  const { totalUsers, activeUsers, moderatelyActiveUsers, inactiveUsers } = usageData;
  
  // Calculate percentages for the bar chart
  const activePercentage = (activeUsers / totalUsers) * 100;
  const moderatePercentage = (moderatelyActiveUsers / totalUsers) * 100;
  const inactivePercentage = (inactiveUsers / totalUsers) * 100;
  
  // Calculate unassigned licenses
  const totalAssigned = activeUsers + moderatelyActiveUsers + inactiveUsers;
  const unassignedLicenses = totalUsers - totalAssigned;
  const unassignedPercentage = unassignedLicenses > 0 ? (unassignedLicenses / totalUsers) * 100 : 0;
  
  return (
    <div className="bg-white rounded-xl p-6 max-w-md w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md flex items-center justify-center overflow-hidden border">
            <img src={app.icon} alt={app.name} className="w-7 h-7 object-contain" />
          </div>
          <h3 className="text-xl font-semibold">{app.name} Usage</h3>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <span className="sr-only">Close</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Total users</h4>
            <span className="text-2xl font-bold">{totalUsers}</span>
          </div>
          
          <div className="h-8 rounded-full overflow-hidden flex w-full">
            <div 
              className="bg-green-300 h-full" 
              style={{ width: `${activePercentage}%` }}
            />
            <div 
              className="bg-orange-200 h-full" 
              style={{ width: `${moderatePercentage}%` }}
            />
            <div 
              className="bg-red-200 h-full" 
              style={{ width: `${inactivePercentage}%` }}
            />
            {unassignedLicenses > 0 && (
              <div 
                className="bg-gray-200 h-full" 
                style={{ width: `${unassignedPercentage}%` }}
              />
            )}
          </div>
          
          <div className="grid grid-cols-4 gap-2 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-300"></div>
              <div className="text-sm">
                <div>Active Users</div>
                <div className="font-medium">{activeUsers}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-200"></div>
              <div className="text-sm">
                <div>Moderately Active</div>
                <div className="font-medium">{moderatelyActiveUsers}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-200"></div>
              <div className="text-sm">
                <div>Inactive Users</div>
                <div className="font-medium">{inactiveUsers}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-200"></div>
              <div className="text-sm">
                <div>Unassigned</div>
                <div className="font-medium">{unassignedLicenses}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageDisplay;
