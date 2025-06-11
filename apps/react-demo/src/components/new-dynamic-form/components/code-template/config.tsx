import { ALL_DATA_TYPE } from "../..";
import { ConfigSectionType } from "../../../new-dynamic-form/types";
import { getCommonConfig } from "../constants";

const ItemCodeTemplateConfig: ConfigSectionType[] = [
  ...getCommonConfig([
    {
      sectionLabel: "generalConfig",
      items: [
        {
          itemLabel: "DataType",
          itemName: "dataType",
          type: "select",
          options: Object.values(ALL_DATA_TYPE).map((i) => ({
            label: i,
            value: i,
          })),
          defaultValue: ALL_DATA_TYPE.String,
          disabled: true,
        },
      ],
    },
  ]),
  {
    sectionLabel: "codeTemplateConfig",
    items: [
      {
        itemLabel: "Language",
        itemName: "language",
        type: "select",
        options: [
          // validation
          { label: "TypeScript", value: "typescript" },
          { label: "JavaScript", value: "javascript" },
          { label: "CSS", value: "css" },
          { label: "LESS", value: "less" },
          { label: "SCSS", value: "scss" },
          { label: "JSON", value: "json" },
          { label: "HTML", value: "html" },
          // colorization
          { label: "XML", value: "xml" },
          { label: "PHP", value: "php" },
          { label: "C#", value: "csharp" },
          { label: "C++", value: "cpp" },
          { label: "Razor", value: "razor" },
          { label: "Markdown", value: "markdown" },
          { label: "Diff", value: "diff" },
          { label: "Java", value: "java" },
          { label: "VB", value: "vb" },
          { label: "CoffeeScript", value: "coffeescript" },
          { label: "Handlebars", value: "handlebars" },
          { label: "Batch", value: "batch" },
          { label: "Pug", value: "pug" },
          { label: "F#", value: "fsharp" },
          { label: "Lua", value: "lua" },
          { label: "Powershell", value: "powershell" },
          { label: "Python", value: "python" },
          { label: "Ruby", value: "ruby" },
          { label: "SASS", value: "sass" },
          { label: "R", value: "r" },
          { label: "Objective-C", value: "objective-c" },
        ],
        defaultValue: "javascript",
      },
    ],
  },
];

export default ItemCodeTemplateConfig;
