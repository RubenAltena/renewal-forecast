
import React, { useState } from "react";
import { AppRenewal, formatPrice, calculateAnnualCost, calculatePotentialSavings } from "@/utils/dummyData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartPieIcon, PiggyBank, DollarSign, BarChart4, TrendingDown, Wallet } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BudgetImpactProps {
  renewals: AppRenewal[];
}

const BudgetImpact: React.FC<BudgetImpactProps> = ({ renewals }) => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Calculate annual costs
  const annualCost = calculateAnnualCost(renewals);
  const potentialSavings = calculatePotentialSavings(renewals);
  const optimizedCost = annualCost - potentialSavings;
  
  // Group by category for pie chart
  const categoryData = renewals.reduce((acc, app) => {
    // Calculate annual cost based on billing cycle
    let cost = app.price;
    if (app.billingCycle === "monthly") cost *= 12;
    if (app.billingCycle === "quarterly") cost *= 4;
    
    const existingCategory = acc.find(item => item.name === app.category);
    if (existingCategory) {
      existingCategory.value += cost;
    } else {
      acc.push({ name: app.category, value: cost });
    }
    return acc;
  }, [] as { name: string; value: number }[]);
  
  // Sort by value descending
  categoryData.sort((a, b) => b.value - a.value);
  
  // Colors for pie chart
  const COLORS = ['#4f46e5', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#6366f1'];
  
  // Top 5 apps by cost
  const topApps = [...renewals]
    .sort((a, b) => {
      // Calculate annual cost based on billing cycle
      const annualCostA = a.billingCycle === "monthly" ? a.price * 12 : 
                          a.billingCycle === "quarterly" ? a.price * 4 : a.price;
      const annualCostB = b.billingCycle === "monthly" ? b.price * 12 : 
                          b.billingCycle === "quarterly" ? b.price * 4 : b.price;
      return annualCostB - annualCostA;
    })
    .slice(0, 5)
    .map(app => {
      // Calculate annual cost based on billing cycle
      const annualCost = app.billingCycle === "monthly" ? app.price * 12 : 
                         app.billingCycle === "quarterly" ? app.price * 4 : app.price;
      return {
        name: app.name,
        cost: annualCost,
        optimization: app.aiInsights?.optimizationScore || 100
      };
    });
  
  // Cost projection for next 12 months
  const monthlyLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  
  // Calculate spending per month (actual and projected with optimization)
  const costProjection = monthlyLabels.map((month, index) => {
    const monthIndex = (currentMonth + index) % 12;
    
    // Estimate monthly costs by spreading annual cost
    const baseMonthlyEstimate = annualCost / 12;
    
    // Add some realistic variance
    const variance = Math.random() * 0.1 - 0.05; // -5% to +5%
    const actualCost = baseMonthlyEstimate * (1 + variance);
    
    // Calculate optimized cost (gradually implement savings over time)
    const savingsImplementationRate = Math.min(1, index * 0.1); // 10% more savings realized each month
    const optimizedCost = actualCost - (potentialSavings / 12) * savingsImplementationRate;
    
    return {
      name: month,
      actual: Math.round(actualCost),
      optimized: Math.round(index >= 1 ? optimizedCost : actualCost) // Start optimization from second month
    };
  });
  
  const savingsPercentage = potentialSavings > 0 
    ? Math.round((potentialSavings / annualCost) * 100) 
    : 0;
  
  return (
    <Card className="bg-primary/5 h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Wallet className="mr-2 h-5 w-5 text-primary" />
          Budget Impact Analysis
        </CardTitle>
        <CardDescription>
          AI-powered financial insights for your SaaS portfolio
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="forecast">Forecast</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-3 bg-white">
                  <div className="text-xs text-muted-foreground mb-1">Current Annual Cost</div>
                  <div className="text-xl font-semibold text-primary">{formatPrice(annualCost)}</div>
                </div>
                
                <div className="border rounded-lg p-3 bg-white">
                  <div className="text-xs text-muted-foreground mb-1">Potential Annual Savings</div>
                  <div className="text-xl font-semibold text-green-600">{formatPrice(potentialSavings)}</div>
                </div>
              </div>
              
              <div className="border rounded-lg p-3 bg-white">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium">Optimization Opportunity</div>
                  <div className="text-sm font-medium text-green-600">{savingsPercentage}%</div>
                </div>
                <Progress value={savingsPercentage} className="h-2 mb-2" />
                <div className="flex text-xs text-muted-foreground justify-between">
                  <div>Current: {formatPrice(annualCost)}</div>
                  <div>Optimized: {formatPrice(optimizedCost)}</div>
                </div>
              </div>
              
              <h3 className="text-sm font-medium mt-2">Top 5 Apps by Cost</h3>
              <div className="space-y-3">
                {topApps.map((app, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <div className="font-medium">{app.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Optimization Score: {app.optimization}%
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{formatPrice(app.cost)}</div>
                      <div className="text-xs text-muted-foreground">per year</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="categories">
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => formatPrice(value)}
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-2">
              {categoryData.map((category, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span>{category.name}</span>
                  </div>
                  <div className="font-medium">{formatPrice(category.value)}</div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="forecast">
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costProjection} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis 
                    tickFormatter={(value) => formatPrice(value).split("€")[1]}
                    width={40} 
                    tick={{ fontSize: 10 }} 
                  />
                  <Tooltip 
                    formatter={(value: number) => formatPrice(value)}
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar name="Current Path" dataKey="actual" fill="#4f46e5" />
                  <Bar name="Optimized Path" dataKey="optimized" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="border rounded-lg p-3 bg-white/80 space-y-1">
              <h3 className="text-sm font-medium flex items-center">
                <TrendingDown className="h-4 w-4 mr-1 text-green-500" />
                Optimization Projection
              </h3>
              <p className="text-xs text-muted-foreground">
                By implementing AI recommendations, your annual SaaS spending could decrease by {formatPrice(potentialSavings)} ({savingsPercentage}%).
              </p>
              <p className="text-xs text-muted-foreground">
                The optimization path shows gradual implementation of savings opportunities over time.
              </p>
            </div>
            
            <Button variant="outline" size="sm" className="w-full mt-4">
              <DollarSign className="h-4 w-4 mr-1.5" />
              Export Financial Report
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BudgetImpact;
