import "./slider.css";
import { FaLessThan, FaGreaterThan } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { thumb1, thumb2, thumb3, thumb4, thumb5 } from "../../assets/export";

const images = [thumb1, thumb2, thumb3, thumb4, thumb5];

const Slider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider">
      <button onClick={handlePrev} className="prev">
        <FaLessThan />
      </button>
      <div className="slider-content">
        <img src={images[currentIndex]} alt="slider" />
      </div>
      <button onClick={handleNext} className="next">
        <FaGreaterThan />
      </button>
    </div>
  );
};

export default Slider;
