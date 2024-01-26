import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  DashboardLayout,
  Landing,
  Register,
  Login,
  Error,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
  EditJob,
} from "./pages";

import { action as registerAction } from "./pages/Register";
import { action as loginaction } from "./pages/Login";
import { action as addjobaction } from "./pages/AddJob";
import { loader as dashboardloader } from "./pages/DashboardLayout";
import { loader as getalljobsloader } from "./pages/AllJobs";
import { loader as editJobLoader } from "./pages/EditJob";
import { action as editJobAction } from "./pages/EditJob";
import { action as deleteJobAction } from "./pages/DeleteJob";
import { loader as adminLoader } from "./pages/Admin";
import { action as profileAction } from "./pages/Profile";
import { loader as statsLoader } from "./pages/Stats";
export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const route = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    errorElement: <Error />,
    children: [
      { index: true, element: <Landing /> },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      { path: "login", Component: Login, action: loginaction },
      {
        path: "dashboard",
        loader: dashboardloader,
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addjobaction,
          },
          { path: "stats", element: <Stats />, loader: statsLoader },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: getalljobsloader,
          },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction,
          },
          {
            path: "delete-job/:id",
            action: deleteJobAction,
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },
        ],
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={route}></RouterProvider>;
};

export default App;
