import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Slider.css"; // Подключаем стили

const slides = [
  {
    id: 1,
    mobileImg: "/img/slider-img/Slider-mobile.png",
    desktopImg: "/img/slider-img/Slider-pc.png",
    alt: "Слайд 1",
  }
];

const Slider = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 7000 }}
      className="custom-swiper"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="slide">
            <picture className="slide-image">
              <source media="(max-width: 600px)" srcSet={slide.mobileImg} />
              <source media="(min-width: 769px)" srcSet={slide.desktopImg} />
              <img src={slide.desktopImg} alt={slide.alt} />
            </picture>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;