// src/components/MetricCard.tsx
import { Card, Group, Text } from '@mantine/core';

export interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | null;
  color?: {
    up?: string;
    down?: string;
    neutral?: string;
  };
}

export const MetricCard = ({ 
  title, 
  value, 
  trend = null,
  color = {
    up: 'green',
    down: 'red',
    neutral: 'white'
  }
}: MetricCardProps) => (
  <Card p="xs" radius="md" style={{ backgroundColor: '#1e1e1e' }}>
    <Group>
      <Text size="sm">{title}</Text>
      <Text
        size="lg"
        c={trend === 'up' ? color.up : trend === 'down' ? color.down : color.neutral}
      >
        {typeof value === 'number' ? value.toLocaleString() : value}
        {trend === 'up' && '▲'}
        {trend === 'down' && '▼'}
      </Text>
    </Group>
  </Card>
);

export default MetricCard;