
import React from "react";
import { AppRenewal, formatPrice, formatRenewalDate } from "@/utils/dummyData";
import { Calendar, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface UpcomingRenewalProps {
  renewal: AppRenewal | null;
}

const UpcomingRenewal: React.FC<UpcomingRenewalProps> = ({ renewal }) => {
  if (!renewal) {
    return (
      <Card className="bg-muted/30">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-muted-foreground" />
            <p className="text-muted-foreground">No upcoming renewals</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate days until renewal
  const today = new Date();
  const renewalDate = new Date(renewal.renewalDate);
  const diffTime = renewalDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <Card className="bg-primary/5 border-primary/10">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-md flex items-center justify-center bg-white border shadow-sm overflow-hidden">
              <img 
                src={renewal.icon} 
                alt={renewal.name} 
                className="w-7 h-7 object-contain"
              />
            </div>
            <div>
              <h3 className="font-medium text-lg">{renewal.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>{formatRenewalDate(renewal.renewalDate)}</span>
                <span className="font-medium text-primary">
                  {diffDays === 0 
                    ? "Today" 
                    : diffDays === 1 
                      ? "Tomorrow" 
                      : `in ${diffDays} days`}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Amount</div>
            <div className="font-bold text-lg text-primary">{formatPrice(renewal.price)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingRenewal;
