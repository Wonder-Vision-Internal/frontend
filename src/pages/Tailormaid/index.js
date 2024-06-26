import { useEffect, useState } from "react";
import BannerImgSrc from "../../Hooks/BannerImgSrc";
import OtherHomeStay from "../../components/OtherHomeStay";
import $ from 'jquery';
import React  from 'react';
import OpenApi from "../../components/OpenApi";
import HomeHeader from "../../components/HomeHeader";
import ExpertForm from "../../components/ExperForm";

const Tailormaid = () => {

  const [banners, setBanners] = useState();
  // BannerImgSrc([{
  //   imgSrc: 'tailoredmaid.jpg',
  //   label1: 'Take Only Memories',
  //   label2: 'LEAVE ONLY FOOTPRINTS',
  // }]);
  const getBanners = async () => {
    try {
      let datas = await OpenApi.get("get-all-banners/page/tailormade");
        console.log(datas.data.banners)
      setBanners(datas.data.banners);
    } catch (error) {
      console.log({ error });
    }
    
  }


  useEffect(()=>{
    $(".navbar-toggler").trigger('click');
    getBanners();
}, []);
  return (
    <div>
    {banners && <HomeHeader allBanners={banners} />}
      <ExpertForm showForm={true} splashBanner={false} />
      <OtherHomeStay />
    </div>

  );
}

export default Tailormaid;