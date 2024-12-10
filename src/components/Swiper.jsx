import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination } from 'swiper/modules';

export default function Slider() {
  return (
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination]}
        className="Slide"
      >
        <SwiperSlide><img src='/img/Slider-pc.png' alt='Информационная картинка рекламного характера'/></SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
      </Swiper>
  )
}
