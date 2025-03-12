
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface YearSelectorProps {
  year: number;
  onChangeYear: (year: number) => void;
}

const YearSelector: React.FC<YearSelectorProps> = ({ year, onChangeYear }) => {
  return (
    <div className="flex items-center space-x-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onChangeYear(year - 1)}
        className="rounded-full h-8 w-8"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous year</span>
      </Button>
      
      <h2 className="text-2xl font-medium">{year}</h2>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onChangeYear(year + 1)}
        className="rounded-full h-8 w-8"
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next year</span>
      </Button>
    </div>
  );
};

export default YearSelector;
