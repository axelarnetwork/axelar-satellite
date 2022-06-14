import React, { PropsWithChildren } from "react";

export const InputWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-[#02141b] w-full rounded-lg py-2 px-5">{children}</div>
  );
};
