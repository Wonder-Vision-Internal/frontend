import Common from "./Common";

export default function DetailsVideoes({ videoes }) {
    console.log({ videoes })
    return (
        <>
            <div className="row detail-video">
                {videoes && videoes.map((item, index) => {


                    return (<div className="col-md-4" style={{display:'none'}}>
                        <h4 className="sub-head-pack mt-0 mb-3">{Common.ucWord(item.title)}</h4>
                        <iframe width="100%" height={315} src={item.video_link} title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />

                    </div>)


                })}
            </div>
        </>
    );
}