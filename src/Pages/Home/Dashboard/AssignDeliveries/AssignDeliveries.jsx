import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user.email, "driver_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`
      );
      return res.data;
    },
  });

  const handleDeliveryStatusUpdate = (parcel, status) => {
    const statusInfo = { deliveryStatus: status };
    let message = `Parcel Status is Update with ${status.split("_").join(" ")}`;
    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div>
      <h2 className="text-4xl">Parcels Pending Pickup : {parcels.length}</h2>
      <div className="overflow-x-auto ">
        <table className="table table-zebra ">
          {/* head */}
          <thead className="text-white">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Confirm</th>
              <th>Other Actions</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {parcels.map((parcel, i) => (
              <tr key={parcel._id}>
                <th>{i + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>
                  {parcel.deliveryStatus === "driver_assigned" ? (
                    <>
                      <button
                        onClick={() =>
                          handleDeliveryStatusUpdate(parcel, "Rider_arriving")
                        }
                        className="btn btn-primary text-black"
                      >
                        Accept
                      </button>

                      <button className="btn btn-warning text-black ms-2">
                        Reject
                      </button>
                    </>
                  ) : (
                    <span>Accepted</span>
                  )}
                </td>
                <td>
                  {" "}
                  <button
                    onClick={() =>
                      handleDeliveryStatusUpdate(parcel, "parcel_picked_up")
                    }
                    className="btn btn-primary text-black"
                  >
                    Mark as PickUp
                  </button>
                  <button
                    onClick={() =>
                      handleDeliveryStatusUpdate(parcel, "parcel_devlivered")
                    }
                    className="btn btn-primary text-black ms-2"
                  >
                    Mark as Deliver
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

export default AssignDeliveries;
