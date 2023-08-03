import { useEffect, useRef } from "react";

type UsePollOptions = {
  interval?: number;
};

type PollFunction = () => Promise<void> | void;

/**
 * React polling hook to poll any function
 *
 * @param func - the callback function to poll
 * @param deps - the dependencies of the polling
 * @param config - polling configuration
 * @param config.interval - the time (in ms) between polls, default is 5000ms
 */
function usePoll(
  func: PollFunction,
  deps: React.DependencyList = [],
  config: UsePollOptions = { interval: 5000 }
): void {
  const { interval = 5000 } = config;

  if (typeof func !== "function") {
    throw new TypeError("Can't poll without a callback function");
  }

  const savedCallback = useRef<PollFunction>();
  const killed = useRef<boolean>(false);
  const timeoutId = useRef<number>();
  const rafId = useRef<number>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = func;
  }, [func]);

  // Set up the interval.
  useEffect(
    () => {
      const poll = () => {
        if (!killed.current) {
          const tick = async () => {
            await savedCallback.current?.();
            // schedule next poll
            timeoutId.current = window.setTimeout(poll, interval);
          };

          rafId.current = window.requestAnimationFrame(tick);
        }
      };

      // initial poll
      rafId.current = window.requestAnimationFrame(poll);

      return () => {
        killed.current = true;

        if (timeoutId.current) {
          window.clearTimeout(timeoutId.current);
        }

        if (rafId.current) {
          window.cancelAnimationFrame(rafId.current);
        }
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [interval, ...deps]
  );
}

export default usePoll;
