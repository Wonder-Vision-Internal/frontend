
export default function  Banners (props) {
    return (
      <div className=" owl-carousel owl-theme main-carousel back-carousel ">

        {banners && banners.map((item, index) => {
          return (
            <div className="slide-item" key={index}>
              <img src={process.env.REACT_APP_BASE_UPIMG_URL + item.img} alt={item.img} />
              <div className="slide-text">
                <span className="stylish-head">{item.text1}</span>
                <h2>{item.text2}</h2>
              </div>
            </div>
          );
        })}
      </div>
    )
  }