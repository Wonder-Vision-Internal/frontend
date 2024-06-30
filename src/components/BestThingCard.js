import React from "react";
const url = process.env.REACT_APP_BASE_URL;
const BestThingCard = ({ matches, data }) => {
  return (
    <section
      className="best-thing-card-main"
      style={{ width: `${matches && "90%"}` }}
    >
      <div className="bet-thing-card-b1">
        <img src={`${url}${data.icon}`} />
      </div>
      <div className="bet-thing-card-b2">{data.title}</div>
    </section>
  );
};

export default BestThingCard;
