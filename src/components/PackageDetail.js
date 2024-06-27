import React from "react";

const PackageDetail = ({ data }) => {
  return (
    <main>
      <div className="row">
        {data.map((ele) => {
          return (
            <div
              className="col-md-4 position-relative mb-4"
              dangerouslySetInnerHTML={{
                __html: `<iframe width="560" height="315" src=${ele.url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
              }}
              key={ele._id}
            ></div>
          );
        })}
      </div>
    </main>
  );
};

export default PackageDetail;
