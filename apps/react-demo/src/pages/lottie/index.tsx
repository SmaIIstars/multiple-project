import React, { memo, useRef, useEffect } from "react";
import lottie from "lottie-web";
import LottieTagLine from "./demo.json";

const Lottie = () => {
  const lottieContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lottieContainerRef.current) {
      lottie.loadAnimation({
        container: lottieContainerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: LottieTagLine,
      });
    }
  }, []);

  return (
    <div>
      Lottie
      <div ref={lottieContainerRef}></div>
    </div>
  );
};

export default memo(Lottie);
