const formatBaseUrl = (base?: string) => {
  if (!base) return "";
  if (base.startsWith("/")) return base;
  return `/${base}`;
};

export const prefixStr = "";
export const subRoutesKey = "routes";
export const baseUrl = formatBaseUrl("");
