import React, { use } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "./ReviewCard";

const Review = ({ reviewPromise }) => {
  const reviews = use(reviewPromise);
  // console.log(reviews);
  return (
    <Swiper
      loop={true}
      effect={"coverflow"}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={"3"}
      coverflowEffect={{
        rotate: 50,
        stretch: 50,
        depth: 1000,
        modifier: 1,
        slideShadows: true,
      }}
      autoplay={{
        delay: 1500,
        disableOnInteraction: false,
      }}
      pagination={true}
      modules={[EffectCoverflow, Pagination, Autoplay]}
      className="mySwiper my-4"
    >
      {reviews.map((review) => (
        <SwiperSlide key={review.id}>
          <ReviewCard review={review}></ReviewCard>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Review;
