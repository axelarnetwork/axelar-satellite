import React, { PropsWithChildren } from "react";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="min-h-screen h-1 bg-gradient-to-br from-[#162b45] via-[#07121e] to-[#142133]">
      {children}
    </main>
  );
};
