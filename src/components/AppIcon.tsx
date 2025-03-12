
import React, { useState } from "react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { AppRenewal, formatPrice, formatRenewalDate } from "@/utils/dummyData";

interface AppIconProps {
  app: AppRenewal;
}

const AppIcon: React.FC<AppIconProps> = ({ app }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative w-10 h-10 overflow-hidden rounded-md shadow-sm transition-transform duration-200 hover:scale-105 hover:shadow-md">
            {!isLoaded && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md" />
            )}
            <img
              src={app.icon}
              alt={`${app.name} logo`}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setIsLoaded(true)}
              onError={() => setIsLoaded(true)} // Also mark as loaded on error to remove loading state
            />
          </div>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="bg-neutral-900/95 backdrop-blur-sm text-white border-none p-3 rounded-lg shadow-xl z-[100] max-w-xs animate-fade-in"
          sideOffset={5}
          avoidCollisions={true}
        >
          <div className="flex flex-col gap-2">
            <div className="font-medium text-base">{app.name}</div>
            <div className="text-sm text-neutral-300">
              <div className="flex justify-between items-center mb-1">
                <span>Price:</span>
                <span className="font-semibold text-white">{formatPrice(app.price)}</span>
              </div>
              <div className="flex justify-between items-center mb-1">
                <span>Renewal:</span>
                <span className="font-semibold text-white">{formatRenewalDate(app.renewalDate)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Billing:</span>
                <span className="font-semibold text-white capitalize">{app.billingCycle}</span>
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AppIcon;
