import WebSitemap from "@/components/web-sitemap";
import { routes, SITE_NAME, SITE_DOMAIN } from "./router/routes";
import styles from "./index.module.scss";

const App = () => {
  return (
    <div className={styles.appWrapper}>
      <WebSitemap
        siteName={SITE_NAME}
        siteUri={SITE_DOMAIN}
        sitemaps={routes}
      />
    </div>
  );
};

export default App;
