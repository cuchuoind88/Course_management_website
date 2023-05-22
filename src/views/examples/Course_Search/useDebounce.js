import { useState, useEffect } from "react";
export default function UseDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, delay);
    //Clean Function
    return () => clearTimeout(handler);
  }, [value]);
  return debounced;
}
