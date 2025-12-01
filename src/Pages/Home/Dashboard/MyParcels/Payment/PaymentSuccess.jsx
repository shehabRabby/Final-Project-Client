import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import { FaCheck } from "react-icons/fa6";


const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId, axiosSecure]);

  return (
     <div className="min-h-screen flex items-center justify-center p-4 bg-[#0c2f1f]">
      <div className="bg-[#114d30]/40 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl p-8 max-w-lg w-full text-center animate-fadeIn text-white">

        <div className="flex justify-center mb-4">
          <FaCheck className="text-green-400 text-6xl drop-shadow-md" />
        </div>

        <h2 className="text-3xl font-bold mb-2">Payment Successful</h2>
        <p className="text-white/80 text-lg">
          Your payment has been confirmed.
        </p>

        <div className="mt-6 bg-[#114d30]/60 p-4 rounded-xl border border-white/10 space-y-2 text-left">
          <p className="text-white text-sm sm:text-base">
            <span className="font-semibold text-green-300">Transaction ID:</span>{" "}
            {paymentInfo.transactionId || "Loading..."}
          </p>
          <p className="text-white text-sm sm:text-base">
            <span className="font-semibold text-green-300">Tracking ID:</span>{" "}
            {paymentInfo.trackingId || "Loading..."}
          </p>
        </div>

        <Link
          to="/dashboard"
          className="mt-8 inline-block bg-green-600 font-semibold px-6 py-2 rounded-xl hover:bg-green-500 transition text-white"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
