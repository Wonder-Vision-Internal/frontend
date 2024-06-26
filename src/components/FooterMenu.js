import { Link } from "react-router-dom";

export default function FooterMenu() {
    return (
        <ul className="link-foot">
            <li><Link to="/about">About</Link></li>
            <li><a href="/tailormade">Tailormade</a></li>
            <li><Link to="/home-stay">Homestays</Link></li>
            <li><Link to="/package/incredible_india">Packages</Link></li>
            <li><Link to="/testimonial">Testimonials</Link></li>
            <li><Link to="/blog">Blogs</Link></li>
            <li><Link to="/contact">Contact</Link></li>
        </ul>
    );
}
