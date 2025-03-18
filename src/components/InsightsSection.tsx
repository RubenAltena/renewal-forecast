
import React, { useRef } from "react";
import ContractOptimization from "./ContractOptimization";
import RenewalNotifications from "./RenewalNotifications";
import BudgetImpact from "./BudgetImpact";
import { AppRenewal, generateYearlyRenewals } from "@/utils/dummyData";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

const InsightsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const renewals = generateYearlyRenewals(new Date().getFullYear());
  
  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    const scrollAmount = 320; // Approximate width of a card + gap
    const currentScroll = scrollRef.current.scrollLeft;
    
    scrollRef.current.scrollTo({
      left: direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount,
      behavior: 'smooth'
    });
  };
  
  const handleSelectApp = (app: AppRenewal) => {
    console.log("Selected app:", app.name);
    // Future implementation: Navigate to app details or highlight in calendar
  };

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">AI Insights</h2>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => handleScroll('left')}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => handleScroll('right')}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="relative overflow-x-hidden">
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scroll-smooth scrollbar-hide"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <div className="min-w-[300px] md:min-w-[380px] flex-shrink-0">
            <ContractOptimization 
              renewals={renewals} 
              onSelectApp={handleSelectApp}
            />
          </div>
          <div className="min-w-[300px] md:min-w-[380px] flex-shrink-0">
            <RenewalNotifications 
              renewals={renewals} 
              onSelectApp={handleSelectApp}
            />
          </div>
          <div className="min-w-[300px] md:min-w-[380px] flex-shrink-0">
            <BudgetImpact 
              renewals={renewals}
            />
          </div>
          {/* Additional cards can be added here */}
        </div>
      </div>
    </div>
  );
};

export default InsightsSection;
