import { render } from '@testing-library/react';

import StartQuiz from './StartQuiz';

describe('StartQuiz', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StartQuiz />);
    expect(baseElement).toBeTruthy();
  });
});
