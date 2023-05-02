import { Button, Center, Group, Text, Title } from '@mantine/core';
import useStyles from './Welcome.styles';
import { Link } from 'wouter';

/* eslint-disable-next-line */
export interface WelcomeProps {}

export function Welcome(props: WelcomeProps) {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <div>
        <Title
          className={classes.title}
          align="center"
          variant="gradient"
          gradient={{ from: 'indigo', to: 'pink' }}
        >
          Quiz App
        </Title>

        <Text className={classes.description} align="center" color="dimmed">
          A project built with Next.js and Mantine
        </Text>

        <Group position="center" className={classes.controls}>
          <Link href="/login">
            <Button
              component="a"
              className={classes.control}
              size="xl"
              variant="gradient"
              gradient={{ from: 'indigo', to: 'pink' }}
            >
              Login
            </Button>
          </Link>

          <Button
            component="a"
            href="https://github.com/agusthas"
            target="_blank"
            className={classes.control}
            size="xl"
            variant="default"
            leftIcon={
              <Center>
                <span role="img" aria-label="about-icon">
                  👀
                </span>
              </Center>
            }
          >
            About
          </Button>
        </Group>
      </div>
    </div>
  );
}

export default Welcome;
