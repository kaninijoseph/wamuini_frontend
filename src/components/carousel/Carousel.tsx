import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import "./carousel.css"; // Include the necessary styles

interface CarouselProps {
  media: string[]; // Array of media items (images or videos)
}

const Carousel: React.FC<CarouselProps> = ({ media }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Swipeable handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((prev) => (prev + 1) % media.length),
    onSwipedRight: () =>
      setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1)),
  });

  // Handle clicks on the left/right side (20% of the container width)
  const handleAreaClick = (e: React.MouseEvent) => {
    const element = e.currentTarget as HTMLElement; // Cast to HTMLElement
    const width = element.offsetWidth;
    const clickX = e.clientX;

    if (clickX < width * 0.2) {
      setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1)); // Left 20%
    } else if (clickX > width * 0.8) {
      setCurrentIndex((prev) => (prev + 1) % media.length); // Right 20%
    }
  };

  return (
    <div {...handlers} className="carousel-container" onClick={handleAreaClick}>
      <div className="carousel-slide">
        {media[currentIndex].endsWith(".mp4") ? (
          <video controls className="media-item">
            <source src={media[currentIndex]} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={media[currentIndex]}
            alt={`Media ${currentIndex + 1}`}
            className="media-item"
          />
        )}
      </div>

      {/* Dots for carousel navigation */}
      <div className="carousel-dots">
        {media.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
