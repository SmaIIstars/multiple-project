import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";

import axiosMock from "./mock/axios/index.ts";

export const setupProdMockServer = () => {
  createProdMockServer([...axiosMock]);
};
