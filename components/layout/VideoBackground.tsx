import React, { useEffect, useRef } from "react";
import { useSwapStore } from "../../store";
import { SwapStatus } from "../../utils/enums";

export const VideoBackground = () => {
  const { swapStatus } = useSwapStore((state) => state);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (swapStatus !== SwapStatus.IDLE) videoRef.current?.play();
  }, [swapStatus]);

  return (
    <video
      ref={videoRef}
      className="fixed top-0 left-0 object-cover w-screen h-screen aspect-video -z-10"
      muted
      loop
      id="myVideo"
      poster="/video/video-poster.png"
    >
      <source src="/video/video.mp4" type="video/mp4" />
    </video>
  );
};
