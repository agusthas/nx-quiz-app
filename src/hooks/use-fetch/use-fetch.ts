import { useEffect, useReducer, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UseFetch<DataType> {
  data?: DataType;
  error?: Error;
}

type Cache<T> = { [url: string]: T };

type Action<T> =
  | { type: 'loading' }
  | { type: 'success'; payload: T }
  | { type: 'error'; payload: Error };

export function useFetch<T = unknown>(
  url?: string,
  options?: RequestInit
): UseFetch<T> {
  const cache = useRef<Cache<T>>({});

  const cancelRequest = useRef<boolean>(false);

  const initialState: UseFetch<T> = {
    data: undefined,
    error: undefined,
  };

  const fetchReducer = (state: UseFetch<T>, action: Action<T>): UseFetch<T> => {
    switch (action.type) {
      case 'loading':
        return { ...initialState };
      case 'success':
        return { ...initialState, data: action.payload };
      case 'error':
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (!url) return;

    cancelRequest.current = false;

    const fetchData = async () => {
      dispatch({ type: 'loading' });

      if (cache.current[url]) {
        dispatch({ type: 'success', payload: cache.current[url] });
        return;
      }

      try {
        const res = await fetch(url, options);
        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const data = (await res.json()) as T;
        cache.current[url] = data;
        if (cancelRequest.current) return;

        dispatch({ type: 'success', payload: data });
      } catch (error) {
        if (cancelRequest.current) return;
        dispatch({ type: 'error', payload: error as Error });
      }
    };

    fetchData();

    return () => {
      cancelRequest.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return state;
}

export default useFetch;
