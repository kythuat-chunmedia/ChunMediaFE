// Menu item type
export interface MenuItem {
  id: string;
  label: string;
  href: string;
  children?: MenuItem[];
}

// Service item type
export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
}

// Portfolio item type
export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  industry: string;
  year: string;
  image: string;
  description: string;
  stats: {
    reach: string;
    engagement: string;
    conversion: string;
  };
}

// News item type
export interface NewsItem {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  isHiring?: boolean;
}

// Team member type
export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
}

// Timeline item type
export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

// Award item type
export interface AwardItem {
  year: string;
  title: string;
  organization: string;
}

// Contact info type
export interface ContactInfo {
  address: string;
  phones: string[];
  emails: string[];
  workingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
}
