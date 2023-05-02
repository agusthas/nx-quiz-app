import { Button, Group, Indicator } from '@mantine/core';
import useAppStore from 'src/store/store';
import { Link } from 'wouter';

export interface QuestionNumberIndicatorProps {
  questionIndex: number;
}

export function QuestionNumberIndicator(props: QuestionNumberIndicatorProps) {
  const questionSet = useAppStore((state) => state.questionSet);
  const answers = useAppStore((state) => state.answers);
  const param = props.questionIndex + 1;

  if (!questionSet) {
    return null;
  }

  return (
    <Group>
      {Array.from(
        { length: questionSet.questions.length },
        (_, i) => i + 1
      ).map((val) => (
        <Link href={`/quiz/ongoing/${val}`} key={val}>
          <Indicator color={answers[val - 1] ? 'indigo' : 'gray'}>
            <Button
              component="a"
              key={val}
              variant={val === param ? 'filled' : 'default'}
              size="xs"
            >
              {val}
            </Button>
          </Indicator>
        </Link>
      ))}
    </Group>
  );
}

export default QuestionNumberIndicator;
