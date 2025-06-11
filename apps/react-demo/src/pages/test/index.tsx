import { memo, useEffect, useRef, useState } from "react";
import styles from "./index.module.less";

import {
  throttle,
  deepCopy,
  debounce,
  flatten,
  currying,
  compose,
  test,
  simpleDiff,
} from "@/utils/base";

const Test = memo(() => {
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(5);
  const intervalRef = useRef<number>();

  const handleMouseMove = throttle.throttle1(() => {
    setCount((prevCount) => prevCount + 1);
  }, 2000);

  const handleTimerStart = () => {
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) handleTimerPause();
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleTimerPause = () => {
    clearInterval(intervalRef.current);
  };

  const initDeepCopy = () => {
    const test1 = [1, 2, 3, 4];
    const test2 = {
      a: 1,
      b: [1, 2, 3, 4],
      c: null,
      d: undefined,
      e: () => {
        console.log(1);
      },
      f: /123/,
    };

    const test3 = deepCopy(test1);
    const test4 = deepCopy(test2);

    test1.push(5);
    test2.a = 2;
    test2.b.push(5);

    console.log("initDeepCopy", {
      test1,
      test2,
      test3,
      test4,
    });
  };
  const initFlatten = () => {
    const arr = [1, [2, 3], "4", [5, [6, 7], 8]];
    console.log("initFlatten", [flatten.flatten1(arr), flatten.flatten2(arr)]);
  };
  const initCurrying = () => {
    console.log("initCurrying", currying.add(1, 2));
  };

  const initCompose = () => {
    const split = currying.curry((separator: string, str: string) => {
      return str.split(separator);
    });
    const toUpperCase = currying.curry((str: string) => {
      return str.toUpperCase();
    });
    const join = currying.curry((separator: string, arr: any[]) => {
      return arr.join(separator);
    });

    var initials = compose(toUpperCase, split(" "), join(","));

    console.log("initCompose", initials("kevin daisy kelly"));
  };

  const initSimpleDiff = () => {
    const obj1 = { a: { e: 1 }, b: 2, c: 3 };
    const obj2 = { a: { e: 5, g: 6 }, b: 2, c: 3, d: 4 };
    console.log("initSimpleDiff", simpleDiff(obj1, obj2));
  };

  const initTest = () => {
    console.error("initTest", test());
  };

  useEffect(() => {
    initTest();

    initDeepCopy();
    initFlatten();
    initCurrying();
    initCompose();
    initSimpleDiff();
  }, []);

  return (
    <div>
      {/* <div className={styles.testTimer}>
        <span>{timer}</span>
        <button onClick={handleTimerStart}>Start</button>
      </div> */}
      {/* <div
        className={styles.testContentWrapper}
        onMouseMove={handleMouseMove}
      />
      <div>Count: {count}</div> */}

      {/* <button onClick={handleMouseMove}>Click</button> */}
    </div>
  );
});

export default Test;
