import { Box, Button, Paper, Select, Stack, Text, Title } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import useAppStore from 'src/store/store';
import { useLocation } from 'wouter';

/* eslint-disable-next-line */
export interface StartQuizFormProps {}

export function StartQuizForm(props: StartQuizFormProps) {
  const [, navigate] = useLocation();
  const { setQuestionSet, isLoading } = useAppStore((state) => ({
    setQuestionSet: state.setQuestionSet,
    isLoading: state.isLoading,
  }));
  const [category, setCategory] = useInputState('');
  const [difficulty, setDifficulty] = useInputState('easy');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!category || !difficulty) {
      return;
    }

    try {
      const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}`;
      await setQuestionSet(url);
      navigate('/quiz/ongoing/1');
    } catch (error) {
      console.error(error);
      alert('Error: check console');
    }
  };

  return (
    <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '100vh' }}>
      <Box sx={{ width: `min(100%, 500px)`, marginInline: 'auto' }}>
        <Title>Quizzzess</Title>
        <Paper withBorder p={30} mt={30}>
          <Text mb="md">Duration: 3 Minutes</Text>
          <Text mb="md">Number of questions: 10</Text>
          <form onSubmit={handleSubmit}>
            <Stack>
              <Select
                label="Select a category"
                placeholder="Pick one"
                data={[
                  { label: 'General Knowledge', value: '9' },
                  { label: 'Japanese Anime & Manga', value: '31' },
                  { label: 'Animals', value: '27' },
                ]}
                searchable
                nothingFound="No categories found"
                value={category}
                onChange={setCategory}
              />
              <Select
                label="Select a difficulty"
                placeholder="Pick one"
                data={[
                  { value: 'easy', label: 'Easy' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'hard', label: 'Hard' },
                ]}
                value={difficulty}
                onChange={setDifficulty}
              />
            </Stack>
            <Button
              type="submit"
              fullWidth
              mt="lg"
              disabled={!category || !difficulty}
              loading={isLoading}
            >
              Let&apos;s go!
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
}

export default StartQuizForm;
