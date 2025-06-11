import { Switch, SwitchProps } from "antd";
import { omitBy } from "lodash-es";
import { memo, useMemo } from "react";
import { getCommonDefaultValue } from "../constants";
import ComponentWrapper from "../lib/component-wrapper";
import ItemSwitchConfig from "./config";

type ItemSwitchProps = { switchConfig?: SwitchProps } & Record<string, any>;

const ItemSwitch = (props: ItemSwitchProps) => {
  const { switchConfig } = props;

  const filterProps = useMemo(
    () => omitBy(props, (_, k) => k !== "onChange" && /[A-Z]/.test(k)),
    [props]
  );

  return <Switch {...filterProps} {...switchConfig} />;
};

export default ComponentWrapper(memo(ItemSwitch));
export const getDefaultValue = () => {
  const defaultValDataType = ItemSwitchConfig.find(
    (c) => c.sectionLabel === "generalConfig"
  )?.items.find((i) => i.itemName === "dataType")?.defaultValue;

  const defaultValSwitchValue = ItemSwitchConfig.find(
    (c) => c.sectionLabel === "switchConfig"
  )?.items.find((i) => i.itemName === "defaultValue")?.defaultValue;

  return getCommonDefaultValue("switch", {
    props: {
      generalConfig: { dataType: defaultValDataType },
      switchConfig: { defaultValue: defaultValSwitchValue },
    },
  });
};
