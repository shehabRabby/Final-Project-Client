import React from "react";
import location1 from "../../../assets/location-merchant.png";
import bgImg from "../../../assets/be-a-merchant-bg.png";
const StaisfictionCard = () => {
  return (
<div className="bg-secondary flex flex-col-reverse md:flex-row items-center justify-between p-6 md:p-8 gap-6 md:gap-8 relative rounded-2xl my-5">
    <div className="ml-50 hidden md:hidden lg:block absolute -mt-52">
      <img src={bgImg} alt=""  />
    </div>

  <div className="flex-1 text-center md:text-left">
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-snug">
      Merchant and Customer Satisfaction <br /> is Our First Priority
    </h1>
    <small className="text-gray-400 block mt-2 sm:mt-3 md:mt-4 leading-relaxed">
      We offer the lowest delivery charge with the highest value along with <br className=" hidden lg:block" />
      100% safety of your product. Pathao courier delivers your parcels in every <br className=" hidden lg:block" />
      corner of Bangladesh right on time.
    </small>

    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center md:justify-start gap-3 sm:gap-4 mt-4">
      <button className="bg-primary text-bg-secondary px-6 py-2 font-semibold text-lg rounded-full hover:opacity-80 transition cursor-pointer">
        Become a Merchant
      </button>

      <button className="border px-6 py-2 font-semibold text-primary text-lg rounded-full hover:opacity-85 cursor-pointer">
        Earn With ZapShift Courier
      </button>
    </div>
  </div>


  <div className="flex-1 flex justify-center md:justify-end">
    <img src={location1} alt="" className="w-48 sm:w-56 md:w-90 lg:w-100 h-auto" />
  </div>
</div>

  );
};

export default StaisfictionCard;
