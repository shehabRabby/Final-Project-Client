import { createBrowserRouter } from "react-router";
import RootLayout from "../LayOuts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/Home/Coverage/Coverage";
import AuthLayout from "../LayOuts/AuthLayout";
import Login from "../Pages/Home/Auth/Login/Login";
import Register from "../Pages/Home/Auth/Login/Register/Register";
import Rider from "../Rider/Rider";
import PrivateRoute from "./PrivateRoute";
import SendParcel from "../Pages/Home/SendParcel/SendParcel";
import Dashboard from "../LayOuts/Dashboard";
import MyParcels from "../Pages/Home/Dashboard/MyParcels/MyParcels";
import Payment from "../Pages/Home/Dashboard/MyParcels/Payment/Payment";
import PaymentSuccess from "../Pages/Home/Dashboard/MyParcels/Payment/PaymentSuccess";
import PaymentCancel from "../Pages/Home/Dashboard/MyParcels/Payment/PaymentCancel";
import PaymentHistory from "../Pages/Home/Dashboard/MyParcels/PaymentHistory/PaymentHistory";
import ApproveRiders from "../Pages/Home/Dashboard/MyParcels/ApproveRiders/ApproveRiders";
import UsersManagement from "../Pages/Home/Dashboard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import About from "../Pages/About/About";
import AssignRiders from "../Pages/Home/Dashboard/AssignRiders/AssignRiders";
import RiderRoutes from "./RiderRoutes";

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
        path: "about",
        Component: About,
      },
      {
        path: "rider",
        element: (
          <PrivateRoute>
            <Rider></Rider>
          </PrivateRoute>
        ),
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
      },
      {
        path: "send-parcel",
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
        loader: () => fetch("/serviceCenter.json").then((res) => res.json()),
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
        Component: Login,
      },
      {
        path: "Register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-parcels",
        Component: MyParcels,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancel,
      },
      // rider only routes
      {
        path: "assigned-delivires",
        element: <RiderRoutes></RiderRoutes>,
      },

      //admin related routes
      {
        path: "approve-riders",
        element: (
          <AdminRoute>
            <ApproveRiders></ApproveRiders>
          </AdminRoute>
        ),
      },
      {
        path: "assign-riders",
        element: (
          <AdminRoute>
            <AssignRiders></AssignRiders>
          </AdminRoute>
        ),
      },
      {
        path: "users-management",
        element: (
          <AdminRoute>
            <UsersManagement></UsersManagement>
          </AdminRoute>
        ),
      },
    ],
  },
]);
