import { useEffect, useState } from "react";

function useDebouncer(value: any, delay: number) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);

      return () => {
        clearTimeout(handler);
      };
    }, delay);
  }, [value, delay]);

  return debounceValue;
}

export default useDebouncer;
