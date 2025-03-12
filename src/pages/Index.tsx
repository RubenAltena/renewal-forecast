
import React from "react";
import RenewalCalendar from "@/components/RenewalCalendar";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container py-8">
        <RenewalCalendar />
      </div>
    </div>
  );
};

export default Index;
