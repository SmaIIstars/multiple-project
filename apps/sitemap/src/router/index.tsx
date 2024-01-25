import React from "react";
import { RouteProps } from "react-router-dom";

export enum RoutePath {
  sitemap = "http://smallstars.top",
  blog = "http://blog.smallstars.top",
  cron = "http://cron.smallstars.top",
  demo = "http://demo.smallstars.top",

  githubSitemap = "https://smaiistars.github.io",
  githubBlog = "https://smaiistars.github.io/myblog",
  githubCron = "https://smaiistars.github.io/cron-expression",
  githubDemo = "https://smaiistars.github.io/react-demo",
}

// router type
export type RouteType = "website" | "resource";

export type RouterConfig = RouteProps & {
  title: string;
  type: RouteType;
  path?: RoutePath;
  link?: string;
  component?: React.ComponentType;
  meta?: Record<string, unknown> & { title?: string };
};

const routes: RouterConfig[] = [
  { type: "website", title: "blog", link: RoutePath.blog },
  { type: "website", title: "sitemap", link: RoutePath.sitemap },
  { type: "website", title: "cron", link: RoutePath.cron },
  { type: "website", title: "demo", link: RoutePath.demo },

  { type: "website", title: "githubSitemap", link: RoutePath.githubBlog },
  { type: "website", title: "githubBlog", link: RoutePath.githubSitemap },
  { type: "website", title: "githubCron", link: RoutePath.githubCron },
  { type: "website", title: "githubDemo", link: RoutePath.githubDemo },
];

export default routes;
