import { memo, useMemo } from "react";
import classnames from "classnames";

import { formatTimestamp } from "@/utils/time";
import { SECOND_FORMAT } from "@/utils/time/constant";
import SitemapConfig from "@/constant/config";
import styles from "./style.module.scss";

import { SITE_TYPE, SitemapResource } from "./config";

const lastUpdateDate = formatTimestamp(
  new Date().getTime() / 1000,
  SECOND_FORMAT
);
const Sitemap = () => {
  const { siteName, siteUri, sitemaps } = SitemapConfig;

  const data = useMemo(() => {
    const resourceMap: Record<Partial<SITE_TYPE>, SitemapResource[]> = {
      [SITE_TYPE.APP]: [],
      [SITE_TYPE.POST]: [],
      [SITE_TYPE.RESOURCE]: [],
    };

    sitemaps.forEach((siteItem) => {
      const curResource = Reflect.get(resourceMap, siteItem.type);
      if (!siteItem.type) {
        Reflect.set(resourceMap, siteItem.type, [curResource]);
      } else {
        const curTypeResourceList = Reflect.get(resourceMap, siteItem.type);
        curTypeResourceList.push(siteItem);
      }
    });

    return resourceMap;
  }, []);

  return (
    <div id="sitemap-wrapper" className={classnames(styles["sitemap-wrapper"])}>
      <header>
        <h2>{siteName}'s Website Sitemap</h2>
      </header>

      <div
        id="sitemap-body-wrapper"
        className={classnames(styles["sitemap-body-wrapper"])}
      >
        {data &&
          Object.entries(data).map((item) => {
            const [type, resourceList] = item;
            return (
              <div className={styles["sitemap-item-wrapper"]} key={type}>
                <h3>{type}</h3>
                <ul>
                  {resourceList.map((siteItem) => {
                    return (
                      <li key={siteItem.name}>
                        <a href={siteItem.link}>{siteItem.name}</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
      </div>
      <footer>
        <div className={classnames(styles["latest-update-date"])}>
          Latest Update: {lastUpdateDate}
        </div>
        <div className={classnames(styles["copyright"])}>
          © 2020-2022 {siteName}'s website. All Rights Reserved
        </div>
      </footer>
    </div>
  );
};

export default memo(Sitemap);
