import { SpecifyTextCustomType } from "../components/specify-text-custom";

export type ExampleConfig = {
  title: string;
  text: string;
  configs: SpecifyTextCustomType[];
  buildIn?: boolean;
};
