
import React, { useState } from "react";
import { AppRenewal, getMonthName } from "@/utils/dummyData";
import TableHeader from "./TableHeader";
import TableContent from "./TableContent";
import UsageDisplay from "../UsageDisplay";
import SearchBar from "./SearchBar";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RenewalTableProps {
  month: number;
  year: number;
  renewals: AppRenewal[];
  onClose: () => void;
}

const RenewalTable: React.FC<RenewalTableProps> = ({ month, year, renewals, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof AppRenewal | "usage" | "unassignedLicenses" | "billingCycle">("renewalDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedApp, setSelectedApp] = useState<AppRenewal | null>(null);

  // Filter renewals based on search term
  const filteredRenewals = renewals.filter(
    (renewal) =>
      renewal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle sort toggle
  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Handle app click for usage view
  const handleAppClick = (app: AppRenewal) => {
    setSelectedApp(app);
  };

  // Close usage display
  const handleCloseUsage = () => {
    setSelectedApp(null);
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-scale-in">
        <div className="p-6 flex items-center justify-between border-b">
          <h2 className="text-xl font-medium">
            {getMonthName(month)} {year} Renewals
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-4 border-b">
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />
        </div>
        
        {selectedApp ? (
          <div className="flex-grow overflow-auto p-4">
            <UsageDisplay app={selectedApp} onClose={handleCloseUsage} />
          </div>
        ) : (
          <TableContent 
            filteredRenewals={filteredRenewals} 
            sortField={sortField}
            sortDirection={sortDirection}
            toggleSort={toggleSort}
            handleAppClick={handleAppClick}
          />
        )}
      </div>
    </div>
  );
};

export default RenewalTable;
