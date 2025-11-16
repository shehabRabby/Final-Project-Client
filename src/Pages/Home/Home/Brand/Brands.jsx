import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import img1 from "../../../../assets/brands/amazon.png";
import img2 from "../../../../assets/brands/casio.png";
import img3 from "../../../../assets/brands/moonstar.png";
import img4 from "../../../../assets/brands/amazon_vector.png";
import img5 from "../../../../assets/brands/randstad.png";
import img6 from "../../../../assets/brands/star.png";
import img7 from "../../../../assets/brands/start_people.png";
import { Autoplay, Pagination } from "swiper/modules";

const brandLogo = [img1, img2, img3, img4, img5, img6, img7];

const Brands = () => {
  return (
    <Swiper
      slidesPerView={3}
      centeredSlides={true}
      spaceBetween={10}
      grabCursor={true}
      loop={true}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
      modules={[Pagination, Autoplay]}
      className="mySwiper my-8"
    >
      {brandLogo.map((logo, index) => (
        <SwiperSlide key={index}>
          <img src={logo} alt="brands logo" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Brands;
