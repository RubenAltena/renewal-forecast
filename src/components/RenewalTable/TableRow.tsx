
import React from "react";
import { TableCell, TableRow as UITableRow } from "@/components/ui/table";
import { AppRenewal, formatPrice, formatRenewalDate } from "@/utils/dummyData";

interface TableRowProps {
  renewal: AppRenewal;
  handleAppClick: (app: AppRenewal) => void;
}

const TableRow: React.FC<TableRowProps> = ({ renewal, handleAppClick }) => {
  // Calculate usage statistics
  const getUsageStats = (app: AppRenewal) => {
    if (!app.usageData) return { activePercent: 0, unassigned: 0 };
    
    const { totalUsers, activeUsers, moderatelyActiveUsers, inactiveUsers } = app.usageData;
    const activePercent = Math.round((activeUsers / totalUsers) * 100);
    const unassigned = totalUsers - (activeUsers + moderatelyActiveUsers + inactiveUsers);
    
    return { activePercent, unassigned };
  };

  const { activePercent, unassigned } = getUsageStats(renewal);

  return (
    <UITableRow 
      className="group hover:bg-muted/30 cursor-pointer" 
      onClick={() => handleAppClick(renewal)}
    >
      <TableCell className="w-12">
        <div className="w-8 h-8 overflow-hidden rounded-md bg-white border flex items-center justify-center">
          <img 
            src={renewal.icon} 
            alt={`${renewal.name} logo`} 
            className="w-6 h-6 object-contain"
          />
        </div>
      </TableCell>
      <TableCell className="font-medium">{renewal.name}</TableCell>
      <TableCell className="capitalize">{renewal.billingCycle}</TableCell>
      <TableCell>{formatRenewalDate(renewal.renewalDate)}</TableCell>
      <TableCell>
        {renewal.usageData ? (
          <div className="flex items-center">
            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${activePercent}%` }}
              />
            </div>
            <span className="text-sm">{activePercent}%</span>
          </div>
        ) : (
          <span className="text-sm text-muted-foreground">No data</span>
        )}
      </TableCell>
      <TableCell>
        {renewal.usageData ? unassigned : "N/A"}
      </TableCell>
      <TableCell className="text-right">{formatPrice(renewal.price)}</TableCell>
    </UITableRow>
  );
};

export default TableRow;
