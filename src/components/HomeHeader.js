import { Link, useLocation } from "react-router-dom";
import Menu from "./Menu";
import { useEffect, useState } from "react";
import Common from "./Common";
import { useSelector } from "react-redux";
import React from 'react';
import OpenApi from "./OpenApi";
import { Helmet } from "react-helmet";

const HomeHeader = ({ allBanners }) => {
  const location = useLocation();
  const bannerSrc = useSelector((state) => state.bannerImgSrc.value);
  const [meta, SetMeta] = useState();

  const getMeta = async () => {
    try {
      
      let datas = await OpenApi.get("get-meta-info");
      let pathName = location?.pathname;
      console.log(pathName);
      if(pathName == '/') {
         SetMeta(datas.data.getMetaInfo.home);
      } else if(pathName =='/about') {
         SetMeta(datas.data.getMetaInfo.aboutus);
      } else if(pathName =='/tailormade') {
         SetMeta(datas.data.getMetaInfo.tailormade);
      } else if(pathName =='/home-stay') {
         SetMeta(datas.data.getMetaInfo.homestays);
      } else if(pathName.includes('/package/')) {
         SetMeta(datas.data.getMetaInfo.packages);
      } else if(pathName =='/testimonial') {
         SetMeta(datas.data.getMetaInfo.testimonial);
      } else if(pathName =='/blog') {
        SetMeta(datas.data.getMetaInfo.blogs);
      } else if(pathName =='/contact') {
         SetMeta(datas.data.getMetaInfo.contact);
      }
      
      //SetMeta();
    } catch (error) {
      console.log({ error });
    }
  }


  useEffect(() => {
    console.log({ bannerSrc })
    Common.tggleMenu();
    Common.loadCommonJs();
    //BannerSlider();
    getMeta();

  }, [location]);

  return (
    <>
      <header>
        {meta && <Helmet>

          <title>{meta?.title}</title>
          <meta name="Keywords" content={meta?.keywords} />
          <meta name="Description" content={meta?.description} />
          <link rel="canonical" href={window.location.href} />
        </Helmet>}


        {/* Animated navbar*/}
        <nav className="navbar navbar-expand-lg fixed-top">
          <div className="container">
            <Link className="navbar-brand" to="/"><img src="/img/logo.png" width={300} /></Link>
            <Link className="navbar-toggler" to="/mobilenav" >
              <i className="fas fa-bars" />

            </Link>


            <div className="collapse navbar-collapse" id="navbarResponsive">
              <Menu />
            </div>
          </div>
        </nav>
        {/* Animated navbar */}
      </header>
      <section className="banner-sec  position-relative" style={{}}>

        <div className=" owl-carousel owl-theme main-carousel back-carousel ">
          {allBanners && allBanners.map((item, index) => {
            return (
              <div className="slide-item" key={index}>
                <img src={process.env.REACT_APP_BASE_IMG_URL + item.img} alt={item.img} />
                <div className="slide-text">
                  <span className="stylish-head">{item.text1}</span>
                  <h2>{item.text2}</h2>
                </div>
              </div>
            );
          })}
        </div>

        <div className="container">
          {location.pathname == "/" && <div className="right-form">
            <h4 className="form-header">where to go</h4>
            <form className="float-form form">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Type Location" />
                {/* <small  class="form-text text-muted">We'll never share your email with anyone else.</small> */}
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Expected Date" />
                {/* <small  class="form-text text-muted">We'll never share your email with anyone else.</small> */}
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Person" />
                {/* <small  class="form-text text-muted">We'll never share your email with anyone else.</small> */}
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Your Name" />
                {/* <small  class="form-text text-muted">We'll never share your email with anyone else.</small> */}
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Email Id" />
                {/* <small  class="form-text text-muted">We'll never share your email with anyone else.</small> */}
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Mobile/Whatsapp Number" />
                {/* <small  class="form-text text-muted">We'll never share your email with anyone else.</small> */}
              </div>
              <button type="submit" className="btn btn-primary submit-butt">Submit</button>
            </form>
          </div>}
        </div>
      </section>

      {/* <section className="banner" style={{ backgroundImage: `url("${bannerSrc}")` }}>
        <div className="container">
          <div className="row justify-content-center position-relative align-items-center">
            <div className="col-md-8 text-center">
              <span className="stylish-head">Take Only Memories</span>
              <h2>LEAVE ONLY FOOTPRINTS</h2>
            </div>
          </div>
        </div>
      </section> */}

    </>

  );
}

export default HomeHeader;


