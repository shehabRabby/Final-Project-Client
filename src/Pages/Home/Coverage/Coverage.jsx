import React from "react";
import { FiSearch } from "react-icons/fi";

const Coverage = () => {
  return (
    <div>
      <h3 className=" text-2xl md:text-3xl font-bold my-4">We are availavle in 64 districts</h3>
      <div className="relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

        <input
          type="text"
          placeholder="Search anything..."
          className="w-1/2 pl-12 pr-4 py-3 my-4 rounded-xl bg-white shadow-sm focus:shadow-md border border-gray-200 focus:border-teal-500 outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
        />
      </div>
   
    </div>
  );
};

export default Coverage;
