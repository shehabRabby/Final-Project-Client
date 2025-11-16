import React from "react";
import OurServiceCard from "./OurServiceCard";

const OuerServices = () => {
  return (
    <div className="bg-secondary  py-[100px] text-center px-8 lg:px-24">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white "> Our Services</h2>
        <small className="text-gray-300">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to <br className=" hidden lg:block" /> business shipments — we
          deliver on time, every time.
        </small>
      </div>
      <OurServiceCard></OurServiceCard>
    </div>
  );
};

export default OuerServices;
