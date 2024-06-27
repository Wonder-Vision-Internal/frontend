import React from "react";

const PackageDetail = () => {
  return (
    <main>
      <div className="row">
        <div
          className="col-md-4 position-relative mb-4"
          dangerouslySetInnerHTML={{
            __html:
              '<iframe width="560" height="315" src="https://www.youtube.com/embed/6aPbEXpBSvQ?si=_KQ5syMfaBtB_b8K" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
          }}
        ></div>
        <div
          className="col-md-4 position-relative mb-4"
          dangerouslySetInnerHTML={{
            __html:
              '<iframe width="560" height="315" src="https://www.youtube.com/embed/6aPbEXpBSvQ?si=_KQ5syMfaBtB_b8K" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
          }}
        ></div>
        <div
          className="col-md-4 position-relative mb-4"
          dangerouslySetInnerHTML={{
            __html:
              '<iframe width="560" height="315" src="https://www.youtube.com/embed/6aPbEXpBSvQ?si=_KQ5syMfaBtB_b8K" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
          }}
        ></div>
      </div>
    </main>
  );
};

export default PackageDetail;
