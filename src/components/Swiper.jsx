import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import '../page/main/main.css';

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
        <SwiperSlide className='sliderThumbnails'>
          <picture>
            <source media="(max-width: 600px)" className="sliderSize" srcSet="/img/slider-img/Slider-mobile.png" />
            <source media="(min-width: 769px)" srcSet="/img/slider-img/Slider-pc.png" />
            <img src="/images/desktop-image.jpg" alt="Responsive Slide" />
          </picture>
        </SwiperSlide>

      </Swiper>
  )
}
