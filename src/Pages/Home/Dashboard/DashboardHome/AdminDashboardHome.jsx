import { useQueries, useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FaCheckCircle } from "react-icons/fa";
import { FaMotorcycle } from "react-icons/fa6";
import { MdCancel, MdPendingActions } from "react-icons/md";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { data: deliveryStats = [] } = useQuery({
    queryKey: ["delivery-status-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/delivery-status/stats");
      return res.data;
    },
  });
  return (
    <div className="p-5">
      <h2 className="text-3xl font-semibold mb-6 text-white">
        Admin Dashboard
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {deliveryStats.map((stats) => {
          // choose icon & color based on status
          let Icon;
          let color = "";

          if (stats._id === "pending-pickup") {
            Icon = MdPendingActions;
            color = "text-yellow-400";
          } else if (stats._id === "parcel_devlivered") {
            Icon = FaCheckCircle;
            color = "text-green-400";
          } else if (stats._id === "driver_assigned") {
            Icon = FaMotorcycle;
            color = "text-blue-400";
          } else {
            Icon = MdCancel;
            color = "text-red-400";
          }

          return (
            <div
              key={stats._id}
              className="bg-[#1a1d11] text-white rounded-xl shadow-lg p-6 flex flex-col gap-4 border border-white/10"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-white/20 ${color}`}>
                  <Icon className="text-3xl" />
                </div>

                <div>
                  <p className="text-xl font-semibold capitalize">
                    {stats._id}
                  </p>
                  <p className="text-sm opacity-70">Jan 1st - Feb 1st</p>
                </div>
              </div>

              <p className="text-4xl font-bold">{stats.count}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboardHome;
