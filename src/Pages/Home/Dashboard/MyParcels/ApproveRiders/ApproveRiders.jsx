import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemove, IoPersonRemoveSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const updateRIderStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Rider ststus is set to ${status}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  const handleApproval = (rider) => {
    updateRIderStatus(rider, "approved");
  };

  const handleRejection = (rider) => {
    updateRIderStatus(rider, "rejected");
  };

  return (
    <div className="p-4 bg-black min-h-screen">
      <h2 className="text-4xl font-bold text-lime-400 mb-6 text-center">
        Riders Pending Approval: {riders.length}
      </h2>

      <div className="overflow-x-auto shadow-[0_0_25px_rgba(0,255,60,0.5)] rounded-3xl">
        <table className="min-w-full table-auto border-collapse border border-lime-400/50 text-white">
          {/* Table Head */}
          <thead className="bg-lime-500/20 backdrop-blur-md">
            <tr>
              {[
                "No",
                "Name",
                "District",
                "Bike",
                "Email",
                "Status",
                "Actions",
              ].map((head, idx) => (
                <th
                  key={idx}
                  className="px-4 py-3 text-left font-semibold text-lime-200 border-b border-lime-400/50"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-lime-400/30">
            {riders.map((rider, i) => (
              <tr
                key={rider._id}
                className="hover:bg-lime-400/10 transition duration-200"
              >
                <td className="px-4 py-2">{i + 1}</td>
                <td className="px-4 py-2 font-medium">{rider.name}</td>
                <td className="px-4 py-2">{rider.district}</td>
                <td className="px-4 py-2">{rider.bike}</td>
                <td className="px-4 py-2">{rider.email}</td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    rider.status === "approved"
                      ? "text-green-400"
                      : rider.status === "pending"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {rider.status}
                </td>

                {/* Actions */}
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleApproval(rider)}
                    className="btn btn-square hover:bg-lime-300/30 text-lime-300 transition"
                  >
                    <FaUserCheck />
                  </button>
                  <button
                    onClick={() => handleRejection(rider)}
                    className="btn btn-square hover:bg-red-500/40 text-red-400 transition"
                  >
                    <IoPersonRemoveSharp />
                  </button>
                  <button className="btn btn-square hover:bg-red-600/50 text-red-400 transition">
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRiders;
