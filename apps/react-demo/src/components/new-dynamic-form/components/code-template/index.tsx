import type { EditorProps } from "@monaco-editor/react";
import { omitBy } from "lodash-es";
import { editor, IDisposable } from "monaco-editor";
import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import { useFormContext } from "../../../new-dynamic-form/context";
// import CodeEditor from 'views/portal/agent/studio/workflow/components/code-editor'
import { getCommonDefaultValue } from "../constants";
import ComponentWrapper from "../lib/component-wrapper";
import ItemCodeTemplateConfig from "./config";
import { registerVariableCompletionProvider } from "./constants";
import styles from "./index.module.scss";

type codeTemplateConfig = {
  codeTemplateConfig?: EditorProps;
} & Record<string, any>;

const CodeTemplate = (props: codeTemplateConfig) => {
  const { codeTemplateConfig } = props;
  const { referenceTreeData = [] } = useFormContext() ?? {};

  const editorRef = useRef<{
    editor: editor.IStandaloneCodeEditor;
    variableDisposer?: IDisposable;
  }>();
  const filterProps = useMemo(
    () => omitBy(props, (_, k) => k !== "onChange" && /[A-Z]/.test(k)),
    [props]
  );

  const triggerSuggestions = useCallback(() => {
    if (!editorRef.current) return;
    editorRef.current.editor.focus();
    editorRef.current.editor.trigger(
      "button",
      "editor.action.triggerSuggest",
      {}
    );
  }, []);

  const handleEditorDidMount = useCallback<NonNullable<EditorProps["onMount"]>>(
    (editor, monaco) => {
      editorRef.current = { editor };
      if (editorRef.current.variableDisposer) {
        editorRef.current.variableDisposer.dispose();
        editorRef.current.variableDisposer = undefined;
      }
      editorRef.current.variableDisposer = registerVariableCompletionProvider(
        editor,
        referenceTreeData
      );
      codeTemplateConfig?.onMount?.(editor, monaco);
    },
    [codeTemplateConfig, referenceTreeData]
  );

  useEffect(() => {
    return () => {
      editorRef.current?.variableDisposer?.dispose();
    };
  }, []);

  return (
    <div className={styles.codeTemplateWrapper}>
      {/* <CodeEditor
        options={{ lineNumbers: "on" }}
        language="golangTemplate"
        {...filterProps}
        {...codeTemplateConfig}
        onMount={handleEditorDidMount}
        toolbar={
          <Tooltip title="Insert Variable">
            <Button icon={<PlusOutlined />} onClick={triggerSuggestions} />
          </Tooltip>
        }
      /> */}
    </div>
  );
};

export default ComponentWrapper(memo(CodeTemplate));
export const getDefaultValue = () => {
  const defaultValDataType = ItemCodeTemplateConfig.find(
    (c) => c.sectionLabel === "generalConfig"
  )?.items.find((i) => i.itemName === "dataType")?.defaultValue;
  return getCommonDefaultValue("codeTemplate", {
    props: {
      formItemConfig: { layout: "vertical" },
      generalConfig: { dataType: defaultValDataType },
    },
  });
};
