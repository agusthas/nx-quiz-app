import { Button, Divider, Paper, Stack, Text, Title } from '@mantine/core';
import useAppStore from 'src/store/store';
import { decodeHtml } from 'src/utils/decode-html';
import { useLocation } from 'wouter';

export interface QuestionCardProps {
  questionIndex: number;
}

export function QuestionCard(props: QuestionCardProps) {
  const questionSet = useAppStore((state) => state.questionSet);
  const answers = useAppStore((state) => state.answers);
  const pushAnswer = useAppStore((state) => state.pushAnswer);
  const [, navigate] = useLocation();

  if (!questionSet) {
    return null;
  }

  const currentQuestion = questionSet.questions[props.questionIndex];

  const handleAnswerClick = (answer: string) => {
    pushAnswer(props.questionIndex, answer);
    if (props.questionIndex !== questionSet.questions.length - 1) {
      navigate(`/quiz/ongoing/${props.questionIndex + 2}`);
    }
  };

  return (
    <Paper withBorder shadow="md" p={30} my={15}>
      <Title weight={900}>
        Question {props.questionIndex + 1} of {questionSet.questions.length}
      </Title>
      <Divider mt="sm" mb="lg" />

      <Text size="xl">{decodeHtml(currentQuestion.question)}</Text>

      <Stack mt={40}>
        {currentQuestion.answers.map((answer) => (
          <Button
            key={answer}
            fullWidth
            variant={
              answers[props.questionIndex] === answer ? 'filled' : 'default'
            }
            size="lg"
            onClick={() => handleAnswerClick(answer)}
          >
            <span>{decodeHtml(answer)}</span>
          </Button>
        ))}
      </Stack>
    </Paper>
  );
}

export default QuestionCard;
