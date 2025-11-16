import { createBrowserRouter } from "react-router";
import RootLayout from "../LayOuts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Home/Coverage/Coverage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path:"coverage",
        Component: Coverage,
      },
    ],
  },
]);
