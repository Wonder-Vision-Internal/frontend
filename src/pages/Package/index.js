import { Link, useParams } from "react-router-dom";
import BannerImgSrc from "../../Hooks/BannerImgSrc";
import OpenApi from "../../components/OpenApi";
import { useState, useEffect } from "react";
import Common from "../../components/Common";
import $ from 'jquery';
import HomeHeader from "../../components/HomeHeader";
import ExpertForm from './../../components/ExperForm';


export default function Package() {
    let { category } = useParams();
    

    const [content, setContent] = useState();
    const [banners, setBanners] = useState();
    

    const getHomeStay = async () => {
        try {
            let datas = await OpenApi.get("get-all-packages/"+category);
            console.log(datas.data.allPackages)
            setContent(datas.data.allPackages);
        } catch (error) {
            console.log({ error });
        }
    }
    useEffect(()=>{
        getHomeStay();
        getBanners();
    }, [category]);

    const getBanners = async () => {
        try { 
          let datas = await OpenApi.get("get-all-banners/page/"+category);
            console.log("banners ", datas.data.banners)
          setBanners(datas.data.banners);
        } catch (error) {
          console.log({ error });
        }
        
      }

    useEffect(()=>{
        if(content) {
            $(".navbar-toggler").trigger('click');
        }
        
    }, [content]);

    return (
        <div>
        {banners && <HomeHeader allBanners={banners} />}
            <section className="tour-section section-padding pb-2">
                <div className="container">
                    <div className="text-center">
                        <h4 className="small-head">Discover OUR</h4>
                       {category && <span className="stylish-head mt-4">{Common.ucWord(category.replace(/_/g, " "))} </span>}
                    </div>
                    <div className="row">


                        {content && content.map((item) => {
                            return (
                                <div className="col-md-4 position-relative mb-4" key={item._id}>
                                   <div className="overflow-hidden">  <img src={process.env.REACT_APP_BASE_IMG_URL + item.featured_img} className="full-width" /></div>
                                    <div className="image-info-sec">
                                        <div className="d-flex package-title">
                                            <h4>{Common.ucWord(item.title)}</h4>
                                        </div>
                                        {/* <p className="price-details">Price starting from <span className="money">{item.price > 0 ? item.price : 'NA'} /-</span></p> */}
                                        <Link className="view-details-butt" to={"/package-details/" + item.slug}>View Details </Link>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </div>
            </section>
            {/* <section className="middle-offer section-padding pt-0">
                <div className="container">
                    <div className="sep-bg section-padding" style={{ backgroundImage: 'url("/img/separator-bg.png")' }}>
                        <div className="floating-content">
                            <p className="mb-1">
                                You deserve a <br /><span>DAY TOUR!</span>
                            </p>
                            <a className="view-details-butt" href="#">Check Our  Day Tour Packages</a>
                        </div>
                    </div>
                </div>
            </section> */}
            <ExpertForm showForm={false} splashBanner={true} />
            <section className="tour-block">
        <div className="container">
          <div className="row mb-2 align-items-center justify-content-center">
            <div className="col-md-3 mobile-section-tab">
              <div className="icon-box">
                <img src={process.env.REACT_APP_BASE_IMG_URL+"img/Varieties-Tour-Options.png"} />
                <h5 className="number">Varieties</h5>
                <span className="stylish-head">Tour Options</span>
              </div>
            </div>
            <div className="col-md-3 mobile-section-tab">
              <div className="icon-box">
                <img src={process.env.REACT_APP_BASE_IMG_URL+"img/Personalized-Matching.png"} />
                <h5 className="number">Personalized</h5>
                <span className="stylish-head">Matching</span>
              </div>
            </div>
            <div className="col-md-3 mobile-section-tab">
              <div className="icon-box">
                <img src={process.env.REACT_APP_BASE_IMG_URL+"img/Handcrafted-Tour-Plan.png"} />
                <h5 className="number">Handcrafted</h5>
                <span className="stylish-head">Tour Plan</span>
              </div>
            </div>
          </div>
          <div className="row mb-3 align-items-center justify-content-center">
            <div className="col-md-3 mobile-section-tab">
              <div className="icon-box">
                <img src={process.env.REACT_APP_BASE_IMG_URL+"img/Ensuring-Your-Safety.png"} />
                <h5 className="number">Ensuring</h5>
                <span className="stylish-head">Your Safety</span>
              </div>
            </div>
            <div className="col-md-3 mobile-section-tab">
              <div className="icon-box">
                <img src={process.env.REACT_APP_BASE_IMG_URL+"img/Happy-Customers.png"} />
                <h5 className="number">97%</h5>
                <span className="stylish-head">Happy Customers</span>
              </div>
            </div>
            <div className="col-md-3 mobile-section-tab">
              <div className="icon-box">
                <img src={process.env.REACT_APP_BASE_IMG_URL+"img/Your-Trusted.png"} />
                <h5 className="number">Your</h5>
                <span className="stylish-head">Trusted</span>
              </div>
            </div>
          </div>
          <div className="row mb-3 align-items-center justify-content-center">
            <div className="col-md-3 mobile-section-tab">
              <div className="icon-box">
                <img src={process.env.REACT_APP_BASE_IMG_URL+"img/Experinced-&-Reliable-Team.png"} />
                <h5 className="number">Experinced & </h5>
                <span className="stylish-head">Reliable Team</span>
              </div>
            </div>
            <div className="col-md-3 mobile-section-tab">
              <div className="icon-box">
                <img src={process.env.REACT_APP_BASE_IMG_URL+"img/Support.png"} />
                <h5 className="number">24x7</h5>
                <span className="stylish-head">Support</span>
              </div>
            </div>
            <div className="col-md-3 mobile-section-tab">
              <div className="icon-box">
                <img src={process.env.REACT_APP_BASE_IMG_URL+"img/Easy-EMI.png"} />
                <h5 className="number">Easy</h5>
                <span className="stylish-head">EMI Holiday</span>
              </div>
            </div>
          </div>
        </div>
      </section>
        </div>

    );
}