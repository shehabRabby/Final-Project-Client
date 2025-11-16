import React from "react";
import customerQsnImg from "../../../assets/customer-top.png";
const CustomerSays = () => {
  return (
    <div className="my-5 flex flex-col items-center text-center space-y-4 p-5">
      <div>
        <img src={customerQsnImg} alt="" />
      </div>

      <div className="mb-8">
        <h2 className=" text-3xl lg:text-4xl font-bold text-secondary ">
          What our customers are sayings
        </h2>
        <small className="text-gray-600">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen <br className=" hidden lg:block" /> your
          body with ease!
        </small>
      </div>
    </div>
  );
};

export default CustomerSays;
