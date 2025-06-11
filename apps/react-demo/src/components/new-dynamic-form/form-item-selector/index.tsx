import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Avatar, Divider } from "antd";
import { startCase } from "lodash";
import React, { memo, useEffect, useRef, useState } from "react";
import { FormSelectorType } from "../types";
import { DEFAULT_ITEM_SELECTOR_MAP, ItemSelectorType } from "./constant";
import styles from "./index.module.scss";

type SelectorMapType = {
  name: FormSelectorType;
  config: ItemSelectorType[FormSelectorType];
};

type ItemSelectorProps = {
  children: React.ReactNode;
  type: FormSelectorType;
};

const ItemSelector = (props: ItemSelectorProps) => {
  const { children, type } = props;

  const itemRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!itemRef.current) return;

    return combine(
      draggable({
        element: itemRef.current,
        getInitialData: () => ({ type: "selector", itemType: type }),
      })
    );
  }, []);

  return <div ref={itemRef}>{children}</div>;
};

const DefaultItemSelector = (props: SelectorMapType) => {
  const { name, config } = props;

  return (
    <div className={styles.dynamicFormItemSelectorDefaultWrapper}>
      <Avatar
        className={styles.dynamicFormItemSelectorDefaultIcon}
        size={80}
        src={config?.icon}
      />

      <div className={styles.dynamicFormItemSelectorDefaultName}>
        {startCase(name)}
      </div>
    </div>
  );
};

export type FormItemSelectorProps = {
  map?: ItemSelectorType;
};
const FormItemSelector = (props: FormItemSelectorProps) => {
  const { map } = props;

  const [selectorMap, setSelectorMap] = useState<ItemSelectorType>({
    ...DEFAULT_ITEM_SELECTOR_MAP,
    ...map,
  });

  useEffect(() => {
    setSelectorMap({ ...selectorMap, ...map });
  }, [map]);

  return (
    <div className={styles.dynamicFormItemSelectorWrapper}>
      <div className={styles.dynamicFormItemSelectorHeader}>Component</div>
      <Divider />
      <div className={styles.dynamicFormItemSelectorContent}>
        {Object.entries(selectorMap).map((item) => {
          const [key, config] = item as [
            SelectorMapType["name"],
            SelectorMapType["config"]
          ];
          if (key === "root") return;

          return (
            <ItemSelector key={key} type={key}>
              {config?.render ?? (
                <DefaultItemSelector name={key} config={config} />
              )}
            </ItemSelector>
          );
        })}
      </div>
    </div>
  );
};

export default memo(FormItemSelector);
