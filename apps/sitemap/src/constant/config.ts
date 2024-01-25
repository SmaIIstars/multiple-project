import { SITE_TYPE, SitemapResource } from "@/components/web-sitemap/config";
import { SITE_NAME, SITE_DOMAIN } from ".";

export interface Config {
  siteName: string;
  siteUri: string;
  sitemaps: SitemapResource[];
}

const sitemapMap: Record<SITE_TYPE, SitemapResource[]> = {
  [SITE_TYPE.APP]: [
    { name: `${SITE_NAME}'s Blog`, link: `//blog.${SITE_DOMAIN}` },
    { name: `${SITE_NAME}'s Cron Expression`, link: `//cron.${SITE_DOMAIN}` },
  ],
  [SITE_TYPE.POST]: [],
  [SITE_TYPE.RESOURCE]: [
    {
      name: "Professional JavaScript for Web Developers, 4th Edition(zh)",
      link: `//${SITE_DOMAIN}/JavaScript.pdf`,
    },
  ],
};

const SitemapConfig: Config = {
  siteName: `${SITE_NAME}`,
  siteUri: `//${SITE_DOMAIN}`,
  sitemaps: Object.entries(sitemapMap)
    .map((curTypeSitemaps) => {
      const [type, sitemaps] = curTypeSitemaps as [
        SITE_TYPE,
        SitemapResource[]
      ];
      const sitemapList = sitemaps.map<SitemapResource>((sitemap) => ({
        name: sitemap.name,
        link: sitemap.link,
        type,
      }));
      return sitemapList;
    })
    .flat(),
};

console.error("SitemapConfig", SitemapConfig);

export default SitemapConfig;
