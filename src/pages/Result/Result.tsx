import { Box, Button, Container, SimpleGrid, Title } from '@mantine/core';
import { useEffect } from 'react';
import ResultCard from 'src/components/ResultCard/ResultCard';
import useAppStore from 'src/store/store';
import { getResult } from 'src/utils/getResult';
import { Link } from 'wouter';

export function Result() {
  const { answers, clearAnswers } = useAppStore((state) => ({
    answers: state.answers,
    clearAnswers: state.clearAnswers,
  }));
  const { questionSet, clearQuestionSet } = useAppStore((state) => ({
    questionSet: state.questionSet,
    clearQuestionSet: state.clearQuestionSet,
  }));
  const { result, setResult } = useAppStore((state) => ({
    result: state.result,
    setResult: state.setResult,
  }));

  useEffect(() => {
    if (!questionSet) return;

    const result = getResult(answers, questionSet.questions);
    clearAnswers();
    clearQuestionSet();

    setResult(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
        <Box
          sx={{
            width: `min(100%, 700px)`,
            marginInline: 'auto',
          }}
        >
          <Title mb="lg">Result</Title>
          <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <ResultCard
              color="indigo"
              title="answered"
              value={result.answered}
            />
            <ResultCard color="green" title="correct" value={result.correct} />
            <ResultCard
              color="red"
              title="incorrect"
              value={result.incorrect}
            />
          </SimpleGrid>
          <Link href="/quiz/start">
            <Button
              mt="xl"
              component="a"
              variant="gradient"
              gradient={{ from: 'indigo', to: 'pink' }}
            >
              Play Again
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default Result;
