import { memo } from "react";

import { router, routes } from "./router";
import { RouterProvider } from "react-router-dom";

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default memo(App);
