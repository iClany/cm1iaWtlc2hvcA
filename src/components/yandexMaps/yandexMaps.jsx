import { useEffect, useRef, useState } from "react";
import styles from "./yandexMaps.module.css";

const YandexMaps = () => {
  const mapRef = useRef(null);
  const [isInteractive, setIsInteractive] = useState(window.innerWidth > 768);

  useEffect(() => {
    if (!window.ymaps) return;

    window.ymaps.ready(() => {
      const map = new window.ymaps.Map(mapRef.current, {
        center: [52.424273, 31.004110],
        zoom: 14,
        controls: ["zoomControl", "fullscreenControl"],
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
        if (!isInteractive) {
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
        if (event.touches.length === 2) {
          enableMapInteraction();
        }
      };

      if (window.innerWidth <= 768) {
        mapRef.current.addEventListener("touchstart", handleTouchStart);
        document.addEventListener("click", disableMapInteraction);
      }

      return () => {
        if (window.innerWidth <= 768) {
          mapRef.current?.removeEventListener("touchstart", handleTouchStart);
          document.removeEventListener("click", disableMapInteraction);
        }
      };
    });
  }, [isInteractive]);

  return (
    <div className={styles.mapContainer}>
      {!isInteractive && window.innerWidth <= 768 && (
        <div className={styles.overlayText}>
          Нажмите 2-мя пальцами для активации карты
        </div>
      )}
      <div
        ref={mapRef}
        id="yandex-map"
        className={`${styles.map} ${isInteractive ? "" : styles.grayscale}`}
      ></div>
    </div>
  );
};

export default YandexMaps;
