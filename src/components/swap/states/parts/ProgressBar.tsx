import React from "react";
import cn from "classnames";

type ProgressBarType = {
  level: number;
  numSteps?: number;
};
export const ProgressBar: React.FC<ProgressBarType> = ({
  level,
  numSteps = 3,
}) => {
  return (
    <div
      className={cn(
        "grid items-center w-full mt-2 text-xs font-medium justify-items-center",
        {
          "grid-cols-5": numSteps === 3,
        },
        {
          "grid-cols-7": numSteps === 4,
        }
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center w-6 h-6 rounded-full bg-primary inline-bloc"
        )}
      >
        1
      </div>
      <progress
        className="h-1 progress progress-primary"
        value={level < 2 ? 0 : 1}
      />
      <div
        className={cn(
          "flex items-center justify-center w-6 h-6 rounded-full bg-primary inline-bloc",
          {
            "opacity-50": level < 2,
          }
        )}
      >
        2
      </div>
      <progress
        className="h-1 progress progress-primary"
        value={level < 3 ? 0 : 1}
      />
      <div
        className={cn(
          "flex items-center justify-center w-6 h-6 rounded-full bg-primary inline-bloc",
          {
            "opacity-50": level < 3,
          }
        )}
      >
        3
      </div>
      {numSteps > 3 && (
        <progress
          className="h-1 progress progress-primary"
          value={level < 4 ? 0 : 1}
        />
      )}
      {numSteps > 3 && (
        <div
          className={cn(
            "flex items-center justify-center w-6 h-6 rounded-full bg-primary inline-bloc",
            {
              "opacity-50": level < 4,
            }
          )}
        >
          4
        </div>
      )}
    </div>
  );
};
