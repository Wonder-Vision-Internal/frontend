import { useContext, useEffect, useState } from "react";
import $ from "jquery";
import Common from "../../components/Common";
import BannerImgSrc from "./../../Hooks/BannerImgSrc";
import OpenApi from "../../components/OpenApi";
import { Link } from "react-router-dom";
import HomeHeader from "../../components/HomeHeader";
import ExpertForm from "../../components/ExperForm";
import { Modal, Button } from "react-bootstrap";
const Home = () => {
  // BannerImgSrc([{
  //   imgSrc: 'ban01.jpg',
  //   label1: 'Arrive in wonder',
  //   label2: 'Leave behind doubts',
  // }, {
  //   imgSrc: 'ban02.jpg',
  //   label1: 'Absorb the solace',
  //   label2: 'Block out the noise',
  // }, {
  //   imgSrc: 'ban03.jpg',
  //   label1: 'Find your peace',
  //   label2: 'Lose the stress',
  // }, {
  //   imgSrc: 'ban04.jpg',
  //   label1: 'Take to the colours',
  //   label2: 'Take away the memories',
  // }, {
  //   imgSrc: 'ban05.jpg',
  //   label1: 'Discover new horizons',
  //   label2: 'Discard old notions',
  // }]);
  // BannerImgSrc([{
  //   type: "page",
  //   page_name: "home"
  // }])

  const [content, setContent] = useState();
  const [testimonial, setTestimonial] = useState();
  const [expertFormContent, setExpertFormContent] = useState();
  const [banners, setBanners] = useState();
  const [inputes, setInputes] = useState();
  const [msg, setMsg] = useState();
  

  const getHomeContent = async () => {
    try {
      let datas = await OpenApi.get("home");
      console.log('resort',datas);
      setContent(datas.data);
    } catch (error) {
      console.log({ error });
    }
  };

  const getTestimonials = async () => {
    try {
      let datas = await OpenApi.get("get-testimonial");
      setTestimonial(datas.data.testimonial);
    } catch (error) {
      console.log({ error });
    }
  };

  const getBanners = async () => {
    try {
      let datas = await OpenApi.get("get-all-banners/page/home");
      console.log(datas.data.banners);
      setBanners(datas.data.banners);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleInputes = (e) => {
    setInputes({
      ...inputes,
      [e.target.name]: e.target.value,
    });
  };

  const processSubmit = async (event) => {
    event.preventDefault();
    if (!inputes.smiley) {
      alert("You have not selected any feedback smiley.");
    }
    console.log({ inputes });
    try {
      let datas = await OpenApi.get(
        `send-query?name=${inputes.name}&mail=${inputes.mail}&phone=${inputes.phone}&bookingId=${inputes.bookingId}&date=${inputes.date}&location=${inputes.location}&type=booking-contact`
      );

      setMsg(datas.data.msg);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getHomeContent();
    getTestimonials();
    Common.loadCommonJs();
    getBanners();

    // setTimeout(() => {
    //   Common.tggleMenu();
    // }, 2000);
  }, []);



  return (
    <div>
      {banners && <HomeHeader allBanners={banners} />}
      <section className="experiance-section section-padding">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="right-form-mobile">
                <h4 className="form-header">where to go</h4>
                <form className="float-form form" onSubmit={processSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      name="location"
                      className="form-control"
                      placeholder="Type Location"
                      onChange={handleInputes}
                    />
                    {/* <small  class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                  </div>
                  <div className="form-group">
                    <input
                      required
                      type="date"
                      className="form-control"
                      placeholder="Expected Date"
                      name="date"
                      onChange={handleInputes}
                    />
                    {/* <small  class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                  </div>
                  <div className="form-group">
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder="Person"
                      name="mail"
                      onChange={handleInputes}
                    />
                    {/* <small  class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                  </div>
                  <div className="form-group">
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      name="name"
                      onChange={handleInputes}
                    />
                    {/* <small  class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                  </div>
                  <div className="form-group">
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder="Email Id"
                      name="mail"
                      onChange={handleInputes}
                    />
                    {/* <small  class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                  </div>
                  <div className="form-group">
                    <input
                      required
                      type="text"
                      className="form-control"
                      placeholder="Mobile/Whatsapp Number"
                      name="phone"
                      onChange={handleInputes}
                    />
                    {/* <small  class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                  </div>
                  <button type="submit" className="btn btn-primary submit-butt">
                    Submit
                  </button>
                </form>
                {msg && (
                  <div class="alert alert-info" role="alert">
                    {msg}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-3">
              <h4 className="small-head">
                The world is a book
                <br /> and those
              </h4>
              <span className="stylish-head">who don't travel </span>
              <h2>read only one page</h2>
            </div>
            <div className="col-md-5">
              {content && (
                <p className="pr-5">{content.homeContent?.small_text}</p>
              )}
              <Link to="/about" className="new-link">
                Explore
              </Link>
            </div>
            {content && (
              <div
                className="col-md-4"
                dangerouslySetInnerHTML={{
                  __html: content.homeContent.video_link,
                }}
              ></div>
            )}
          </div>
        </div>
      </section>

      {content && (
        <section className="tour-section section-padding pt-0 restric-data">
          <div className="container">
            <div className="text-center">
              <h4 className="small-head"> Enjoy Our</h4>
              <span className="stylish-head mt-0">Tour Packages</span>
            </div>
            <div className="row mb-4">
              <div className="col-md-4">
                <Link to="/package/incredible_india">
                  <div className="image-box-tour">
                    <div className="overflow-hidden">
                      <img
                        src={
                          process.env.REACT_APP_BASE_IMG_URL +
                          content.packageImages[0].featured_img
                        }
                        className="img-fluid"
                      />
                    </div>
                    <div className="image-info-sec">
                      <h4>Incredible India</h4>
                      <div className="new-link">Join US</div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="/package/wild_africa">
                  <div className="image-box-tour">
                    <div className="overflow-hidden">
                      <img
                        src={
                          process.env.REACT_APP_BASE_IMG_URL +
                          content.packageImages[1].featured_img
                        }
                        className="img-fluid"
                      />
                    </div>
                    <div className="image-info-sec">
                      <h4> Wild Africa</h4>
                      <div className="new-link">Join US</div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col-md-4">
                <Link to="/package/beautiful_asia">
                  <div className="image-box-tour">
                    <div className="overflow-hidden">
                      <img
                        src={
                          process.env.REACT_APP_BASE_IMG_URL +
                          content.packageImages[2].featured_img
                        }
                        className="img-fluid"
                      />
                    </div>
                    <div className="image-info-sec">
                      <h4>Beautiful Asia </h4>
                      <div className="new-link">Join US</div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* {content && content.packagetour.map((item) => {
              return (
                <div className="col-md-4">
                  <div className="image-box-tour">
                  <div className="overflow-hidden">
                    <img src={process.env.REACT_APP_BASE_IMG_URL + item.featured_img} className="img-fluid" />
                    </div>
                    <div className="image-info-sec">
                      <h4>{Common.ucWord(item.title)} </h4>
                      <Link to={"/package-details/" + item.slug} className="new-link">Discover</Link>
                    </div>
                  </div>
                </div>
              );
            })} */}
            </div>
            <div className="row">
              <div className="col-md-6">
                <Link to="/package/adventure_himalayas">
                  <div className="image-box-tour overflow-hidden">
                    <img
                      src={
                        process.env.REACT_APP_BASE_IMG_URL +
                        content.packageImages[3].featured_img
                      }
                      className="img-fluid"
                      width="100%"
                    />
                    <div className="image-info-sec transparent-sec">
                      <h4>Himalayan Adventure </h4>

                      <div className="new-link">Join US</div>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="col-md-6">
                <Link to="/package/colorful_festival">
                  <div className="image-box-tour overflow-hidden">
                    <img
                      src={
                        process.env.REACT_APP_BASE_IMG_URL +
                        content.packageImages[4].featured_img
                      }
                      className="img-fluid"
                      width="100%"
                    />
                    <div className="image-info-sec transparent-sec">
                      <h4>Colorful Festival </h4>
                      <div className="new-link">Join US</div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
      <section className="gallery-section section-padding overflow-hidden">
        <div className="container-fluid">
          <div className="text-center">
            <h4 className="small-head">Discover Our</h4>
            <span className="stylish-head mt-0">Home Stays</span>
          </div>

          <div className="owl-carousel owl-theme gallery-carousel">
            {content &&
              content.resorts.map((item) => {
                return (
                  <div className="item" key={item._id}>
                    <Link to={"/home-stay-details/" + item.slug}>
                      <div className="resort-box">
                        <img
                          src={
                            process.env.REACT_APP_BASE_IMG_URL +
                            item.featured_img
                          }
                        />
                        <div className="rating-box">
                          <p className="mb-0">
                          {
                                [1, 2, 3, 4, 5].map((i) => {
                                    return (
                                      item.resortDetails.length>0 && item.resortDetails[0].score && <i key={i} className={(i <= Math.round(Number(item.resortDetails[0].score)) ? "fa fa-star active" : "fa fa-star")} />
                                    )
                                })
                            }
                          </p>
                          <h3 className="place-name">
                            {Common.ucWord(item.title)}{" "}
                          </h3>
                          <h3 className="resort-name">
                            {Common.ucWord(item.small_text)}{" "}
                          </h3>
                          {/* <a href="#" className="new-link">Discover</a> */}
                          <div className="new-link">Discover</div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
      <ExpertForm showForm={true} splashBanner={true} />
      {/* just commenting the section for few days for client wish */}
      {/* <section className="consent-form-section section-padding pt-0">
        <div className="container">

          <div className="text-center"><h4 className="small-head">Discover Our</h4><span className="stylish-head mt-0">Festival tour</span></div>
          <div className="row">

            <div className="owl-carousel owl-theme common-scroll">



              {content && content.festivalTour.map((item) => {
                return (
                  <div className="item">
                    <div className="image-box-tour">
                      <div className="overflow-hidden"> <img src={process.env.REACT_APP_BASE_IMG_URL + item.featured_img} className="full-width" /> </div>
                      <div className="image-info-sec">
                        <h4>{Common.ucWord(item.title)}</h4>
                        <Link to={"/package-details/" + item.slug} className="new-link">Discover</Link>
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>
        </div>
      </section> */}
      {/* <section className="middle-offer section-padding pt-0">
        <div className="container">
          <div className="sep-bg section-padding" style={{ backgroundImage: 'url("img/separator-bg.png")' }}>
            <div className="floating-content">
              <p className="mb-1">
                You deserve a <br /><span>DAY TOUR!</span>
              </p>
              <a href="#" className="check-link">Check Our  Day Tour Packages</a>
            </div>
          </div>
        </div>
      </section> */}

      <section className="tour-block">
        <div className="container">
          <div className="row mb-2 align-items-center justify-content-center">
            <div className="col-md-3 mobile-section-tab">
              <div className="icon-box">
                <img
                  src={
                    process.env.REACT_APP_BASE_IMG_URL +
                    "img/Varieties-Tour-Options.png"
                  }
                />
                <h5 className="number">Varieties</h5>
                <span className="stylish-head">Tour Options</span>
              </div>
            </div>
            <div className="col-md-3 mobile-section-tab">
              <div className="icon-box">
                <img
                  src={
                    process.env.REACT_APP_BASE_IMG_URL +
                    "img/Personalized-Matching.png"
                  }
                />
                <h5 className="number">Personalized</h5>
                <span className="stylish-head">Matching</span>
              </div>
            </div>
            <div className="col-md-3 mobile-section-tab">
              <div className="icon-box">
                <img
                  src={
                    process.env.REACT_APP_BASE_IMG_URL +
                    "img/Handcrafted-Tour-Plan.png"
                  }
                />
                <h5 className="number">Handcrafted</h5>
                <span className="stylish-head">Tour Plan</span>
              </div>
            </div>
          </div>
          <div className="row mb-3 align-items-center justify-content-center">
            <div className="col-md-3 mobile-section-tab">
              <div className="icon-box">
                <img
                  src={
                    process.env.REACT_APP_BASE_IMG_URL +
                    "img/Ensuring-Your-Safety.png"
                  }
                />
                <h5 className="number">Ensuring</h5>
                <span className="stylish-head">Your Safety</span>
              </div>
            </div>
            <div className="col-md-3 mobile-section-tab">
              <div className="icon-box">
                <img
                  src={
                    process.env.REACT_APP_BASE_IMG_URL +
                    "img/Happy-Customers.png"
                  }
                />
                <h5 className="number">97%</h5>
                <span className="stylish-head">Happy Customers</span>
              </div>
            </div>
            <div className="col-md-3 mobile-section-tab">
              <div className="icon-box">
                <img
                  src={
                    process.env.REACT_APP_BASE_IMG_URL + "img/Your-Trusted.png"
                  }
                />
                <h5 className="number">Your</h5>
                <span className="stylish-head">Trusted</span>
              </div>
            </div>
          </div>
          <div className="row mb-3 align-items-center justify-content-center">
            <div className="col-md-3 mobile-section-tab">
              <div className="icon-box">
                <img
                  src={
                    process.env.REACT_APP_BASE_IMG_URL +
                    "img/Experinced-&-Reliable-Team.png"
                  }
                />
                <h5 className="number">Experinced & </h5>
                <span className="stylish-head">Reliable Team</span>
              </div>
            </div>
            <div className="col-md-3 mobile-section-tab">
              <div className="icon-box">
                <img
                  src={process.env.REACT_APP_BASE_IMG_URL + "img/Support.png"}
                />
                <h5 className="number">24x7</h5>
                <span className="stylish-head">Support</span>
              </div>
            </div>
            <div className="col-md-3 mobile-section-tab">
              <div className="icon-box">
                <img
                  src={process.env.REACT_APP_BASE_IMG_URL + "img/Easy-EMI.png"}
                />
                <h5 className="number">Easy</h5>
                <span className="stylish-head">EMI Holiday</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sundorbon-tour">
        <div className="container">
          <div
            className="bg-sundorban section-padding"
            style={{ backgroundImage: 'url("img/sundorbon-tour.png")' }}
          >
            <div className="row">
              <div className="col-md-4 text-center align-items-center sundorbon-text-part">
                <h5 className="small-head">the land of maneaters</h5>
                <span className="stylish-head">Sundarban</span>
                <p>
                  <Link
                    to="/package-details/sundarban-tour-package-from-kolkata"
                    className="new-link"
                  >
                    Discover
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="blog section-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5 className="small-head">in the news</h5>
              <span className="stylish-head">Latest Blog</span>
              <p className="mobile-off">
                Exciting adventures, beautiful scenery, the finest cuisines and
                rich local cultures – read about our expeditions. Let them
                awaken the travel enthusiast within.{" "}
              </p>
              <a href="/blog" className="new-link mobile-off">
                Explore More
              </a>
            </div>
            <div className="col-md-8">
              <div className="blog-scroll-section">
                <div className="owl-carousel owl-theme blog-scroll">
                  {content &&
                    content.latestBlogs.map((item, index) => {
                      return (
                        <div className="item" key={index}>
                          <div className="resort-box">
                            <img
                              src={
                                process.env.REACT_APP_BASE_IMG_URL +
                                item.featured_img
                              }
                            />
                            <div className="blog-des-box">
                              <h3>{Common.ucWord(item.title)}</h3>
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: item.desc,
                                }}
                              ></p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-padding client-part pb-0">
        <div className="text-center">
          <span className="stylish-head">Our Happy Clients</span>
          <div className="owl-carousel owl-theme client-carousel">
            {testimonial &&
              testimonial.map((item, index) => {
                return (
                  <div className="item" key={index}>
                    <div
                      className="resort-box"
                      dangerouslySetInnerHTML={{
                        __html: item.video_link,
                      }} 
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
