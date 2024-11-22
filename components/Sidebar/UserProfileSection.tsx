import { Box, Text } from '@mantine/core';
import type { UserProfile } from './types';

interface UserProfileSectionProps {
  profile: UserProfile;
}

export const UserProfileSection = ({ profile }: UserProfileSectionProps) => (
  <Box mt="auto" style={{ textAlign: 'center' }}>
    <Text>{profile.name}</Text>
    <Text size="xs" c="dimmed">
      {profile.email}
    </Text>
  </Box>
);