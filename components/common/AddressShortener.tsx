import React from "react";

const truncate = function (
  fullStr: string | undefined,
  strLen: number,
  separator?: string
) {
  if (!fullStr) return "";
  if (fullStr.length <= strLen) return fullStr;

  separator = separator || "...";

  var sepLen = separator.length,
    charsToShow = strLen - sepLen,
    frontChars = Math.ceil(charsToShow / 2),
    backChars = Math.floor(charsToShow / 2);

  return (
    fullStr.substring(0, frontChars) +
    separator +
    fullStr.substring(fullStr.length - backChars)
  );
};

export const AddressShortener = (props: { value?: string }) => {
  const { value } = props;
  return <div className="text-primary">{truncate(value, 24)}</div>;
};
