import { Link } from "react-router-dom";
import Common from "./Common";

export default function RecentPosts({blogDate, content}) {
    return (
        <div className="col-md-3  mt-5" >
            <h4>Recent Posts</h4>
            <ul className="heading-display">
                {content && content.map((item, index) => {
                    return (
                        <li><Link to={`/blog-details/${item.slug}`}>{Common.limitWords(item.small_text, 9)}</Link></li>
                    )
                })}
            </ul>
            {/* <div className="archive-box mt-5">
                <h4>ARCHIVES</h4>
                <ul className="heading-display">
                    {blogDate && blogDate.map((item) => {
                        return (
                            <li>
                                <Link to="/">
                                    <span className="circle-arrow">
                                    <i className="fas fa-arrow-right" /></span> {item}</Link></li>
                        )
                    })}
                </ul>
            </div> */}
        </div>
    );
}