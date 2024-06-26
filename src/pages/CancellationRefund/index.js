import React, { useEffect, useState } from 'react';
import BannerImgSrc from './../../Hooks/BannerImgSrc';
import $ from 'jquery';
import HomeHeader from '../../components/HomeHeader';
import OpenApi from '../../components/OpenApi';

export default function CancellationRefund() {
    //const [banners, setBanners] = useState();

    BannerImgSrc([{
        //imgSrc: 'contact.jpg',

    }]);




    useEffect(() => {
        $(".navbar-toggler").trigger('click');
        //getBanners();
    }, []);

    return (
        <div className='cms-page'>
            {<HomeHeader />}

            <section className="tour-section section-padding pb-5" >
                <div className="container pt-5">
                    <div className="text-center">
                        <h4 className="small-head">Know Our</h4>
                        <span className="stylish-head mt-0">Cancellation and Refund Policy</span>
                    </div>
                    <div className="row about-box">

                        <div className="col-md-12">
                        <div class="text">
                            <h3>Fixed Departure Packages (Domestic) </h3>
                                        <ul>
                                            <li><strong>Booking Policy</strong> - 
                                            A minimum amount of 25% of the package cost is required to confirm the booking and the balance 
                                            amount has to be paid 45 days prior to arrival date of the respective package.</li>
                                            <li><strong>Cancellation Policy</strong> - An amount of 10% will be charged for cancellation 45 days or any earlier days prior to arrival date, 50% for 30 days prior to arrival date, 75% for
15 days prior to arrival date. Any cancellation made after the above stipulated phase will be fixed according to the merits and the demands of the circumstances and is within the discretion of the management.</li>
                                        </ul>
                          <h3>Fixed Departure Packages (International)</h3>  
                          <p>All booking and cancellation policies are subjected to norms and rules framed by the concerned service providers / vendors of the opted destinations.</p> 
                          <h3>Tailor made Packages (Domestic) </h3>     
                          <ul>
                                            <li><strong>Booking Policy</strong> - 
                                            It is subjected to policies framed by third party 
service providers / vendors, towards whom we are ensuring the service for our guests / clients as per the stipulated contract.</li>
                                            <li><strong>Cancellation and Refund Policy</strong> - Cancellation and Refund Policy is dynamic and subjected to merits and circumstances of each case. It is also related to the policies of different service providers also.</li>
                                        </ul> 
                                        <h3>Tailor made Packages (International)</h3>  
                            <p>All booking and cancellation policies are subjected to norms and rules framed by the concerned service providers / vendors of the opted destinations.</p>   
                         </div>
                         <div className="text-center">
                             
                                <span className="stylish-head mt-5">Child Policy</span>
                        </div>
                        <div class="text">
                            <h3>Fixed Departure Packages (Domestic) </h3>
                            <ul>
                            <li>Child Below 05 Years - 30% of the package cost</li>
                            <li>Child Above 05 Years & Below 10 Years - 60% of the package cost</li>
                            <li>No extra bed will be alloted for the above categories</li>
                            <li>Child Above 10 Years – Full charge (One extra bed / mattress will alloted)</li>
                            </ul>
                            <h3>Fixed Departure Packages (Domestic) </h3>
                            <p>All child policies are subjected to rules framed by service providers / vendors of the opted destinations.</p>
                        </div>
                        <div className="text-center">
                             
                             <span className="stylish-head mt-5">Non INR Price Policy</span>
                        </div>
                        <h3> Fixed Departure Packages (International) :</h3>
                            <p>All price is subjected dynamic exchange rate and remittance charge.</p>
                        </div>


                    </div>
                </div>
            </section>

        </div>

    );
}