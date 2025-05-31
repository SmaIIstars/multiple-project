export const debounce = (fn: Function, delay: number, immediate = false) => {
  let timer: any = null;

  return (...args: any[]) => {
    if (timer) clearTimeout(timer);
    if (immediate) {
      if (!timer) fn(...args);
      timer = setTimeout(() => {
        timer = null;
      }, delay);
    } else {
      timer = setTimeout(() => {
        fn(...args);
        timer = null;
      }, delay);
    }
  };
};

export const deepCopy = (val: Record<string, any> | Array<any>) => {
  if (typeof val === "object") {
    if (val === null) {
      return val;
    } else if (Array.isArray(val)) {
      // array
      const newArray: any[] = [];
      val.forEach((i) => newArray.push(deepCopy(i)));
      return newArray;
    } else if (val.constructor === RegExp) {
      return val;
    } else {
      // object
      const newObject = {};
      Object.entries(val).forEach(([k, v]) => {
        Reflect.set(newObject, k, deepCopy(v));
      });
      return newObject;
    }
  }
  return val;
};

const throttle1 = (fn: Function, delay: number) => {
  let startTime = Date.now();

  return (...args: any[]) => {
    const curTime = Date.now();
    if (curTime - startTime > delay) {
      fn(...args);
      startTime = Date.now();
    }
  };
};

const throttle2 = (fn: Function, delay: number) => {
  let timer: any = null;

  return (...args: any[]) => {
    if (!timer) {
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    }
  };
};

const throttle3 = (fn: Function, delay: number) => {
  let startTime = Date.now();
  let timer: any = null;

  return (...args: any[]) => {
    const curTime = Date.now();
    const remainTime = curTime - startTime;
    clearTimeout(timer);
    if (remainTime > delay) {
      fn(...args);
      startTime = curTime;
    } else {
      timer = setTimeout(() => {
        fn(...args);
      }, curTime - startTime);
    }
  };
};

export const throttle = {
  throttle1,
  throttle2,
  throttle3,
};

const flatten1 = (arr: Array<any>) => {
  return arr.reduce<Array<any>>((pre, cur) => {
    pre = pre.concat(Array.isArray(cur) ? flatten1(cur) : cur);
    return pre;
  }, []);
};

const flatten2 = (arr: Array<any>) => {
  while (arr.some((i) => Array.isArray(i))) {
    arr = [].concat(...arr);
  }

  return arr;
};

export const flatten = { flatten1, flatten2 };

const curry = <T = any>(fn: Function) => {
  const subCurry = (...args: T[]) => {
    if (fn.length === args.length) {
      return fn(...args);
    } else {
      return (...arg: T[]) => subCurry(...args, ...arg);
    }
  };

  return subCurry;
};

const add = (a: number, b: number) => {
  return a + b;
};

export const currying = {
  curry,
  add: curry(add),
};

export const compose = (...fns: any[]) => {
  return (init: any) => {
    return fns.reduce((pre, cur) => {
      return cur(pre);
    }, init);
  };
};

export const simpleDiff = (obj1: any, obj2: any) => {
  if (!obj1 || !obj2) return false;

  const diffChanges: any = { changes: [], add: [], remove: [] };
  if (typeof obj1 === "object" && typeof obj2 === "object") {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    keys1.forEach((key) => {
      if (!obj2[key]) {
        diffChanges.remove.push({ key, value: obj1[key] });
      }

      if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
        if (obj1[key] !== obj2[key]) {
          const curChange = {
            key,
            value: simpleDiff(obj1[key], obj2[key]),
          };
          diffChanges.changes.push(curChange);
        }
      } else {
        if (obj1[key] !== obj2[key]) {
          diffChanges.changes.push({
            key,
            value: { from: obj1[key], to: obj2[key] },
          });
        }
      }
    });

    const newKeys = keys2.filter((key) => !keys1.includes(key));
    newKeys.forEach((key) => {
      diffChanges.add.push({ key, value: obj2[key] });
    });
  }

  return diffChanges;
};

export const shuffle = (arr: Array<number>) => {
  for (let num = 0; num < arr.length; num++) {
    const randomIdx = Math.floor(Math.random() * arr.length);
    [arr[num], arr[randomIdx]] = [arr[randomIdx], arr[num]];
  }

  return arr;
};

export const test = () => {
  function decode(message: Array<Array<string>>) {
    // your code here
    if (!message || message.length === 0) return "";
    if (!message[0].length || message[0].length === 0) return "";
    const h = message.length;
    const w = message[0].length;
    let res = "";
    let curRow = 0;
    let direction = true;

    for (let i = 0; i < w; i++) {
      // console.log(direction, i, curRow)

      res += message[curRow][i];
      curRow += direction ? 1 : -1;
      if (curRow === 0 || curRow === h - 1) direction = !direction;
    }

    // console.log(res)
    return res;
  }

  decode([]);
};
