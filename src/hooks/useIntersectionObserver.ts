import { DependencyList, MutableRefObject, useEffect, useRef } from 'react';

type IntersectionObserverCallback = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver,
) => void;

/**
 *
 * @param callback IntersectionObserver가 호출할 콜백 함수 -> data fetch 함수 넣어주세요
 * @param deps useEffect의 배열, 기본값은 빈 배열
 * @returns 반환 타입은 MutableRefObject<T | null>
 */
export function useIntersectionObserver<T extends HTMLElement>(
  callback: IntersectionObserverCallback,
  deps: DependencyList = [],
): MutableRefObject<T | null> {
  const observer = useRef<IntersectionObserver | null>(null);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(callback, {
      threshold: 1.0,
    });

    if (ref.current) observer.current.observe(ref.current);

    return () => observer.current?.disconnect();
  }, deps);

  return ref;
}
