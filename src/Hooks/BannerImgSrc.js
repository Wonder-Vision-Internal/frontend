import { useDispatch } from 'react-redux';
import { assignBannerImgSrc } from '../store/bannerImgSrcSlice';


const BannerImgSrc = (src) => {
    const dispatch = useDispatch();
    dispatch(assignBannerImgSrc(src)); //
    // useEffect(()=>{
    //     dispatch(assignBannerImgSrc(src)); //to change the banner image putting the img url
    // },[src]);

}

export default BannerImgSrc;