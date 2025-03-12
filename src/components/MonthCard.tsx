
import React from "react";
import { AppRenewal, getMonthName } from "@/utils/dummyData";
import AppIcon from "./AppIcon";
import { cn } from "@/lib/utils";

interface MonthCardProps {
  month: number;
  year: number;
  renewals: AppRenewal[];
  isActive: boolean;
  onClick: () => void;
}

const MonthCard: React.FC<MonthCardProps> = ({
  month,
  year,
  renewals,
  isActive,
  onClick,
}) => {
  const hasRenewals = renewals.length > 0;

  return (
    <div
      className={cn(
        "relative rounded-xl border backdrop-blur-sm overflow-hidden transition-all duration-300 ease-in-out cursor-pointer",
        isActive
          ? "bg-calendar-active-month border-primary/30 shadow-lg shadow-primary/5"
          : "bg-white/80 border-neutral-200 hover:bg-calendar-month-hover",
        "flex flex-col h-full"
      )}
      onClick={onClick}
    >
      <div className="p-4 bg-gradient-to-b from-white/5 to-transparent border-b border-neutral-200/30">
        <h3 className="text-lg font-medium">{getMonthName(month)}</h3>
        {hasRenewals ? (
          <p className="text-sm text-muted-foreground mt-1">
            {renewals.length} {renewals.length === 1 ? "renewal" : "renewals"}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground mt-1">No renewals</p>
        )}
      </div>

      <div className="p-4 flex-1">
        {hasRenewals ? (
          <div className="app-grid">
            {renewals.map((app) => (
              <AppIcon key={app.id} app={app} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full opacity-50">
            <p className="text-sm text-muted-foreground">No renewals this month</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthCard;
