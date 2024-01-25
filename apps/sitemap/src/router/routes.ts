import { SITE_TYPE, SitemapResource } from "@/components/web-sitemap/types";

// site
export const SITE_NAME = "SmallStars";
export const SITE_DOMAIN = "smallstars.top";

const sitemapMap: Partial<Record<SITE_TYPE, SitemapResource[]>> = {
  [SITE_TYPE.APP]: [
    {
      name: "blog",
      link: "http://blog.smallstars.top",
      backupLinks: ["https://smaiistars.github.io/myblog"],
    },
    {
      name: "sitemap",
      link: "http://smallstars.top",
      backupLinks: ["https://smaiistars.github.io"],
    },
    {
      name: "cron",
      link: "http://cron.smallstars.top",
      backupLinks: ["https://smaiistars.github.io/cron-expression"],
    },
    {
      name: "demo",
      link: "http://demo.smallstars.top",
      backupLinks: ["https://smaiistars.github.io/react-demo"],
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
