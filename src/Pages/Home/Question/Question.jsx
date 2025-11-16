import React from "react";
import { GoArrowUpRight } from "react-icons/go";

const Question = () => {
  return (
    <section className=" py-12 px-4 md:px-20">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Frequently Asked Question (FAQ)
        </h2>
        <p className="text-gray-600 text-center mb-10">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro.Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>

        <div className="space-y-4 text-left">
          <div className="border border-gray-300 rounded-lg p-4 bg-[#E6F2F3]">
            <button className="w-full text-left font-semibold text-gray-900 flex justify-between items-center border-b-1 p-2 border-dashed">
              How does this posture corrector work?
              <span>&#9650;</span>
            </button>
            <small className="text-gray-600">
              A posture corrector works by providing support and gentle
              alignment to your shoulders, back, and spine, encouraging you to
              maintain proper posture throughout the day. Here’s how it
              typically functions: A posture corrector works by providing
              support and gentle alignment to your shoulders.
            </small>
          </div>

          <div className="border border-gray-300 rounded-lg p-4 bg-white">
            <button className="w-full text-left font-semibold text-secondary flex justify-between items-center">
              Is it suitable for all ages and body types?
              <span>&#9660;</span>
            </button>
          </div>

          <div className="border border-gray-300 rounded-lg p-4 bg-white">
            <button className="w-full text-left font-semibold text-secondary flex justify-between items-center">
              Does it really help with back pain and posture improvement?
              <span>&#9660;</span>
            </button>
          </div>

          <div className="border border-gray-300 rounded-lg p-4 bg-white">
            <button className="w-full text-left font-semibold text-secondary flex justify-between items-center">
              Does it have smart features like vibration alerts?
              <span>&#9660;</span>
            </button>
          </div>

          <div className="border border-gray-300 rounded-lg p-4 bg-white">
            <button className="w-full text-left font-semibold text-secondary flex justify-between items-center">
              How will I be notified when the product is back in stock?
              <span>&#9660;</span>
            </button>
          </div>
        </div>

        <div className="mt-8 text-center flex items-center justify-center gap-1">
          <button className="inline-flex items-center bg-primary cursor-pointer text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-lime-400 transition">
            See More FAQ's
          </button>
            <div className="h-10 w-10 rounded-full bg-green-950 text-primary flex text-center justify-center items-center">
              <GoArrowUpRight size={25} />
            </div>
        </div>
      </div>
    </section>
  );
};

export default Question;
