import { memo, useEffect } from "react";
import cls from "classnames";
import request from "@/utils/axios";

import "./index.less";

const Axios = () => {
  useEffect(() => {
    request.get({ url: "/api/axios/getErrData" }).then((res) => {
      console.log("res", res);
    });
  }, []);

  return (
    <div className={cls("axios-wrapper")}>
      axios
      <div className={cls("image-wrapper")}>
        <img
          src="https://pic1.zhimg.com/80/v2-68e7820fda1a6e114994ab326dbe0cb8_1440w.webp"
          className="image"
        />
      </div>
    </div>
  );
};

export default memo(Axios);
