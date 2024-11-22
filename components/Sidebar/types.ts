import { Icon as LucideIcon } from 'lucide-react';

export interface NavItem {
  icon: LucideIcon;
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface UserProfile {
  name: string;
  email: string;
  image?: {
    src: string;
    alt: string;
  };
}

export interface SidebarProps {
  title: string;
  navItems: NavItem[];
  userProfile?: UserProfile;
  logo?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  theme?: {
    backgroundColor?: string;
    width?: number;
  };
}