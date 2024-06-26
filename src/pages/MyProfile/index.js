import React from "react";
import { useForm } from "react-hook-form";
import HomeHeader from "../../components/HomeHeader";
import OpenApi from "../../components/OpenApi";
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  let mail = localStorage.getItem("mail");
  let name = localStorage.getItem("userName");
  let token = localStorage.getItem('userToken')
  let navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleError = (errors) => {};

  const profileOptions = {
    password1: {
      required: {
        value: true,
        message: "*Please Enter Password",
      },
      minLength: {
        value: 6,
        message: "*Password must be at least 6 characters long",
      },
    },
    password2: {
      required: {
        value: true,
        message: "*Please Re-enter Password",
      },
      validate: (value, values) => {
        if (value !== values.password1) {
          return "*Passwords Do Not match";
        }
        return true; // Validation passed
      }
    }
  };

  const handleForm = async (data, e) => {
    try{
      e.preventDefault();
      const formData = new FormData();
      formData.append('mail',mail)
      formData.append("password", data.password1);
      formData.append('token',token)
      const response = await OpenApi.post('/update-user-profile',formData);
      console.log("update", response);
  
      if (response.status == 200) {
        toast.success(response.data.message)
      }
    }
    catch(error){
      if(error.response.status == 400 || error.response.status == 403){
        navigate('/')
        localStorage.clear()
      }
      toast.error(error.response.data.message)
    }
  
  };

  return (
    <div className="cms-page">
      <HomeHeader />
      <section className="tour-section section-padding mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="card padding30 rounded-5">
                <div className="profile_avatar text-center">
                  <div className="profile_img">
                    <img src="../img/client1.jpg" alt />
                  </div>
                  <div className="profile_name">
                    <h4>
                      {name && name}
                      <span className="profile_username text-gray">
                        {mail && mail}
                      </span>
                    </h4>
                  </div>
                </div>
                <div className="spacer-20" />
                <ul className="menu-col">
                  <li>
                    <a href="/my-profile" className="active">
                      <i className="fa fa-user" />
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a href="/my-bookings">
                      <i className="fa fa-calendar" />
                      My Bookings
                    </a>
                  </li>

                  <li>
                    <a href="" onClick={()=>{localStorage.clear();toast.success("Logged out");navigate('/')}}>
                      <i className="fas fa-sign-out-alt" />
                      Sign Out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(handleForm, handleError)}
              className="col-md-9"
            >
              <div className="card padding30 rounded-5">
                <div className="row">
                  <div className="col-lg-6">
                    <h5>Name</h5>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="form-control mb-3"
                      placeholder="Enter username"
                      value={name}
                      disabled
                    />
                  </div>
                  <div className="col-lg-6">
                    <h5>Email Address</h5>
                    <input
                      type="text"
                      name="email_address"
                      className="form-control mb-3"
                      placeholder="Enter email"
                      value={mail}
                      disabled
                    />
                  </div>
                  <div className="col-lg-6">
                    <h5>New Password</h5>
                    <input
                      type="Password"
                      name="user_password"
                      id="user_password"
                      className="form-control mb-3"
                      placeholder="********"
                      {...register("password1", profileOptions.password1)}
                    />
                    <p className='error' style={{color:'red'}}>{errors.password1?.message}</p>
                  </div>
                  <div className="col-lg-6">
                    <h5>Re-enter Password</h5>
                    <input
                      type="Password"
                      name="user_password_re-enter"
                      id="user_password_re-enter"
                      className="form-control mb-3"
                      placeholder="********"
                      {...register("password2", profileOptions.password2)}
                      />
                      <p className='error' style={{color:'red'}}>{errors.password2?.message}</p>
                  </div>
                  <div className="col-lg-6">
                    <button type="submit" className="submit-butt">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyProfile;
