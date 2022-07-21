/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useCallback, useEffect, useRef } from "react";

function useInfiniteScroll(
  loading: boolean,
  fetchMore: () => Promise<unknown>,
  hasNaxtPage: boolean | undefined,
  deps: unknown[] | [],
) {
  const targetRef = useRef<HTMLDivElement>(null);

  const onIntersect: IntersectionObserverCallback = useCallback(async ([entry]) => {
    if (entry.isIntersecting && !loading) {
      if (hasNaxtPage) {
        await fetchMore();
      }
    }
  }, deps);

  useEffect(() => {
    let observer: IntersectionObserver;
    if (targetRef.current) {
      observer = new IntersectionObserver(onIntersect, { threshold: 1 });
      observer.observe(targetRef.current);
    }
    return () => observer && observer.disconnect();
  }, [onIntersect]);

  return [targetRef];
}

export default useInfiniteScroll;
