import { createBrowserRouter } from "react-router";
import RootLayout from "../LayOuts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Home/Coverage/Coverage";
import AuthLayout from "../LayOuts/AuthLayout";
import Login from "../Pages/Home/Auth/Login/Login";
import Register from "../Pages/Home/Auth/Login/Register/Register";

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
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login
      },
      {
        path: "Register",
        Component: Register
      },
    ],
  },
]);
