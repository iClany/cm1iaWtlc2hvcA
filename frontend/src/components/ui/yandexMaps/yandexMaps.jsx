import { useEffect, useRef, useState } from "react";
import styles from "./yandexMaps.module.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const YandexMaps = () => {
  const mapRef = useRef(null);
  const [isInteractive, setIsInteractive] = useState(window.innerWidth > 768);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const initializeMap = () => {
      if (!window.ymaps) {
        return;
      }

      window.ymaps.ready(() => {
        setIsLoading(false);
        
        try {
          const map = new window.ymaps.Map(mapRef.current, {
            center: [52.424273, 31.004110],
            zoom: 14,
            controls: ["zoomControl"],
          });

          if (window.innerWidth <= 768) {
            map.behaviors.disable(["scrollZoom", "drag", "dblClickZoom"]);
          }

          const placemark = new window.ymaps.Placemark(
            [52.424273, 31.004110],
            {
              balloonContent:
                `<b>Веломагазин RMBike</b><br>
                Время работы:<br>
                Пн-Вс 10:00 - 19:00`,
            },
            { preset: "islands#yellowBicycleIcon" }
          );

          map.geoObjects.add(placemark);

          const enableMapInteraction = () => {
            if (!isInteractive && !isScrolling) {
              setIsInteractive(true);
              map.behaviors.enable(["scrollZoom", "drag", "dblClickZoom"]);
            }
          };

          const disableMapInteraction = (event) => {
            if (mapRef.current && !mapRef.current.contains(event.target) && window.innerWidth <= 768) {
              setIsInteractive(false);
              map.behaviors.disable(["scrollZoom", "drag", "dblClickZoom"]);
            }
          };

          const handleTouchStart = (event) => {
            if (event.touches.length === 2 && !isScrolling) {
              enableMapInteraction();
            }
          };

          const handleScroll = () => {
            if (window.innerWidth <= 768) {
              setIsScrolling(true);
              setIsInteractive(false);
              map.behaviors.disable(["scrollZoom", "drag", "dblClickZoom"]);

              if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
              }

              scrollTimeout.current = setTimeout(() => {
                setIsScrolling(false);
              }, 500);
            }
          };

          const mapElement = mapRef.current;

          if (window.innerWidth <= 768) {
            mapElement.addEventListener("touchstart", handleTouchStart);
            document.addEventListener("click", disableMapInteraction);
            window.addEventListener("scroll", handleScroll);
          }

          return () => {
            if (window.innerWidth <= 768) {
              mapElement?.removeEventListener("touchstart", handleTouchStart);
              document.removeEventListener("click", disableMapInteraction);
              window.removeEventListener("scroll", handleScroll);
              if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current);
              }
            }
          };
        } catch (error) {
          console.error('Ошибка при инициализации карты:', error);
          setIsLoading(true);
        }
      });
    };

    // Проверяем, загружен ли скрипт карт
    if (window.ymaps) {
      initializeMap();
    } else {
      // Если скрипт не загружен, ждем его загрузки
      const checkYmaps = setInterval(() => {
        if (window.ymaps) {
          clearInterval(checkYmaps);
          initializeMap();
        }
      }, 100);

      // Очищаем интервал через 10 секунд, если карты так и не загрузились
      setTimeout(() => {
        clearInterval(checkYmaps);
        if (!window.ymaps) {
          console.error('Не удалось загрузить Яндекс.Карты');
          setIsLoading(false);
        }
      }, 10000);
    }

  }, [isInteractive, isScrolling]);

  return (
    <div className={styles.mapContainer}>
      {isLoading && <LoadingSpinner />}
      {!isInteractive && window.innerWidth <= 768 && (
        <div className={styles.instructionText}>
          Для управления картой используйте два пальца
        </div>
      )}
      <div
        ref={mapRef}
        id="yandex-map"
        className={`${styles.map} ${!isInteractive && window.innerWidth <= 768 ? styles.grayscale : ''}`}
        style={{ display: isLoading ? 'none' : 'block' }}
      ></div>
    </div>
  );
};

export default YandexMaps;
