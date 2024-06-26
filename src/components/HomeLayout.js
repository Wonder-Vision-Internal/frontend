import React from 'react';
import { Outlet, Link } from "react-router-dom";


import FrontFooter from "./FrontFooter";
import HomeHeader from "./HomeHeader";
import TopPage from "../Hooks/TopPage";
import { useEffect } from "react";

const HomeLayout = () => {
    
    TopPage();
    useEffect(()=>{ 
        
    }, []);

    return (
        <div>
            <div id="page">
                <Outlet />
                <FrontFooter />
            </div>
        </div>
    );
}

export default HomeLayout;