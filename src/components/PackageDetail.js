import React from "react";

const PackageDetail = ({ testimonial, title }) => {
  return (
    <main>
      <section className="section-padding client-part pb-0">
        <div className="text-center">
          <span className="stylish-head">{title}</span>
          <div className="owl-carousel owl-theme client-carousel">
            {testimonial &&
              testimonial.map((item, index) => {
                return (
                  <div className="item" key={index}>
                    <div
                      className="resort-box"
                      dangerouslySetInnerHTML={{
                        __html: item.url,
                      }}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default PackageDetail;
