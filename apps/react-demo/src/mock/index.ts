import axiosMockReq from "./axios";

export type MockRequest = {
  [key in string]: any;
} & {
  url: string;
  method: "GET" | "POST";
  response: (...args: any[]) => any;
};

export default [...axiosMockReq];
