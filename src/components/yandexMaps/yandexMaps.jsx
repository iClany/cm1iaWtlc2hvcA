import { useEffect, useRef, useState } from "react";

const YandexMaps = () => {
  const mapRef = useRef(null);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    if (!window.ymaps) return;

    window.ymaps.ready(() => {
      const map = new window.ymaps.Map(mapRef.current, {
        center: [52.424273, 31.004110], // RMBike координаты
        zoom: 14,
        controls: ["zoomControl", "fullscreenControl"],
      });

      // Отключаем управление картой по умолчанию
      map.behaviors.disable(["scrollZoom", "drag", "dblClickZoom"]);

      // Добавление метки
      const placemark = new window.ymaps.Placemark(
        [52.424273, 31.004110], // RMBike точка на карте
        { 
            balloonContent: 
            `<b>Веломагазин RMBike</b><br>
            Время работы:<br>
            Пн-Вс 10:00 - 19:00`
        },  
        { preset: "islands#yellowBicycleIcon" }
      );

      map.geoObjects.add(placemark);

      // Функция включения карты
      const enableMapInteraction = () => {
        if (!isInteractive) {
          setIsInteractive(true);
          map.behaviors.enable(["scrollZoom", "drag", "dblClickZoom"]);
        }
      };

      // Отключаем карту при клике вне неё
      const disableMapInteraction = (event) => {
        if (mapRef.current && !mapRef.current.contains(event.target)) {
          setIsInteractive(false);
          map.behaviors.disable(["scrollZoom", "drag", "dblClickZoom"]);
        }
      };

      // Обработчик двойного касания двумя пальцами
      const handleTouchStart = (event) => {
        if (event.touches.length === 2) {
          enableMapInteraction();
        }
      };

      mapRef.current.addEventListener("touchstart", handleTouchStart);
      document.addEventListener("click", disableMapInteraction);

      return () => {
        mapRef.current?.removeEventListener("touchstart", handleTouchStart);
        document.removeEventListener("click", disableMapInteraction);
      };
    });
  }, [isInteractive]);

  return (
    <div style={{ position: "relative", width: "100%", height: "500px" }}>
      {/* Надпись с инструкцией */}
      {!isInteractive && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(255, 208, 1, 0.8)",
            color: "var(--black)",
            padding: "10px 15px",
            borderRadius: "8px",
            fontFamily:"Inter",
            fontSize: "12px",
            textAlign: "center",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          Нажмите 2-мя пальцами для активации карты
        </div>
      )}

      {/* Карта */}
      <div
        ref={mapRef}
        id="yandex-map"
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "10px",
          overflow: "hidden",
          filter: isInteractive ? "none" : "grayscale(100%)",
          transition: "filter 0.3s ease",
        }}
      ></div>
    </div>
  );
};

export default YandexMaps;