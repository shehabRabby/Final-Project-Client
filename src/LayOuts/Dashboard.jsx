import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaMotorcycle, FaRegCreditCard, FaUsers } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router";
import useRole from "../Hooks/useRole";

const Dashboard = () => {
  const { role } = useRole();
  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto bg-black px-4">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="navbar w-full bg-gradient-to-r from-lime-500 to-green-700 text-white shadow-lg rounded-b-2xl">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost lg:hidden text-lime-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="inline-block w-6 h-6"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4 text-xl font-bold text-lime-300 drop-shadow-md">
            Zap Shift Dashboard
          </div>
        </nav>

        {/* Page content */}
        <div className="flex-1 p-4 bg-gray-800 text-white rounded-t-2xl shadow-inner">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <div className="flex flex-col min-h-full w-64 bg-gray-800 shadow-lg rounded-r-2xl">
          <ul className="menu p-4 w-full space-y-2">
            {/* Home */}
            <li>
              <Link
                to="/"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-lime-500/20 transition-colors text-lime-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="w-6 h-6 text-lime-400"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span>Home Page</span>
              </Link>
            </li>

            {/* Dashboard Links */}
            <li>
              <NavLink
                to="/dashboard/my-parcels"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-lime-500/20 transition-colors text-lime-300"
              >
                <CiDeliveryTruck size={30} className="text-green-400" />
                <span>My Parcels</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/payment-history"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-lime-500/20 transition-colors text-lime-300"
              >
                <FaRegCreditCard size={30} className="text-green-400" />
                <span>Payment History</span>
              </NavLink>
            </li>

            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/approve-riders"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-lime-500/20 transition-colors text-lime-300"
                  >
                    <FaMotorcycle size={30} className="text-green-400" />
                    <span>Approve Riders</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/users-management"
                    data-tip="Users Management"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-lime-500/20 transition-colors text-lime-300"
                  >
                    <FaUsers size={30} className="text-green-400" />
                    <span>Users Management</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* Settings */}
            <li>
              <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-lime-500/20 transition-colors w-full text-lime-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="w-6 h-6 text-green-400"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span>Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
