import { Container } from '@mantine/core';
import StartQuizForm from 'src/components/StartQuizForm/StartQuizForm';
import useAppStore from 'src/store/store';
import { Redirect } from 'wouter';

/* eslint-disable-next-line */
export interface StartQuizProps {}

export function StartQuiz(props: StartQuizProps) {
  const user = useAppStore((state) => state.user);
  if (!user) {
    return <Redirect to="/" />;
  }
  return (
    <Container>
      <StartQuizForm />
    </Container>
  );
}

export default StartQuiz;
