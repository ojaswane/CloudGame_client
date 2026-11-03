"use client";

import { useEffect, useState } from "react";

export default function LocalClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const updateTime = () => setNow(new Date());
    updateTime();
    const intervalId = window.setInterval(updateTime, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const time = now?.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <time className="clock" dateTime={now?.toISOString()} aria-label={time ? `Local time: ${time}` : "Local time"}>
      {time ?? "--:--"}
    </time>
  );
}
