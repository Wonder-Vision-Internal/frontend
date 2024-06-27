import React from "react";

const BestPlaceCard = () => {
  return (
    <section className="best-place-card-main">
      <div className="best-place-card-b1">
        <img src="https://media.istockphoto.com/id/1672317574/photo/ama-dablam-mountain-peak.webp?b=1&s=170667a&w=0&k=20&c=Ea8yDEHpUemrRuMZUKGPDBE11YTWVksIupMN8FkEBf8=" />
      </div>
      <div className="best-place-card-b2">
        <div style={{ fontSize: "16px" }}>PANGONG LAKE</div>
        <div style={{ fontSize: "14px" }}>
          Being the world's highest saltwater lake, Pangong draws the highest
          attraction amongst the tourists visiting at Leh. It is situated at an
          altitude of almost 4,350 mtr. It gives a heavenly look with it's
          white-sand shore and blue water feel, surrounded with snow peaks.
        </div>
      </div>
    </section>
  );
};

export default BestPlaceCard;
