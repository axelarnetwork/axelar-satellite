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
