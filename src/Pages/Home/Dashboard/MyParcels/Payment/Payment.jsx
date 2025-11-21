import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";

const Payment = () => {
  // data loading process
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6 animate-pulse">
          <div className="w-16 h-16 bg-green-400 rounded-full mb-4"></div>
          <p className="text-gray-700 font-semibold">
            Loading parcel details...
          </p>
        </div>
      </div>
    );
  }

  if (!parcel) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 text-red-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-700 font-semibold">Oops! Parcel not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>
        Please pay ${parcel.cost} for: {parcel.parcelName}
      </h2>
      <button
        onClick={handlePayment}
        className="btn btn-primary text-black mt-2"
      >
        Pay
      </button>
    </div>
  );
};

export default Payment;
