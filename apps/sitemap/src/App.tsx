import { useMemo } from "react";
import SitemapItem from "@/components/sitemap-item";
import routes, { RouteType, RouterConfig } from "@/router";
import styles from "./index.scss";

const App = () => {
  const typeRoutes = useMemo(() => {
    const typeSet: Record<RouteType, RouterConfig[]> = {
      website: [],
      resource: [],
    };

    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      if (!typeSet[route.type]) {
        typeSet[route.type] = [route];
      } else {
        typeSet[route.type].push(route);
      }
    }

    return typeSet;
  }, [routes]);

  return (
    <div className={styles.appWrapper}>
      {Object.keys(typeRoutes)?.map((type) => {
        const routes: RouterConfig[] = Reflect.get(typeRoutes, type);
        return (
          !!routes.length && (
            <div key={type}>
              <h1>{type}</h1>
              {routes.map((r) => (
                <ul key={r.title}>
                  <SitemapItem {...r} />
                </ul>
              ))}
            </div>
          )
        );
      })}
    </div>
  );
};

export default App;
