import LocalStorage from "../store/local-storage";
import BaseStore, { keyType, optionType } from "./definition/store";

import type { StoreType, StoreConfig } from "./types";

const storeRegistrationForm: Record<
  StoreType,
  (config?: StoreConfig) => BaseStore
> = {
  localStorage: (c) => new LocalStorage(c),
};

export default class Store extends BaseStore {
  private _storeType!: StoreType;
  public get storeType(): StoreType {
    return this._storeType;
  }
  private set storeType(v: StoreType) {
    this._storeType = v;
  }

  private _store!: BaseStore;
  public get store(): BaseStore {
    return this._store;
  }
  private set store(v: BaseStore) {
    this._store = v;
  }

  constructor(storeType: StoreType = "localStorage", config?: StoreConfig) {
    super();

    this.storeType = storeType;
    this.store = config
      ? storeRegistrationForm[storeType](config)
      : storeRegistrationForm[storeType]();
  }

  insert(key: keyType, value: any, option?: optionType) {
    this.store.insert(key, value, option);
  }
  read(key: keyType, option?: optionType) {
    return this.store.read(key, option);
  }
  update(key: keyType, newValue: any, option?: optionType) {
    this.store.update(key, newValue, option);
  }
  delete(key: keyType, option?: optionType) {
    this.store.delete(key, option);
  }
}
