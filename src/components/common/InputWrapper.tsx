import React, { CSSProperties, PropsWithChildren } from "react";
import clsx from "clsx";

type InputWrapperProps = PropsWithChildren & {
  className?: string;
  style?: CSSProperties;
};
export const InputWrapper: React.FC<InputWrapperProps> = ({
  children,
  className,
  style,
}) => {
  return (
    <div
      className={clsx(
        "bg-neutral w-full rounded-lg py-2 px-5 relative",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};
