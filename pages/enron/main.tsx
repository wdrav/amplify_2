import React from 'react';
import Image from 'next/image';
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
import enron from '../../public/images/Enron.jpg';
import { useState } from 'react';
import { Modal } from '@mantine/core';
import { ChartCardComp } from '@/components/ChartCardComp/CharCardComp';
import { MetricCard } from '@/components/MetricCard/MetricCard';
import { Sidebar } from '@/components/Sidebar';

// const mockLineData = [
//   { name: 'Week 1', friendliness: 91.76, stress: 86.47, overwork_percentage: 100 - 0.0 },
//   { name: 'Week 2', friendliness: 89.05, stress: 89.42, overwork_percentage: 100 - 0.0 },
//   { name: 'Week 3', friendliness: 90.0, stress: 86.5, overwork_percentage: 100 - 8.7 },
//   { name: 'Week 4', friendliness: 88.33, stress: 88.33, overwork_percentage: 100 - 9 },
//   { name: 'Week 5', friendliness: 87.34, stress: 84.26, overwork_percentage: 100 - 5.6 },
// ];

const mockLineData = [
  { name: 'Week 1', friendliness: 91.76, stress: 13.53, overwork_percentage: 0.0 },
  { name: 'Week 2', friendliness: 89.05, stress: 10.48, overwork_percentage: 0.0 },
  { name: 'Week 3', friendliness: 90.0, stress: 13.5, overwork_percentage: 0.0 },
  { name: 'Week 4', friendliness: 88.33, stress: 11.67, overwork_percentage: 0.0 },
  { name: 'Week 5', friendliness: 87.34, stress: 15.74, overwork_percentage: 2.13 },
  { name: 'Week 6', friendliness: 90.59, stress: 12.94, overwork_percentage: 0.0 },
  { name: 'Week 7', friendliness: 93.75, stress: 7.5, overwork_percentage: 0.0 },
  { name: 'Week 8', friendliness: 89.21, stress: 18.95, overwork_percentage: 0.0 },
  { name: 'Week 9', friendliness: 87.42, stress: 15.16, overwork_percentage: 6.45 },
  { name: 'Week 10', friendliness: 87.17, stress: 18.7, overwork_percentage: 0.0 },
  { name: 'Week 11', friendliness: 86.67, stress: 21.11, overwork_percentage: 0.0 },
  { name: 'Week 12', friendliness: 86.05, stress: 13.68, overwork_percentage: 0.0 },
  { name: 'Week 13', friendliness: 86.49, stress: 17.16, overwork_percentage: 1.49 },
  { name: 'Week 14', friendliness: 86.74, stress: 16.74, overwork_percentage: 1.52 },
  { name: 'Week 15', friendliness: 93.33, stress: 13.33, overwork_percentage: 0.0 },
  { name: 'Week 16', friendliness: 89.52, stress: 17.14, overwork_percentage: 0.0 },
  { name: 'Week 17', friendliness: 87.83, stress: 16.17, overwork_percentage: 0.0 },
  { name: 'Week 18', friendliness: 85.38, stress: 13.85, overwork_percentage: 0.0 },
  { name: 'Week 19', friendliness: 87.27, stress: 12.73, overwork_percentage: 0.0 },
  { name: 'Week 20', friendliness: 87.08, stress: 15.0, overwork_percentage: 0.0 },
  { name: 'Week 21', friendliness: 90.0, stress: 15.0, overwork_percentage: 0.0 },
  { name: 'Week 22', friendliness: 85.62, stress: 18.75, overwork_percentage: 8.33 },
  { name: 'Week 23', friendliness: 90.0, stress: 16.67, overwork_percentage: 0.0 },
  { name: 'Week 24', friendliness: 90.16, stress: 15.62, overwork_percentage: 0.0 },
  { name: 'Week 25', friendliness: 88.56, stress: 12.58, overwork_percentage: 1.52 },
  { name: 'Week 26', friendliness: 85.41, stress: 15.48, overwork_percentage: 1.37 },
  { name: 'Week 27', friendliness: 89.76, stress: 15.0, overwork_percentage: 0.0 },
  { name: 'Week 28', friendliness: 79.5, stress: 14.5, overwork_percentage: 10.0 },
  { name: 'Week 29', friendliness: 88.75, stress: 12.5, overwork_percentage: 0.0 },
  { name: 'Week 30', friendliness: 87.68, stress: 17.8, overwork_percentage: 2.44 },
  { name: 'Week 31', friendliness: 90.13, stress: 15.0, overwork_percentage: 0.0 },
  { name: 'Week 32', friendliness: 88.57, stress: 15.0, overwork_percentage: 0.0 },
  { name: 'Week 33', friendliness: 88.29, stress: 20.0, overwork_percentage: 0.0 },
  { name: 'Week 34', friendliness: 89.91, stress: 14.53, overwork_percentage: 0.0 },
  { name: 'Week 35', friendliness: 89.1, stress: 15.13, overwork_percentage: 0.0 },
  { name: 'Week 36', friendliness: 89.64, stress: 14.64, overwork_percentage: 0.0 },
  { name: 'Week 37', friendliness: 90.0, stress: 16.92, overwork_percentage: 0.0 },
  { name: 'Week 38', friendliness: 89.23, stress: 14.23, overwork_percentage: 0.0 },
  { name: 'Week 39', friendliness: 85.12, stress: 16.25, overwork_percentage: 2.5 },
  { name: 'Week 40', friendliness: 88.21, stress: 13.57, overwork_percentage: 0.0 },
  { name: 'Week 41', friendliness: 87.22, stress: 16.39, overwork_percentage: 0.0 },
  { name: 'Week 42', friendliness: 85.45, stress: 17.27, overwork_percentage: 0.0 },
  { name: 'Week 43', friendliness: 87.79, stress: 14.88, overwork_percentage: 0.0 },
  { name: 'Week 44', friendliness: 83.57, stress: 19.29, overwork_percentage: 7.14 },
  { name: 'Week 45', friendliness: 87.71, stress: 17.43, overwork_percentage: 0.0 },
  { name: 'Week 46', friendliness: 88.16, stress: 18.42, overwork_percentage: 5.26 },
  { name: 'Week 47', friendliness: 80.77, stress: 24.62, overwork_percentage: 15.38 },
  { name: 'Week 48', friendliness: 88.89, stress: 15.74, overwork_percentage: 1.85 },
  { name: 'Week 49', friendliness: 89.14, stress: 14.83, overwork_percentage: 1.15 },
  { name: 'Week 50', friendliness: 87.14, stress: 17.86, overwork_percentage: 0.0 },
  { name: 'Week 51', friendliness: 86.96, stress: 16.87, overwork_percentage: 0.87 },
  { name: 'Week 52', friendliness: 88.75, stress: 16.25, overwork_percentage: 0.0 }
];

const mockLineDataVars = [
  { key: 'friendliness', color: '#0671bc', label: 'Friendliness' },
  { key: 'stress', color: '#00a25d', label: 'Stress' },
  { key: 'overwork_percentage', color: '#9a0001', label: 'Overwork' },
]

const mockBarData = [
  { name: 'Week 1', New_ideas: 1121 },
  { name: 'Week 2', New_ideas: 750 },
  { name: 'Week 3', New_ideas: 644 },
  { name: 'Week 4', New_ideas: 510 },
  { name: 'Week 5', New_ideas: 321 },
  { name: 'Week 6', New_ideas: 212 },
  { name: 'Week 7', New_ideas: 267 },
  { name: 'Week 8', New_ideas: 188 },
  { name: 'Week 9', New_ideas: 242 },
  { name: 'Week 10', New_ideas: 244 },
  { name: 'Week 11', New_ideas: 281 },
  { name: 'Week 12', New_ideas: 122 },
  { name: 'Week 13', New_ideas: 250 },
  { name: 'Week 14', New_ideas: 310 },
  { name: 'Week 15', New_ideas: 299 },
  { name: 'Week 16', New_ideas: 321 },
  { name: 'Week 17', New_ideas: 319 },
  { name: 'Week 18', New_ideas: 333 },
  { name: 'Week 19', New_ideas: 355 },
  { name: 'Week 20', New_ideas: 342 },
  { name: 'Week 21', New_ideas: 344 },
  { name: 'Week 22', New_ideas: 392 },
  { name: 'Week 23', New_ideas: 370 },
  { name: 'Week 24', New_ideas: 501 },
  { name: 'Week 25', New_ideas: 412 },
  { name: 'Week 26', New_ideas: 411 },
  { name: 'Week 27', New_ideas: 436 },
  { name: 'Week 28', New_ideas: 427 },
  { name: 'Week 29', New_ideas: 452 },
  { name: 'Week 30', New_ideas: 402 },
  { name: 'Week 31', New_ideas: 439 },
  { name: 'Week 32', New_ideas: 452 },
  { name: 'Week 33', New_ideas: 497 },
  { name: 'Week 34', New_ideas: 488 },
  { name: 'Week 35', New_ideas: 532 },
  { name: 'Week 36', New_ideas: 452 },
  { name: 'Week 37', New_ideas: 454 },
  { name: 'Week 38', New_ideas: 473 },
  { name: 'Week 39', New_ideas: 510 },
  { name: 'Week 40', New_ideas: 462 },
  { name: 'Week 41', New_ideas: 464 },
  { name: 'Week 42', New_ideas: 466 },
  { name: 'Week 43', New_ideas: 488 },
  { name: 'Week 44', New_ideas: 472 },
  { name: 'Week 45', New_ideas: 482 },
  { name: 'Week 46', New_ideas: 477 },
  { name: 'Week 47', New_ideas: 402 },
  { name: 'Week 48', New_ideas: 453 },
  { name: 'Week 49', New_ideas: 470 },
  { name: 'Week 50', New_ideas: 468 },
  { name: 'Week 51', New_ideas: 422 },
  { name: 'Week 52', New_ideas: 433 }
];

const mockBarDataVars = [
  { key: 'New_ideas', color: '#00a25d', label: 'New Ideas' },
]
const mockLineData2 = [
  { name: 'Week 1', accountability: 78.7, clarity: 83.82, timeliness: 81.01 },
  { name: 'Week 2', accountability: 65.1, clarity: 77.17, timeliness: 59.43 },
  { name: 'Week 3', accountability: 76.58, clarity: 84.84, timeliness: 80.38 },
  { name: 'Week 4', accountability: 70.0, clarity: 73.22, timeliness: 68.39 },
  { name: 'Week 5', accountability: 61.95, clarity: 74.94, timeliness: 56.62 },
  { name: 'Week 6', accountability: 75.83, clarity: 78.18, timeliness: 80.28 },
  { name: 'Week 7', accountability: 52.6, clarity: 77.35, timeliness: 59.4 },
  { name: 'Week 8', accountability: 68.02, clarity: 74.34, timeliness: 67.05 },
  { name: 'Week 9', accountability: 58.53, clarity: 75.9, timeliness: 58.27 },
  { name: 'Week 10', accountability: 69.99, clarity: 72.68, timeliness: 65.98 },
  { name: 'Week 11', accountability: 73.71, clarity: 74.04, timeliness: 71.68 },
  { name: 'Week 12', accountability: 65.39, clarity: 76.73, timeliness: 62.94 },
  { name: 'Week 13', accountability: 84.13, clarity: 82.23, timeliness: 89.46 },
  { name: 'Week 14', accountability: 80.22, clarity: 86.64, timeliness: 82.08 },
  { name: 'Week 15', accountability: 75.12, clarity: 80.11, timeliness: 77.31 },
  { name: 'Week 16', accountability: 79.53, clarity: 80.35, timeliness: 82.81 },
  { name: 'Week 17', accountability: 69.04, clarity: 79.55, timeliness: 68.82 },
  { name: 'Week 18', accountability: 80.5, clarity: 86.14, timeliness: 79.97 },
  { name: 'Week 19', accountability: 62.67, clarity: 83.29, timeliness: 60.0 },
  { name: 'Week 20', accountability: 62.24, clarity: 78.65, timeliness: 58.32 },
  { name: 'Week 21', accountability: 76.09, clarity: 78.28, timeliness: 78.39 },
  { name: 'Week 22', accountability: 77.85, clarity: 84.92, timeliness: 83.36 },
  { name: 'Week 23', accountability: 74.37, clarity: 77.89, timeliness: 74.93 },
  { name: 'Week 24', accountability: 62.2, clarity: 74.24, timeliness: 54.16 },
  { name: 'Week 25', accountability: 61.15, clarity: 77.24, timeliness: 60.24 },
  { name: 'Week 26', accountability: 61.74, clarity: 72.42, timeliness: 58.62 },
  { name: 'Week 27', accountability: 61.31, clarity: 83.65, timeliness: 63.03 },
  { name: 'Week 28', accountability: 68.4, clarity: 74.68, timeliness: 66.02 },
  { name: 'Week 29', accountability: 65.68, clarity: 77.85, timeliness: 69.24 },
  { name: 'Week 30', accountability: 78.38, clarity: 77.77, timeliness: 80.37 },
  { name: 'Week 31', accountability: 69.31, clarity: 73.49, timeliness: 68.93 },
  { name: 'Week 32', accountability: 62.71, clarity: 75.76, timeliness: 56.77 },
  { name: 'Week 33', accountability: 63.93, clarity: 76.0, timeliness: 61.02 },
  { name: 'Week 34', accountability: 68.5, clarity: 76.99, timeliness: 61.22 },
  { name: 'Week 35', accountability: 76.81, clarity: 81.09, timeliness: 80.48 },
  { name: 'Week 36', accountability: 56.33, clarity: 71.29, timeliness: 52.43 },
  { name: 'Week 37', accountability: 65.14, clarity: 74.0, timeliness: 61.25 },
  { name: 'Week 38', accountability: 65.68, clarity: 75.04, timeliness: 61.92 },
  { name: 'Week 39', accountability: 64.86, clarity: 77.14, timeliness: 60.86 },
  { name: 'Week 40', accountability: 67.74, clarity: 73.14, timeliness: 66.08 },
  { name: 'Week 41', accountability: 52.25, clarity: 62.05, timeliness: 43.74 },
  { name: 'Week 42', accountability: 61.29, clarity: 72.92, timeliness: 52.72 },
  { name: 'Week 43', accountability: 64.1, clarity: 74.12, timeliness: 59.82 },
  { name: 'Week 44', accountability: 64.42, clarity: 74.64, timeliness: 62.63 },
  { name: 'Week 45', accountability: 63.94, clarity: 74.54, timeliness: 62.56 },
  { name: 'Week 46', accountability: 67.07, clarity: 72.3, timeliness: 64.26 },
  { name: 'Week 47', accountability: 58.95, clarity: 73.69, timeliness: 54.29 },
  { name: 'Week 48', accountability: 64.51, clarity: 76.4, timeliness: 59.03 },
  { name: 'Week 49', accountability: 55.48, clarity: 73.63, timeliness: 49.46 },
  { name: 'Week 50', accountability: 70.27, clarity: 74.67, timeliness: 67.51 },
  { name: 'Week 51', accountability: 66.78, clarity: 74.3, timeliness: 62.74 },
  { name: 'Week 52', accountability: 72.5, clarity: 75.15, timeliness: 75.15 }
];

const mockLineDataVars2 = [
  { key: 'accountability', color: '#0671bc', label: 'Accountability' },
  { key: 'clarity', color: '#00a25d', label: 'Clarity' },
  { key: 'timeliness', color: '#9a0001', label: 'Timeliness' },
]

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: Users, label: 'My Organization', href: '/organization' },
  { icon: BarChart2, label: 'My Measures', href: '/measures' },
  { icon: Briefcase, label: 'My Actions', href: '/actions' },
  { icon: FileText, label: 'My Insights', href: '/insights' },
  { icon: Database, label: 'My Data', href: '/data' }
];

const userProfile = {
  name: 'Jeffrey Skilling',
  email: 'jskilling@enron.com',
  image: {
    src: '/path/to/profile-image.jpg',
    alt: 'Jeffrey Skilling'
  }
};

const Dashboard = () => (
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
        <Grid.Col span={1.75} style={{ width: '350p' }}>
          
          {<Sidebar
            title="Measures AI"
            navItems={navItems}
            userProfile={userProfile}
            logo={{
              src: enron,
              alt: 'Enron Logo',
              width: 100,
              height: 100
            }}
            theme={{
              backgroundColor: '#1e1e1e',
              width: 250
            }}
          />}
        </Grid.Col>
        <Grid.Col span="auto">
          <br></br>
          <Title style={{ fontSize: 42 }}>How is Enron doing today?</Title>
          <br></br>
          <Grid>
            <Grid.Col span={2}>
              <MetricCard title="Accountability" value="8.5%" trend="up" />
            </Grid.Col>
            <Grid.Col span={2}>
              <MetricCard title="Compliance" value="-11%" trend="down" />
            </Grid.Col>
            <Grid.Col span={2}>
              <MetricCard title="Timeliness" value="19.8%" trend="up" />
            </Grid.Col>
            <Grid.Col span={2}>
              <MetricCard title="Taxes Paid" value="99%" trend="down" />
            </Grid.Col>
            <Grid.Col span={2}>
              <MetricCard title="Client Eng." value="4%" />
            </Grid.Col>
            <Grid.Col span={2}>
            </Grid.Col>

            <Grid.Col span={7}>
              <ChartCardComp
                title="Employee Engagement is Increasing!"
                subtitle="It's particularly strong on the trading floor and in upper management."
                chartType="line"
                data={mockLineData}
                variables={mockLineDataVars}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <ChartCardComp
                title="Fewer new ideas this week than in the last 10."
                subtitle=""
                chartType="bar"
                data={mockBarData}
                variables={mockBarDataVars}
              />
            </Grid.Col>

            {/* <Grid.Col span={6}>
              <ChartCard title="Transparency is stable." 
              subtitle="" 
              chartType="line" 
              />
            </Grid.Col> */}
            <Grid.Col span={10}>
              <ChartCardComp
               title="Accountability" 
               subtitle="" 
               chartType="line" 
               data={mockLineData2}
               variables={mockLineDataVars2}/>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </AppShell>
  </MantineProvider>
);

export default Dashboard;
