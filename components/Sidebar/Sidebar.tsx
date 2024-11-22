import { Box, Title, Stack } from '@mantine/core';
import { SidebarButton } from './SidebarButton';
import { UserProfileSection } from './UserProfileSection';
import type { SidebarProps } from './types';
import Image from 'next/image';

export const Sidebar = ({ 
  title, 
  navItems, 
  userProfile,
  logo,
  theme = {
    backgroundColor: '#1e1e1e',
    width: 250
  }
}: SidebarProps) => (
  <><br></br>
  <Box
    sx={(theme) => ({
      width: theme.width,
      height: '100%',
      backgroundColor: theme.backgroundColor,
      padding: theme.spacing.md,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    })}
  >
    <Title order={3} align="center" mb="l">
      {title}
    </Title>

    {logo && (
      <Image
        src={logo.src}
        width={logo.width || 100}
        height={logo.height || 100}
        alt={logo.alt}
        style={{ display: 'block', margin: '20px auto' }} />
    )}

    {userProfile && <UserProfileSection profile={userProfile} />}

    <Stack spacing="md" style={{ flex: 1, width: '100%', marginTop: 20 }}>
      {navItems.map((item, index) => (
        <SidebarButton
          key={index}
          icon={item.icon}
          label={item.label}
          onClick={item.onClick}
          href={item.href} />
      ))}
    </Stack>
  </Box></>
);

export default Sidebar;