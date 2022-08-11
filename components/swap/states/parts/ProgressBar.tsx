import React from "react";
import cn from "classnames";

type ProgressBarType = {
  level: number;
};
export const ProgressBar: React.FC<ProgressBarType> = ({ level }) => {
  return (
    <div className="grid items-center grid-cols-5 mt-2 text-xs font-medium justify-items-center">
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
      ></progress>
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
      ></progress>
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
    </div>
  );
};
