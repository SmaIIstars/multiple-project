import { SITE_TYPE, SitemapResource } from "@/components/web-sitemap/types";

// site
export const SITE_NAME = "SmallStars";
export const SITE_DOMAIN = "smallstars.top";

const sitemapMap: Partial<Record<SITE_TYPE, SitemapResource[]>> = {
  [SITE_TYPE.APP]: [
    {
      name: "blog",
      link: "http://blog.smallstars.top",
      backupLinks: ["https://www.smallstars.top/myblog"],
    },
    {
      name: "sitemap",
      link: "http://smallstars.top",
      backupLinks: ["https://www.smallstars.top"],
    },
    {
      name: "cron",
      link: "http://cron.smallstars.top",
      backupLinks: ["https://www.smallstars.top/cron-expression"],
    },
    {
      name: "specify-text",
      link: "http://www.smallstars.top/specify-text",
      backupLinks: [],
    },
    {
      name: "demo",
      link: "http://demo.smallstars.top",
      backupLinks: ["https://www.smallstars.top/react-demo"],
    },
  ],
};

export const routes = Object.entries(sitemapMap)
  .map((curTypeSitemaps) => {
    const [type, sitemaps] = curTypeSitemaps as [SITE_TYPE, SitemapResource[]];
    const sitemapList = sitemaps.map<SitemapResource>((sitemap) => ({
      ...sitemap,
      type,
    }));
    return sitemapList;
  })
  .flat();
