import { format } from "date-fns";

export interface AppRenewal {
  id: string;
  name: string;
  icon: string;
  price: number;
  renewalDate: Date;
  billingCycle: "monthly" | "quarterly" | "annual";
  category: string;
  status: "coming up" | "in progress" | "recently done";
  usageData?: {
    totalUsers: number;
    activeUsers: number;
    moderatelyActiveUsers: number;
    inactiveUsers: number;
  };
  aiInsights?: {
    optimizationScore: number; // 0-100
    savingsPotential?: number;
    recommendations?: string[];
    benchmarkData?: {
      industryAvgPrice: number;
      percentileRank: number; // 0-100, lower is better
    };
    negotiationTips?: string[];
  };
}

// Function to generate a random date within a specific month and year
const getRandomDateInMonth = (year: number, month: number) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const day = Math.floor(Math.random() * daysInMonth) + 1;
  return new Date(year, month, day);
};

// Function to determine status based on renewalDate
const getRenewalStatus = (renewalDate: Date): "coming up" | "in progress" | "recently done" => {
  const today = new Date();
  const diffTime = renewalDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return "recently done";
  if (diffDays < 7) return "in progress";
  return "coming up";
};

// Function to generate random usage data
const generateUsageData = () => {
  const activeUsers = Math.floor(Math.random() * 10) + 1;
  const moderatelyActiveUsers = Math.floor(Math.random() * 5) + 1;
  const inactiveUsers = Math.floor(Math.random() * 3) + 1;
  
  return {
    totalUsers: activeUsers + moderatelyActiveUsers + inactiveUsers,
    activeUsers,
    moderatelyActiveUsers,
    inactiveUsers
  };
};

// Function to generate random AI insights
const generateAIInsights = (price: number, name: string, category: string): AppRenewal['aiInsights'] => {
  const optimizationScore = Math.floor(Math.random() * 101); // 0-100
  const hasSavingsPotential = optimizationScore < 70;
  const savingsPotential = hasSavingsPotential ? Math.round(price * (Math.random() * 0.3 + 0.05)) : 0; // 5-35% savings
  
  const recommendations = [];
  if (optimizationScore < 30) {
    recommendations.push(`Consider alternatives to ${name} with better price-to-feature ratio`);
  }
  if (optimizationScore < 50) {
    recommendations.push(`Consolidate licenses based on actual usage patterns`);
  }
  if (optimizationScore < 70) {
    recommendations.push(`Negotiate multi-year contract for additional discounts`);
  }
  
  const percentileRank = Math.floor(Math.random() * 101);
  const industryAvgPrice = price * (0.7 + (percentileRank / 100) * 0.6); // industry avg is 70-130% of current price
  
  const negotiationTips = [
    `Ask for ${Math.floor(Math.random() * 10) + 10}% volume discount based on your usage profile`,
    `Reference recent pricing given to similar companies in your industry`,
    `Request complementary onboarding or training for new team members`,
    `Inquire about upcoming features that might be included in current contract`
  ];
  
  // Randomly select 2 negotiation tips
  const selectedTips = negotiationTips
    .sort(() => 0.5 - Math.random())
    .slice(0, 2);
  
  return {
    optimizationScore,
    savingsPotential: hasSavingsPotential ? savingsPotential : undefined,
    recommendations: recommendations.length > 0 ? recommendations : undefined,
    benchmarkData: {
      industryAvgPrice: Math.round(industryAvgPrice),
      percentileRank
    },
    negotiationTips: selectedTips
  };
};

// Function to generate app renewals for the entire year
export const generateYearlyRenewals = (year: number): AppRenewal[] => {
  const appIcons = [
    "https://cdn-icons-png.flaticon.com/512/5968/5968705.png", // Slack
    "https://cdn-icons-png.flaticon.com/512/5968/5968875.png", // Jira
    "https://cdn-icons-png.flaticon.com/512/5968/5968853.png", // Gmail
    "https://cdn-icons-png.flaticon.com/512/5968/5968756.png", // Trello
    "https://cdn-icons-png.flaticon.com/512/5968/5968933.png", // Github
    "https://cdn-icons-png.flaticon.com/512/5968/5968672.png", // Figma
    "https://cdn-icons-png.flaticon.com/512/5968/5968759.png", // Adobe XD
    "https://cdn-icons-png.flaticon.com/512/5968/5968520.png", // Dropbox
    "https://cdn-icons-png.flaticon.com/512/5968/5968885.png", // Microsoft Teams
    "https://cdn-icons-png.flaticon.com/512/5968/5968472.png", // Zoom
    "https://cdn-icons-png.flaticon.com/512/5968/5968817.png", // Notion
    "https://cdn-icons-png.flaticon.com/512/5968/5968866.png", // Google Drive
  ];
  
  const appNames = [
    "Slack", "Jira", "Gmail", "Trello", "GitHub", "Figma", 
    "Adobe XD", "Dropbox", "MS Teams", "Zoom", "Notion", "Google Drive",
    "Asana", "Monday", "Basecamp", "HubSpot", "Salesforce", "Zendesk",
    "QuickBooks", "Mailchimp", "Airtable", "Canva", "InVision", "Miro",
    "AWS", "Azure", "GCP", "DocuSign", "PagerDuty", "Okta",
    "Atlassian", "Box", "Zapier", "Intercom", "Amplitude", "ClickUp"
  ];
  
  const categories = [
    "Communication", "Project Management", "Design", "Development", 
    "Marketing", "Finance", "HR", "Customer Support", "Productivity",
    "Infrastructure", "Security", "Analytics"
  ];
  
  const renewals: AppRenewal[] = [];
  
  for (let month = 0; month < 12; month++) {
    if (month === 7) continue;
    
    const renewalsThisMonth = Math.floor(Math.random() * 5) + 3;
    
    for (let i = 0; i < renewalsThisMonth; i++) {
      const appNameIndex = Math.floor(Math.random() * appNames.length);
      const appName = appNames[appNameIndex];
      
      appNames.splice(appNameIndex, 1);
      
      if (appNames.length === 0) break;
      
      const iconIndex = Math.floor(Math.random() * appIcons.length);
      const categoryIndex = Math.floor(Math.random() * categories.length);
      const renewalDate = getRandomDateInMonth(year, month);
      const price = Math.floor(Math.random() * 950) + 50;
      const category = categories[categoryIndex];
      
      renewals.push({
        id: `app-${month}-${i}`,
        name: appName,
        icon: appIcons[iconIndex],
        price: price,
        renewalDate: renewalDate,
        billingCycle: ["monthly", "quarterly", "annual"][Math.floor(Math.random() * 3)] as "monthly" | "quarterly" | "annual",
        category: category,
        status: getRenewalStatus(renewalDate),
        usageData: generateUsageData(),
        aiInsights: generateAIInsights(price, appName, category)
      });
    }
  }
  
  return renewals;
};

// Function to get renewals for a specific month
export const getRenewalsForMonth = (renewals: AppRenewal[], month: number): AppRenewal[] => {
  return renewals.filter(renewal => renewal.renewalDate.getMonth() === month);
};

// Function to get the next upcoming renewal
export const getNextUpcomingRenewal = (renewals: AppRenewal[]): AppRenewal | null => {
  const today = new Date();
  const futureRenewals = renewals.filter(renewal => renewal.renewalDate >= today);
  
  if (futureRenewals.length === 0) return null;
  
  return futureRenewals.sort((a, b) => a.renewalDate.getTime() - b.renewalDate.getTime())[0];
};

// Function to format a date
export const formatRenewalDate = (date: Date): string => {
  return format(date, "MMMM d, yyyy");
};

// Function to format price
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
};

// Get month name
export const getMonthName = (month: number): string => {
  return new Date(2000, month, 1).toLocaleString('default', { month: 'long' });
};

// Calculate total annual cost of all renewals
export const calculateAnnualCost = (renewals: AppRenewal[]): number => {
  return renewals.reduce((total, renewal) => {
    switch (renewal.billingCycle) {
      case "monthly":
        return total + (renewal.price * 12);
      case "quarterly":
        return total + (renewal.price * 4);
      case "annual":
        return total + renewal.price;
      default:
        return total;
    }
  }, 0);
};

// Calculate potential annual savings based on AI insights
export const calculatePotentialSavings = (renewals: AppRenewal[]): number => {
  return renewals.reduce((total, renewal) => {
    if (renewal.aiInsights?.savingsPotential) {
      switch (renewal.billingCycle) {
        case "monthly":
          return total + (renewal.aiInsights.savingsPotential * 12);
        case "quarterly":
          return total + (renewal.aiInsights.savingsPotential * 4);
        case "annual":
          return total + renewal.aiInsights.savingsPotential;
        default:
          return total;
      }
    }
    return total;
  }, 0);
};

// Get apps that need optimization (score < 70)
export const getAppsNeedingOptimization = (renewals: AppRenewal[]): AppRenewal[] => {
  return renewals.filter(renewal => 
    renewal.aiInsights && renewal.aiInsights.optimizationScore < 70
  ).sort((a, b) => 
    (a.aiInsights?.optimizationScore || 0) - (b.aiInsights?.optimizationScore || 0)
  );
};

// Get urgent renewals (coming up in next 30 days with optimization opportunities)
export const getUrgentRenewals = (renewals: AppRenewal[]): AppRenewal[] => {
  const today = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(today.getDate() + 30);
  
  return renewals.filter(renewal => 
    renewal.renewalDate >= today && 
    renewal.renewalDate <= thirtyDaysFromNow && 
    renewal.aiInsights && 
    renewal.aiInsights.optimizationScore < 70
  ).sort((a, b) => a.renewalDate.getTime() - b.renewalDate.getTime());
};
