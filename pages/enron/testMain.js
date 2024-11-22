import React from 'react';
import { BarChart2, Briefcase, Database, FileText, Home, Users } from 'lucide-react';
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  AppShell,
  Box,
  Button,
  Card,
  Grid,
  Group,
  MantineProvider,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';

const mockLineData = [
  { name: 'Jan', value1: 400, value2: 240, value3: 240 },
  { name: 'Feb', value1: 300, value2: 139, value3: 221 },
  { name: 'Mar', value1: 200, value2: 980, value3: 229 },
  { name: 'Apr', value1: 278, value2: 390, value3: 200 },
  { name: 'May', value1: 189, value2: 480, value3: 218 },
];

const mockBarData = [
  { name: 'Week 1', value: 10 },
  { name: 'Week 2', value: 15 },
  { name: 'Week 3', value: 20 },
  { name: 'Week 4', value: 25 },
  { name: 'Week 5', value: 22 },
  { name: 'Week 6', value: 30 },
  { name: 'Week 7', value: 40 },
];

const MetricCard = ({ title, value, trend }) => (
  <Card p="xs" radius="md" style={{ backgroundColor: '#1e1e1e' }}>
    <Group position="apart">
      <Text size="sm">{title}</Text>
      <Text
        size="lg"
        weight={700}
        color={trend === 'up' ? 'green' : trend === 'down' ? 'red' : 'gray'}
      >
        {value}
        {trend === 'up' && '▲'}
        {trend === 'down' && '▼'}
      </Text>
    </Group>
  </Card>
);

const ChartCard = ({ title, subtitle, chartType }) => {
  const theme = useMantineTheme();
  return (
    <Card p="xs" radius="md" style={{ backgroundColor: '#1e1e1e' }}>
      <Title order={4}>{title}</Title>
      <Text size="sm" color="dimmed">
        {subtitle}
      </Text>
      <ResponsiveContainer width="100%" height={200}>
        {chartType === 'line' ? (
          <LineChart data={mockLineData}>
            <XAxis dataKey="name" stroke={theme.colors.gray[6]} />
            <YAxis stroke={theme.colors.gray[6]} />
            <Tooltip contentStyle={{ backgroundColor: '#1e1e1e' }} />
            <Line type="monotone" dataKey="value1" stroke="#8884d8" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="value2" stroke="#82ca9d" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="value3" stroke="#ffc658" strokeWidth={2} dot={false} />
          </LineChart>
        ) : (
          <BarChart data={mockBarData}>
            <XAxis dataKey="name" stroke={theme.colors.gray[6]} />
            <YAxis stroke={theme.colors.gray[6]} />
            <Tooltip contentStyle={{ backgroundColor: '#1e1e1e' }} />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        )}
      </ResponsiveContainer>
      <Button variant="subtle" fullWidth mt="sm" style={{ color: '#4dabf7' }}>
        See Insights
      </Button>
    </Card>
  );
};

const SidebarButton = ({ icon: Icon, label }) => (
  <Button
    lefticon={<Icon size={20} />}
    variant="subtle"
    fullWidth
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

const CustomSidebar = () => (
  <Box
    sx={(theme) => ({
      width: 250,
      height: '100%',
      backgroundColor: '#1e1e1e',
      padding: theme.spacing.md,
      display: 'flex',
      flexDirection: 'column',
    })}
  >
    <Title order={3} align="center" mb="xl">
      Measures AI
    </Title>
    <Stack spacing="md" style={{ flex: 1 }}>
      <SidebarButton icon={Home} label="Dashboard" />
      <SidebarButton icon={Users} label="My Organization" />
      <SidebarButton icon={BarChart2} label="My Measures" />
      <SidebarButton icon={Briefcase} label="My Actions" />
      <SidebarButton icon={FileText} label="My Insights" />
      <SidebarButton icon={Database} label="My Data" />
    </Stack>
    <Box mt="auto">
      <Text align="center">Jeffrey Skilling</Text>
      <Text size="xs" c="dimmed" align="center">
        jskilling@enron.com
      </Text>
    </Box>
  </Box>
);

const Dashboard = () => {
  const [metricsData, setMetricsData] = useState(null); // State for fetched data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the metrics data from the API
    const fetchMetricsData = async () => {
      try {
        const response = await fetch('http://localhost:8000/core/submetrics/'); // Your actual API URL
        if (!response.ok) {
          // throw new Error('Network response was not ok');
          console.log("Network response was not ok");
        } else {
          const data = await response.json();
          setMetricsData(data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetricsData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const generateChartData = (metricData) => {
    if (!metricData) {
        return [];  // Return an empty array if the data is null or undefined
    }
    return metricData.map(metric => ({
        name: metric.name,  // Week name (e.g., Week 1, Week 2)
        start_date: metric.start_date,
        end_date: metric.end_date,
        data: metric.data.map(weekData => ({
          weekNum: weekData.name,
          dp1: weekData.dept1,
          dp2: weekData.dept2,
          dp3: weekData.dept3,
        }))
    }));
  };

  var data = generateChartData(metricsData);

  return (
  <MantineProvider
    theme={{
      colorScheme: 'dark',
      colors: {
        dark: [
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#ffffff',
          '#000000',
          '#141517',
          '#101113',
        ],
      },
    }}
    withGlobalStyles
    withNormalizeCSS
  >
    <AppShell
      padding="md"
      // navbar={<CustomSidebar />}
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.dark[9],
        },
      })}
    >
      <Grid>
        <Grid.Col span="content" style={{ width: '250p' }}>
          {<CustomSidebar />}
        </Grid.Col>
        <Grid.Col span="auto">
          <br></br>
          <Title style={{ fontSize: 42 }}>How is Enron doing today?</Title>
          <br></br>
          <Grid>
            <Grid.Col span={2}>
              <MetricCard title="Engagement" value="26%" trend="up" />
            </Grid.Col>
            <Grid.Col span={2}>
              <MetricCard title="Compliance" value="-11%" trend="down" />
            </Grid.Col>
            <Grid.Col span={2}>
              <MetricCard title="Fraud" value="110%" trend="up" />
            </Grid.Col>
            <Grid.Col span={2}>
              <MetricCard title="Taxes Paid" value="99%" trend="down" />
            </Grid.Col>
            <Grid.Col span={2}>
              <MetricCard title="Client Eng." value="4%" />
            </Grid.Col>
            <Grid.Col span={2}>
              <MetricCard title="Transparency" value="12%" trend="up" />
            </Grid.Col>

          <Grid.Col span={8}>
            <ChartCard
              title="Employee Engagement is Increasing!"
              subtitle="It's particularly strong on the trading floor and in upper management."
              chartType="line"
              data={data}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <ChartCard
              title="More new ideas this week than in the last 10."
              subtitle="Managers are soliciting their direct reports 224% more often than usual, and 22% of new ideas are being acted upon."
              chartType="bar"
              data={mockBarData}
            />
          </Grid.Col>

            <Grid.Col span={6}>
              <ChartCard title="Transparency is stable." subtitle="" chartType="line" />
            </Grid.Col>
            <Grid.Col span={6}>
              <ChartCard title="Accountability is declining." subtitle="" chartType="line" />
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </AppShell>
  </MantineProvider>
);

export default Dashboard;
