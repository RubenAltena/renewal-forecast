
import React from "react";
import { TableHead, TableRow, TableHeader as UITableHeader } from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";
import { AppRenewal } from "@/utils/dummyData";

interface TableHeaderProps {
  sortField: keyof AppRenewal | "usage" | "unassignedLicenses" | "billingCycle";
  sortDirection: "asc" | "desc";
  toggleSort: (field: typeof sortField) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({ sortField, sortDirection, toggleSort }) => {
  // Render sort icon
  const renderSortIcon = (field: typeof sortField) => {
    if (sortField !== field) return null;
    return (
      <ArrowUpDown 
        className={`ml-1 h-4 w-4 inline ${sortDirection === "desc" ? "transform rotate-180" : ""}`} 
      />
    );
  };
  
  return (
    <UITableHeader>
      <TableRow>
        <TableHead className="w-12"></TableHead>
        <TableHead 
          className="cursor-pointer hover:text-primary transition-colors"
          onClick={() => toggleSort("name")}
        >
          Application {renderSortIcon("name")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:text-primary transition-colors"
          onClick={() => toggleSort("billingCycle")}
        >
          Billing Frequency {renderSortIcon("billingCycle")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:text-primary transition-colors"
          onClick={() => toggleSort("renewalDate")}
        >
          Renewal Date {renderSortIcon("renewalDate")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:text-primary transition-colors"
          onClick={() => toggleSort("usage")}
        >
          Usage {renderSortIcon("usage")}
        </TableHead>
        <TableHead 
          className="cursor-pointer hover:text-primary transition-colors"
          onClick={() => toggleSort("unassignedLicenses")}
        >
          Unassigned {renderSortIcon("unassignedLicenses")}
        </TableHead>
        <TableHead 
          className="text-right cursor-pointer hover:text-primary transition-colors"
          onClick={() => toggleSort("price")}
        >
          Price {renderSortIcon("price")}
        </TableHead>
      </TableRow>
    </UITableHeader>
  );
};

export default TableHeader;
