
import React from "react";
import { Table, TableBody } from "@/components/ui/table";
import { AppRenewal, formatPrice } from "@/utils/dummyData";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

interface TableContentProps {
  filteredRenewals: AppRenewal[];
  sortField: keyof AppRenewal | "usage" | "unassignedLicenses" | "billingCycle";
  sortDirection: "asc" | "desc";
  toggleSort: (field: typeof sortField) => void;
  handleAppClick: (app: AppRenewal) => void;
}

const TableContent: React.FC<TableContentProps> = ({ 
  filteredRenewals, 
  sortField, 
  sortDirection, 
  toggleSort,
  handleAppClick 
}) => {
  // Sort renewals
  const sortedRenewals = [...filteredRenewals].sort((a, b) => {
    if (sortField === "renewalDate") {
      return sortDirection === "asc"
        ? a.renewalDate.getTime() - b.renewalDate.getTime()
        : b.renewalDate.getTime() - a.renewalDate.getTime();
    } else if (sortField === "price") {
      return sortDirection === "asc"
        ? a.price - b.price
        : b.price - a.price;
    } else if (sortField === "name") {
      return sortDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortField === "billingCycle") {
      return sortDirection === "asc"
        ? a.billingCycle.localeCompare(b.billingCycle)
        : b.billingCycle.localeCompare(a.billingCycle);
    } else if (sortField === "usage" && a.usageData && b.usageData) {
      const aUsagePercent = a.usageData.activeUsers / a.usageData.totalUsers;
      const bUsagePercent = b.usageData.activeUsers / b.usageData.totalUsers;
      return sortDirection === "asc"
        ? aUsagePercent - bUsagePercent
        : bUsagePercent - aUsagePercent;
    } else if (sortField === "unassignedLicenses" && a.usageData && b.usageData) {
      const aUnassigned = a.usageData.totalUsers - 
        (a.usageData.activeUsers + a.usageData.moderatelyActiveUsers + a.usageData.inactiveUsers);
      const bUnassigned = b.usageData.totalUsers - 
        (b.usageData.activeUsers + b.usageData.moderatelyActiveUsers + b.usageData.inactiveUsers);
      return sortDirection === "asc"
        ? aUnassigned - bUnassigned
        : bUnassigned - aUnassigned;
    }
    return 0;
  });

  return (
    <>
      <div className="overflow-auto flex-grow">
        <Table>
          <TableHeader 
            sortField={sortField} 
            sortDirection={sortDirection} 
            toggleSort={toggleSort} 
          />
          <TableBody>
            {sortedRenewals.length > 0 ? (
              sortedRenewals.map((renewal) => (
                <TableRow 
                  key={renewal.id} 
                  renewal={renewal} 
                  handleAppClick={handleAppClick} 
                />
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-8 text-muted-foreground">
                  No renewals found
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="p-4 border-t bg-muted/20">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Total: {filteredRenewals.length} renewals</span>
          <span>
            Total amount: {formatPrice(filteredRenewals.reduce((sum, app) => sum + app.price, 0))}
          </span>
        </div>
      </div>
    </>
  );
};

export default TableContent;
