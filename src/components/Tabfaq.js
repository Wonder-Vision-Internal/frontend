import { useState } from "react";
import Common from "./Common";
import DetailsVideoes from "./DetailsVideoes";
import { useEffect } from "react";

export default function TabFaq({ gaq_details, videoes }) {
    const [tabData, setTabData] = useState();

    useEffect(() => {
        if(gaq_details[0]?.gaq_details) {
            setTabData(JSON.parse(gaq_details[0].gaq_details));
        }
    }, []);

    return (
        <>
            {tabData && <div className="container pb-5">
                <h4 className="sub-head-pack mb-5">Generally Asked Questions</h4>
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        {tabData.map((item, index) => {
                            return (

                                <button key={index} className={index === 0 ? "nav-link active" : "nav-link"} id={"nav-home-tab-" + index} data-bs-toggle="tab" data-bs-target={"#nav-home-" + index} type="button" role="tab" aria-controls={"nav-home-" + index} aria-selected="true">{item.tab_name}</button>

                            );
                        })}
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    {tabData.map((item, index) => {
                        console.log({item})
                        return (

                            <div className={index === 0 ? "tab-pane fade show active" : "tab-pane fade"} id={"nav-home-" + index} role="tabpanel" aria-labelledby={"nav-home-tab-" + index}>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="owl-carousel owl-theme faq-scroll mt-3">
                                            {item && item.tab_details.map((tab) => {
                                               
                                                return (
                                                    <div className="item" key={"tab-" + index}>
                                                        <div className="faq-box">
                                                            <h5>{Common.ucWord(tab.title)}</h5>
                                                            <p>{tab.desc}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}


                                        </div>
                                    </div>
                                </div>
                            </div>

                        )
                    })}
                </div>
                <DetailsVideoes videoes={videoes} />
            </div>}
        </>
    );
}