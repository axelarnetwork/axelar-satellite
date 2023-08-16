import { useEffect, useRef } from "react";

type UsePollConfig = {
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
  config: UsePollConfig = { interval: 5000 }
): void {
  const { interval } = config;

  if (typeof func !== "function") {
    throw new TypeError("Can't poll without a callback function");
  }

  const pollFnRef = useRef<PollFunction>();
  const killedRef = useRef<boolean>(false);
  const timeoutIdRef = useRef<number>();
  const rafIdRef = useRef<number>();

  // Remember the latest callback.
  useEffect(() => {
    pollFnRef.current = func;
  }, [func]);

  // Set up the interval.
  useEffect(
    () => {
      const poll = () => {
        if (!killedRef.current) {
          const tick = async () => {
            await pollFnRef.current?.();
            // schedule next poll
            timeoutIdRef.current = window.setTimeout(poll, interval);
          };

          rafIdRef.current = window.requestAnimationFrame(tick);
        }
      };

      // initial poll
      rafIdRef.current = window.requestAnimationFrame(poll);

      return () => {
        killedRef.current = true;

        if (timeoutIdRef.current) {
          window.clearTimeout(timeoutIdRef.current);
        }

        if (rafIdRef.current) {
          window.cancelAnimationFrame(rafIdRef.current);
        }
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [interval, ...deps]
  );
}

export default usePoll;
