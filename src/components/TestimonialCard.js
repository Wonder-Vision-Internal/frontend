import React, { useState } from "react";
import DialogImage from "./DialogImage";

const TestimonialCard = ({ data }) => {
  const [open, setopen] = useState(false);
  return (
    <section className="testimonial-card-main">
      <div className="testimonial-card-content">
        <div className="testimonial-card-main-block1">
          <img
            src={`${process.env.REACT_APP_BASE_URL}${data.userImg}`}
            alt={data.userName}
          />
        </div>
        <div className="testimonial-card-main-block2">{data.userName}</div>
        <div className="testimonial-card-main-block3">{data.title}</div>
      </div>
      <div className="img-main-block2" onClick={() => setopen(true)}>
        <img
          src={`${process.env.REACT_APP_BASE_URL}${data.screenImg}`}
          alt={data.userName}
        />
      </div>
      <div className="img-icon">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyi_CVTmoL1ITHFxQkfLwvj93hcsgA1Olkhg&s" />
      </div>
      <DialogImage setopen={setopen} open={open} imgsrc={data.screenImg} />
    </section>
  );
};

export default TestimonialCard;
