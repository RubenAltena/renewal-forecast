
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

// Function to generate app renewals for the entire year
export const generateYearlyRenewals = (year: number): AppRenewal[] => {
  const appIcons = [
    // SaaS icons (URLs would be replaced with actual icons in a real app)
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
  
  // Create renewals for the year
  const renewals: AppRenewal[] = [];
  
  // Generate 3-7 renewals per month
  for (let month = 0; month < 12; month++) {
    // Skip August (month 7) to simulate a month with no renewals
    if (month === 7) continue;
    
    const renewalsThisMonth = Math.floor(Math.random() * 5) + 3; // 3 to 7 renewals
    
    for (let i = 0; i < renewalsThisMonth; i++) {
      const appNameIndex = Math.floor(Math.random() * appNames.length);
      const appName = appNames[appNameIndex];
      
      // Remove used name to avoid duplicates
      appNames.splice(appNameIndex, 1);
      
      if (appNames.length === 0) break; // Stop if we run out of unique names
      
      const iconIndex = Math.floor(Math.random() * appIcons.length);
      const categoryIndex = Math.floor(Math.random() * categories.length);
      const renewalDate = getRandomDateInMonth(year, month);
      
      renewals.push({
        id: `app-${month}-${i}`,
        name: appName,
        icon: appIcons[iconIndex],
        price: Math.floor(Math.random() * 950) + 50, // $50 to $999
        renewalDate: renewalDate,
        billingCycle: ["monthly", "quarterly", "annual"][Math.floor(Math.random() * 3)] as "monthly" | "quarterly" | "annual",
        category: categories[categoryIndex],
        status: getRenewalStatus(renewalDate),
        usageData: generateUsageData()
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
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

// Get month name
export const getMonthName = (month: number): string => {
  return new Date(2000, month, 1).toLocaleString('default', { month: 'long' });
};

