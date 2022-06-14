import React, { PropsWithChildren } from "react";

export const StatsWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="backdrop-blur-xl bg-white/10 w-full rounded-lg py-2 px-5">
      {children}
    </div>
  );
};
