import { useEffect } from 'react';
import { InputEvent, AnyFunc, Ref } from './types';

export function useOnClickOutside(ref: Ref, handler: AnyFunc) {
  useEffect(() => {
    const listener = (event: InputEvent) => {
      if (!ref?.current || ref.current.contains(event.target)) return;
      handler(event);
    }
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    }
  }, [ref, handler])
}