import React from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const CompeletedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [],} = useQuery({
    queryKey: ["parcels", user.email, "driver_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel_devlivered`
      );
      return res.data;
    },
  });

  const calculatePayout = (parcel) => {
    if (parcel.senderDistrict === parcel.receiverDistrict) {
      return parcel.cost * 0.8;
    } else {
      return parcel.cost * 0.6;
    }
  };

  return (
    <div>
      <h2 className="text-4xl">Compeleted Deliveries:{parcels.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra text-gray-800">
          {/* head */}
          <thead className="bg-blue-200 text-blue-900">
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Created At</th>
              <th>Districts</th>
              <th>Cost</th>
              <th>Payout</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="bg-gray-50">
            {parcels.map((parcel, i) => (
              <tr key={parcel._id} className="hover:bg-yellow-100">
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.createAt}</td>
                <td>{parcel.senderDistrict}</td>
                <td>{parcel.cost}</td>
                <td>{calculatePayout(parcel)}</td>
                <td>
                  <button className="btn btn-primary text-black">
                    Cash out
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

export default CompeletedDeliveries;
