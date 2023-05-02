import {
  Box,
  Button,
  Container,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import useAppStore from 'src/store/store';
import { decodeHtml } from 'src/utils/decode-html';
import { Link, Redirect, useLocation } from 'wouter';

/* eslint-disable-next-line */
export interface OngoingQuizProps {
  id: string;
}

export function OngoingQuiz(props: OngoingQuizProps) {
  const param = +props.id;
  const questionIndex = param - 1; // minus 1 to make it 0 based

  const [, navigate] = useLocation();
  const questionSet = useAppStore((state) => state.questionSet);
  const answers = useAppStore((state) => state.answers);
  const pushAnswer = useAppStore((state) => state.pushAnswer);
  const currentQuestion = questionSet?.questions[questionIndex];

  if (!currentQuestion) {
    return <Redirect to="/quiz/start" />;
  }

  const handleAnswerClick = (answer: string) => {
    pushAnswer(questionIndex, answer);
    navigate(`/quiz/ongoing/${param + 1}`);
  };

  return (
    <Container>
      <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
        <Box sx={{ width: `min(100%, 600px)`, marginInline: 'auto' }}>
          <Group>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => (
              <Link href={`/quiz/ongoing/${val}`}>
                <Button
                  component="a"
                  key={val}
                  variant={val === param ? 'filled' : 'default'}
                  size="xs"
                >
                  {val}
                </Button>
              </Link>
            ))}
          </Group>
          <Paper withBorder shadow="md" p={30} my={15}>
            <Title weight={900}>
              Question {param} of {questionSet.questions.length}
            </Title>
            <Divider mt="sm" mb="lg" />

            <Text size="xl">{decodeHtml(currentQuestion.question)}</Text>

            <Stack mt={40}>
              {currentQuestion.answers.map((answer) => (
                <Button
                  key={answer}
                  fullWidth
                  variant={
                    answers[questionIndex] === answer ? 'filled' : 'default'
                  }
                  size="lg"
                  onClick={() => handleAnswerClick(answer)}
                >
                  <span>{decodeHtml(answer)}</span>
                </Button>
              ))}
            </Stack>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}

export default OngoingQuiz;
