import React from "react";

export const withKeysHandler =
  (allowedKeys: string[], fn: () => void) => (e: React.KeyboardEvent) => {
    if (allowedKeys.includes(e.key)) {
      fn();
    }
  };

export const withAccessibleKeysHandler = withKeysHandler.bind(null, [
  "Enter",
  " ",
]);

export const makeAccessibleKeysHandler = (fn: () => void) => {
  const handler = withAccessibleKeysHandler(fn);
  return {
    role: "button",
    onKeyDown: handler,
    onClick: fn,
  };
};
