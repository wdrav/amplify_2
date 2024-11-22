import { Card, Title, Text, Button } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import { ResponsiveContainer, LineChart, BarChart, XAxis, YAxis, Tooltip, Line, Bar } from 'recharts';

interface Variable {
  key: string;
  color: string;
  label?: string;  // Optional display label
}

interface ChartCardProps {
  title: string;
  subtitle: string;
  chartType: 'line' | 'bar';
  data: any[];
  variables: Variable[];
  domain?: [number | 'auto', number | 'auto'];
}

export const ChartCardComp = ({ 
  title, 
  subtitle, 
  chartType, 
  data, 
  variables,
  domain = ['auto', 'auto']
}: ChartCardProps) => {
  const theme = useMantineTheme();

  const renderLines = () => (
    variables.map(({ key, color, label }) => (
      <Line
        key={key}
        type="monotone"
        dataKey={key}
        name={label || key}
        stroke={color}
        strokeWidth={2}
        dot={false}
      />
    ))
  );

  const renderBars = () => (
    variables.map(({ key, color, label }) => (
      <Bar
        key={key}
        dataKey={key}
        name={label || key}
        fill={color}
      />
    ))
  );

  return (
    <Card p="xs" radius="md" style={{ backgroundColor: '#1e1e1e' }}>
      <Title order={4}>{title}</Title>
      <Text size="sm" color="dimmed">
        {subtitle}
      </Text>
      <ResponsiveContainer width="100%" height={200}>
        {chartType === 'line' ? (
          <LineChart data={data}>
            <XAxis dataKey="name" stroke={theme.colors.gray[6]} />
            <YAxis stroke={theme.colors.gray[6]} domain={domain} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e1e1e' }}
              formatter={(value: number, name: string) => [value, name]}
            />
            {renderLines()}
          </LineChart>
        ) : (
          <BarChart data={data}>
            <XAxis dataKey="name" stroke={theme.colors.gray[6]} />
            <YAxis stroke={theme.colors.gray[6]} domain={domain} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e1e1e' }}
              formatter={(value: number, name: string) => [value, name]}
            />
            {renderBars()}
          </BarChart>
        )}
      </ResponsiveContainer>
      <Button variant="subtle" fullWidth mt="sm" style={{ color: '#4dabf7' }}>
        See Insights
      </Button>
    </Card>
  );
};

// Example usage:
const ExampleUsage = () => {
  // Example data
  const data = [
    { name: 'Jan', sales: 400, profit: 240, growth: 20 },
    { name: 'Feb', sales: 300, profit: 139, growth: 15 },
    { name: 'Mar', sales: 200, profit: 980, growth: 25 },
  ];

  // Define variables to track
  const variables = [
    { key: 'sales', color: '#0671bc', label: 'Sales Volume' },
    { key: 'profit', color: '#00a25d', label: 'Net Profit' },
    { key: 'growth', color: '#9a0001', label: 'Growth Rate' }
  ];

  return (
    <ChartCardComp
      title="Sales Performance"
      subtitle="Monthly sales and profit analysis"
      chartType="line"
      data={data}
      variables={variables}
      domain={[0, 1000]}  // Optional: specify custom domain
    />
  );
};

// Another example with bar chart
const BarChartExample = () => {
  const data = [
    { name: 'Q1', revenue: 1000, costs: 600 },
    { name: 'Q2', revenue: 1200, costs: 700 },
    { name: 'Q3', revenue: 900, costs: 500 },
  ];

  const variables = [
    { key: 'revenue', color: '#4CAF50', label: 'Revenue' },
    { key: 'costs', color: '#F44336', label: 'Costs' }
  ];

  return (
    <ChartCardComp
      title="Quarterly Performance"
      subtitle="Revenue vs Costs"
      chartType="bar"
      data={data}
      variables={variables}
    />
  );
};