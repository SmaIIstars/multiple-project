import React from "react";
import { RouteProps, Navigate, createBrowserRouter } from "react-router-dom";
import Axios from "@/pages/axios";
import ContentSlider from "@/pages/content-slider";
import Cron from "@/pages/cron";
import D3Force from "@/pages/d3-force";
import Fullpage from "@/pages/fullpage";
import LoadResource from "@/pages/load-resource";
import Lottie from "@/pages/lottie";
import MatterJs from "@/pages/matter-js";
import PixiJs from "@/pages/pixi-js";
import Socket from "@/pages/socket";
import Swiper from "@/pages/swiper";
import Test from "@/pages/test";
import ThreeJs from "@/pages/three-js";
import TimeLine from "@/pages/time-line";
import WebSitemap from "@/pages/web-sitemap";
import { BASENAME } from "@/constant";

// meta Type
interface MetaProps {
  title?: string;
}

const blackRouterList: string[] = [
  // "test",
];

// router type
export type RouterConfig = RouteProps & {
  path: string;
  element?: React.ComponentType<any>;
  routes?: RouterConfig[];
  meta?: MetaProps;
  redirect?: string;
  exact?: boolean;
  key?: string;
  [key: string]: any;
};

const routes = [
  { path: "/axios", element: () => <Axios /> },
  { path: "/content-slider", element: () => <ContentSlider /> },
  { path: "/cron", element: () => <Cron /> },
  { path: "/d3-force", element: () => <D3Force /> },
  { path: "/fullpage", element: () => <Fullpage /> },
  { path: "/load-resource", element: () => <LoadResource /> },
  { path: "/lottie", element: () => <Lottie /> },
  { path: "/matter-js", element: () => <MatterJs /> },
  { path: "/pixi-js", element: () => <PixiJs /> },
  // { path: "/socket", element: () => <Socket /> },
  { path: "/swiper", element: () => <Swiper /> },
  { path: "/test", element: () => <Test /> },
  // { path: "/three-js", element: () => <ThreeJs /> },
  { path: "/time-line", element: () => <TimeLine /> },
  { path: "/web-sitemap", element: () => <WebSitemap /> },
  {
    path: "*",
    element: () => <Navigate replace to="/web-sitemap" />,
  },
];

const router = createBrowserRouter(
  routes.map((route) => {
    return {
      element: <route.element />,
      path: route.path,
    };
  }),
  {
    basename: `/${BASENAME}`,
  }
);

console.log("routes", routes);

export { router, routes };
