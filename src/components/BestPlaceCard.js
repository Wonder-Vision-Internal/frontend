import React from "react";

const BestPlaceCard = ({ data }) => {
  return (
    <section className="best-place-card-main">
      <div className="best-place-card-b1">
        <img src={data.img} />
      </div>
      <div className="best-place-card-b2">
        <div style={{ fontSize: "16px" }}>{data.title}</div>
        <div style={{ fontSize: "14px" }}>{data.description}</div>
      </div>
    </section>
  );
};

export default BestPlaceCard;
