import { useEffect, useRef, useState } from 'react';

export const useDebounce = <T>(
  value: T,
  callback: (debouncedValue: T) => void,
  delay: number = 300
) => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      callback(value);
    }, delay);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [value, callback, delay]);
};

export const useDebouncedValue = <T>(value: T, delay: number = 300): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
