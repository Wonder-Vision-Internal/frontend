import { useEffect } from "react";
import BannerImgSrc from "../../Hooks/BannerImgSrc";
import Common from "../../components/Common";
import OpenApi from "../../components/OpenApi";
import { useState } from "react";
import $ from 'jquery';
import HomeHeader from "../../components/HomeHeader";


const About = () => {
    const [content, setContent] = useState();
    const [banners, setBanners] = useState();

    // BannerImgSrc([{
    //     imgSrc: 'ban03.jpg',
    //     label1: 'Take Only Memories',
    //     label2: 'LEAVE ONLY FOOTPRINTS',
    // }]);
    

    const getAboutContent = async () => {
        try {
            let datas = await OpenApi.get("about");
            setContent(datas.data);
        } catch (error) {
            console.log({ error });
        }
    }

    const getBanners = async () => {
        try {
          let datas = await OpenApi.get("get-all-banners/page/about");
          
          setBanners(datas.data.banners);
        } catch (error) {
          console.log({ error });
        }
        
      }

    useEffect(() => {
        getAboutContent();
        Common.loadCommonJs();
        getBanners();
    }, []);

    useEffect(() => {
        $(".navbar-toggler").trigger('click');
    }, [content]);

    return (
        <div>
            {banners && <HomeHeader allBanners={banners} />}
            <section className="tour-section section-padding">
                <div className="container">
                    <div className="text-center"><h4 className="small-head">Find Our</h4><span className="stylish-head mt-0">Our Organization</span></div>
                    <div className="row about-box">
                        <div className="col-md-6">
                            <h3> Onset of 2001, a group of friends came together. They hailed from diverse backgrounds but the shared a common interest –  love for travelling.</h3>
                            <p> Channeling their passion, they gave wings to their dreams embarking this exciting journey called Wonder Vision.</p>
                        </div>
                        <div className="col-md-6">

                            <p>At Wonder Vision, we understand the desires and the dreams that go behind every destination. It is more than just a place to visit. It is about collecting experiences, making memories and discovering new stories. Therefore, we ensure we get you the best deals. </p>
                            <p>To us, responsible tourism is not just a genre, it is a commitment to which we are dedicated to. When you travel, we travel with you, which is why, we make sure to provide you with itineraries that will fulfill your needs and live up to your plans. </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="emplyoee-section pb-5">
                <div className="container">
                    <div className="row">
                        {content && content.allFounders.map((item) => {
                            return (
                                <div className="col-md-4 position-relative mb-4">
                                    <div className="overflow-hidden"> <img src={process.env.REACT_APP_BASE_IMG_URL + item.img} className="full-width" /></div>
                                    <div className="emplyoee-info">
                                        <h4 className="mb-0">{Common.ucWord(item.name)}</h4>
                                        <p className="mb-0" dangerouslySetInnerHTML={{
                                            __html: item.desc
                                        }}></p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
            <section className="mission-vison-section section-padding">
                <div className="container">
                    {content && <div className="row">
                        <div className="col-md-6">
                            <h3>Vision</h3>
                            <div className="overflow-hidden"><img src={process.env.REACT_APP_BASE_IMG_URL + content.vision.featured_img} className="full-width" /></div>
                            <p className="mt-3" dangerouslySetInnerHTML={{
                                __html: content.vision.small_text,
                            }}></p>
                        </div>
                        <div className="col-md-6">
                            <h3>Mission</h3>
                            <div className="overflow-hidden"><img src={process.env.REACT_APP_BASE_IMG_URL + content.mission.featured_img} className="full-width" /></div>
                            <p className="mt-3 mb-0" dangerouslySetInnerHTML={{
                                __html: content.mission.small_text,
                            }}></p>
                        </div>
                    </div>}
                </div>
            </section>
            <section className="tour-block section-padding about-value">
                <div className="container text-center">
                    <h3>Our Values</h3>
                    <p className="mb-5">We are committed to curating unique travelling experiences that create lasting bonds and bring smiles to our guests faces.<br/>
                        Our dedication to our commitment drives us to continuously improve and exceed your expectations, ensuring that every moment spent with us is truly exceptional. </p>
                    <div className="row mb-2 align-items-center justify-content-center">
                        <div className="col-md-3">
                            <div className="icon-box">
                                <img src="/img/customer-satisfaction.png" />
                                <h5 className="number">Our People</h5>
                                <p>We are passionate travelers who are professionally experienced </p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="icon-box">
                                <img src="/img/handshake.png" />
                                <h5 className="number">Our Offerings</h5>
                                <p>We realize your desires and requirements to create itineraries that will suit your budget and time. </p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="icon-box">
                                <img src="/img/standard.png" />
                                <h5 className="number">Our Conduct</h5>
                                <p>Our conduct is guided by our deep passion for exploring the world and sharing the wonders with you. </p>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-5 align-items-center justify-content-center">
                        <div className="col-md-3">
                            <div className="icon-box">
                                <img src="/img/policy.png" />
                                <h5 className="number">Our Policies</h5>
                                <p>Our policies are centred around you. Your safety is our priority. You can be rest assured that we are responsible for your security. </p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="icon-box">
                                <img src="/img/innovation.png" />
                                <h5 className="number">Innovative Approach</h5>
                                <p>Innovation is our cornerstone. We believe that by constantly embracing new ideas and technologies, we can to provide you and your loved ones with exceptional vacations.</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="icon-box">
                                <img src="/img/ideas.png" />
                                <h5 className="number">Social Initiatives</h5>
                                <p>We are an advocate of responsible tourism. We don’t just deliver services, we are fully attentive and caring towards society at large.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default About;