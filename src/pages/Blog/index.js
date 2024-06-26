import { useEffect, useState } from "react";
import BannerImgSrc from "../../Hooks/BannerImgSrc";
import $ from 'jquery';
import OpenApi from "../../components/OpenApi";
import Common from "../../components/Common";
import { Link } from "react-router-dom";
import RecentPosts from "../../components/RecentPosts";
import HomeHeader from "../../components/HomeHeader";



export default function Blog() {
    const [content, setContent] = useState();
    const [blogDate, setBlogDate] = useState();
    const [banners, setBanners] = useState();


    const getBlog = async () => {
        try {
            let datas = await OpenApi.get("get-all/blog");
            console.log(datas.data.allPackages)
            setContent(datas.data.allPackages);
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
    const getBanners = async () => {
        try {
          let datas = await OpenApi.get("get-all-banners/page/blogs");
          
          setBanners(datas.data.banners);
        } catch (error) {
          console.log({ error });
        }
        
      }

    useEffect(() => {
        $(".navbar-toggler").trigger('click');
        getBlog();
        getDates();
        getBanners();
    }, []);

    return (
        <>
        {banners && <HomeHeader allBanners={banners} />} 
        <section className="blog-section section-padding">
            <div className="container">
                <div className="text-center">
                    <span class="small-head">Wonderlust Chronicles</span>
                    <span className="stylish-head mt-0">Useful Articles</span>
                </div>
                <p className="text-left article-desc">Our world is beautiful, with its breathtaking landscapes, diverse cultures and rich heritage and history. It awakens the travelers within us all. At Wonder Vision, we share our deep love for travel, which ignited our passion and thirst for adventure, leading us to gather incredible experience. Explore our explorations and let them fuel your passion for travel. </p>
                <div className="row ">
                    <div className="col-md-9  mt-5">

                        {content && content.map((item, index) => {
                            return (
                                <div className="row mb-5" key={index}>
                                    <div className="col-md-7">
                                        <img src={process.env.REACT_APP_BASE_IMG_URL + item.featured_img} className="full-width" />
                                    </div>
                                    <div className="col-md-5">
                                        <h3 className="blog-head">{Common.ucWord(item.title)}</h3>
                                        {/* <span className="blog-date">{Common.dateConvert(item.created_at)}</span> */}
                                        <p className="blod-desc" dangerouslySetInnerHTML={{
                                            __html: Common.limitWords(item.content, 50),
                                        }}></p>
                                        <Link className="view-details-butt" to={`/blog-details/${item.slug}`}>Read More</Link>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                    {content && blogDate && <RecentPosts content={content} blogDate={blogDate} />}
                </div>
            </div></section>
            </>

    );
}