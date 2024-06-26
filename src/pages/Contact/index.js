import React, { useEffect, useRef, useState } from 'react';
import BannerImgSrc from './../../Hooks/BannerImgSrc';
import $ from 'jquery';
import HomeHeader from '../../components/HomeHeader';
import OpenApi from '../../components/OpenApi';
import { isAction } from '@reduxjs/toolkit';

export default function Contact() {
    const [banners, setBanners] = useState();
    const [smiley, setSmiley] = useState();
    const [inputes, setInputes] = useState();
    const [msg, setMsg] = useState();
    const formRef = useRef(null);
   
    // BannerImgSrc([{
    //     imgSrc: 'contact.jpg',
    //     label1: 'Let’s Connect to',
    //     label2: 'PLAN YOUR NEXT TRIP',
    //   }]);

    const getBanners = async () => {
        try {
          let datas = await OpenApi.get("get-all-banners/page/contact");
            console.log(datas.data.banners)
          setBanners(datas.data.banners);
        } catch (error) {
          console.log({ error });
        }
        
      }

    const handleInputes = (e) => {
        setInputes({
            ...inputes,
            [e.target.name]: e.target.value,
        });
    }  

    const processSubmit = async (event) => {
        event.preventDefault();
        if(inputes && inputes.smiley) {
            formRef.current.reset();
            console.log({inputes});
            try {
                let datas = await OpenApi.get(`send-query?name=${inputes.name}&mail=${inputes.mail}&phone=${inputes.phone}&bookingId=${inputes.bookingId}&smiley=${inputes.smiley}&message=${encodeURIComponent(inputes.message)}&type=contact`);
                
                setMsg(datas.data.msg);
                setInputes(null)
            } catch (error) {
                setInputes(null)
                console.log({ error });
            }
        } else {
            alert('Please select a feedback smaily first')
           
        }
    }  


    useEffect(()=>{
        $(".navbar-toggler").trigger('click');
        getBanners();
    }, []);

    return (
        <div>
         {banners && <HomeHeader allBanners={banners} />}
            <section className="tour-section section-padding pb-5" >
                <div className="container">
                    {<div className="text-center">
                        <h4 className="small-head">Discover Our</h4>
                        <span className="stylish-head mt-0">Contact</span>
                    </div>}
                    
                    <div className="d-flex align-items-center content-contact">
                        
                        <div className="">
                        {/* <h3>Kolkata</h3> */}
                            <p>280 B.B. Ganguly Street<br />Kolkata – 700012 West Bengal (India)</p>
                        </div>
                        <div className="">
                           
                            <p>+91 84200 48046, 84200 48047 / 48
                                <br />sales@wondervision.in</p>
                        </div>
                        <div className="">
                       
                            <a className="locate-map" href="https://www.google.com/maps?ll=22.571506,88.355262&z=17&t=m&hl=en&gl=IN&mapclient=embed&q=280,+Bepin+Behari+Ganguly+St+Poddar+Court,+Tiretti+Kolkata,+West+Bengal+700012" target="_blank"> <i class="fas fa-map-marker-alt"></i> &nbsp;Locate on map</a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="map-section" style={{ backgroundImage: 'url("/img/location-pin.png")' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                        
                            <div className="floating-feedback">
                                
                                <h4>Valuable Feedback</h4>
                                <form ref={formRef} className="black-form form row" onSubmit={processSubmit}>
                                    <div className="form-group">
                                        <input required type="text" className="form-control" name='name' placeholder="Name" onChange={handleInputes} />
                                        {/* <small  class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                    </div>
                                    <div className="form-group">
                                        <input required type="email" className="form-control" name='mail' placeholder="Email-id" onChange={handleInputes} />
                                        {/* <small  class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                    </div>
                                    <div className="form-group">
                                        <input required type="text" className="form-control" name='phone' placeholder="Phone Number" onChange={handleInputes} />
                                        {/* <small  class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                    </div>
                                    <div className="form-group">
                                        <input required type="text" className="form-control" name='bookingId' placeholder="Booking Id" onChange={handleInputes} />
                                        {/* <small  class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                    </div>
                                    <div className="form-group">
                                        <p className='emoji-group'>
                                            <a href='javascript:;' className={(inputes?.smiley=='1'?'active': '')} onClick={()=> {
                                                setInputes({
                                                    ...inputes,
                                                    smiley: 1,
                                                });
                                               
                                            }}>&#x1F600;</a>   
                                            <a href='javascript:;' className={(inputes?.smiley=='2'?'active': '')}   onClick={()=> {
                                                setInputes({
                                                    ...inputes,
                                                    smiley: 2,
                                                });
                                            }}>&#x1F60A;</a>
                                            <a href='javascript:;' className={(inputes?.smiley=='3'?'active': '')}  onClick={()=> {
                                                setInputes({
                                                    ...inputes,
                                                    smiley: 3,
                                                });
                                            }}>&#x1F611;</a>
                                            <a href='javascript:;' className={(inputes?.smiley=='4'?'active': '')}  onClick={()=> {
                                               
                                                setInputes({
                                                    ...inputes,
                                                    smiley: 4,
                                                });
                                            }}>&#x1F623;</a>
                                        </p>
                                    </div>
                                    <div className="form-group">
                                        <textarea required className="form-control" name='message' onChange={handleInputes} placeholder="type your message here" defaultValue={""} />
                                        {/* <small  class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                    </div>
                                    <p>Your feedback is valuable, positive as well as negative. Please spare a minute to share your feedback. It will help us improve our services and serve you better.</p>
                                    <button type="submit" className="btn btn-primary submit-butt">Submit</button>
                                </form>
                                {msg && <div class="alert alert-info" role="alert">
                                    {msg}
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}