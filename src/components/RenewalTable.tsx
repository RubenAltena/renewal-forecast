
import React, { useState } from "react";
import { AppRenewal, formatPrice, formatRenewalDate, getMonthName } from "@/utils/dummyData";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Search, ArrowUpDown, Download } from "lucide-react";

interface RenewalTableProps {
  month: number;
  year: number;
  renewals: AppRenewal[];
  onClose: () => void;
}

const RenewalTable: React.FC<RenewalTableProps> = ({ month, year, renewals, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof AppRenewal>("renewalDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Filter renewals based on search term
  const filteredRenewals = renewals.filter(
    (renewal) =>
      renewal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      renewal.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    } else if (sortField === "category") {
      return sortDirection === "asc"
        ? a.category.localeCompare(b.category)
        : b.category.localeCompare(a.category);
    }
    return 0;
  });

  // Toggle sort direction
  const toggleSort = (field: keyof AppRenewal) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Render sort icon
  const renderSortIcon = (field: keyof AppRenewal) => {
    if (sortField !== field) return null;
    return (
      <ArrowUpDown 
        className={`ml-1 h-4 w-4 inline ${sortDirection === "desc" ? "transform rotate-180" : ""}`} 
      />
    );
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
          <div className="flex items-center gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="overflow-auto flex-grow">
          <Table>
            <TableHeader>
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
                  onClick={() => toggleSort("category")}
                >
                  Category {renderSortIcon("category")}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:text-primary transition-colors"
                  onClick={() => toggleSort("renewalDate")}
                >
                  Renewal Date {renderSortIcon("renewalDate")}
                </TableHead>
                <TableHead 
                  className="text-right cursor-pointer hover:text-primary transition-colors"
                  onClick={() => toggleSort("price")}
                >
                  Price {renderSortIcon("price")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedRenewals.length > 0 ? (
                sortedRenewals.map((renewal) => (
                  <TableRow key={renewal.id} className="group">
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
                    <TableCell>{renewal.category}</TableCell>
                    <TableCell>{formatRenewalDate(renewal.renewalDate)}</TableCell>
                    <TableCell className="text-right">{formatPrice(renewal.price)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No renewals found
                  </TableCell>
                </TableRow>
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
      </div>
    </div>
  );
};

export default RenewalTable;
