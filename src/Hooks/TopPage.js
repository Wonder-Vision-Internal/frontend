import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { useLocation } from 'react-router-dom';


const TopPage = () => {
    let location = useLocation();
    useEffect(()=>{
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location.pathname]);
}

export default TopPage; 