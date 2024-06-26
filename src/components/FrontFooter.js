import { useEffect, useState } from "react";
import FooterMenu from "./FooterMenu";
import OpenApi from "./OpenApi";

const FrontFooter = () => {

    const [awardsDetails, setAwardsDetails] = useState();
    

    const getAwards = async () => {
        try {
            let datas = await OpenApi.get("awards-accreditation");
            console.log(datas.data)
            setAwardsDetails(datas.data);
        } catch (error) {
            console.log({ error });
        }
    }

    useEffect(()=> {
        getAwards();
    }, []);
    return (
        <footer>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-7">
                        <div className="padd-box-foot1">
                            <h5 className="small-head">Our Achivment</h5>
                            <span className="stylish-head">Awards &amp; Accreditations</span>
                            <ul className="awrdbox">
                                <div class="owl-carousel owl-theme award-car">
                                    {awardsDetails && awardsDetails.banners && awardsDetails.banners.map((banner, index) => {
                                        return (
                                            <div key={index} class="item"><img src={process.env.REACT_APP_BASE_IMG_URL + banner.img} /></div>
                                        )}
                                    )}
                                </div>
                           
                              
                            </ul>
                            {awardsDetails && awardsDetails.awardsAccreditation.small_text &&<p className="text-white" dangerouslySetInnerHTML={{
                                __html: awardsDetails.awardsAccreditation.small_text,
                            }}></p>}
                            {/* <a href="#" className="new-link text-white">Discover</a> */}
                        </div>
                    </div>
                    <div className="col-md-5 secondpart-foot">
                        <h3>wonder vision</h3>
                        <p>280, Bepin Behari Ganguly St, <br />Poddar Court Tiretti, Kolkata, West Bengal</p>
                        <a href="mailto:sales@wondervision.in" className="text-white">sales@wondervision.in</a>
                        <h4 className="mb-0">+91 84200 48046 /47 / 48</h4>
                        <h4>98310 43807</h4>
                        <h4>92305 43807</h4>
                        <ul className="social-media">
                            <li><a href="https://www.facebook.com/wondervision.in/" target="_blank"><i className="fab fa-facebook-f" /></a></li>

                            <li><a href="https://www.instagram.com/wondervision.in/" target="_blank"><i className="fab fa-instagram" /></a></li>
                            <li><a href="https://twitter.com/wondervision_in" target="_blank"><i className="fab fa-twitter" /></a></li>
                            <li><a href="https://www.linkedin.com/in/wondervisionkol/" target="_blank"><i className="fab fa-linkedin" /></a></li>
                            <li><a href="https://www.youtube.com/WonderVisionHolidays" target="_blank"><i className="fab fa-youtube" /></a></li>
                        </ul>
                        <FooterMenu />
                    </div>
                </div>
            </div>
            <div className="footer-strip">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-9 ">
                            ©WonderVision2023. All Right Reserved. <a href="/disclamier">Disclaimer</a>   |   <a href="/privacy">Privacy</a>   |   <a href="/terms">Terms &amp; Condition</a> | <a href="/cancellation-and-refund-policy">Cancellation and Refund Policy</a>
                            <span style={{fontWeight:"bold",color:'#fd3401'}}> This site is under maintenance.</span>
                        </div>
                        <div className="col-sm-3 text-right">
                            Crafted By: Meraki Square
                        </div>
                    </div>
                </div>
            </div>
           <a target="_blank" href="https://api.whatsapp.com/send?phone=8420048047&text=Hello! how may I help you?" className="whatsapp-button"><i className="fab fa-whatsapp" /></a>

        </footer>

    );
} 

export default FrontFooter;
