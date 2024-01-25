import { memo } from "react";
import ContentSlider from "@/components/content-slider";
import styles from "./index.module.less";

const item = (
  <div className={styles["content-slider-wrapper"]}>
    <div className={styles["content-slider-item"]}>1</div>
    <div className={styles["content-slider-item"]}>2</div>
    <div className={styles["content-slider-item"]}>3</div>
    <div className={styles["content-slider-item"]}>4</div>
    <div className={styles["content-slider-item"]}>5</div>
  </div>
);

const ContentSliderPage = () => {
  return (
    <div className={styles["content-slider-page-wrapper"]}>
      <h1>Content Slider</h1>

      <ContentSlider item={item} />
    </div>
  );
};

export default memo(ContentSliderPage);
