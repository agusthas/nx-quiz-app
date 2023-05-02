import { Box, Button, Container } from '@mantine/core';
import QuestionCard from 'src/components/QuestionCard/QuestionCard';
import QuestionNumberIndicator from 'src/components/QuestionNumberIndicator/QuestionNumberIndicator';
import SubmitQuestionButton from 'src/components/SubmitQuestionButton/SubmitQuestionButton';
import Timer from 'src/components/Timer/Timer';
import useAppStore from 'src/store/store';
import { Redirect } from 'wouter';

/* eslint-disable-next-line */
export interface OngoingQuizProps {
  id: string;
}

export function OngoingQuiz(props: OngoingQuizProps) {
  const param = +props.id;
  const questionIndex = param - 1; // minus 1 to make it 0 based

  const questionSet = useAppStore((state) => state.questionSet);
  const currentQuestion = questionSet?.questions[questionIndex];

  if (!currentQuestion) {
    return <Redirect to="/quiz/start" />;
  }

  return (
    <Container>
      <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
        <Box sx={{ width: `min(100%, 600px)`, marginInline: 'auto' }}>
          <Timer />
          <QuestionNumberIndicator questionIndex={questionIndex} />
          <QuestionCard questionIndex={questionIndex} />
          <SubmitQuestionButton />
        </Box>
      </Box>
    </Container>
  );
}

export default OngoingQuiz;
