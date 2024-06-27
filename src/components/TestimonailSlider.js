import React from "react";
import TestimonialCard from "./TestimonialCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useMediaQuery from "@mui/material/useMediaQuery";

const TestimonailSlider = ({ imgData }) => {
  const matches = useMediaQuery("(max-width:600px)");
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: matches ? 1 : 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };
  return (
    <main style={{ paddingBottom: "50px" }}>
      <Slider {...settings}>
        {imgData.map((ele) => {
          return (
            <div key={ele._id}>
              <TestimonialCard data={ele} />
            </div>
          );
        })}
      </Slider>
    </main>
  );
};

export default TestimonailSlider;
