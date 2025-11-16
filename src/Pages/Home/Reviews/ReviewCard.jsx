import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { user_email, userName, review: testimonial, user_photoURL } = review;

  return (
    <div className="card bg-white shadow-md p-6 md:p-8 rounded-2xl w-full max-w-md mx-auto">
      <FaQuoteLeft className="text-primary text-4xl md:text-5xl mb-4" />
      <p className="text-gray-600 leading-relaxed text-sm md:text-base">
        {testimonial}
      </p>
      <div className="border-t-2 border-dashed border-primary my-5"></div>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden bg-teal-700 flex items-center justify-center">
          <img
            src={user_photoURL}
            alt="user-profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-base md:text-lg font-semibold text-gray-900">
            {userName}
          </h3>
          <p className="text-gray-500 text-sm">{user_email}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
