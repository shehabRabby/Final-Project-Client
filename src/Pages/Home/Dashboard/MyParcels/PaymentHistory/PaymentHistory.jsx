import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="w-full px-4 md:px-10 py-10 bg-gradient-to-br from-[#0a0a0a] to-[#121212] min-h-screen">
      <h2
        className="text-center text-3xl font-extrabold mb-2 tracking-wide 
      bg-gradient-to-r from-lime-300 via-lime-400 to-green-500 bg-clip-text text-transparent"
      >
        Payment History
      </h2>

      <p className="text-center text-gray-400 mb-8">
        Total Payments: {payments.length}
      </p>

      <div
        className="overflow-x-auto rounded-3xl shadow-2xl 
      backdrop-blur-xl bg-white/5 border border-lime-300/30"
      >
        <table className="min-w-full text-sm text-gray-200">
          <thead className="bg-white/10 border-b border-lime-300/20">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-lime-300 uppercase tracking-wider">
                No
              </th>
              <th className="px-6 py-4 text-left font-semibold text-lime-300 uppercase tracking-wider">
                User Email
              </th>
              <th className="px-6 py-4 text-left font-semibold text-lime-300 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-4 text-left font-semibold text-lime-300 uppercase tracking-wider">
                Transaction
              </th>
              <th className="px-6 py-4 text-left font-semibold text-lime-300 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-4 text-left font-semibold text-lime-300 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700/40">
            {payments.map((payment, i) => (
              <tr
                key={payment._id}
                className="hover:bg-lime-400/10 transition-all duration-300"
              >
                <td className="px-6 py-4">{i + 1}</td>
                <td className="px-6 py-4 font-medium">
                  {payment?.customer_email || "Unknown"}
                </td>
                <td className="px-6 py-4 font-bold text-lime-400">
                  ${payment.amount}
                </td>
                <td className="px-6 py-4">{payment.transactionId}</td>
                <td className="px-6 py-4">
                  {new Date(payment.paidAt).toLocaleString()}
                </td>
                <td
                  className={`px-6 py-4 font-bold ${
                    payment.paymentStatus === "success"
                      ? "text-lime-300"
                      : "text-red-400"
                  }`}
                >
                  {payment.paymentStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
