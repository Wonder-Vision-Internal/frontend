import React from "react";
const url = process.env.REACT_APP_BASE_URL;


const BestPlaceCard = ({ data }) => {
  return (
    <section className="best-place-card-main">
      <div className="best-place-card-b1">
        <img src={`${url}/${data.img}`} />
      </div>
      <div className="best-place-card-b2">
        <div style={{ fontSize: "16px" }}>{data.title}</div>
        <div style={{ fontSize: "14px" }}>{data.description}</div>
      </div>
    </section>
  );
};

export default BestPlaceCard;
