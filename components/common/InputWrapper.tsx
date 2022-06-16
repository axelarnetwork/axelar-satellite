import React, { PropsWithChildren } from "react";
import cn from "classnames";

type InputWrapperProps = PropsWithChildren & {
  className?: string;
};
export const InputWrapper: React.FC<InputWrapperProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-[#02141b] w-full rounded-lg py-2 px-5 relative",
        className
      )}
    >
      {children}
    </div>
  );
};
