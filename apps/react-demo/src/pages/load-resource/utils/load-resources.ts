import { cdnRequest as request } from "@/utils/axios";
import { AxiosResponse } from "axios";

const loadResources = async (resourceUrls: string[]) => {
  for (const url of resourceUrls) {
    const response: AxiosResponse = await request
      .get<AxiosResponse>({ url })
      .catch((err) => {
        console.log(`Failed to load resource from ${url}: ${err}`);
        return err;
      });

    if (response?.status === 200) {
      return { url, ...response };
    }
  }
};

export default loadResources;
