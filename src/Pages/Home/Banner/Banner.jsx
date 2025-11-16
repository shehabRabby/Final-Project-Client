import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";
import { GoArrowUpRight } from "react-icons/go";

const Banner = () => {
  return (
    <Carousel
      interval={2000}
      autoPlay={false}
      infiniteLoop={true}
      className="mt-3"
    >
      <div className="relative text-left">
        <img src={bannerImg1} className="" />
        <div
          className="absolute
         left-20 bottom-8 hidden lg:block "
        >
          <p className="text-left">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
          <div className="flex items-center gap-4 mt-1">
            <button className="bg-green-950 text-white px-6 py-2 font-semibold text-lg rounded-full hover:opacity-80 transition cursor-pointer">
              Track Your Parcel
            </button>
            <div className="h-12 w-12 rounded-full bg-green-950 text-primary flex text-center justify-center items-center">
              <GoArrowUpRight size={25} />
            </div>

            <button className="border bg-white px-6 py-2 font-semibold text-secondary text-lg rounded-xl hover:bg-gray-100 hover:text-green-800 cursor-pointer">
              Be A Rider
            </button>
          </div>
        </div>
      </div>
      <div className="relative text-left">
        <img src={bannerImg2} />
        <div
          className="absolute
         left-20 bottom-8  hidden lg:block"
        >
          <p className="text-left">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
          <div className="flex items-center gap-4 mt-1">
            <button className="bg-green-950 text-white px-6 py-2 font-semibold text-lg rounded-full hover:opacity-80 transition cursor-pointer">
              Track Your Parcel
            </button>
            <div className="h-12 w-12 rounded-full bg-green-950 text-primary flex text-center justify-center items-center">
              <GoArrowUpRight size={25} />
            </div>

            <button className="border bg-white px-6 py-2 font-semibold text-secondary text-lg rounded-xl hover:bg-gray-100 hover:text-green-800 cursor-pointer">
              Be A Rider
            </button>
          </div>
        </div>
      </div>
      <div className="relative text-left">
        <img src={bannerImg3} />
        <div
          className="absolute
         left-20 bottom-8 hidden lg:block"
        >
          <p className="text-left">
            From personal packages to business shipments — we deliver on time,
            every time.
          </p>
          <div className="flex items-center gap-4 mt-1">
            <button className="bg-green-950 text-white px-6 py-2 font-semibold text-lg rounded-full hover:opacity-80 transition cursor-pointer">
              Track Your Parcel
            </button>
            <div className="h-12 w-12 rounded-full bg-green-950 text-primary flex text-center justify-center items-center">
              <GoArrowUpRight size={25} />
            </div>

            <button className="border bg-white px-6 py-2 font-semibold text-secondary text-lg rounded-xl hover:bg-gray-100 hover:text-green-800 cursor-pointer">
              Be A Rider
            </button>
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
