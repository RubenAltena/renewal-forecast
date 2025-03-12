
import React, { useState, useEffect } from "react";
import MonthCard from "./MonthCard";
import RenewalTable from "./RenewalTable";
import YearSelector from "./YearSelector";
import UpcomingRenewal from "./UpcomingRenewal";
import { 
  AppRenewal, 
  generateYearlyRenewals, 
  getRenewalsForMonth,
  getNextUpcomingRenewal
} from "@/utils/dummyData";

const RenewalCalendar: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const [year, setYear] = useState(currentYear);
  const [renewals, setRenewals] = useState<AppRenewal[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [nextRenewal, setNextRenewal] = useState<AppRenewal | null>(null);
  const [selectedApp, setSelectedApp] = useState<AppRenewal | null>(null);

  // Generate renewals when the year changes
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call with timeout
    const timer = setTimeout(() => {
      const newRenewals = generateYearlyRenewals(year);
      setRenewals(newRenewals);
      setNextRenewal(getNextUpcomingRenewal(newRenewals));
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

  // Handle app selection for details view
  const handleAppSelect = (app: AppRenewal) => {
    setSelectedApp(app);
    // When an app is selected from AI insights, also open its month
    setSelectedMonth(app.renewalDate.getMonth());
  };

  // Get renewals for a specific month
  const getRenewalsForSelectedMonth = (month: number) => {
    return getRenewalsForMonth(renewals, month);
  };

  // Create an array of months (0-11)
  const months = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-semibold">Renewal Calendar</h1>
        <YearSelector year={year} onChangeYear={handleYearChange} />
      </div>
      
      {/* Next upcoming renewal */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-3">Next Upcoming Renewal</h2>
        {isLoading ? (
          <div className="h-24 rounded-xl bg-neutral-100 animate-pulse" />
        ) : (
          <UpcomingRenewal renewal={nextRenewal} />
        )}
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
                isCurrentMonth={month === currentMonth && year === currentYear}
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
