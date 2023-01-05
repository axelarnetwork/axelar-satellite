import React, { PropsWithChildren } from "react";

import cn from "classnames";

type InputWrapperProps = PropsWithChildren & {
  className?: string;
  style?: any;
};
export const InputWrapper: React.FC<InputWrapperProps> = ({
  children,
  className,
  style,
}) => {
  return (
    <div
      className={cn(
        "bg-neutral w-full rounded-lg py-2 px-5 relative",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};
