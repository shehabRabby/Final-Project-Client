import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FiEdit } from "react-icons/fi";
import { FaMagnifyingGlass, FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handlePayment = async (parcel) => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
      trackingId: parcel.trackingId,
    };
    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );
    window.location.href = res.data.url;
  };

  const handleParcelDelete = (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          // console.log(res.data);
          if (res.data.deletedCount) {
            // refresh the data in the UI
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div className="p-4 bg-black min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6 text-lime-400">
        My All Parcels: {parcels.length}
      </h2>

      <div className="overflow-x-auto shadow-[0_0_25px_rgba(0,255,60,0.5)] rounded-3xl">
        <table className="min-w-full table-auto border-collapse border border-lime-400/50 text-white">
          {/* Table Head */}
          <thead className="bg-lime-500/20 backdrop-blur-md">
            <tr>
              {[
                "No.",
                "Name",
                "Cost",
                "Payment",
                "Traking ID",
                "Delivery Status",
                "Action",
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
            {parcels.map((parcel, i) => (
              <tr
                key={parcel._id}
                className="hover:bg-lime-400/10 transition duration-200"
              >
                <td className="px-4 py-2">{i + 1}</td>
                <td className="px-4 py-2 font-medium">{parcel.parcelName}</td>
                <td className="px-4 py-2">{parcel.cost}</td>

                {/* Payment Status */}
                <td className="px-4 py-2 text-center">
                  {parcel.paymentStatus === "paid" ? (
                    <span className="text-green-400 font-semibold bg-green-900/20 px-3 py-1 rounded-lg text-sm">
                      Paid
                    </span>
                  ) : (
                    <button
                      onClick={() => handlePayment(parcel)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm transition"
                    >
                      Pay
                    </button>
                  )}
                </td>

                <td className="px-4 py-2 text-lime-300 font-semibold">
                  <Link to={`/parcel-track/${parcel.trackingId}`}>
                    {parcel.trackingId}
                  </Link>
                </td>
                <td className="px-4 py-2 text-lime-300 font-semibold">
                  {parcel.deliveryStatus}
                </td>

                {/* Action Buttons */}
                <td className="px-4 py-2 flex gap-2">
                  <button className="btn btn-square hover:bg-lime-300/30 text-lime-300 transition">
                    <FaMagnifyingGlass />
                  </button>
                  <button className="btn btn-square hover:bg-lime-300/30 text-lime-300 transition">
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleParcelDelete(parcel._id)}
                    className="btn btn-square hover:bg-red-500/40 text-red-400 transition"
                  >
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

export default MyParcels;
