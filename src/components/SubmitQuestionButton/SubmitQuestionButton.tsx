import { Button, Group, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import useAppStore from 'src/store/store';
import { getResult } from 'src/utils/getResult';
import { useLocation } from 'wouter';

export function SubmitQuestionButton() {
  const [, navigate] = useLocation();
  const [opened, { open, close }] = useDisclosure(false);
  const { answers, questionSet, setResult } = useAppStore((state) => ({
    answers: state.answers,
    questionSet: state.questionSet,
    setResult: state.setResult,
  }));

  const handleSubmitClick = () => {
    const result = getResult(answers, questionSet?.questions || []);
    setResult(result);
    navigate('/quiz/result');
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Submit Question">
        <Text>
          Do you want to submit your answers? You will not be able to change it
        </Text>

        <Group mt="md">
          <Button variant="default" onClick={close}>
            Cancel
          </Button>
          <Button color="red" onClick={handleSubmitClick}>
            Submit
          </Button>
        </Group>
      </Modal>
      <Button onClick={open}>Submit Question</Button>
    </>
  );
}

export default SubmitQuestionButton;
