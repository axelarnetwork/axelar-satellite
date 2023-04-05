import React from "react";
import clsx from "clsx";

type ProgressBarType = {
  currentLevel: number;
  maxLevels: number;
};
export const ProgressBar: React.FC<ProgressBarType> = ({
  currentLevel,
  maxLevels,
}) => {
  function renderLevel(level: number) {
    return (
      <React.Fragment key={`progress-bar-level${level}`}>
        <div
          className={clsx(
            "flex items-center justify-center w-6 h-6 rounded-full bg-primary inline-bloc",
            level > currentLevel && "opacity-50"
          )}
        >
          {level}
        </div>
        {level < maxLevels && (
          <progress
            className={clsx(
              "min-w-[20px] w-full h-1 progress progress-primary",
              {
                "opacity-30": level > currentLevel,
              }
            )}
            value={1}
          />
        )}
      </React.Fragment>
    );
  }

  return (
    <div
      className={clsx(
        "grid items-center justify-items-center mt-2 text-xs font-medium",
        {
          "grid-cols-3": maxLevels === 2,
          "grid-cols-5": maxLevels === 3,
          "grid-cols-7": maxLevels === 4,
          "grid-cols-9": maxLevels === 5,
        }
      )}
    >
      {[...Array(maxLevels)].map((_, i) => renderLevel(i + 1))}
    </div>
  );
};
