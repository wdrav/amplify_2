import { Button } from '@mantine/core';
import { Icon as LucideIcon } from 'lucide-react';

interface SidebarButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  href?: string;
}

export const SidebarButton = ({ icon: Icon, label, onClick, href }: SidebarButtonProps) => (
  <Button
    component={href ? 'a' : 'button'}
    href={href}
    leftSection={<Icon size={20} />}
    variant="subtle"
    fullWidth
    onClick={onClick}
    styles={(theme) => ({
      root: {
        color: theme.colors.gray[4],
        '&:hover': {
          backgroundColor: theme.colors.dark[6],
        },
      },
    })}
  >
    {label}
  </Button>
);