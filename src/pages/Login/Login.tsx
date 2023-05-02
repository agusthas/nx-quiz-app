import { Container } from '@mantine/core';
import LoginForm from 'src/components/LoginForm/LoginForm';
import useAppStore from 'src/store/store';
import { Redirect } from 'wouter';

/* eslint-disable-next-line */
export interface LoginProps {}

export function Login(props: LoginProps) {
  const user = useAppStore((state) => state.user);

  if (user) {
    return <Redirect to="/quiz/start" replace />;
  }

  return (
    <Container>
      <LoginForm />
    </Container>
  );
}

export default Login;
