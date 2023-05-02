import { renderHook } from '@testing-library/react';

import useFetch from './use-fetch';

describe('useFetch', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useFetch());
    expect(result).toBeTruthy();
  });
});
