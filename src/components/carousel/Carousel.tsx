import React from "react";
import Slider from "react-slick";

interface MediaItem {
  type: string; // "image" or "video"
  path: string; // Path to the media file
}

interface CarouselProps {
  media: MediaItem[];
}

const Carousel: React.FC<CarouselProps> = ({ media }) => {
  if (!media || media.length === 0) {
    return <p>No media available</p>;
  }

  // Settings for React Slick
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Infinite loop
    speed: 500, // Transition speed
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    arrows: false, // Disable navigation arrows
  };

  return (
    <Slider {...settings} className="carousel">
      {media.map((item, index) => (
        <div key={index} className="carousel-slide">
          {item.type === "image" ? (
            <img
              src={item.path}
              alt={`Media ${index + 1}`}
              className="carousel-media"
            />
          ) : item.type === "video" ? (
            <video controls className="carousel-media">
              <source src={item.path} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <p className="carousel-unsupported">Unsupported media type</p>
          )}
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
