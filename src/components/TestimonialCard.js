import React, { useState } from "react";
import DialogImage from "./DialogImage";

const TestimonialCard = () => {
  const [open, setopen] = useState(false);
  return (
    <section className="testimonial-card-main">
      <div className="testimonial-card-content">
        <div className="testimonial-card-main-block1">
          <img
            src="https://media.licdn.com/dms/image/D4D03AQFPomRlFB8b_g/profile-displayphoto-shrink_200_200/0/1676178530424?e=2147483647&v=beta&t=SssjP6wbySNIDKxj-pjsobw-DamHsMQsoLfWVCC7qaQ"
            alt="Rituparno Ghosh"
          />
        </div>
        <div className="testimonial-card-main-block2">Rituparno Ghosh</div>
        <div className="testimonial-card-main-block3">Indian film director</div>
      </div>
      <div className="img-main-block2" onClick={() => setopen(true)}>
        <img
          src="https://media.licdn.com/dms/image/D4D03AQFPomRlFB8b_g/profile-displayphoto-shrink_200_200/0/1676178530424?e=2147483647&v=beta&t=SssjP6wbySNIDKxj-pjsobw-DamHsMQsoLfWVCC7qaQ"
          alt="Rituparno Ghosh"
        />
      </div>
      <div className="img-icon">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyi_CVTmoL1ITHFxQkfLwvj93hcsgA1Olkhg&s" />
      </div>
      <DialogImage
        setopen={setopen}
        open={open}
        imgsrc={
          "https://media.licdn.com/dms/image/D4D03AQFPomRlFB8b_g/profile-displayphoto-shrink_200_200/0/1676178530424?e=2147483647&v=beta&t=SssjP6wbySNIDKxj-pjsobw-DamHsMQsoLfWVCC7qaQ"
        }
      />
    </section>
  );
};

export default TestimonialCard;
