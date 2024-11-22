import React from 'react';
import Image from 'next/image';
import {
  Button,
  Container,
  Group,
  MantineProvider,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import enron from '../../public/images/Enron.jpg';

// Define interface for form values
interface FormValues {
  email: string;
  password: string;
}

// Define interface for theme styles props
interface StyleProps {
  theme: {
    colors: {
      dark: string[];
      blue: string[];
    };
  };
}

function LoginPage(): JSX.Element {
  const form = useForm<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = (values: FormValues): void => {
    console.log('Login attempt', values);
    window.location.href = '/enron/main';
  };

  return (
    <MantineProvider
      theme={{
        colorScheme: 'dark'
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <div style={{ backgroundColor: 'black', minHeight: '100vh' }}>
        <div style={{ backgroundColor: 'black', borderBottom: 'none', padding: '16px' }}>
          <Group position="apart" style={{ height: '100%' }}>
            <Group>
              <Text size="xl" weight={700}>
                Measures AI
              </Text>
            </Group>
          </Group>
        </div>

        <Container size={400} style={{ marginTop: '10vh' }}>
          <Group position="center" mb={30}>
            <Image src={enron} width={200} height={200} alt="Enron Logo" />
            <Text size="xl" weight={700}>
              + Measures
            </Text>
          </Group>

          <Text align="center" size="lg" weight={700} mb="xs">
            Welcome to Enron's Measurement Platform.
          </Text>
          <Text align="center" size="sm" color="dimmed" mb={30}>
            Please log in to continue. If you do not have an account, contact your administrator.
          </Text>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
              <TextInput
                placeholder="user@enron.com"
                value={form.values.email}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
                  form.setFieldValue('email', event.currentTarget.value)
                }
                styles={(theme: StyleProps["theme"]) => ({
                  input: {
                    backgroundColor: 'black',
                    borderColor: theme.colors.dark[3],
                    '&:focus': {
                      borderColor: theme.colors.blue[5],
                    },
                  },
                })}
              />

              <PasswordInput
                placeholder="Password"
                value={form.values.password}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => 
                  form.setFieldValue('password', event.currentTarget.value)
                }
                styles={(theme: StyleProps["theme"]) => ({
                  input: {
                    backgroundColor: 'black',
                    borderColor: theme.colors.dark[3],
                    '&:focus': {
                      borderColor: theme.colors.blue[5],
                    },
                  },
                  visibilityToggle: {
                    color: theme.colors.dark[2],
                    '&:hover': { color: theme.colors.dark[0] },
                  },
                })}
                // visibilityToggleLabel="Show"
              />

              <Button
                type="submit"
                fullWidth
                mt="xl"
                styles={(theme: StyleProps["theme"]) => ({
                  root: {
                    backgroundColor: 'transparent',
                    border: `1px solid ${theme.colors.dark[3]}`,
                    color: theme.colors.dark[0],
                    '&:hover': {
                      backgroundColor: 'white',
                      color: 'black',
                    },
                  },
                })}
              >
                Sign In
              </Button>
            </Stack>
          </form>
        </Container>
      </div>
    </MantineProvider>
  );
}

export default LoginPage;