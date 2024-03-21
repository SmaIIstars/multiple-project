import React, { memo, useState } from "react";
import cls from "classnames";
import configs from "../../config";

import SpecifyText from "../specify-text-custom";

import styles from "./index.module.less";
import "specify-text/style";
import { getSizeBasedOnScreenWidth } from "../../utils";
import useResize from "../../hooks/resize";

const SpecifyTextExample = () => {
  const [screenSize, setScreenSize] = useState<number>(1);

  useResize(() => {
    setScreenSize(getSizeBasedOnScreenWidth());
  });

  return (
    <>
      <h1 className={styles.specifyTextTitle}>SpecifyText Example</h1>
      <div className={styles.specifyTextExampleWrapper}>
        {configs.map((cfg, idx) => {
          const { title, text, configs, buildIn } = cfg;
          const [devConfig] = configs;

          return (
            <React.Fragment key={title}>
              <div
                className={cls({
                  [styles.specifyTextExampleTitle]: true,
                  [styles.specifyTextExample]: true,
                  [styles.specifyTextExampleTitleBuildIn]: buildIn,
                })}
              >
                {title}
              </div>

              <div
                className={cls({
                  [styles.specifyTextExample]: true,
                  [styles.specifyTextExampleText]: true,
                  [styles.specifyTextExampleTextCenter]: idx,
                })}
              >
                {JSON.stringify(text).slice(1, -1)}
              </div>

              <div
                className={cls(
                  styles.specifyTextExample,
                  styles.specifyTextExampleDev
                )}
              >
                {devConfig && (
                  <SpecifyText
                    {...devConfig}
                    conditionalMap={{ [`screenSize${screenSize}`]: true }}
                  />
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default memo(SpecifyTextExample);
