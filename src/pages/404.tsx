import React from "react";
import { NextPage } from "next";
import Link from "next/link";

const NOT_FOUND: NextPage = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <Link href="/">Go back home</Link>
    </div>
  );
};

export default NOT_FOUND;
