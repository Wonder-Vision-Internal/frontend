import { useParams, useLocation } from "react-router-dom";
import BannerImgSrc from "../../Hooks/BannerImgSrc";
import { useState } from "react";
import OpenApi from "../../components/OpenApi";
import { useEffect } from "react";
import Common from "../../components/Common";
import OtherHomeStay from "../../components/OtherHomeStay";
import $ from "jquery";
import Story from "../../components/Story";
import Stories from "../../components/Stories";
import DetailsVideoes from "../../components/DetailsVideoes";
import HomeHeader from "../../components/HomeHeader";
import TabFaq from "../../components/Tabfaq";
import ExpertForm from "../../components/ExperForm";
import ExpertFormContent from "../../components/ExpertFormContent";
import { Helmet } from "react-helmet";
import PackageDetail from "../../components/PackageDetail";
import BestThing from "../../components/BestThing";
import BestPlace from "../../components/BestPlace";

export default function PackageDetails() {
  // BannerImgSrc([{
  //     imgSrc: 'kerala.jpg',
  //     label1: 'Take Only Memories',
  //     label2: 'LEAVE ONLY FOOTPRINTS',
  // }]);

  let { slug } = useParams();

  const [content, setContent] = useState();
  const [tabs, setTabs] = useState();
  const [videoes, setVideoes] = useState();
  const [banners, setBanners] = useState();
  const [showLoginMsg, setShowLoginMsg] = useState(false);
  const [data, setData] = useState();
  const [priceDetails, setPriceDetails] = useState([]);
  const location = useLocation();
  const [bestThing, setBestThing] = useState([]);
  const [bestPlace, setBestPlace] = useState([]);
  const [packageDetails, setPackageDetails] = useState([]);
  const [packageDetails2, setPackageDetails2] = useState([]);

  const getContent = async () => {
    try {
      let datas = await OpenApi.get("get-package-details/" + slug);
      setContent(datas.data);
      console.log("d1", datas);
      setTabs(
        JSON.parse(datas.data.postDetails?.other_details[0]?.other_details)
      );
      setVideoes(JSON.parse(datas.data.postDetails?.other_details[0]?.videoes));

      Common.loadCommonJs();
    } catch (error) {
      console.log({ error });
    }
  };

  const getBanners = async () => {
    try {
      let datas = await OpenApi.get("get-all-banners/post/" + slug);
      console.log("abaabababa===", datas.data.banners.banners);
      setBanners(datas.data.banners[0].banners);
    } catch (error) {
      console.log({ error });
    }
  };

  const getBestThings = async () => {
    try {
      let res = await OpenApi.get("best-things-to-do/" + slug);
      setBestThing(res.data.data);
    } catch (error) {
      console.log({ error });
    }
  };

  const getBestPlace = async () => {
    try {
      let res = await OpenApi.get("best-places/" + slug);
      setBestPlace(res.data.data);
    } catch (error) {
      console.log({ error });
    }
  };

  const getPackageDetails = async () => {
    try {
      let res = await OpenApi.get("package-youtube-url/tour-guidance/" + slug);
      setPackageDetails(res.data.data)
    } catch (error) {
      console.log({ error });
    }
  };

  const getPackageDetails2 = async () => {
    try {
      let res = await OpenApi.get("package-youtube-url/our-happy-client/" + slug);
      setPackageDetails2(res.data.data)
    } catch (error) {
      console.log({ error });
    }
  };

  const fetchPriceDetails = async () => {
    const res = await OpenApi.get(`get-price-details/${slug}`);
    setPriceDetails(res.data.priceDetails);
  };

  // const getTestimonials = async () => {
  //   try {
  //     let datas = await OpenApi.get("get-testimonial");
  //     setPackageDetails(datas.data.testimonial);
  //   } catch (error) {
  //     console.log({ error });
  //   }
  // };

  useEffect(() => {
    fetchPriceDetails();
    getBestThings();
    getBestPlace();
    getPackageDetails();
    getPackageDetails2();
    // getTestimonials();
  }, []);

  useEffect(() => {
    getContent();
  }, []);

  useEffect(() => {
    $(".navbar-toggler").trigger("click");
    getBanners();
  }, [content]);

  const handlePayment = async () => {
    setData({
      name: content?.postDetails?.title,
      amount: content?.postDetails?.price,
      number: content?.postDetails?._id,
      MUID: "MUID" + Date.now(),
      transactionId: +Date.now(),
    });

    try {
      let datas = await OpenApi.get(
        `payment?name=${data.name}&amount=${data.amount}&number=${data.number}&MUID=${data.MUID}&transactionId=${data.transactionId}`
      );

      console.log("phone Pay===", datas.data);

      window.location.href = datas.data.url;
    } catch (error) {
      console.log({ error });
    }
  };

  const handleBooking = () => {
    if (localStorage.getItem("userName") !== null) {
      setShowLoginMsg(false);
      handlePayment();
    } else {
      setShowLoginMsg(true);
    }
  };

  return (
    <div>
      {content && (
        <Helmet>
          <title>{content?.postDetails?.meta?.title}</title>
          <meta
            name="Keywords"
            content={content?.postDetails?.meta?.keywords}
          />
          <meta
            name="Description"
            content={content?.postDetails?.meta?.description}
          />
          <link rel="canonical" href={window.location.href} />
        </Helmet>
      )}
      {banners && <HomeHeader allBanners={banners} />}
      <section className="section-padding package-details pb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              {/* <marquee direction="left" width='100%' height={30} behavior="alternate" className='mb-3 d-flex text-danger'>
                                <marquee behavior="alternate"><strong>Package booking section is under process!!!!!! Please do not book by paying...Contact Us through mail or phone.</strong></marquee>
                            </marquee> */}

              <h3 className="destination-head mb-0">
                {content?.postDetails?.title}
              </h3>
              <div className="d-flex mb-3">
                {content &&
                  content.postDetails.other_details[0].days &&
                  content.postDetails.other_details[0].nights && (
                    <span className="day-pack">
                      {content.postDetails.other_details[0].nights} /{" "}
                      {content.postDetails.other_details[0].days}
                    </span>
                  )}
                <a className="custome-your-plan" href="/tailormade">
                  Customize Yours
                </a>
              </div>
              {/* <h4 className="sub-head-pack">Why {content?.postDetails?.title}</h4>
                            <p className="sub-desc-pack" dangerouslySetInnerHTML={{
                                        __html: content?.postDetails?.content,
                                    }}></p> */}

              <p
                className="sub-desc-pack"
                dangerouslySetInnerHTML={{
                  __html: content && content?.postDetails?.content,
                }}
              ></p>

              <ul className="nav nav-tabs" id="myTab" role="tablist">
                {tabs &&
                  tabs.map((item, index) => {
                    if (item.content) {
                      return (
                        <li
                          className="nav-item"
                          role="presentation"
                          key={index}
                        >
                          <button
                            className={
                              index === 0 ? "nav-link active" : "nav-link"
                            }
                            id={"home-tab-" + index}
                            data-bs-toggle="tab"
                            data-bs-target={"#home-" + index}
                            type="button"
                            role="tab"
                            aria-controls={"home-" + index}
                            aria-selected="true"
                          >
                            {Common.ucWord(item.title)}
                          </button>
                        </li>
                      );
                    }
                  })}
              </ul>
              <div className="tab-content" id="myTabContent">
                {tabs &&
                  tabs.map((item, index) => {
                    if (item.content) {
                      return (
                        <div
                          className={
                            index === 0
                              ? "tab-pane fade active pb-4 pt-4 show"
                              : "tab-pane fade  pb-4 pt-4"
                          }
                          id={"home-" + index}
                          role="tabpanel"
                          aria-labelledby={"home-data-tab-" + index}
                          dangerouslySetInnerHTML={{
                            __html: item.content,
                          }}
                        ></div>
                      );
                    }
                  })}
              </div>

              {/* <h4 class="sub-head-pack">Package Inclusions</h4>
                                <div class="d-flex facility-box">
                                    <div class="facility-list text-center">
                                        <img src="//img/ico-accomodation.png">
                                        <p>Accomodation</p>
                                    </div>
                                    <div class="facility-list text-center">
                                        <img src="/img/ico-meal.png">
                                        <p>All meals</p>
                                    </div>
                                    <div class="facility-list text-center">
                                        <img src="/img/ico-transport.png">
                                        <p>Transportation</p>
                                    </div>
                                    <div class="facility-list text-center">
                                        <img src="/img/ico-entry-ticket.png">
                                        <p>Entry Ticket</p>
                                    </div>
                                    <div class="facility-list text-center">
                                        <img src="/img/ico-music.png">
                                        <p>Cultural Program</p>
                                    </div>
                                    <div class="facility-list text-center">
                                        <img src="/img/ico-guide.png">
                                        <p>Tour Guide</p>
                                    </div>
                                </div> */}
            </div>
            <div className="col-md-3">
              {(priceDetails && priceDetails.length > 0) ||
              (content && content.postDetails.other_details[0].starts_from) ? (
                <div className="price-hike-box">
                  {priceDetails.length > 0 &&
                    priceDetails.map((x, index) =>
                      x.description ? (
                        <div key={index}>
                          <p className="mb-1" key={index}>
                            <b>{x.description}</b> :{" "}
                          </p>
                          <h2>INR {x.price} Per Person</h2>
                        </div>
                      ) : (
                        <div key={index}>
                          <h2>INR {x.price} </h2>Per Person
                        </div>
                      )
                    )}

                  {/* {priceDetails && priceDetails.length > 0 && (
                                        <p>+ 5% GST Per Person</p>
                                    )} */}

                  {content &&
                    content.postDetails.other_details[0].emi_price > 0 && (
                      <p classname="emi-amount">
                        No cost EMI @ ₹
                        {content.postDetails.other_details[0].emi_price}{" "}
                      </p>
                    )}
                  {content &&
                    content.postDetails.other_details[0].emi_price > 0 && (
                      <p className="booking-info">Book your holidays with</p>
                    )}
                  {content &&
                    content.postDetails.other_details[0].emi_price > 0 && (
                      <p className="emi">Easy EMI options.</p>
                    )}

                  {content &&
                    content.postDetails.other_details[0].starts_from && (
                      <>
                        <b>
                          Starts From :<br />{" "}
                        </b>
                        {content.postDetails.other_details[0].starts_from}
                      </>
                    )}
                  <br />
                  {priceDetails && priceDetails.length > 0 && (
                    <a
                      href={`/cart-page/${slug}`}
                      className="btn btn-primary submit-butt mt-3 mb-0"
                    >
                      Book Now
                    </a>
                  )}
                </div>
              ) : null}
              {content && content.postDetails.inclusion.length > 0 && (
                <div>
                  <h4 className="sub-head-pack mb-3">Package Inclusions</h4>
                  <div className="d-flex facility-box">
                    {content &&
                      content.postDetails.inclusion.map((item, index) => {
                        return (
                          <div className="facility-list text-center">
                            <img
                              src={
                                process.env.REACT_APP_BASE_IMG_URL + item.img
                              }
                            />
                            <p>{item.text}</p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {content && content.postDetails.main_img && (
                <div>
                  <div
                    className="image-package-box"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <img
                      src={
                        process.env.REACT_APP_BASE_IMG_URL +
                        content.postDetails?.main_img
                      }
                      alt={content.postDetails?.main_img}
                      className="full-width"
                    />
                  </div>
                  <div>
                    {/* Modal */}
                    <div
                      className="modal fade"
                      id="exampleModal"
                      tabIndex={-1}
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                          <div className="modal-body">
                            <img
                              src={
                                process.env.REACT_APP_BASE_IMG_URL +
                                content.postDetails?.main_img
                              }
                              alt={content.postDetails?.main_img}
                              className="full-width"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container pb-5">
          <BestThing bestThing={bestThing} />
        </div>
        <div className="container pb-5">
          <BestPlace bestPlace={bestPlace} />
        </div>
        <div className="container pb-5">
          <PackageDetail testimonial={packageDetails} />
        </div>
      </section>
      {content && content?.postDetails?.gaq_details && (
        <TabFaq
          videoes={videoes ? videoes : []}
          gaq_details={content?.postDetails?.gaq_details}
        />
      )}

      {content && content?.postDetails?.gallery_details.length > 0 && (
        <section className="grid-gallery section-padding pt-2">
          <div className="container">
            <div className="text-center">
              <h5 className="small-head mb-0">WHAT YOU CAN SEE</h5>
              <span className="stylish-head mt-0 mb-5">
                Wonder out mesmerizing landscape
              </span>
            </div>
            <div
              className="grid-box"
              style={{ flexWrap: "wrap", display: "flex" }}
            >
              {content &&
                content.postDetails.gallery_details.map((item) => {
                  return (
                    <a
                      href={process.env.REACT_APP_BASE_IMG_URL + item.img}
                      data-lightbox="roadtrip"
                      className="gridbox-holder"
                      key={item._id}
                      data-title={item.text1}
                    >
                      <div className="grid">
                        <figure className="effect-sadie">
                          <img
                            src={process.env.REACT_APP_BASE_IMG_URL + item.img}
                          />
                          <figcaption>
                            <h2>{Common.ucWord(item.text1)}</h2>
                          </figcaption>
                        </figure>
                      </div>
                    </a>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      {/* <section className="grid-gallery section-padding pt-2">
                <div className="container">
                    <div className="text-center">
                        <h5 className="small-head mb-0">WHAT YOU CAN SEE</h5>
                        <span className="stylish-head mt-0 mb-5">Wonder out mesmerizing landscape</span>
                    </div>
                    <div className="d-flex grid-box">
                        <a href="/img/property1.jpg" data-lightbox="roadtrip" className="gridbox-holder">
                            <div className="grid">
                                <figure className="effect-sadie">
                                    <img src="/img/property1.jpg" />
                                    <figcaption>
                                        <h2>Holy</h2>
                                    </figcaption>
                                </figure>
                            </div>
                        </a>
                        <a href="/img/property2.jpg" data-lightbox="roadtrip" className="gridbox-holder">
                            <div className="grid">
                                <figure className="effect-sadie">
                                    <img src="/img/property2.jpg" />
                                    <figcaption>
                                        <h2>Holy</h2>
                                    </figcaption>
                                </figure>
                            </div>
                        </a>
                        <a href="/img/property3.jpg" data-lightbox="roadtrip" className="gridbox-holder">
                            <div className="grid">
                                <figure className="effect-sadie">
                                    <img src="/img/property3.jpg" />
                                    <figcaption>
                                        <h2>Holy</h2>
                                    </figcaption>
                                </figure>
                            </div>
                        </a>
                        <a href="/img/property4.jpg" data-lightbox="roadtrip" className="gridbox-holder">
                            <div className="grid">
                                <figure className="effect-sadie">
                                    <img src="/img/property4.jpg" />
                                    <figcaption>
                                        <h2>Holy</h2>
                                    </figcaption>
                                </figure>
                            </div>
                        </a>
                    </div>
                    <div className="d-flex grid-box">
                        <a href="/img/property1.jpg" data-lightbox="roadtrip" className="gridbox-holder">
                            <div className="grid">
                                <figure className="effect-sadie">
                                    <img src="/img/property1.jpg" />
                                    <figcaption>
                                        <h2>Holy</h2>
                                    </figcaption>
                                </figure>
                            </div>
                        </a>
                        <a href="/img/property2.jpg" data-lightbox="roadtrip" className="gridbox-holder">
                            <div className="grid">
                                <figure className="effect-sadie">
                                    <img src="/img/property2.jpg" />
                                    <figcaption>
                                        <h2>Holy</h2>
                                    </figcaption>
                                </figure>
                            </div>
                        </a>
                        <a href="/img/property3.jpg" data-lightbox="roadtrip" className="gridbox-holder">
                            <div className="grid">
                                <figure className="effect-sadie">
                                    <img src="/img/property3.jpg" />
                                    <figcaption>
                                        <h2>Holy</h2>
                                    </figcaption>
                                </figure>
                            </div>
                        </a>
                        <a href="/img/property4.jpg" data-lightbox="roadtrip" className="gridbox-holder">
                            <div className="grid">
                                <figure className="effect-sadie">
                                    <img src="/img/property4.jpg" />
                                    <figcaption>
                                        <h2>Holy</h2>
                                    </figcaption>
                                </figure>
                            </div>
                        </a>
                    </div>
                </div>
            </section> */}

      {content && (
        <Stories
          stories={content?.postDetails?.stories}
          name={Common.ucWord(content.postDetails.title)}
        />
      )}
      <div className="container pb-5">
        <PackageDetail testimonial={packageDetails2} />
      </div>
      {content && content.postDetails.contactFormBanner && (
        <section
          className="bg-home-stay"
          style={{
            backgroundImage: `url("${
              process.env.REACT_APP_BASE_IMG_URL +
              content.postDetails.contactFormBanner
            }")`,
          }}
        >
          {content && <ExpertFormContent id={content.postDetails._id} />}
        </section>
      )}
      <OtherHomeStay slug={slug} type={"packages"} />
      <OtherHomeStay slug={slug} type={"home_stay"} />
    </div>
  );
}
