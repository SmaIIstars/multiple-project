import { SITE_TYPE, SitemapResource } from "@/components/web-sitemap/types";
import { BASENAME } from "@/constant";

// site
export const SITE_NAME = "SmallStars";
export const SITE_DOMAIN = "smallstars.top";

const sitemapMap: Partial<Record<SITE_TYPE, SitemapResource[]>> = {
  [SITE_TYPE.APP]: [
    { name: "Axios", link: "/axios" },
    { name: "ContentSlider", link: "/content-slider" },
    { name: "Cron", link: "/cron" },
    { name: "D3Force", link: "/d3-force" },
    { name: "Fullpage", link: "/fullpage" },
    { name: "LoadResource", link: "/load-resource" },
    { name: "Lottie", link: "/lottie" },
    { name: "MatterJs", link: "/matter-js" },
    { name: "PixiJs", link: "/pixi-js" },
    { name: "Socket", link: "/socket" },
    { name: "Swiper", link: "/swiper" },
    { name: "Test", link: "/test" },
    { name: "ThreeJs", link: "/three-js" },
    { name: "TimeLine", link: "/time-line" },
    { name: "WebSitemap", link: "/web-sitemap" },
    { name: "SpecifyText", link: "/specify-text" },
  ],
};

export const routes = Object.entries(sitemapMap)
  .map((curTypeSitemaps) => {
    const [type, sitemaps] = curTypeSitemaps as [SITE_TYPE, SitemapResource[]];
    const sitemapList = sitemaps.map<SitemapResource>((sitemap) => ({
      name: sitemap.name,
      link: `/${BASENAME}${sitemap.link}`,
      type,
    }));
    return sitemapList;
  })
  .flat();
