import { MantineProvider } from '@mantine/core';
import { useEffect } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import OngoingQuiz from './pages/OngoingQuiz/OngoingQuiz';
import Result from './pages/Result/Result';
import StartQuiz from './pages/StartQuiz/StartQuiz';
import useAppStore from './store/store';

export function App() {
  const [, navigate] = useLocation();
  const questionSet = useAppStore((state) => state.questionSet);

  useEffect(() => {
    if (questionSet) {
      navigate('/quiz/ongoing/1');
    }
  }, []);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',
        primaryColor: 'indigo',
      }}
    >
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />

        <Route path="/quiz/start" component={StartQuiz} />
        <Route path="/quiz/result" component={Result} />
        <Route path="/quiz/ongoing/:id">
          {(params) => {
            if (params.id) {
              return <OngoingQuiz id={params.id} />;
            }
            return null;
          }}
        </Route>

        <Route>
          {/* TODO: 404 Pages */}
          <h1>404</h1>
        </Route>
      </Switch>
    </MantineProvider>
  );
}

export default App;
