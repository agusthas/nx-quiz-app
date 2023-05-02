import { Title } from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import useAppStore from 'src/store/store';
import { getResult } from 'src/utils/getResult';
import { useLocation } from 'wouter';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TimerProps {}

export function Timer(props: TimerProps) {
  const [, navigate] = useLocation();
  const questionSet = useAppStore((state) => state.questionSet);
  const answers = useAppStore((state) => state.answers);
  const setResult = useAppStore((state) => state.setResult);
  const [remainingTime, setRemainingTime] = useState(
    () => new Date(questionSet?.end || 0).getTime() - Date.now()
  );
  const interval = useInterval(() => {
    setRemainingTime(new Date(questionSet?.end || 0).getTime() - Date.now());
  }, 1000);

  useEffect(() => {
    if (remainingTime > 0) {
      interval.start();
    }

    if (remainingTime <= 0) {
      const result = getResult(answers, questionSet?.questions || []);
      setResult(result);
      navigate('/quiz/result');
    }

    return interval.stop;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingTime]);

  return (
    <Title mb="lg">
      <span role="img" aria-label="time">
        ⏰
      </span>{' '}
      {new Date(remainingTime).toISOString().substring(11, 19)}
    </Title>
  );
}

export default Timer;
