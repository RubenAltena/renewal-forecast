
// Real app data with accurate icons and names
interface AppInfo {
  name: string;
  icon: string;
  category: string;
}

export const realAppData: AppInfo[] = [
  {
    name: "Slack",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968705.png",
    category: "Communication"
  },
  {
    name: "Jira",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968875.png",
    category: "Project Management"
  },
  {
    name: "Gmail",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968853.png",
    category: "Communication"
  },
  {
    name: "Trello",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968756.png",
    category: "Project Management"
  },
  {
    name: "GitHub",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968933.png",
    category: "Development"
  },
  {
    name: "Figma",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968672.png",
    category: "Design"
  },
  {
    name: "Adobe XD",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968759.png",
    category: "Design"
  },
  {
    name: "Dropbox",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968520.png",
    category: "Storage"
  },
  {
    name: "Microsoft Teams",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968885.png",
    category: "Communication"
  },
  {
    name: "Zoom",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968472.png",
    category: "Communication"
  },
  {
    name: "Notion",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968817.png",
    category: "Productivity"
  },
  {
    name: "Google Drive",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968866.png",
    category: "Storage"
  },
  {
    name: "Asana",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968670.png",
    category: "Project Management"
  },
  {
    name: "Monday.com",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968738.png",
    category: "Project Management"
  },
  {
    name: "Basecamp",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968798.png",
    category: "Project Management"
  },
  {
    name: "HubSpot",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968843.png",
    category: "Marketing"
  },
  {
    name: "Salesforce",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968895.png",
    category: "CRM"
  },
  {
    name: "Zendesk",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968906.png",
    category: "Customer Support"
  },
  {
    name: "Adobe Photoshop",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968520.png",
    category: "Design"
  },
  {
    name: "Adobe Illustrator",
    icon: "https://cdn-icons-png.flaticon.com/512/5968/5968472.png",
    category: "Design"
  }
];

export const getRandomApp = (): AppInfo => {
  const randomIndex = Math.floor(Math.random() * realAppData.length);
  return realAppData[randomIndex];
};
