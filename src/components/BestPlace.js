import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import BestPlaceCard from "./BestPlaceCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
const BestPlace = () => {
  const matches = useMediaQuery("(max-width:600px)");
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: matches ? 1 : 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: !matches && (
      <div>
        <div className="next-slick-arrow arrow-border">
          {" "}
          <ArrowForwardIosOutlinedIcon style={{ color: "gray" }} />{" "}
        </div>
      </div>
    ),
    prevArrow: !matches && (
      <div>
        <div className="prev-slick-arrow arrow-border">
          {" "}
          <ArrowBackIosNewOutlinedIcon style={{ color: "gray" }} />{" "}
        </div>
      </div>
    ),
  };
  return (
    <main>
      <div
        style={{
          paddingBottom: "15px",
          fontSize: "16px",
        }}
      >
        BEST PLACES TO VISIT IN LADAKH
      </div>
      <Slider {...settings}>
        <div>
          <BestPlaceCard />
        </div>
        <div>
          <BestPlaceCard />
        </div>
        <div>
          <BestPlaceCard />
        </div>
        <div>
          <BestPlaceCard />
        </div>
        <div>
          <BestPlaceCard />
        </div>
        <div>
          <BestPlaceCard />
        </div>
        <div>
          <BestPlaceCard />
        </div>
      </Slider>
    </main>
  );
};

export default BestPlace;
