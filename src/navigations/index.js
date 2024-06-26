import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from './../components/HomeLayout';
import About from "../pages/About";
import HomeStay from './../pages/HomeStay/index';
import Package from "../pages/Package";
import Tailormaid from "../pages/Tailormaid";
import Testimonial from "../pages/Testimonial";
import Blog from "../pages/Blog";
import Contact from "../pages/Contact";
import PackageDetails from "../pages/PackageDetails";
import Home from "../pages/Home";
import HomeStayDetails from "../pages/HomeStayDetails";
import BlogDetails from "../pages/BlogDetails/index";
import React  from 'react';
import Terms from "../pages/Terms";
import CancellationRefund from "../pages/CancellationRefund";
import Privacy from "../pages/Privacy";
import Disclaimer from "../pages/Disclaimer";
import MobileNav from "../pages/MobileNav";
import CartPage from "../pages/Cart/CartPage";
import MyProfile from "../pages/MyProfile";
import MyBookings from "../pages/Bookings";
import PrivateRoute from "../components/PrivateRoute";
import Success from "../pages/Success";
import Failed from "../pages/Failed";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Navigations() {
    return (
        <BrowserRouter>
        <ToastContainer />
            <Routes>
                {/* Open routes */}
                <Route path="/" element={<HomeLayout />}>
                    <Route index element={<Home />} />
                </Route>
                <Route element={<HomeLayout />}>
                    <Route path="/payment-success" element={<Success />} />
                    <Route path="/payment-failed" element={<Failed />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/home-stay" element={<HomeStay />} />
                    <Route path="/package/:category" element={<Package />} />
                    <Route path="/tailormade" element={<Tailormaid />} />
                    <Route path="/package-details" element={<PackageDetails />} />
                    <Route path="/testimonial" element={<Testimonial />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/home-stay-details/:slug" element={<HomeStayDetails />} />
                    <Route path="/package-details/:slug" element={<PackageDetails />} />
                    <Route path="/blog-details/:slug" element={<BlogDetails />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/disclamier" element={<Disclaimer />} />
                    <Route path="/cancellation-and-refund-policy" element={<CancellationRefund />} />
                    <Route path="/mobilenav" element={<MobileNav />} />
                    {/* <Route path="/cart-page/:type/:slug" element={<CartPage />} /> */}
                    
                    <Route path="/cart-page/:slug" element={<PrivateRoute Component={CartPage} />} />
                    <Route path="/my-profile" element={<MyProfile />} />
                    <Route path="/my-bookings" element={<PrivateRoute Component={MyBookings} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}