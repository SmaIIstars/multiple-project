import { memo } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import "./index.less";

const anchors = ["firstPage", "secondPage", "thirdPage"];

const FullPage = () => {
  return (
    <div>
      <ReactFullpage
        credits={{
          enabled: true,
          label: "1",
          position: "left",
        }}
        anchors={anchors} // 每一部分的锚点, 就是url#后面的部分
        navigation // 是否显示右侧小圆圈
        navigationTooltips={anchors} // 鼠标放到小圆圈上显示的提示
        sectionsColor={["#282c34", "#ff5f45", "#0798ec"]} // 每一个部分你的背景色
        onLeave={(origin, destination, direction) => {
          console.log("onLeave event", { origin, destination, direction });
        }} // 离开某一部分你的回调, 参数分别表示从哪里开 去哪里 方向. 前两者是自定义类型nn, 方向是up或down
        render={({ state, fullpageApi }) => {
          return (
            <>
              <div className="section">
                <h3
                  style={{
                    textAlign: "center",
                    fontSize: "66px",
                    color: "#fff",
                  }}
                >
                  {"Slide down!"}
                </h3>
              </div>
              <div className="section">
                <h3
                  style={{
                    textAlign: "center",
                    fontSize: "66px",
                    color: "#fff",
                  }}
                >
                  {"Keep going!"}
                </h3>
              </div>
              <div className="section">
                <h3
                  style={{
                    textAlign: "center",
                    fontSize: "66px",
                    color: "#fff",
                  }}
                >
                  {"Slide up!"}
                </h3>
              </div>
            </>
          );
        }}
      />
    </div>
  );
};

export default memo(FullPage);
