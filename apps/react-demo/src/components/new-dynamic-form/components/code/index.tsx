import { omitBy } from "lodash-es";
import { memo, useMemo } from "react";
import ComponentWrapper from "../lib/component-wrapper";

// import CodeEditor, {
//   CodeEditorProps,
// } from 'views/portal/agent/studio/workflow/components/code-editor'
import { getCommonDefaultValue } from "../constants";
import ItemCodeConfig from "./config";

type ItemCodeProps = {
  // codeConfig?: CodeEditorProps & Record<string, any>;
} & Record<string, any>;

const ItemCode = (props: ItemCodeProps) => {
  const { codeConfig } = props;

  const filterProps = useMemo(
    () => omitBy(props, (_, k) => k !== "onChange" && /[A-Z]/.test(k)),
    [props]
  );

  return 1;
  // <CodeEditor {...filterProps} {...codeConfig} />
};

export default ComponentWrapper(memo(ItemCode));
export const getDefaultValue = () => {
  const defaultValDataType = ItemCodeConfig.find(
    (c) => c.sectionLabel === "generalConfig"
  )?.items.find((i) => i.itemName === "dataType")?.defaultValue;
  return getCommonDefaultValue("code", {
    props: {
      formItemConfig: { layout: "vertical" },
      generalConfig: { dataType: defaultValDataType },
    },
  });
};
