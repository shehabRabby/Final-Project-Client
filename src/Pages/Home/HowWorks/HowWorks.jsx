import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";

const HowWorks = () => {
  return (
    <div className="my-4 p-4 md:p-10">
        <h2 className="mb-6 text-3xl font-bold text-secondary">How it Works</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
      <div className="flex flex-col space-y-4 p-5 text-left rounded-2xl shadow-2xl bg-white">
        <div>
          <CiDeliveryTruck size={60} />
        </div>
        <h2 className="text-secondary font-bold text-xl">
          Booking Pick & Drop
        </h2>
        <p className="text-sm">
          From personal packages to business shipments — we deliver on time,
          every time.
        </p>
      </div>
      <div className="flex flex-col space-y-4 p-5 text-left rounded-2xl shadow-2xl bg-white">
        <div>
          <CiDeliveryTruck size={60} />
        </div>
        <h2 className="text-secondary font-bold text-xl">
          Cash On Delivery
        </h2>
        <p className="text-sm">
          From personal packages to business shipments — we deliver on time,
          every time.
        </p>
      </div>
      <div className="flex flex-col space-y-4 p-5 text-left rounded-2xl shadow-2xl bg-white">
        <div>
          <CiDeliveryTruck size={60} />
        </div>
        <h2 className="text-secondary font-bold text-xl">
          Delivery HUb
        </h2>
        <p className="text-sm">
          From personal packages to business shipments — we deliver on time,
          every time.
        </p>
      </div>
      <div className="flex flex-col space-y-4 p-5 text-left rounded-2xl shadow-2xl bg-white">
        <div>
          <CiDeliveryTruck size={60} />
        </div>
        <h2 className="text-secondary font-bold text-xl">
          Booking SME & Corporate
        </h2>
        <p className="text-sm">
          From personal packages to business shipments — we deliver on time,
          every time.
        </p>
      </div>
    </div>
    </div>
  );
};

export default HowWorks;
