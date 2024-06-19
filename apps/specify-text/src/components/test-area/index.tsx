import { memo, useState } from "react";

import styles from "./index.module.less";
import SpecifyText from "../specify-text-custom";

const VariableMap = {
  year: 2024,
  githubUrl: "https://github.com/SmaIIstars/SpecifyText",
  name: "SpecifyText",
};

const TestArea = () => {
  const [inputText, setInputText] = useState(
    "[SpecifyText](colorful:rgba(123,213,123,0.7))"
  );

  return (
    <div className={styles.testAreaWrapper}>
      <h1>TestArea</h1>

      <div className={styles.testAreaDescription}>
        已注入的变量:
        {Object.entries(VariableMap).map(([key, value]) => {
          return (
            <div key={key}>
              {key}:{value}
            </div>
          );
        })}
      </div>

      <div className={styles.testAreaContainer}>
        <textarea
          rows={8}
          cols={50}
          className={styles.testAreaInput}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <div className={styles.testAreaDisplay}>
          <SpecifyText text={inputText} variableMap={VariableMap} />
        </div>
      </div>
    </div>
  );
};

export default memo(TestArea);
