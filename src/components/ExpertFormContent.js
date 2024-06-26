import { useEffect, useRef } from "react";
import OpenApi from "./OpenApi";
import { useState } from "react";

export default function ExpertFormContent({ id }) {
    const [expertFormContent, setExpertFormContent] = useState();
    const [smiley, setSmiley] = useState();
    const [inputes, setInputes] = useState();
    const [msg, setMsg] = useState();
    const formRef = useRef(null);

    const getExpertFormContent = async (post_id) => {
        try {
            let datas = await OpenApi.get("get-expertform-content/" + post_id);
            console.log("arka===", datas.data.expertContent)
            setExpertFormContent(datas.data.expertContent);

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
        getExpertFormContent(id);
    }, []);
    return (
        <div className="container">
            <div className="row align-items-center justify-content-center">

                <div className="col-md-4 home-stay-form-holder">
                    <form ref={formRef} className="black-form form" onSubmit={processSubmit}>
                        <div className="form-group">
                            <input type="text" name="location" className="form-control" placeholder="Type Location" onChange={handleInputes} />
                            {/* <small  class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                        <div className="form-group">
                            <input required type="date" min={new Date().toISOString().split('T')[0]} className="form-control" placeholder="Expected Date" name="date" onChange={handleInputes} />
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
                        <button type="submit" className="btn btn-primary submit-butt mt-0">Submit</button>
                        {msg && <div class="alert alert-info" role="alert">
                                    {msg}
                            </div>}
                    </form>
                </div>
                {expertFormContent && <div className="col-md-5 acheivement-box">

                    {expertFormContent.paragraph && JSON.parse(expertFormContent.paragraph).map((item, index) => {
                        return (
                            <div className="d-flex achivements align-items-center mb-3" key={index}>
                                <img src={process.env.REACT_APP_BASE_IMG_URL + item.img} width={80} />
                                <div className="description-acivement" dangerouslySetInnerHTML={{
                                    __html: item.text,
                                }}>

                                </div>
                            </div>
                        )
                    })}


                    <h2 className="total-rate">{expertFormContent.score}

                        <span>

                            {
                                [1, 2, 3, 4, 5].map((item) => {
                                    return (
                                        <i key={item} className={(item <= Math.round(expertFormContent.score) ? "fa fa-star active" : "fa fa-star")} />
                                    )
                                })
                            }

                        </span></h2>
                    <p className="mb-0">{expertFormContent.text} </p>
                </div>}
            </div>
        </div>
    );
}