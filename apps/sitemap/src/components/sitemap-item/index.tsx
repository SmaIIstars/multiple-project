import { memo } from "react";

import type { RouterConfig } from "@/router";
import { NavLink } from "react-router-dom";

const SitemapItem = (route: RouterConfig) => {
  const { title, link, path } = route;

  return (
    <li>
      {link ? <a href={link}>{title}</a> : <NavLink to={path ?? ""}></NavLink>}
    </li>
  );
};

export default memo(SitemapItem);
