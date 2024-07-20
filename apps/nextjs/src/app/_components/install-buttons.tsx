"use client";

import { useEffect, useMemo, useState } from "react";
import { FaChrome, FaFirefoxBrowser } from "react-icons/fa";

import { Button } from "@linked-out/ui/button";

const getCurrentBrowser = () => {
  if (
    (navigator.userAgent.indexOf("Opera") ||
      navigator.userAgent.indexOf("OPR")) != -1
  ) {
    return "Opera";
  } else if (navigator.userAgent.indexOf("Edg") != -1) {
    return "Edge";
  } else if (navigator.userAgent.indexOf("Chrome") != -1) {
    return "Chrome";
  } else if (navigator.userAgent.indexOf("Safari") != -1) {
    return "Safari";
  } else if (navigator.userAgent.indexOf("Firefox") != -1) {
    return "Firefox";
  } else {
    return "unknown";
  }
};

export const InstallButtons = () => {
  const [currentBrowser, setCurrentBrowser] =
    useState<ReturnType<typeof getCurrentBrowser>>("unknown");

  useEffect(() => {
    setCurrentBrowser(getCurrentBrowser());
  }, []);

  const isChrome = useMemo(() => {
    return (
      currentBrowser === "Chrome" ||
      currentBrowser === "Edge" ||
      currentBrowser === "Opera"
    );
  }, [currentBrowser]);

  const isFirefox = useMemo(() => {
    return currentBrowser === "Firefox";
  }, [currentBrowser]);

  return (
    <div
      className="flex w-full flex-col gap-4 md:flex-row"
      suppressHydrationWarning
    >
      <Button
        variant="default"
        size="lg"
        className="flex h-32 flex-1 gap-4 bg-black text-white hover:scale-105 hover:bg-black/90"
        style={{ flexGrow: isChrome ? 1 : 0, scale: isChrome ? 1.2 : 0.8 }}
        onClick={() =>
          window.open(
            "https://chromewebstore.google.com/detail/linkedout-dislikes-for-li/dlcpbhmggchfghnagkpifgddnhgolgfg",
          )
        }
      >
        <FaChrome className="size-16" />
        <div className="flex-1 text-2xl">Install on Chrome</div>
      </Button>
      <Button
        variant="default"
        size="lg"
        className="flex h-32 flex-1 gap-4 bg-black text-white hover:scale-105 hover:bg-black/90"
        style={{ flexGrow: isFirefox ? 1 : 0, scale: isFirefox ? 1.2 : 0.8 }}
        onClick={() =>
          window.open(
            "https://addons.mozilla.org/en-US/firefox/addon/linkedout/",
          )
        }
      >
        <FaFirefoxBrowser className="size-16" />
        <div className="flex-1 text-2xl">Install on Firefox</div>
      </Button>
    </div>
  );
};
