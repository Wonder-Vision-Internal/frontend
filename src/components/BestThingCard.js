import React from "react";

const BestThingCard = ({ matches }) => {
  return (
    <section className="best-thing-card-main" style={{ width: `${ matches && "90%"  }` }}>
      <div className="bet-thing-card-b1">01.</div>
      <div className="bet-thing-card-b2">
        Night stay at Dal Lake in a house boat.
      </div>
    </section>
  );
};

export default BestThingCard;
