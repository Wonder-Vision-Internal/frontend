import Common from "./Common";
import { useState } from "react";


export default function Stories({ stories, name }) {
    const [readMoreStates, setReadMoreStates] = useState(Array(stories.length).fill(false));

const handleRead = (index) => {
    const newReadMoreStates = [...readMoreStates];
    newReadMoreStates[index] = !newReadMoreStates[index];
    setReadMoreStates(newReadMoreStates);
}

    return (
        <section className="consent-form-section section-padding pt-0">
            {stories && stories.length>0 && <div className="container">
                <div className="text-center">
                    <h5 className="small-head">stories of</h5>
                    <span className="stylish-head mt-0 mb-5">{name}</span>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="owl-carousel owl-theme story-scroll">
                        {console.log({stories})}
                       
                             {stories && stories.map((item, index) => {
                                return (
                                    <div className="item" key={index} >
                                        <div className="d-flex quotation">
                                            {!item.user_img && <img src="/img/feedback.png" width={35} />}
                                            {item.user_img && <img src={process.env.REACT_APP_BASE_IMG_URL + item.user_img} width={35} />}
                                            <div className="main-quote">
                                                {!readMoreStates[index] ? 
                                                <><span>{Common.limitWords(item.content, 30)}</span><span onClick={()=>handleRead(index)}><b>Read More</b></span></>
                                                : <><span>{Common.expandWords(item.content)}</span><span onClick={()=>handleRead(index)}><b>Read Less</b></span></>}
                                                
                                                <h5 className="small-head mt-2">{Common.ucWord(item.author)}</h5>
                                                <h6>{Common.ucWord(item.address)}</h6>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>}
        </section>
    );
}