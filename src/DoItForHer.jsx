import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import "./DoItForHer.css";
import Tape from "./Tape";

const placeholders = [
  { id: 1, top: 25, left: 235, width: 365, height: 195 },
  { id: 2, top: 6, left: 1250, width: 332, height: 215 },
  { id: 3, top: 250, left: 515, width: 70, height: 80 },
  { id: 4, top: 318, left: 426, width: 100, height: 117 },
  { id: 5, top: 460, left: 545, width: 248, height: 305 },
  { id: 6, top: 255, left: 1016, width: 264, height: 156 },
  { id: 7, top: 490, left: 234, width: 393, height: 280 },
  { id: 8, top: 620, left: 630, width: 525, height: 505 },
  { id: 9, top: 295, left: 1215, width: 324, height: 382 },
  { id: 10, top: 778, left: 1310, width: 178, height: 265 },
  { id: 11, top: 774, left: 10, width: 185, height: 190 },
  { id: 12, top: 460, left: 1100, width: 200, height: 250 },
];

const DoItForHer = () => {
  const containerRef = useRef(null);
  const [images, setImages] = useState(Array(12).fill(null));

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const newImages = [...images];
        newImages[index] = reader.result;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadImage = () => {
    const node = containerRef.current;
    if (node) {
      // Oculta temporalmente los dropzones
      const dropzones = node.querySelectorAll(".image-dropzone");
      dropzones.forEach((el) => (el.style.display = "none"));

      // Espera que se apliquen los estilos
      setTimeout(() => {
        toPng(node, {
          cacheBust: true,
          width: 1600,
          height: 1148,
        })
          .then((dataUrl) => {
            const link = document.createElement("a");
            link.download = "do_it_for_her.png";
            link.href = dataUrl;
            link.click();
          })
          .finally(() => {
            dropzones.forEach((el) => (el.style.display = ""));
          });
      }, 300);
    }
  };

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <button onClick={downloadImage}>Descargar imagen</button>
      <div className="container" ref={containerRef}>
        {placeholders.map((placeholder, index) => (
          <React.Fragment key={placeholder.id}>
            {/* Solo si hay imagen, mostramos el contenedor decorado */}
            {images[index] && (
              <div
                className="image-placeholder"
                style={{
                  top: placeholder.top,
                  left: placeholder.left,
                  width: placeholder.width,
                  height: placeholder.height,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {/* Cintas reales en las 4 esquinas */}
                  <Tape position="top-left" />
                  <Tape position="top-right" />
                  <Tape position="bottom-left" />
                  <Tape position="bottom-right" />
                  <div
                    className="image-content"
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundImage: `url(${images[index]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                </div>
              </div>
            )}
            {/* Input invisible para cargar imagen en cualquier momento */}
            <label
              className="image-dropzone"
              style={{
                top: placeholder.top,
                left: placeholder.left,
                width: placeholder.width + 12,
                height: placeholder.height + 12,
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
                style={{ display: "none" }}
              />
              {!images[index] && <span>Coloca tu imagen aquí</span>}
            </label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DoItForHer;
