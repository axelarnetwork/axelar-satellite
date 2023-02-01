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
      <>
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
            className="min-w-[20px] w-full h-1 progress progress-primary"
            value={currentLevel < level ? 0 : 1}
          />
        )}
      </>
    );
  }

  const className = clsx(
    `grid grid-cols-${
      maxLevels * 2 - 1
    } items-center justify-items-center mt-2 text-xs font-medium`
  );

  return (
    <div className={className}>
      {[...Array(maxLevels)].map((_, i) => renderLevel(i + 1))}
    </div>
  );

  // return (
  //   <div className="grid items-center grid-cols-5 mt-2 text-xs font-medium justify-items-center">
  //     <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary inline-bloc">
  //       1
  //     </div>
  //     <progress
  //       className="h-1 progress progress-primary"
  //       value={level < 2 ? 0 : 1}
  //     />
  //     <div
  //       className={
  //         clsx("flex items-center justify-center w-6 h-6 rounded-full bg-primary inline-bloc",
  //         level <
  //         )
  //         cn(
  //         ,
  //         {
  //           "opacity-50": level < 2,
  //         }
  //       )}
  //     >
  //       2
  //     </div>
  //     <progress
  //       className="h-1 progress progress-primary"
  //       value={level < 3 ? 0 : 1}
  //     ></progress>
  //     <div
  //       className={cn(
  //         "flex items-center justify-center w-6 h-6 rounded-full bg-primary inline-bloc",
  //         {
  //           "opacity-50": level < 3,
  //         }
  //       )}
  //     >
  //       3
  //     </div>
  //   </div>
  // );
};
