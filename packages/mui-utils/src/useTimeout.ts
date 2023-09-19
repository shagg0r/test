import { useLazyRef } from './useLazyRef';
import { useOnMount } from './useOnMount';

class Timeout {
  static create() {
    return new Timeout();
  }

  currentId: number = 0;

  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(delay: number, fn: Function) {
    this.clear();
    this.currentId = setTimeout(() => {
      this.currentId = 0;
      fn();
    }, delay) as unknown as number;
  }

  clear = () => {
    if (this.currentId !== 0) {
      clearTimeout(this.currentId);
      this.currentId = 0;
    }
  };

  disposeEffect = () => {
    return this.clear;
  };
}

export function useTimeout() {
  const timeout = useLazyRef(Timeout.create).current;

  useOnMount(timeout.disposeEffect);

  return timeout;
}
