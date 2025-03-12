
import React, { useState } from "react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { AppRenewal, formatPrice, formatRenewalDate } from "@/utils/dummyData";
import { TrendingDown, AlertTriangle } from "lucide-react";

interface AppIconProps {
  app: AppRenewal;
}

const AppIcon: React.FC<AppIconProps> = ({ app }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Check if app needs optimization
  const needsOptimization = app.aiInsights && app.aiInsights.optimizationScore < 70;

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
            
            {/* AI optimization indicator */}
            {needsOptimization && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center border border-white">
                <AlertTriangle className="h-2.5 w-2.5 text-white" />
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="bg-neutral-900/95 backdrop-blur-sm text-white border-none p-3 rounded-lg shadow-xl z-[9999] max-w-xs animate-fade-in"
          sideOffset={10}
          avoidCollisions={true}
          collisionPadding={20}
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
            
            {/* AI insights if available */}
            {app.aiInsights && (
              <div className="mt-1 pt-2 border-t border-white/20">
                {app.aiInsights.optimizationScore < 70 && (
                  <div className="text-xs flex items-start">
                    <AlertTriangle className="h-3 w-3 text-amber-400 mr-1.5 mt-0.5 flex-shrink-0" />
                    <span>
                      This app needs optimization attention 
                      (Score: {app.aiInsights.optimizationScore}%)
                    </span>
                  </div>
                )}
                
                {app.aiInsights.savingsPotential && app.aiInsights.savingsPotential > 0 && (
                  <div className="text-xs flex items-start mt-1">
                    <TrendingDown className="h-3 w-3 text-green-400 mr-1.5 mt-0.5 flex-shrink-0" />
                    <span>
                      Potential savings: {formatPrice(app.aiInsights.savingsPotential)}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AppIcon;
