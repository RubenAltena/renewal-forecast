
import React, { useState } from "react";
import { AppRenewal, formatPrice, formatRenewalDate, getUrgentRenewals } from "@/utils/dummyData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Calendar, TrendingDown, ArrowRight, Megaphone, LightbulbIcon, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface RenewalNotificationsProps {
  renewals: AppRenewal[];
  onSelectApp: (app: AppRenewal) => void;
}

const RenewalNotifications: React.FC<RenewalNotificationsProps> = ({ 
  renewals,
  onSelectApp 
}) => {
  const urgentRenewals = getUrgentRenewals(renewals);
  const [expandedAppId, setExpandedAppId] = useState<string | null>(null);
  
  const toggleExpand = (appId: string) => {
    if (expandedAppId === appId) {
      setExpandedAppId(null);
    } else {
      setExpandedAppId(appId);
    }
  };
  
  // If no urgent renewals
  if (urgentRenewals.length === 0) {
    return (
      <Card className="bg-blue-50/50 border-blue-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Bell className="mr-2 h-5 w-5 text-blue-500" />
            AI Renewal Insights
          </CardTitle>
          <CardDescription>No urgent renewals requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            You have no renewals coming up in the next 30 days that require optimization attention.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  // Calculate days until renewal
  const getDaysUntil = (date: Date): number => {
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  // Get urgency label
  const getUrgencyLabel = (days: number): JSX.Element => {
    if (days <= 7) {
      return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50">Critical</Badge>;
    } else if (days <= 14) {
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50">Urgent</Badge>;
    } else {
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">Coming Up</Badge>;
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Bell className="mr-2 h-5 w-5 text-primary" />
          AI Renewal Insights
        </CardTitle>
        <CardDescription>
          {urgentRenewals.length} {urgentRenewals.length === 1 ? 'renewal' : 'renewals'} need attention in the next 30 days
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {urgentRenewals.map(app => {
          const daysUntil = getDaysUntil(app.renewalDate);
          const savingsPotential = app.aiInsights?.savingsPotential || 0;
          
          return (
            <div 
              key={app.id} 
              className={cn(
                "border rounded-md overflow-hidden transition-all",
                expandedAppId === app.id ? "bg-muted/50" : ""
              )}
            >
              <div 
                className="p-3 cursor-pointer hover:bg-muted/30"
                onClick={() => toggleExpand(app.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-md overflow-hidden border mr-2">
                        <img 
                          src={app.icon} 
                          alt={app.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h5 className="font-medium">{app.name}</h5>
                        <div className="flex items-center mt-0.5">
                          <Calendar className="h-3 w-3 text-muted-foreground mr-1" />
                          <span className="text-xs text-muted-foreground">
                            Renews in {daysUntil} {daysUntil === 1 ? 'day' : 'days'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    {getUrgencyLabel(daysUntil)}
                    <div className="text-xs mt-1 text-muted-foreground">
                      {formatPrice(app.price)}/{app.billingCycle}
                    </div>
                  </div>
                </div>
              </div>
              
              {expandedAppId === app.id && (
                <div className="px-3 pb-3 pt-1 border-t">
                  {app.aiInsights?.savingsPotential && app.aiInsights.savingsPotential > 0 && (
                    <div className="mb-2 flex items-start">
                      <TrendingDown className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-green-700">
                          Potential savings of {formatPrice(app.aiInsights.savingsPotential)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          This represents {Math.round((app.aiInsights.savingsPotential / app.price) * 100)}% of 
                          your current {app.billingCycle} cost
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {app.aiInsights?.negotiationTips && app.aiInsights.negotiationTips.length > 0 && (
                    <div className="bg-blue-50 rounded-md p-2 mb-2">
                      <h6 className="text-xs font-semibold flex items-center text-blue-700 mb-1.5">
                        <LightbulbIcon className="h-3.5 w-3.5 mr-1" />
                        AI Negotiation Insights
                      </h6>
                      <ul className="space-y-1.5">
                        {app.aiInsights.negotiationTips.map((tip, i) => (
                          <li key={i} className="flex text-sm text-blue-700">
                            <ArrowRight className="h-3.5 w-3.5 mr-1.5 mt-0.5 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1 mr-2"
                      onClick={() => {
                        console.log(`Set renewal reminder for ${app.name}`);
                        // The actual reminder setting logic would go here
                      }}
                    >
                      <Megaphone className="h-3.5 w-3.5 mr-1.5" />
                      Set Reminder
                    </Button>
                    
                    <Button 
                      size="sm"
                      className="flex-1"
                      onClick={() => onSelectApp(app)}
                    >
                      <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                      Handle Now
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default RenewalNotifications;
