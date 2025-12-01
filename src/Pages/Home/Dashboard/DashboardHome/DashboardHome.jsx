import React from "react";
import useRole from "../../../../Hooks/useRole";
import Loading from "../../../../Components/Logo/Loading";
import AdminDashboardHome from "./AdminDashboardHome";
import UserDashboardHome from "./UserDashboardHome";
import RiderDashboardHome from "./RiderDashboardHome";

const DashboardHome = () => {
  const { role, roleLoading } = useRole();
  if (roleLoading) {
    return <Loading></Loading>;
  }
  if (role === "admin") {
    return <AdminDashboardHome></AdminDashboardHome>;
  } else if (role === "rider") {
    return <RiderDashboardHome></RiderDashboardHome>;
  } else {
    return <UserDashboardHome></UserDashboardHome>;
  }
};

export default DashboardHome;
