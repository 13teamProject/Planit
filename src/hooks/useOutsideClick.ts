import { RefObject, useEffect, useRef } from 'react';

type Handler = () => void;

function useOutsideClick<T extends HTMLElement = HTMLElement>(
  handler: Handler,
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handler]);

  return ref;
}

export default useOutsideClick;
