import { useState, useRef, useEffect } from 'react';
import './MainWheel.css';
import TopBar from './TopBar';
import FooterRibbon from './FooterRibbon';

const ITEMS_COUNT = 6;

export default function MainWheel() {
  const wheelRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  const hasMoved = useRef(false);

  const onMouseDown = (e) => {
    dragging.current = true;
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
    hasMoved.current = false;
  };

  const onMouseMove = (e) => {
    if (!dragging.current || hasMoved.current) return;

    const deltaX = e.clientX - dragStartX.current;
    const deltaY = e.clientY - dragStartY.current;

    if (Math.abs(deltaX) > 10 && Math.abs(deltaX) > Math.abs(deltaY)) {
      const itemAngle = 360 / ITEMS_COUNT;

      let newIndex;
      if (deltaX > 0) {
        newIndex = (activeIndex - 1 + ITEMS_COUNT) % ITEMS_COUNT;
      } else {
        newIndex = (activeIndex + 1) % ITEMS_COUNT;
      }

      const newRotation = 270 - newIndex * itemAngle;
      setRotation(newRotation);
      hasMoved.current = true;
    }
  };

  const onMouseUp = () => {
    dragging.current = false;
  };

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp);
    return () => window.removeEventListener('mouseup', onMouseUp);
  }, []);

  useEffect(() => {
    let closestIndex = 0;
    let minDiff = 360;

    for (let i = 0; i < ITEMS_COUNT; i++) {
      let itemAngle = (360 / ITEMS_COUNT) * i + rotation;
      let normalizedItemAngle = ((itemAngle % 360) + 360) % 360;
      let diff = Math.abs(normalizedItemAngle - 270);
      if (diff > 180) diff = 360 - diff;
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    }

    setActiveIndex(closestIndex);
  }, [rotation]);

  const getZIndex = (itemAngle) => {
    let normalizedAngle = ((itemAngle % 360) + 360) % 360;
    let diff = Math.abs(normalizedAngle - 270);
    if (diff > 180) diff = 360 - diff;
    return 100 - (diff / 360) * 100;
  };

  const itemData = [
  { title: "Piscina Termal", description: "Recorrido dentro de nuestro bosque privado?", imageUrl: "/021.jpg" },
  { title: "Cascada Escondida", description: "Descubre la belleza natural", imageUrl: "/022.jpg" },
  { title: "Rafting en Río", description: "Aventura y adrenalina", imageUrl: "/023.jpg" },
  { title: "Paseo a Caballo", description: "Explora a caballo", imageUrl: "/021.jpg" },
  { title: "Sendero de Monos", description: "Observa la vida silvestre", imageUrl: "/022.jpg" },
  { title: "Tour de Café", description: "Conoce el proceso del café", imageUrl: "/023.jpg" },
];


  return (
    <div className="full-page-layout" style={{ backgroundColor: 'black', color: 'black', minHeight: '130vh', fontFamily: "Comic Sans Ms" }}>
      <TopBar />

      <div className="wheel-and-info">
        <div className="info-box">
          <h2>{itemData[activeIndex].title}</h2>
          <p>{itemData[activeIndex].description}</p>
        </div>

        <div className="wheel-section">
          <div
            ref={wheelRef}
            className="wheel-container"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseUp}
            style={{ cursor: dragging.current ? 'grabbing' : 'grab' }}
          >
            <div className="wheel-guide"></div>

            <img
             src="/Llanta.png" alt="Llanta principal"
              className="main-wheel"
              style={{ transform: `rotate(${((rotation % 360) + 360) % 360}deg)` }}
              draggable={false}
            />

            {[...Array(ITEMS_COUNT)].map((_, i) => {
              const baseAngle = (360 / ITEMS_COUNT) * i;
              const totalAngle = baseAngle + rotation;
              const normalizedAngle = ((totalAngle % 360) + 360) % 360;
              const diffToTop = Math.abs(normalizedAngle - 270);
              const isTop = diffToTop < 30;
              const scale = isTop ? 1.15 : 1;
              const radius = 640 / 2 - 40;
              const rad = (totalAngle * Math.PI) / 180;
              const x = radius * scale * Math.cos(rad);
              const y = radius * scale * Math.sin(rad);
              const z = Math.floor(getZIndex(totalAngle));

              return (
                <div
                  key={i}
                  className={`orbit-item-wrapper ${isTop ? 'highlight-top' : ''}`}
                  style={{
                    top: `calc(86% + ${y}px)`,
                    left: isTop ? `calc(75% + ${x}px)` : `calc(86% + ${x}px)`,
                    zIndex: z,
                    width: isTop ? '170px' : '140px',
                    height: isTop ? '190px' : '150px',
                    transition: 'all 0.5s ease',
                    transform: 'none',
                  }}
                >
                  <div className="orbit-item-inner">
                    <img
                      src={itemData[i].imageUrl}
                      alt={itemData[i].title}
                      className="orbit-item"
                      draggable={false}
                      style={{
                        width: '100%',
                        height: '75%',
                        objectFit: 'cover',
                        borderTopLeftRadius: '12px',
                        borderTopRightRadius: '12px',
                      }}
                    />
                    <div
                      style={{
                        height: '25%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: isTop ? '14px' : '12px',
                        padding: '4px',
                        backgroundColor: 'white',
                        borderBottomLeftRadius: '12px',
                        borderBottomRightRadius: '12px',
                        textAlign: 'center',
                      }}
                    >
                      {itemData[i].title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <FooterRibbon />
    </div>
  );
}
