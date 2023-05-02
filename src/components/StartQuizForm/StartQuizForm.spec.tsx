import { render } from '@testing-library/react';

import StartQuizForm from './StartQuizForm';

describe('StartQuizForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StartQuizForm />);
    expect(baseElement).toBeTruthy();
  });
});
