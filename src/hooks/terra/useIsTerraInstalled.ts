import { useEffect, useState } from "react";

export const useIsTerraInstalled = () => {
  const [isTerraInstalled, setIsTerraInstalled] = useState(false);

  useEffect(() => {
    if (!window) {
      return;
    }
    setIsTerraInstalled(window.isTerraExtensionAvailable);
  }, []);

  return isTerraInstalled;
};
