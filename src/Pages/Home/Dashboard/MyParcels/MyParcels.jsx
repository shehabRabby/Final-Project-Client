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
    };
    const res = await axiosSecure.post("/payment-checkout-session", paymentInfo);
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
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-4">
        My All Parcels: {parcels.length}
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          {/* Table Head */}
          <thead className="bg-green-100">
            <tr>
              <th className="px-4 py-2 text-left text-gray-700">No.</th>
              <th className="px-4 py-2 text-left text-gray-700">Name</th>
              <th className="px-4 py-2 text-left text-gray-700">Cost</th>
              <th className="px-4 py-2 text-left text-gray-700">Payment</th>
              <th className="px-4 py-2 text-left text-gray-700">Action</th>
              <th className="px-4 py-2 text-left text-gray-700">
                Delivery Status
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {parcels.map((parcel, i) => (
              <tr
                key={parcel._id}
                className="hover:bg-green-50 transition duration-150"
              >
                <td className="px-4 py-2">{i + 1}</td>
                <td className="px-4 py-2 font-medium">{parcel.parcelName}</td>
                <td className="px-4 py-2">{parcel.cost}</td>

                {/* Payment Status */}
                <td className="px-4 py-2 text-center">
                  {parcel.paymentStatus === "paid" ? (
                    <span className="text-green-600 font-semibold bg-green-100 px-3 py-1  text-sm btn-sm">
                      Paid
                    </span>
                  ) : (
                    <button
                      onClick={() => handlePayment(parcel)}
                      className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-3 py-1  text-sm transition btn-sm"
                    >
                      Pay
                    </button>
                  )}
                </td>

                <td className="px-4 py-2 flex gap-2">
                  <button className="btn btn-square hover:bg-lime-300 transition">
                    <FaMagnifyingGlass />
                  </button>
                  <button className="btn btn-square hover:bg-lime-300 transition">
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleParcelDelete(parcel._id)}
                    className="btn btn-square hover:bg-lime-300 transition"
                  >
                    <FaTrashCan />
                  </button>
                </td>
                <td className="px-4 py-2 text-blue-500 font-semibold">
                  {parcel.deliveryStatus}
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
