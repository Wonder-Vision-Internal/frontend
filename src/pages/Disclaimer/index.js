import React, { useEffect, useState } from 'react';
import BannerImgSrc from './../../Hooks/BannerImgSrc';
import $ from 'jquery';
import HomeHeader from '../../components/HomeHeader';
import OpenApi from '../../components/OpenApi';

export default function Disclaimer() {
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
                        <span className="stylish-head mt-0">Disclaimer</span>
                    </div>
                    <div className="row about-box">

                        <div className="col-md-12">
                            <div class="text">

                                <p><strong class="text-center">NO WARRANTIES</strong></p>
                                <p>
                                    This website is provided “as is” without any representations or warranties, express or implied. WonderVision makes no representations
                                    or warranties in relation to this website or the information and materials provided on this website.
                                </p>
                                <p>
                                    Without prejudice to the generality of the foregoing paragraph, WonderVision does not warrant that:
                                </p><ul>
                                    <li>
                                        this website will be constantly available, or available at all; or
                                    </li>
                                    <li>
                                        the information on this website is complete, true, accurate or non-misleading.
                                    </li>
                                </ul>
                                <p></p>
                                <p>
                                    Nothing on this website constitutes, or is meant to constitute, advice of any kind. If you require advice in relation
                                    to any matter you should consult an appropriate professional.
                                </p>

                                <p><strong class="text-center">LIMITATIONS OF LIABILITY</strong></p>
                                <p>
                                    WonderVision will not be liable to you (whether under the law of contract, the law of torts or otherwise) in
                                    relation to the contents of, or use of, or otherwise in connection with, this website:
                                </p><ul>
                                    <li>
                                        to the extent that the website is provided free-of-charge, for any direct loss; or
                                    </li>
                                    <li>
                                        for any indirect, special or consequential loss; or
                                    </li>
                                    <li>
                                        for any business losses, loss of revenue, income, profits or anticipated savings, loss of contracts or
                                        business relationships, loss of reputation or goodwill, or loss or corruption of information or data.
                                    </li>
                                </ul>
                                <p></p>
                                <p>
                                    These limitations of liability apply even if WonderVision has been expressly advised of the potential loss.
                                </p>




                                <p><strong class="text-center">EXCEPTIONS</strong></p>
                                <p>
                                    Nothing in this website disclaimer will exclude or limit any warranty implied by law that it would be unlawful
                                    to exclude or limit; and nothing in this website disclaimer will exclude or limit WonderVision's liability in respect of any:
                                </p><ul>
                                    <li>
                                        death or personal injury caused by WonderVision's negligence; or
                                    </li>
                                    <li>
                                        fraud or fraudulent misrepresentation on the part of WonderVision; or
                                    </li>
                                    <li>
                                        matter which it would be illegal or unlawful for WonderVision to exclude or limit, or
                                        to attempt or purport to exclude or limit, its liability.
                                    </li>
                                </ul>
                                <p></p>

                                <p><strong class="text-center">REASONABLENESS</strong></p>
                                <p>
                                    By using this website, you agree that the exclusions and limitations of liability set out in this website disclaimer are reasonable.
                                </p>
                                <p>
                                    If you do not think they are reasonable, you must not use this website.
                                </p>


                                <p><strong class="text-center">OTHER PARTIES</strong></p>
                                <p>
                                    You accept that, as a limited liability entity, WonderVision has an interest in limiting the personal liability of its
                                    officers and employees. You agree that you will not bring any claim personally against WonderVision officers or employees
                                    in respect of any losses you suffer in connection with the website.
                                </p>
                                <p>
                                    Without prejudice to the foregoing paragraph, you agree that the limitations of warranties and liability
                                    set out in this website disclaimer will protect WonderVision's officers, employees, agents, subsidiaries, successors,
                                    assigns and sub-contractors as well as WonderVision
                                </p>

                                <p><strong class="text-center">UNENFORCEABLE PROVISIONS</strong></p>
                                <p>
                                    If any provision of this website disclaimer is, or is found to be, unenforceable under applicable law,
                                    that will not affect the enforceability of the other provisions of this website disclaimer.
                                </p>
                            </div>

                        </div>


                    </div>
                </div>
            </section>

        </div>

    );
}