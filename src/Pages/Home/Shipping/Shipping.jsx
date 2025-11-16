import React from "react";
import ship1 from "../../../assets/live-tracking.png";
import ship2 from "../../../assets/safe-delivery.png";
const Shipping = () => {
  return (
    <div className="my-4 p-5">
      <div className="bg-white flex flex-col md:flex-row gap-6 md:gap-8 items-center p-6 md:p-7 rounded-xl">
        <div className="border-r-0 md:border-r-2 border-dotted border-gray-500 p-4 md:p-8 flex justify-center w-full md:w-auto">
          <img
            src={ship1}
            alt="shipping process"
            className="w-32 sm:w-40 md:w-48 lg:w-56 h-auto object-contain"
          />
        </div>

        <div className="text-center md:text-left">
          <h2 className="text-xl font-extrabold text-secondary">
            Live Parcel Tracking
          </h2>
          <small className="text-gray-600">
            Stay updated in real-time with our live parcel tracking feature.
            From pick-up to delivery, monitor your shipment's journey and get
            instant status <br /> updates for complete peace of mind.
          </small>
        </div>
      </div>
      <div className="bg-white flex flex-col md:flex-row gap-6 md:gap-8 items-center p-6 md:p-7 rounded-xl mt-3">
        <div className="border-r-0 md:border-r-2 border-dotted border-gray-500 p-4 md:p-8 flex justify-center w-full md:w-auto">
          <img
            src={ship2}
            alt="shipping process"
            className="w-32 sm:w-40 md:w-48 lg:w-56 h-auto object-contain"
          />
        </div>

        <div className="text-center md:text-left">
          <h2 className="text-xl font-extrabold text-secondary">
            100% Safe Delivery
          </h2>
          <small className="text-gray-600">
            We ensure your parcels are handled with the utmost care and
            delivered securely to their destination. Our reliable process
            guarantees safe <br /> and damage-free delivery every time.
          </small>
        </div>
      </div>
      <div className="bg-white flex flex-col md:flex-row gap-6 md:gap-8 items-center p-6 md:p-7 rounded-xl mt-3">
        <div className="border-r-0 md:border-r-2 border-dotted border-gray-500 p-4 md:p-8 flex justify-center w-full md:w-auto">
          <img
            src={ship2}
            alt="shipping process"
            className="w-32 sm:w-40 md:w-48 lg:w-56 h-auto object-contain"
          />
        </div>

        <div className="text-center md:text-left">
          <h2 className="text-xl font-extrabold text-secondary">
            24/7 Call Center Support
          </h2>
          <small className="text-gray-600">
            Our dedicated support team is available around the clock to assist
            you with any questions, updates, br or delivery concerns—anytime you{" "}
            <br />
            need us.
          </small>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
