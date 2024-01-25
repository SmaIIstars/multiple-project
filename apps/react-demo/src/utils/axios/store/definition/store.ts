import type { StoreType } from "../types";

export type keyType = string | number | symbol;
export type valueType = any;
export type optionType = Record<any, any>;

abstract class BaseStore {
  abstract storeType: StoreType;

  abstract insert(key: keyType, value: valueType, option?: optionType): any;

  abstract read(key: keyType, option?: optionType): any;

  abstract update(key: keyType, newValue: valueType, option?: optionType): any;

  abstract delete(key: keyType, option?: optionType): any;
}

export default BaseStore;
