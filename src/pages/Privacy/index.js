import React, { useEffect, useState } from 'react';
import BannerImgSrc from './../../Hooks/BannerImgSrc';
import $ from 'jquery';
import HomeHeader from '../../components/HomeHeader';
import OpenApi from '../../components/OpenApi';

export default function Privacy() {
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
                        <h4 className="small-head">Discover Our</h4>
                        <span className="stylish-head mt-0">Privacy Statement</span>
                    </div>
                    <div className="row about-box">

                        <div className="col-md-12">
                            <div class="text">
                                <p>
                                    Your privacy is important to WonderVision This privacy statement provides information about the personal information
                                    that WonderVision collects, and the ways in which WonderVision uses that personal information.
                                </p>

                                <p><strong class="text-center">PERSONAL INFORMATION COLLECTED</strong></p>
                                <p>
                                    WonderVision may collect and use the following kinds of personal information:
                                </p><ul>
                                    <li>
                                        information about your use of this website including which sections you have viewed and areas clicked;
                                    </li>
                                    <li>
                                        information that you provide using for the purpose of registering with the website in the contact us section;
                                    </li>
                                    <li>
                                        information that you provide for the purpose of subscribing to the website services; and
                                    </li>
                                    <li>
                                        any other information that you send to WonderVision
                                    </li>
                                </ul>
                                <p></p>


                                <p><strong class="text-center">USING PERSONAL INFORMATION</strong></p>
                                <p>
                                    WonderVision may use your personal information to:
                                </p><ul>
                                    <li>
                                        administer this website;
                                    </li>
                                    <li>
                                        personalize the website for you;
                                    </li>
                                    <li>
                                        publish information about you on the website; and
                                    </li>
                                    <li>
                                        send you marketing communications.
                                    </li>
                                </ul>
                                <p></p>

                                <p>
                                    Where WonderVision disclosed your personal information to its agents or sub-contractors for these purposes,
                                    the agent or sub-contractor in question will be obligated to use that personal information in accordance with the terms of this privacy statement.
                                </p>
                                <p>
                                    In addition to the disclosures reasonably necessary for the purposes identified elsewhere above,
                                    WonderVision may disclose your personal information to the extent that it is required to do so by law,
                                    in connection with any legal proceedings or prospective legal proceedings, and in order to establish, exercise or defend its legal rights.
                                </p>


                                <p><strong class="text-center">SECURING YOUR DATA</strong></p>
                                <p>
                                    WonderVision will take reasonable technical and organisational precautions to prevent the loss, misuse or alteration of your personal information.
                                </p>
                                <p>
                                    WonderVision will store all the personal information you provide on its servers.
                                </p>

                                <p><strong class="text-center">CROSS-BORDER DATA TRANSFERS</strong></p>
                                <p>
                                    Information that WonderVision collects may be stored and processed in and transferred between any of the countries
                                    in which WonderVision operates to enable the use of the information in accordance with this privacy policy.
                                </p>
                                <p>
                                    In addition, personal information that you submit for publication on the website will be published on the internet and may be available around the world.
                                </p>
                                <p>You agree to such cross-border transfers of personal information.</p>


                                <p><strong class="text-center">UPDATING THIS STATEMENT</strong></p>
                                <p>
                                    WonderVision may update this privacy policy by posting a new version on this website.
                                </p><p>
                                    You should check this page occasionally to ensure you are familiar with any changes.
                                </p>

                                <p><strong class="text-center">OTHER WEBSITES</strong></p>
                                <p>
                                    This website contains links to other websites.
                                </p>
                                <p>
                                    WonderVision is not responsible for the privacy policies or practices of any third party.
                                </p>
                            </div>

                        </div>


                    </div>
                </div>
            </section>

        </div>

    );
}