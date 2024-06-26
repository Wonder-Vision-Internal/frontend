import { useEffect } from "react";
import BannerImgSrc from "../../Hooks/BannerImgSrc";
import $ from 'jquery';
import OpenApi from './../../components/OpenApi';
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Common from './../../components/Common';
import RecentPosts from "../../components/RecentPosts";
import HomeHeader from "../../components/HomeHeader";


export default function BlogDetails() {
    
    const [banners, setBanners] = useState();
    const [content, setContent] = useState();
    const [blogs, setBlogs] = useState();
    const [blogDate, setBlogDate] = useState();

    let { slug } = useParams();

    const getDetails = async () => {
        try {
            let datas = await OpenApi.get("get-post-details-by-slug/" + slug);
            console.log(datas.data.postDetails)
            setContent(datas.data.postDetails);
        } catch (error) {
            console.log({ error });
        }
    }

    const getBanners = async () => {
        try {
          let datas = await OpenApi.get("get-all-banners/post/"+slug);
          console.log("abaabababa===", datas.data.banners.banners)
          setBanners(datas.data.banners[0].banners);

        } catch (error) {
          console.log({ error });
        }
        
      }

    const getBlog = async () => {
        try {
            let datas = await OpenApi.get("get-all/blog");
            console.log(datas.data.allPackages)
            setBlogs(datas.data.allPackages);
        } catch (error) {
            console.log({ error });
        }
    }

    const getDates = async () => {
        try {
            let datas = await OpenApi.get("get-all-blog-dates");
            console.log(datas.data)
            setBlogDate(datas.data);
        } catch (error) {
            console.log({ error });
        }
    }

    useEffect(() => {
        $(".navbar-toggler").trigger('click');
        getDetails();
        getBlog();
        getDates();
        getBanners();
    }, [slug]);

    return (
        <>
            {banners && <HomeHeader allBanners={banners} />}
            <section className="blog-section section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">

                            <div className="row mb-5">

                                {content && <div className="col-md-12">
                                    <h3 className="blog-head">{content.title}</h3>
                                    <div dangerouslySetInnerHTML={{
                                        __html: content.content,
                                    }}></div>
                                </div>}
                            </div>
                        </div>
                        {/* <div className="col-md-3">
                        <h4>Recent Posts</h4>
                        <ul className="heading-display">
                            <li><a href="/">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean molestie leo nunc,</a></li>
                            <li><a href="/">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean molestie leo nunc,</a></li>
                            <li><a href="/">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean molestie leo nunc,</a></li>
                            <li><a href="/">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean molestie leo nunc,</a></li>
                            <li><a href="/">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean molestie leo nunc,</a></li>
                            <li><a href="/">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean molestie leo nunc,</a></li>
                            <li><a href="/">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean molestie leo nunc,</a></li>
                        </ul>
                        <div className="archive-box mt-5">
                            <h4>ARCHIVES</h4>
                            <ul className="heading-display">
                                <li><a href="/"><span className="circle-arrow"><i className="fas fa-arrow-right" /></span> MAY 2023</a></li>
                                <li><a href="/"><span className="circle-arrow"><i className="fas fa-arrow-right" /></span> MAY 2023</a></li>
                                <li><a href="/"><span className="circle-arrow"><i className="fas fa-arrow-right" /></span> MAY 2023</a></li>
                                <li><a href="/"><span className="circle-arrow"><i className="fas fa-arrow-right" /></span> MAY 2023</a></li>
                                <li><a href="/"><span className="circle-arrow"><i className="fas fa-arrow-right" /></span> MAY 2023</a></li>
                                <li><a href="/"><span className="circle-arrow"><i className="fas fa-arrow-right" /></span> MAY 2023</a></li>
                                <li><a href="/"><span className="circle-arrow"><i className="fas fa-arrow-right" /></span> MAY 2023</a></li>
                                <li><a href="/"><span className="circle-arrow"><i className="fas fa-arrow-right" /></span> MAY 2023</a></li>
                                <li><a href="/"><span className="circle-arrow"><i className="fas fa-arrow-right" /></span> MAY 2023</a></li>
                                <li><a href="/"><span className="circle-arrow"><i className="fas fa-arrow-right" /></span> MAY 2023</a></li>
                            </ul>
                        </div>
                    </div> */}

                        {content && blogDate && <RecentPosts content={blogs} blogDate={blogDate} />}
                    </div>
                </div></section>
        </>
    );
}