import { useState } from "react";
import BannerImgSrc from "../../Hooks/BannerImgSrc";
import OpenApi from "../../components/OpenApi";
import { useEffect } from "react";
import $ from "jquery";
import Story from "../../components/Story";
import Stories from "../../components/Stories";
import HomeHeader from "../../components/HomeHeader";
import TestimonailSlider from "../../components/TestimonailSlider";

export default function Testimonial() {
  // BannerImgSrc([{
  //     imgSrc: 'testimonials.jpg',
  //     label1: 'Take Only Memories',
  //     label2: 'LEAVE ONLY FOOTPRINTS',
  //   }]);
  const [testimonial, setTestimonial] = useState();
  const [banners, setBanners] = useState();
  const [imgData, setImgData] = useState([]);

  const getTestimonials = async () => {
    try {
      let datas = await OpenApi.get("get-testimonial");
      setTestimonial(datas.data);
    } catch (error) {
      console.log({ error });
    }
  };

  const getCarouselData = async () => {
    try {
      let res = await OpenApi.get("get-testimonials-crousel");
      setImgData(res.data.data);
    } catch (error) {
      console.log({ error });
    }
  };

  const getBanners = async () => {
    try {
      let datas = await OpenApi.get("get-all-banners/page/testimonials");
      console.log(datas.data.banners);
      setBanners(datas.data.banners);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getTestimonials();
    getBanners();
    getCarouselData();
  }, []);

  useEffect(() => {
    $(".navbar-toggler").trigger("click");
  }, [testimonial]);

  return (
    <>
      {banners && <HomeHeader allBanners={banners} />}
      <section className="tour-section section-padding pb-2">
        <div className="container">
          <div className="text-center">
            <h4 className="small-head">Find Our</h4>
            <span className="stylish-head mt-0">Testimonial</span>
          </div>
          <TestimonailSlider imgData={imgData}/>
          <div className="text-center">
            <h4 className="small-head">Find Our</h4>
            <span className="stylish-head mt-0">Testimonial</span>
          </div>
          <div className="row">
            {testimonial &&
              testimonial.testimonial.map((item) => {
                return (
                  <div
                    key={item._id}
                    className="col-md-4 position-relative mb-4"
                    dangerouslySetInnerHTML={{
                      __html: item.video_link,
                    }}
                  ></div>
                );
              })}
          </div>
        </div>
      </section>
      {testimonial && (
        <Stories stories={testimonial?.allStory} name={"Our Customers"} />
      )}
    </>
  );
}
