import { memo, useMemo } from "react";
import classnames from "classnames";

import { formatTimestamp } from "@/utils/time";
import { SECOND_FORMAT } from "@/utils/time/constant";
import styles from "./style.module.scss";

import { SITE_TYPE, SitemapResource } from "./types";

const lastUpdateDate = formatTimestamp(
  new Date().getTime() / 1000,
  SECOND_FORMAT
);

export type WebSitemapProps = {
  siteName: string;
  siteUri: string;
  sitemaps: SitemapResource[];
};

const Sitemap = (props: WebSitemapProps) => {
  const { siteName, sitemaps } = props;

  const data = useMemo(() => {
    const resourceMap: Partial<Record<SITE_TYPE, SitemapResource[]>> = {};

    sitemaps.forEach((siteItem) => {
      if (!siteItem.type) return;

      const curTypeResourceList = Reflect.get(resourceMap, siteItem.type);
      if (!curTypeResourceList) {
        Reflect.set(resourceMap, siteItem.type, [siteItem]);
      } else {
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
                        {siteItem.backupLinks?.map((link, idx) => {
                          return (
                            <a
                              href={link}
                              key={link}
                              className={styles.sitemapItemBackupLink}
                            >
                              {`BackupLink${idx + 1}`}
                            </a>
                          );
                        })}
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
