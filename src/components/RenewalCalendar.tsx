
import React, { useState, useEffect } from "react";
import MonthCard from "./MonthCard";
import RenewalTable from "./RenewalTable";
import YearSelector from "./YearSelector";
import { 
  AppRenewal, 
  generateYearlyRenewals, 
  getRenewalsForMonth 
} from "@/utils/dummyData";

const RenewalCalendar: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [renewals, setRenewals] = useState<AppRenewal[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Generate renewals when the year changes
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    const timer = setTimeout(() => {
      const newRenewals = generateYearlyRenewals(year);
      setRenewals(newRenewals);
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, [year]);

  // Handle month selection
  const handleMonthClick = (month: number) => {
    setSelectedMonth(month);
  };

  // Handle closing the renewal table
  const handleCloseTable = () => {
    setSelectedMonth(null);
  };

  // Handle year change
  const handleYearChange = (newYear: number) => {
    setYear(newYear);
    setSelectedMonth(null);
  };

  // Get renewals for a specific month
  const getRenewalsForSelectedMonth = (month: number) => {
    return getRenewalsForMonth(renewals, month);
  };

  // Create an array of months (0-11)
  const months = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-semibold">Renewal Calendar</h1>
        <YearSelector year={year} onChangeYear={handleYearChange} />
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {months.map((month) => (
            <div 
              key={month} 
              className="h-64 rounded-xl bg-neutral-100"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {months.map((month) => {
            const monthRenewals = getRenewalsForSelectedMonth(month);
            return (
              <MonthCard
                key={month}
                month={month}
                year={year}
                renewals={monthRenewals}
                isActive={selectedMonth === month}
                onClick={() => monthRenewals.length > 0 && handleMonthClick(month)}
              />
            );
          })}
        </div>
      )}
      
      {selectedMonth !== null && (
        <RenewalTable
          month={selectedMonth}
          year={year}
          renewals={getRenewalsForSelectedMonth(selectedMonth)}
          onClose={handleCloseTable}
        />
      )}
    </div>
  );
};

export default RenewalCalendar;
