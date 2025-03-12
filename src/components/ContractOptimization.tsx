
import React, { useState } from "react";
import { AppRenewal, formatPrice, getAppsNeedingOptimization } from "@/utils/dummyData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileDown, TrendingDown, AlertCircle, CheckCircle2, ArrowRight, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AppIcon from "./AppIcon";

interface ContractOptimizationProps {
  renewals: AppRenewal[];
  onSelectApp: (app: AppRenewal) => void;
}

const ContractOptimization: React.FC<ContractOptimizationProps> = ({ 
  renewals,
  onSelectApp
}) => {
  const appsNeedingOptimization = getAppsNeedingOptimization(renewals);
  const [expandedAppId, setExpandedAppId] = useState<string | null>(null);
  
  // If no apps need optimization
  if (appsNeedingOptimization.length === 0) {
    return (
      <Card className="bg-green-50 border-green-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
            Contract Optimization
          </CardTitle>
          <CardDescription>All contracts are optimized</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Your SaaS portfolio is performing well. We'll continue to monitor for future optimization opportunities.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Group apps by optimization score range
  const criticalApps = appsNeedingOptimization.filter(app => 
    (app.aiInsights?.optimizationScore || 0) < 40
  );
  const attentionApps = appsNeedingOptimization.filter(app => 
    (app.aiInsights?.optimizationScore || 0) >= 40 && (app.aiInsights?.optimizationScore || 0) < 70
  );
  
  // Calculate potential total savings
  const totalSavings = appsNeedingOptimization.reduce((total, app) => 
    total + (app.aiInsights?.savingsPotential || 0), 0
  );

  // Total annual saving calculation
  const annualSavings = appsNeedingOptimization.reduce((total, app) => {
    const savingsPotential = app.aiInsights?.savingsPotential || 0;
    if (app.billingCycle === "monthly") {
      return total + (savingsPotential * 12);
    } else if (app.billingCycle === "quarterly") {
      return total + (savingsPotential * 4);
    } else {
      return total + savingsPotential;
    }
  }, 0);
  
  const toggleExpand = (appId: string) => {
    if (expandedAppId === appId) {
      setExpandedAppId(null);
    } else {
      setExpandedAppId(appId);
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <FileDown className="mr-2 h-5 w-5 text-primary" />
          Contract Optimization
        </CardTitle>
        <CardDescription>
          {appsNeedingOptimization.length} {appsNeedingOptimization.length === 1 ? 'contract' : 'contracts'} need attention
        </CardDescription>
        
        {annualSavings > 0 && (
          <div className="mt-2 flex items-center bg-green-50 text-green-700 rounded-md p-2">
            <TrendingDown className="mr-2 h-4 w-4" />
            <span className="text-sm font-medium">Potential annual savings: {formatPrice(annualSavings)}</span>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {criticalApps.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold flex items-center mb-2">
              <AlertCircle className="mr-1 h-4 w-4 text-destructive" />
              Critical Attention ({criticalApps.length})
            </h4>
            <div className="space-y-3">
              {criticalApps.map(app => (
                <div 
                  key={app.id} 
                  className={cn(
                    "border rounded-md p-3 hover:border-primary/50 transition-all",
                    expandedAppId === app.id ? "bg-muted/50" : ""
                  )}
                >
                  <div 
                    className="flex items-start justify-between cursor-pointer"
                    onClick={() => toggleExpand(app.id)}
                  >
                    <div className="flex items-center">
                      <AppIcon app={app} />
                      <div className="ml-3">
                        <h5 className="font-medium">{app.name}</h5>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-muted-foreground">{app.category}</span>
                          <span className="text-xs mx-2">•</span>
                          <span className="text-xs font-medium text-destructive">
                            {formatPrice(app.price)} / {app.billingCycle}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center">
                        <span className="text-xs text-muted-foreground mr-2">Optimization Score</span>
                        <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-red-100 text-red-700">
                          {app.aiInsights?.optimizationScore}%
                        </span>
                      </div>
                      <Progress 
                        value={app.aiInsights?.optimizationScore} 
                        className="h-1.5 mt-1.5 w-24 bg-red-100" 
                      />
                    </div>
                  </div>
                  
                  {expandedAppId === app.id && (
                    <div className="mt-3 pt-3 border-t">
                      {app.aiInsights?.savingsPotential && (
                        <div className="mb-2 bg-green-50 text-green-700 rounded p-2 text-sm">
                          Potential savings: {formatPrice(app.aiInsights.savingsPotential)} per {app.billingCycle}
                        </div>
                      )}
                      
                      {app.aiInsights?.recommendations && app.aiInsights.recommendations.length > 0 && (
                        <div className="mb-3">
                          <h6 className="text-xs font-semibold mb-1">AI Recommendations:</h6>
                          <ul className="text-sm space-y-1">
                            {app.aiInsights.recommendations.map((rec, i) => (
                              <li key={i} className="flex items-start">
                                <ArrowRight className="h-3.5 w-3.5 mt-0.5 mr-1.5 text-primary flex-shrink-0" />
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {app.aiInsights?.benchmarkData && (
                        <div className="text-xs text-muted-foreground mb-3">
                          <span className="font-medium">Industry average:</span> {formatPrice(app.aiInsights.benchmarkData.industryAvgPrice)} - 
                          You pay {app.aiInsights.benchmarkData.percentileRank > 50 ? 'above' : 'below'} average.
                        </div>
                      )}
                      
                      <Button 
                        size="sm" 
                        className="w-full mt-1"
                        onClick={() => onSelectApp(app)}
                      >
                        View Details <MoveRight className="ml-1 h-3.5 w-3.5" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {attentionApps.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold flex items-center mb-2">
              <AlertCircle className="mr-1 h-4 w-4 text-amber-500" />
              Needs Attention ({attentionApps.length})
            </h4>
            <div className="space-y-3">
              {attentionApps.slice(0, 2).map(app => (
                <div 
                  key={app.id} 
                  className={cn(
                    "border rounded-md p-3 hover:border-primary/50 transition-all",
                    expandedAppId === app.id ? "bg-muted/50" : ""
                  )}
                >
                  <div 
                    className="flex items-start justify-between cursor-pointer"
                    onClick={() => toggleExpand(app.id)}
                  >
                    <div className="flex items-center">
                      <AppIcon app={app} />
                      <div className="ml-3">
                        <h5 className="font-medium">{app.name}</h5>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-muted-foreground">{app.category}</span>
                          <span className="text-xs mx-2">•</span>
                          <span className="text-xs font-medium">
                            {formatPrice(app.price)} / {app.billingCycle}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center">
                        <span className="text-xs text-muted-foreground mr-2">Optimization Score</span>
                        <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-amber-100 text-amber-700">
                          {app.aiInsights?.optimizationScore}%
                        </span>
                      </div>
                      <Progress 
                        value={app.aiInsights?.optimizationScore} 
                        className="h-1.5 mt-1.5 w-24 bg-amber-100" 
                      />
                    </div>
                  </div>
                  
                  {expandedAppId === app.id && (
                    <div className="mt-3 pt-3 border-t">
                      {app.aiInsights?.savingsPotential && (
                        <div className="mb-2 bg-green-50 text-green-700 rounded p-2 text-sm">
                          Potential savings: {formatPrice(app.aiInsights.savingsPotential)} per {app.billingCycle}
                        </div>
                      )}
                      
                      {app.aiInsights?.recommendations && app.aiInsights.recommendations.length > 0 && (
                        <div className="mb-3">
                          <h6 className="text-xs font-semibold mb-1">AI Recommendations:</h6>
                          <ul className="text-sm space-y-1">
                            {app.aiInsights.recommendations.map((rec, i) => (
                              <li key={i} className="flex items-start">
                                <ArrowRight className="h-3.5 w-3.5 mt-0.5 mr-1.5 text-primary flex-shrink-0" />
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {app.aiInsights?.benchmarkData && (
                        <div className="text-xs text-muted-foreground mb-3">
                          <span className="font-medium">Industry average:</span> {formatPrice(app.aiInsights.benchmarkData.industryAvgPrice)} - 
                          You pay {app.aiInsights.benchmarkData.percentileRank > 50 ? 'above' : 'below'} average.
                        </div>
                      )}
                      
                      <Button 
                        size="sm" 
                        className="w-full mt-1"
                        onClick={() => onSelectApp(app)}
                      >
                        View Details <MoveRight className="ml-1 h-3.5 w-3.5" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
              
              {attentionApps.length > 2 && (
                <Button variant="outline" size="sm" className="w-full">
                  View {attentionApps.length - 2} more
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContractOptimization;
