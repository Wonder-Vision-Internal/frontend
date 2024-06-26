import { useEffect } from "react";
import OpenApi from "./OpenApi";
import { useState } from "react";
import { Link } from "react-router-dom";
import React  from 'react';

const OtherHomeStay = ({slug,type}) => {
    const [content, setContent] = useState();

    const getHomeStay = async () => {
        try {
            console.log('type',type);
            let datas = await (type === 'home_stay' ? OpenApi.get(`/otherhomestays/${slug}`) : type === 'packages' ? OpenApi.get(`/otherpackages/${slug}`) : null);
            console.log('d',datas.data);
            setContent(datas.data.other.arr);
        } catch (error) {
            console.log({ error });
        }
    }
    useEffect(() => {
        getHomeStay();
    }, []);
    return (
        <>
        {content && content?.length>0 && <section className="consent-form-section section-padding pt-0">
            <div className="container">
                <div className="text-center">
                    <h5 className="small-head">Explore Our</h5>
                    <span className="stylish-head"> {type=="home_stay"? "Other Home Stays": "Other Tour Packages"}</span>
                </div>
                <div className="row">
                <div className="owl-carousel owl-theme common-scroll">

                    {content && content.map((item) => {
                        return (
                            <div className="item" key={item._id}>
                                <div className="image-box-tour">
                                <div className="overflow-hidden"> 
                                    {type=="home_stay" && <img src={process.env.REACT_APP_BASE_IMG_URL + item.main_img} className="full-width" />}
                                    {type=="packages" && <img src={process.env.REACT_APP_BASE_IMG_URL + item.featured_img} className="full-width" />}
                                </div>
                                    <div className="image-info-sec">
                                        <h4>{item.title}</h4>
                                        {type=="home_stay" ? <Link to={"/home-stay-details/"+item.slug} className="new-link">Explore</Link>
                                        : type=="packages" ? <Link to={"/package-details/"+item.slug} className="new-link">Explore</Link> : null}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                </div>
                </div>
            </div>
        </section>}
        </>
    );
}

export default OtherHomeStay;