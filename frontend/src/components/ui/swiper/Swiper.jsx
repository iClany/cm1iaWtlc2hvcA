import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Slider.css"; // Подключаем стили

// Импортируем изображения
import mobileImg from "./image/Slider-mobile.png";
import desktopImg from "./image/Slider-pc.png";

const slides = [
  {
    id: 1,
    mobileImg: mobileImg,
    desktopImg: desktopImg,
    alt: "Слайд 1",
  },
  {
    id: 2,
    mobileImg: mobileImg,
    desktopImg: desktopImg,
    alt: "Слайд 2",
  }
];

const Slider = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 7000 }}
      spaceBetween={10}
      className="custom-swiper"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="slide">
            <picture>
              <source media="(max-width: 768px)" srcSet={slide.mobileImg} />
              <source media="(min-width: 769px)" srcSet={slide.desktopImg} />
              <img 
                src={slide.desktopImg} 
                alt={slide.alt}
                className="slide-image"
              />
            </picture>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;