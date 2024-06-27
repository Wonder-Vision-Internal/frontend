import React from "react";
import BestThingCard from "./BestThingCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";

const BestThing = () => {
  const matches = useMediaQuery("(max-width:600px)");
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: matches ? 2 : 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
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
        BEST THINGS TO DO IN LADAKH
      </div>
      <Slider {...settings}>
        <div>
          <BestThingCard matches={matches}/>
        </div>
        <div>
          <BestThingCard matches={matches}/>
        </div>
        <div>
          <BestThingCard matches={matches}/>
        </div>
        <div>
          <BestThingCard matches={matches}/>
        </div>
        <div>
          <BestThingCard matches={matches}/>
        </div>
        <div>
          <BestThingCard matches={matches}/>
        </div>
        <div>
          <BestThingCard matches={matches}/>
        </div>
      </Slider>
    </main>
  );
};

export default BestThing;
