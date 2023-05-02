import {
  Box,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useSetState } from '@mantine/hooks';
import useAppStore from 'src/store/store';
import { useLocation } from 'wouter';

/* eslint-disable-next-line */
export interface LoginFormProps {}

export function LoginForm(props: LoginFormProps) {
  const [, navigate] = useLocation();
  const login = useAppStore((state) => state.login);
  const [user, setUser] = useSetState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user.email && user.password) {
      login(user.email, user.password);
      navigate('/quiz/start', {
        replace: true,
      });
    }
  };

  return (
    <Box
      sx={{
        display: 'grid',
        placeItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Container size={420}>
        <Title align="center" size={38} weight="900">
          Login!
        </Title>
        <Text color="dimmed" align="center" mt="sm">
          This login is a `fake`, you can put any email or password you want
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={handleSubmit}>
            <TextInput
              type="email"
              label="Email"
              required
              onChange={(e) => setUser({ email: e.target.value })}
            />
            <PasswordInput
              label="Password"
              required
              mt="md"
              onChange={(e) => setUser({ password: e.target.value })}
            />
            <Button type="submit" fullWidth mt="xl">
              Login
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default LoginForm;
