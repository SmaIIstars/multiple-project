import { memo } from "react";
import { routes, SITE_NAME, SITE_DOMAIN } from "./routes";
import WebSitemap from "@/components/web-sitemap";

const WebSitemapPage = () => {
  return (
    <WebSitemap siteName={SITE_NAME} siteUri={SITE_DOMAIN} sitemaps={routes} />
  );
};

export default memo(WebSitemapPage);
