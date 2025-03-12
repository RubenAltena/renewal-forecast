
import React from "react";
import RenewalCalendar from "@/components/RenewalCalendar";
import InsightsSection from "@/components/InsightsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 font-inter">
      <div className="container py-8">
        <RenewalCalendar />
        <InsightsSection />
      </div>
    </div>
  );
};

export default Index;
