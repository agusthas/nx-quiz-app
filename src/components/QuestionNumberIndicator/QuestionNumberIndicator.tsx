import { Button, Group, Indicator } from '@mantine/core';
import useAppStore from 'src/store/store';
import { useLocation } from 'wouter';

export interface QuestionNumberIndicatorProps {
  questionIndex: number;
}

export function QuestionNumberIndicator(props: QuestionNumberIndicatorProps) {
  const [, navigate] = useLocation();
  const questionSet = useAppStore((state) => state.questionSet);
  const setCurrentQuestion = useAppStore((state) => state.setCurrentQuestion);
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
        <a
          key={val}
          href={`/quiz/ongoing/${val}`}
          onClick={(e) => {
            e.preventDefault();
            setCurrentQuestion(val);
            navigate(`/quiz/ongoing/${val}`);
          }}
        >
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
        </a>
      ))}
    </Group>
  );
}

export default QuestionNumberIndicator;
