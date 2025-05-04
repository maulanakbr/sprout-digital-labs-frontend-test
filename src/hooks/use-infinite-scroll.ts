import * as React from 'react';

const ROOT_MARGIN = '100px';

export function useInfiniteScroll(callback: () => void, options?: IntersectionObserverInit) {
  const observerRef = React.useRef<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = React.useState(true);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && isReady) {
          setIsReady(false);
          callback();
        }
      },
      { rootMargin: ROOT_MARGIN, ...options }
    );

    const el = observerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [callback, isReady, options]);

  const done = () => setIsReady(true);

  return { observerRef, done };
}
