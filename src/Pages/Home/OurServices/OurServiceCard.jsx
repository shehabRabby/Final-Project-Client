import React from "react";
import serviceImg1 from "../../../assets/service.png";
const OurServiceCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div className="bg-white flex flex-col items-center space-y-4 p-4 rounded-xl shadow-2xl hover:bg-primary">
        <div className="h-[100px] w-[100px] rounded-full bg-gradient-to-b from-gray-100 to-gray-100/5 flex justify-center items-center p-3">
          <img
            src={serviceImg1}
            alt=""
            className="object-contain h-full w-full"
          />
        </div>
        <h2 className="font-bold">
          Express & Standard <br />
          Delivery
        </h2>
        <small>
          We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet,
          Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6
          hours from pick-up to drop-off.
        </small>
      </div>
      <div className="bg-white flex flex-col items-center space-y-4 p-4 rounded-xl shadow-2xl hover:bg-primary">
        <div className="h-[100px] w-[100px] rounded-full bg-gradient-to-b from-gray-100 to-gray-100/5 flex justify-center items-center p-3">
          <img
            src={serviceImg1}
            alt=""
            className="object-contain h-full w-full"
          />
        </div>
        <h2 className="font-bold">Nationwide Delivery</h2>
        <small>
          We deliver parcels nationwide with home delivery in every district,
          ensuring your products reach customers within 48–72 hours.
        </small>
      </div>
      <div className="bg-white flex flex-col items-center space-y-4 p-4 rounded-xl shadow-2xl hover:bg-primary">
        <div className="h-[100px] w-[100px] rounded-full bg-gradient-to-b from-gray-100 to-gray-100/5 flex justify-center items-center p-3">
          <img
            src={serviceImg1}
            alt=""
            className="object-contain h-full w-full"
          />
        </div>
        <h2 className="font-bold">Fulfillment Solution</h2>
        <small>
          We also offer customized service with inventory management support,
          online order processing, packaging, and after sales support.
        </small>
      </div>
      <div className="bg-white flex flex-col items-center space-y-4 p-4 rounded-xl shadow-2xl hover:bg-primary">
        <div className="h-[100px] w-[100px] rounded-full bg-gradient-to-b from-gray-100 to-gray-100/5 flex justify-center items-center p-3">
          <img
            src={serviceImg1}
            alt=""
            className="object-contain h-full w-full"
          />
        </div>
        <h2 className="font-bold">Cash on Home Delivery</h2>
        <small>
          100% cash on delivery anywhere in Bangladesh with guaranteed safety of
          your product.
        </small>
      </div>
      <div className="bg-white flex flex-col items-center space-y-4 p-4 rounded-xl shadow-2xl hover:bg-primary">
        <div className="h-[100px] w-[100px] rounded-full bg-gradient-to-b from-gray-100 to-gray-100/5 flex justify-center items-center p-3">
          <img
            src={serviceImg1}
            alt=""
            className="object-contain h-full w-full"
          />
        </div>
        <h2 className="font-bold">
          Corporate Service / Contract <br /> In Logistics
        </h2>
        <small>
          Customized corporate services which includes warehouse and inventory
          management support.
        </small>
      </div>
      <div className="bg-white flex flex-col items-center space-y-4 p-4 rounded-xl shadow-2xl hover:bg-primary">
        <div className="h-[100px] w-[100px] rounded-full bg-gradient-to-b from-gray-100 to-gray-100/5 flex justify-center items-center p-3">
          <img
            src={serviceImg1}
            alt=""
            className="object-contain h-full w-full"
          />
        </div>
        <h2 className="font-bold">Parcel Return</h2>
        <small>
          Through our reverse logistics facility we allow end customers to
          return or exchange their products with online business merchants.
        </small>
      </div>
    </div>
  );
};

export default OurServiceCard;
