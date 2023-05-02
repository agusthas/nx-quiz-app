import { Group, MantineColor, Paper, RingProgress, Text } from '@mantine/core';

export interface ResultCardProps {
  color: MantineColor;
  title: string;
  value: number;
}

export function ResultCard(props: ResultCardProps) {
  return (
    <Paper withBorder radius="sm" p="xs">
      <Group>
        <RingProgress
          size={80}
          roundCaps
          thickness={8}
          sections={[{ value: props.value, color: props.color }]}
        />

        <div>
          <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
            {props.title}
          </Text>
          <Text weight={700} size="xl">
            {props.value}
          </Text>
        </div>
      </Group>
    </Paper>
  );
}

export default ResultCard;
