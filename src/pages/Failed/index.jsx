import React, { useEffect, useState } from 'react'
import HomeHeader from "../../components/HomeHeader";
import { useParams } from 'react-router-dom';
import OpenApi from '../../components/OpenApi';
import { event } from 'jquery';


const Failed = () => {



  return (
    <div className='cms-page'>
      <HomeHeader />
      <section className="tour-section section-padding mt-5">
        <div className="container">


          <div class="alert alert-danger text-center" role="alert">
            Payment has been Failed!
          </div>
        </div>
      </section>


    </div>
  )
}

export default Failed
