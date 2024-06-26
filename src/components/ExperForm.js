import { useEffect, useRef, useState } from "react";
import OpenApi from "./OpenApi";

export default function ExpertForm({ splashBanner, showForm }) {
    const [content, setContent] = useState();
    const [smiley, setSmiley] = useState();
    const [inputes, setInputes] = useState();
    const [msg, setMsg] = useState();
    const formRef = useRef(null);

    const getBanners = async () => {
        try {
            let datas = await OpenApi.get("get-export-form-banners");
            //console.log("sdasdadasdasdasd", datas.data.)
            setContent(datas.data);
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
        formRef.current.reset();
        console.log({ inputes });
        try {
            let datas = await OpenApi.get(`send-query?name=${inputes.name}&mail=${inputes.mail}&phone=${inputes.phone}&person=${inputes.person}&date=${inputes.date}&location=${inputes.location}&type=booking-contact`);

            setMsg(datas.data.msg)

        } catch (error) {
            console.log({ error });
        }
    }

    useEffect(() => {
        getBanners();
    }, []);
    return (
        <>
            {content && showForm && <section className="consent-form-section section-padding">
                <div className="container">
                    <div className="text-center"><h4 className="small-head">Need our expert help to</h4><span className="stylish-head mt-0">Make Your Own tour Package</span></div>
                    <div className="row pt-5">
                        <div className="col-md-8">

                            {content.formVideo.featured_img && <img src={process.env.REACT_APP_BASE_IMG_URL + content.formVideo.featured_img} className="full-width" />}
                            {content.formVideo.video_link && <div className="full-width" dangerouslySetInnerHTML={{
                                __html: content.formVideo.video_link,
                            }}></div>}

                        </div>
                        <div className="col-md-4">
                            <form className="black-form form" onSubmit={processSubmit} ref={formRef}>
                                <div className="form-group">
                                    <input type="text" name="location" className="form-control" placeholder="Type Location" onChange={handleInputes} />
                                    {/* <small  class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                </div>
                                <div className="form-group">
                                    <input required min={new Date().toISOString().split('T')[0]} type="date" className="form-control" placeholder="Expected Date" name="date" onChange={handleInputes} />
                                    {/* <small  class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                </div>
                                <div className="form-group">
                                    <input required type="number" className="form-control" placeholder="Person" name="person" onChange={handleInputes} />
                                    {/* <small  class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                </div>
                                <div className="form-group">
                                    <input required type="text" className="form-control" placeholder="Your Name" name="name" onChange={handleInputes} />
                                    {/* <small  class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                </div>
                                <div className="form-group">
                                    <input required type="email" className="form-control" placeholder="Email Id" name="mail" onChange={handleInputes} />
                                    {/* <small  class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                </div>
                                <div className="form-group">
                                    <input required type="number" className="form-control" placeholder="Mobile/Whatsapp Number" name="phone" onChange={handleInputes} />
                                    {/* <small  class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                </div>
                                <button type="submit" className="btn btn-primary submit-butt">Submit</button>
                                {msg && <div class="alert alert-info" role="alert">
                                    {msg}
                            </div>}
                            </form>
                            
                        </div>
                    </div>
                </div>
            </section>}

            {splashBanner && content && <section className="middle-offer section-padding pt-0">
                <div className="container">
                    <a href={content.splashBanner.link}><img src={process.env.REACT_APP_BASE_IMG_URL + content.splashBanner.featured_img} className="full-width" /></a>
                </div>
            </section>}
        </>
    );
}