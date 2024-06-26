import { useEffect } from "react";
import Common from '../../components/Common';
import BannerImgSrc from './../../Hooks/BannerImgSrc';
import { useParams } from "react-router-dom";
import { useState } from "react";
import OpenApi from "../../components/OpenApi";
import { data } from "jquery";
import OtherHomeStay from "../../components/OtherHomeStay";
import $ from 'jquery';
import './styles.css'
import Stories from "../../components/Stories";
import HomeHeader from "../../components/HomeHeader";
import ExpertForm from "../../components/ExperForm";
import ExpertFormContent from "../../components/ExpertFormContent";
import { Helmet } from "react-helmet";

export default function HomeStayDetails() {

    let { slug } = useParams();
    const [banners, setBanners] = useState();
    const [content, setContent] = useState();
    const [gaq, setGaq] = useState();



    const [readMoreLabel, setReadMoreLabel] = useState("Read More");
    const [collupseCss, setCollupseCss] = useState('collapse property-para');


    const getContent = async () => {
        try {
            let datas = await OpenApi.get("get-home-stay-details/" + slug);
            setContent(datas.data);
            if (datas.data.postDetails.gaq_details)
                setGaq(datas.data.postDetails.gaq_details[0]);
        } catch (error) {
            console.log({ error });
        }
    }

    const handleExpand = () => {
        setCollupseCss(collupseCss === 'collapse property-para' ? 'collapse show' : 'collapse property-para');
        setReadMoreLabel(readMoreLabel === 'Read More' ? 'Show Less' : 'Read More');
    }

    useEffect(() => {
        getContent();
    }, []);

    const getBanners = async () => {
        try {
            let datas = await OpenApi.get("get-all-banners/post/" + slug);
            console.log("abaabababa===", datas.data.banners.banners)
            setBanners(datas.data.banners[0].banners);

        } catch (error) {
            console.log({ error });
        }

    }

    useEffect(() => {
        if (content) {
            $(".navbar-toggler").trigger('click');
            getBanners();
        }
    }, [content]);


    return (
        <div>
        {content &&  <Helmet>
               
               <title>{content?.postDetails?.meta?.title}</title>
               <meta name="Keywords" content={content?.postDetails?.meta?.keywords} />
               <meta name="Description" content={content?.postDetails?.meta?.description} />
               <link rel="canonical" href={window.location.href} />

           </Helmet>}
            {banners && <HomeHeader allBanners={banners} />}
            <section className="experiance-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <h4 className="small-head">Welcome To</h4>
                            {content && <span className="stylish-head" style={{ fontSize: 36 }}>{Common.ucWord(content.postDetails.title)}</span>}
                        </div>
                        <div className="col-md-5 details-desc container" id="module">
                            {content && <p className={collupseCss} id="collapseExample" aria-expanded="false" dangerouslySetInnerHTML={{
                                __html: content.postDetails.content,
                            }}>
                            </p>}
                            {content && <a role="button" className="collapsed" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample" onClick={handleExpand} >{readMoreLabel}</a>}

                        </div>
                        {content && <div className="col-md-4" dangerouslySetInnerHTML={{
                            __html: content.postDetails.video_link,
                        }}>

                        </div>}
                    </div>
                </div>
            </section>

            <section className="tour-section section-padding pt-0">
                <div className="container">
                    <div className="text-center">
                        <h4 className="small-head">ROOMS WE HAVE</h4>
                        <span className="stylish-head mt-0">Choose Yours Own</span>
                    </div>
                    <div className="row">
                        <div className="owl-carousel owl-theme common-scroll">


                            {content && content.postDetails.room_details.map((item) => {
                                return (
                                    <div className="item">
                                        <div className="image-box-tour" key={item._id}>
                                            <div className="overflow-hidden">  <img src={process.env.REACT_APP_BASE_IMG_URL + item.img} className="full-width" /></div>
                                            <div className="image-info-sec">
                                                <h5>{Common.ucWord(item.title)}</h5>
                                                <p dangerouslySetInnerHTML={{
                                                    __html: item.desc,
                                                }}>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                </div>
            </section>
            {content && content?.postDetails?.gallery_details.length > 0 && <section className="grid-gallery section-padding pt-2" >
                <div className="container">
                    <div className="text-center">
                        <h5 className="small-head mb-0">ENJOY YOUR HOLIDAYS</h5>
                        <span className="stylish-head mt-0 mb-5">Wonder out mesmerizing beauties</span>
                    </div>
                    <div className="grid-box" style={{ flexWrap: 'wrap', display: 'flex' }}>

                        {content && content.postDetails.gallery_details.map((item) => {
                            return (
                                <a href={process.env.REACT_APP_BASE_IMG_URL + item.img} data-lightbox="roadtrip" className="gridbox-holder" key={item._id} data-title={item.text1}>
                                    <div className="grid">
                                        <figure className="effect-sadie">
                                            <img src={process.env.REACT_APP_BASE_IMG_URL + item.img} />
                                            <figcaption>
                                                <h2>{Common.ucWord(item.text1)}</h2>
                                            </figcaption>
                                        </figure>
                                    </div>
                                </a>
                            )
                        })}



                    </div>
                </div>
            </section>}
            {content && content?.postDetails?.gaq_details.length > 0 && <section className="consent-form-section section-padding pt-0">
                <div className="container">
                    <div className="text-center">
                        <h5 className="small-head">FAQs on</h5>
                        {content && <span className="stylish-head mt-0 mb-5">{Common.ucWord(content.postDetails.title)}</span>}
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="owl-carousel owl-theme faq-scroll">

                                {gaq && console.log("gaq = ", JSON.parse(gaq.gaq_details))}
                                {gaq && JSON.parse(gaq.gaq_details).map((item) => {

                                    return (

                                        <div className="item" key={item._id}>
                                            <div className="faq-box">
                                                <h5>{Common.ucWord(item.title)}</h5>
                                                <p dangerouslySetInnerHTML={{
                                                    __html: item.desc,
                                                }}></p>
                                            </div>
                                        </div>
                                    );
                                })}

                            </div>
                        </div>
                    </div>
                </div>
            </section>}
            {content?.postDetails?.stories && <Stories stories={content?.postDetails?.stories} name={Common.ucWord(content.postDetails.title)} />}
            {content && content.postDetails.contactFormBanner &&  <section className="bg-home-stay" style={{ backgroundImage: `url("${process.env.REACT_APP_BASE_IMG_URL + content.postDetails.contactFormBanner}")` }}>
            {content && <ExpertFormContent id={content.postDetails._id} />}
            </section>}
            <OtherHomeStay slug={slug} type={"home_stay"} />
            <OtherHomeStay slug={slug} type={"packages"} />
        </div>

    );
}