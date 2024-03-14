import { memo } from "react";

import styles from "./index.module.less";

import SpecifyTextExample from "./components/specify-text-example";
import TestArea from "./components/test-area";

const SpecifyTextPage = () => {
  return (
    <div className={styles.specifyTextWrapper}>
      <SpecifyTextExample />
      <TestArea />
    </div>
  );
};

export default memo(SpecifyTextPage);
