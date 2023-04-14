import { useCallback, useEffect, useRef, useState } from "../deps/react.ts";

export interface UseQueryOptions<T> {
  queryFn?: (signal: AbortSignal) => Promise<T>;
  shouldQueryOnInit?: boolean;
  url?: string | URL;
}

export interface UseQueryState<T> {
  error?: Error;
  isLoading: boolean;
  reload: () => Promise<void>;
  result?: T;
}

export function useQuery<T>({
  queryFn,
  shouldQueryOnInit = true,
  url,
}: UseQueryOptions<T>): UseQueryState<T> {
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<T | undefined>(undefined);

  const abcRef = useRef<AbortController>();

  const handleReload = useCallback(async () => {
    setIsLoading(true);
    setError(undefined);
    try {
      if (abcRef.current != null) {
        abcRef.current.abort();
      }

      const abc = new AbortController();
      const { signal } = abc;
      abcRef.current = abc;

      if (queryFn != null) {
        setResult(await queryFn(signal));
      } else if (url != null) {
        const resp = await fetch(url.toString(), { signal });
        setResult(await resp.json() as T);
      } else {
        throw new Error("No data source specified.");
      }
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  }, [queryFn, url]);

  useEffect(() => {
    if (shouldQueryOnInit) {
      handleReload();
    }

    // cleanup
    return () => {
      if (abcRef.current != null) {
        abcRef.current.abort("cleanup");
      }
    };
  }, []);

  return {
    error,
    isLoading,
    reload: handleReload,
    result,
  };
}
