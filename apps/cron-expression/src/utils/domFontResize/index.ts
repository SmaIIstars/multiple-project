const setDomFontSize = (): void => {
  let width = document.documentElement.clientWidth || document.body.clientWidth;
  let fontsize = (width <= 1200 ? 1200 : width) / 100 + "px";
  (document.getElementsByTagName("html")[0].style as any)["font-size"] =
    fontsize;
};

export default setDomFontSize;
