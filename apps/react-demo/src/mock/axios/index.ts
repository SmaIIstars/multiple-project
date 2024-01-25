import { MockRequest } from "../index";

const getData: MockRequest = {
  url: "/api/axios/getData",
  method: "GET",
  response: () => {
    return 123;
  },
};

const getErrData: MockRequest = {
  url: "/api/axios/getErrData",
  method: "GET",
  response: () => {
    return 500;
  },
  timeout: 20 * 1000,
};

const mockReq: MockRequest[] = [getData, getErrData];
export default mockReq;
