
import React from "react";
import { AppRenewal, getMonthName, formatPrice } from "@/utils/dummyData";
import AppIcon from "./AppIcon";
import { cn } from "@/lib/utils";

interface MonthCardProps {
  month: number;
  year: number;
  renewals: AppRenewal[];
  isActive: boolean;
  isCurrentMonth: boolean;
  onClick: () => void;
}

const MonthCard: React.FC<MonthCardProps> = ({
  month,
  year,
  renewals,
  isActive,
  isCurrentMonth,
  onClick,
}) => {
  const hasRenewals = renewals.length > 0;
  const totalAmount = renewals.reduce((sum, renewal) => sum + renewal.price, 0);

  return (
    <div
      className={cn(
        "relative rounded-xl border backdrop-blur-sm overflow-hidden transition-all duration-300 ease-in-out",
        hasRenewals ? "cursor-pointer" : "cursor-default",
        isActive
          ? "bg-calendar-active-month border-primary/30 shadow-lg shadow-primary/5"
          : isCurrentMonth
          ? "bg-green-50/90 border-green-200 shadow-md shadow-green-100/30"
          : "bg-white/80 border-neutral-200 hover:bg-calendar-month-hover",
        "flex flex-col h-full"
      )}
      onClick={() => hasRenewals && onClick()}
    >
      <div className="p-4 bg-gradient-to-b from-white/5 to-transparent border-b border-neutral-200/30">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium">{getMonthName(month)}</h3>
            {hasRenewals ? (
              <p className="text-sm text-muted-foreground mt-1">
                {renewals.length} {renewals.length === 1 ? "renewal" : "renewals"}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground mt-1">No renewals</p>
            )}
          </div>
          {hasRenewals && (
            <div className="text-right">
              <span className="text-sm font-medium text-primary">
                {formatPrice(totalAmount)}
              </span>
            </div>
          )}
        </div>
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
      
      {/* Removed the "Current" label for current month as requested */}
    </div>
  );
};

export default MonthCard;
