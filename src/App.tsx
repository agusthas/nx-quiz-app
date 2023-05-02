import { MantineProvider } from '@mantine/core';
import { Route, Switch } from 'wouter';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import StartQuiz from './pages/StartQuiz/StartQuiz';
import OngoingQuiz from './pages/OngoingQuiz/OngoingQuiz';

export function App() {
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
