"use client";

import { useCallback, useEffect, useState } from "react";

export function useSoundSetting() {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);

  useEffect(() => {
    const storedSetting = localStorage.getItem("enableSound");
    if (storedSetting !== null) {
      setIsSoundEnabled(storedSetting === "true");
    }
  }, []);

  const setSoundEnabled = useCallback((enabled: boolean) => {
    localStorage.setItem("enableSound", String(enabled));
    setIsSoundEnabled(enabled);
  }, []);

  return { isSoundEnabled, setSoundEnabled };
}
