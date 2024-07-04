import { RefObject, useEffect } from 'react';

const useOutsideClick = <T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent) => void,
  exceptions: RefObject<HTMLElement>[] = [],
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      if (
        exceptions.some((exception) =>
          exception.current?.contains(event.target as Node),
        )
      ) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler, exceptions]);
};

export default useOutsideClick;
