import React from "react";
import TestimonialCard from "./TestimonialCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonailSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };
  return (
    <main style={{ paddingBottom: "50px" }}>
      <Slider {...settings}>
        <div>
          <TestimonialCard />
        </div>
        <div>
          <TestimonialCard />
        </div>
        <div>
          <TestimonialCard />
        </div>
        <div>
          <TestimonialCard />
        </div>
        <div>
          <TestimonialCard />
        </div>
        <div>
          <TestimonialCard />
        </div>
      </Slider>
    </main>
  );
};

export default TestimonailSlider;
