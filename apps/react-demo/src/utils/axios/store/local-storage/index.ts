import { cloneDeep } from "lodash";
import safeJSONParse from "../../../safe-json-parse";
import BaseStore from "../definition/store";

export type LocalStorageStoreConfig = {
  prefixName?: string;
};

type LocalStorageKey = string;
type LocalStorageValue = any;
interface LocalStorageInsertOption {
  expiredTime?: number;
}

type LocalStorageUpdateOption = LocalStorageInsertOption;
// Reserved for future type extensions
// interface LocalStorageReadOption {}
interface LocalStorageDeleteOption {
  clearAll?: boolean;
}

export default class LocalStorage implements BaseStore {
  readonly storeType = "localStorage";
  prefixName: string;

  get length() {
    return Object.keys(localStorage).length;
  }

  constructor(conf?: LocalStorageStoreConfig) {
    const { prefixName = "" } = conf ?? {};
    this.prefixName = prefixName;
  }

  insert(
    key: LocalStorageKey,
    value: LocalStorageValue,
    option?: LocalStorageInsertOption
  ) {
    const { expiredTime } = option ?? {};
    this.setItem(key, value, expiredTime);
  }

  read(key: LocalStorageKey) {
    return this.getItem(key);
  }

  update(
    key: LocalStorageKey,
    newValue: any,
    option?: LocalStorageUpdateOption
  ) {
    const { expiredTime } = option ?? {};
    this.setItem(key, newValue, expiredTime);
  }

  delete(key: LocalStorageKey, option?: LocalStorageDeleteOption) {
    const { clearAll } = option ?? {};
    if (clearAll) return this.clear();

    this.removeItem(key);
  }

  setItem(key: string, value: any, expiredTime?: number) {
    const _key = this.prefixName + key;
    if (value === undefined) value = null;

    const _value = cloneDeep(value);

    if (expiredTime)
      Reflect.set(_value, "expiredTime", expiredTime * 1000 + Date.now());

    localStorage.setItem(_key, JSON.stringify(_value));
  }

  getItem(key: string) {
    return localStorage.getItem(this.prefixName + key);
  }

  removeItem(key: string) {
    localStorage.removeItem(this.prefixName + key);
  }

  clear() {
    Object.keys(localStorage).forEach((item) => {
      if (!item.startsWith(this.prefixName)) return;
      localStorage.removeItem(item);
    });
  }

  hasItem(key: string) {
    return localStorage.getItem(this.prefixName + key) ? true : false;
  }

  clearExpiredItem() {
    Object.keys(localStorage).forEach((item) => {
      if (!item.startsWith(this.prefixName)) return;

      let _expiredTime = 0;
      const lsItem = localStorage.getItem(item);
      if (lsItem) _expiredTime = safeJSONParse(lsItem)?.expiredTime;

      if (_expiredTime && Date.now() > _expiredTime)
        localStorage.removeItem(item);
    });
  }
}
