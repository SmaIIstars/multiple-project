import React, { useEffect, useRef, useState } from "react";
import cls from "classnames";

import styles from "./index.module.less";
import sleep from "@/utils/sleep";

interface ContentSliderProps {
  item: JSX.Element;
  wrapperClass?: string;
  isPaused?: boolean;
  speed?: number;
  transition?: Partial<{
    magnification: number;
    durationTime: number;
  }>;

  indictor?: boolean;
  setPaused?: (paused: boolean) => void;
}

const FPS = 100;

const ContentSlider = (props: ContentSliderProps) => {
  const {
    item,
    wrapperClass,
    isPaused = false,
    speed = 100,
    indictor = false,
    transition,

    setPaused: setIsPaused,
  } = props;

  const duplicatedItems = [item, item];

  const itemRef = useRef<HTMLDivElement>(null);
  const touchPositionRef = useRef({ startX: 0, startY: 0, endX: 0, endY: 0 });
  const offsetSpeed = useRef(speed);
  const animationId = useRef(0);
  const scrollIntervalId = useRef(0);
  const isAnimation = useRef(false);
  const paused = useRef(isPaused);

  const [contentWidth, setContentWidth] = useState(0);
  const [contentOffset, setContentOffset] = useState(0);

  useEffect(() => {
    offsetSpeed.current = isPaused || paused.current ? 0 : speed;
  }, [isPaused]);

  useEffect(() => {
    if (itemRef?.current && itemRef.current.clientWidth !== 0) {
      setContentWidth(itemRef.current.clientWidth * 2);
    }
  }, [itemRef?.current?.clientWidth]);

  useEffect(() => {
    if (!scrollIntervalId.current && contentWidth) {
      scrollIntervalId.current = requestAnimationFrame(step);
    }

    return () => cancelAnimationFrame(scrollIntervalId.current);
  }, [contentWidth]);

  const step = () => {
    isAnimation.current = true;
    setContentOffset((prevOffset) => {
      const newOffset = Math.floor(prevOffset - offsetSpeed.current / FPS);
      if (newOffset <= -contentWidth / 2) {
        return 0;
      } else if (newOffset > 0) {
        return -contentWidth / 2;
      }
      return newOffset;
    });
    animationId.current = window.requestAnimationFrame(step);
  };

  // Indictor
  const handleIndictorClick = (type: "left" | "right") => {
    offsetSpeed.current =
      speed * (type === "left" ? -1 : 1) * (transition?.magnification ?? 20);

    requestAnimationFrame(step);

    sleep(transition?.durationTime ?? 300).then(() => {
      isAnimation.current = false;
      cancelAnimationFrame(animationId.current);
      offsetSpeed.current = paused.current ? 0 : speed;
    });
  };

  const handleIndictorMouseEnter = () => {
    offsetSpeed.current = 0;
    paused.current = true;
  };

  const handleIndictorMouseLeave = () => {
    offsetSpeed.current = speed;
    paused.current = false;
  };

  // Touch
  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    const { pageX: startX = 0, pageY: startY = 0 } = e.targetTouches?.[0];

    touchPositionRef.current.startX = startX;
    touchPositionRef.current.startY = startY;

    touchPositionRef.current.endX = startX;
    touchPositionRef.current.endY = startY;
  };

  const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    const { pageX: moveX = 0, pageY: moveY = 0 } = e.targetTouches?.[0];

    touchPositionRef.current.endX = moveX;
    touchPositionRef.current.endY = moveY;

    const offsetX =
      touchPositionRef.current.startX - touchPositionRef.current.endX;

    let realOffsetX = (contentOffset - offsetX) % (contentWidth / 2);
    if (realOffsetX > 0) {
      realOffsetX = -contentWidth / 2;
    }

    setContentOffset(realOffsetX);
    touchPositionRef.current = {
      startX: moveX,
      startY: moveY,
      endX: moveX,
      endY: moveY,
    };
  };

  const handleTouchEnd = () => {
    setIsPaused?.(false);
  };

  return (
    <div
      className={cls(styles["content-slider-wrapper"], wrapperClass)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={styles["content-slider-list"]}
        style={{
          transform: `translateX(${contentOffset}px)`,
          width: `${contentWidth}px`,
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className={styles["content-slider-item"]}
            ref={itemRef}
          >
            {item}
          </div>
        ))}
      </div>

      {indictor && (
        <>
          <div
            className={cls([
              styles["content-slider-indictor-area"],
              styles["content-slider-indictor-area-left"],
            ])}
            onClick={() => handleIndictorClick("left")}
            onMouseEnter={handleIndictorMouseEnter}
            onMouseLeave={handleIndictorMouseLeave}
          />

          <div
            className={cls([
              styles["content-slider-indictor-area"],
              styles["content-slider-indictor-area-right"],
            ])}
            onClick={() => handleIndictorClick("right")}
            onMouseEnter={handleIndictorMouseEnter}
            onMouseLeave={handleIndictorMouseLeave}
          />
        </>
      )}
    </div>
  );
};

export default ContentSlider;
