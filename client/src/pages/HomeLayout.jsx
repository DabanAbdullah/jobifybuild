import React from "react";
import { Outlet } from "react-router-dom";

export const HomeLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default HomeLayout;
