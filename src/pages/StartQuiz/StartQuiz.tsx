import { Box, Button, Container, Text } from '@mantine/core';
import { useEffect } from 'react';
import StartQuizForm from 'src/components/StartQuizForm/StartQuizForm';
import useAppStore from 'src/store/store';
import { Redirect } from 'wouter';

/* eslint-disable-next-line */
export interface StartQuizProps {}

export function StartQuiz(props: StartQuizProps) {
  const user = useAppStore((state) => state.user);
  const logout = useAppStore((state) => state.logout);
  const clearAppState = useAppStore((state) => state.clearAppState);

  useEffect(() => {
    clearAppState();
  }, [clearAppState]);

  if (!user) {
    return <Redirect to="/" />;
  }
  return (
    <Container>
      <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
        <Box sx={{ width: `min(100%, 500px)`, marginInline: 'auto' }}>
          <Text>
            You are logged in as <strong>{user.email}</strong>
          </Text>
          <Button color="red" mt="md" onClick={logout}>
            Logout
          </Button>

          <StartQuizForm />
        </Box>
      </Box>
    </Container>
  );
}

export default StartQuiz;
