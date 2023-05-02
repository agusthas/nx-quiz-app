import { Container } from '@mantine/core';
import Welcome from 'src/components/Welcome/Welcome';

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {
  return (
    <Container>
      <Welcome />
    </Container>
  );
}

export default Home;
