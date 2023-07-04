import ReactDOM from "react-dom";
import _ from "lodash";

import domFontResize from "@/utils/domFontResize";
import App from "./App";
import "./assets/css/index.less";

window.addEventListener("resize", _.debounce(domFontResize, 500)); // 浏览器加入收缩监听防抖，重新计算rem配置

ReactDOM.render(<App />, document.getElementById("root"));
