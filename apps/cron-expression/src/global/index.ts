import { debounce } from "lodash";
import domFontResize from "@/utils/domFontResize";

export const beforeMountRegister = () => {
  // domFont
  domFontResize();
  window.addEventListener("resize", debounce(domFontResize, 500));
};

export const mountedRegister = () => {};
