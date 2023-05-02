import { render } from '@testing-library/react';

import OngoingQuiz from './OngoingQuiz';

describe('OngoingQuiz', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<OngoingQuiz />);
    expect(baseElement).toBeTruthy();
  });
});
