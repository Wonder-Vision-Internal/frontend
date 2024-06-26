import React, { useEffect, useState } from 'react';
import BannerImgSrc from './../../Hooks/BannerImgSrc';
import $ from 'jquery';
import HomeHeader from '../../components/HomeHeader';
import OpenApi from '../../components/OpenApi';
import { Link, useNavigate } from 'react-router-dom';

export default function MobileNav() {
    //const [banners, setBanners] = useState();
    const [input, setInput] = useState({})
    const [name, setName] = useState({ userName: '' })
    const [close, setClose] = useState(false)
    const [logOpen, setLogOpen] = useState(false)

    const [msg, setMsg] = useState({})
    const [error, setError] = useState({})
    const navigate = useNavigate()
    BannerImgSrc([{
        //imgSrc: 'contact.jpg',

    }]);




    useEffect(() => {

        //getBanners();
    }, []);

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }


    const handleLoginSubmit = (e) => {
        e.preventDefault()

        setError({})
        setMsg({})
        console.log('input', input);
        const formData = new FormData()
        formData.append('mail', input.mail == undefined ? '' : input.mail)
        formData.append('password', input.password == undefined ? '' : input.password)
        OpenApi.post('/login', formData).then((res) => {
            console.log('res', res);
            if (res.data.status == 3) {
                setMsg({ type: 'info', message: res.data.message })
                setInput({ mail: '', password: '' })
                localStorage.setItem('userName', res.data.name)
                setTimeout(() => { localStorage.clear() }, 1000 * 1 * 60 * 15)
                setName({ userName: res.data.name })
                // console.log('name', name);
                e.target.reset()
                // const loginModal = new bootstrap.Modal(document.getElementById('exampleModal'));
                // loginModal.hide()
                // document.body.classList.remove('modal-open')
                setClose(true)
            }
            else {
                setMsg({ type: 'danger', message: '*Invalid email and password' })
            }
        }).catch((err) => {
            console.log('err', err);
            if (err.response.status == 422) {
                let arr = err.response.data.errors
                console.log('arr', arr);
                arr.map((x) => {
                    setError((error) => ({ ...error, [x.path]: x.msg }))
                })

            }
            else if (err.response.data.status == -1 || err.response.data.status == 0) {
                setMsg({ type: 'danger', message: '*Invalid email and password' })
                setInput({ mail: '', password: '' })
                e.target.reset()
            }
        })

    }

    const handleRegisterSubmit = (e) => {
        e.preventDefault()
        setError({})
        const formData = new FormData()
        formData.append('mail', input.mail == undefined ? '' : input.mail)
        formData.append('name', input.name == undefined ? '' : input.name)
        formData.append('password', input.password == undefined ? '' : input.password)
        formData.append('confirm_password', input.confirm_password == undefined ? '' : input.confirm_password)

        OpenApi.post('/sign-up', formData).then((res) => {
            console.log('res', res);
            if (res.status == 200) {
                setMsg({ type: 'info', message: res.data.message })
                setInput({ mail: '', name: '', password: '', confirm_password: '' })
                e.target.reset()
            }
        }).catch((err) => {
            if (err.response.status == 422) {
                let arr = err.response.data.errors
                let errorData = {}
                // console.log('arr', arr);
                arr.map((x) => {
                    if (x.path === 'password' || x.path === 'confirm_password') {
                        setInput((prev) => ({ ...prev, password: '', confirm_password: '' }))
                        let password = document.getElementById('password')
                        password.value = ''
                        let confirm_password = document.getElementById('confirm_password')
                        confirm_password.value = ''
                    }
                    if (errorData[x.path] == undefined) {
                        errorData[x.path] = x.msg
                        setError((error) =>
                            ({ ...error, [x.path]: x.msg }))
                    }
                })
                // console.log('error',error);
            }
            if (err.response.status == 400) {
                setMsg({ type: 'danger', message: err.response.data.message })
                setInput({ mail: '', password: '', name: '', confirm_password: '' })
                e.target.reset()
            }
            else if (err.response.status == 500) {
                setMsg({ type: 'danger', message: err.response.data.message })
                setInput({ mail: '', password: '', name: '', confirm_password: '' })
                e.target.reset()
            }

        })

    }

    const handleClick = () => {
        localStorage.clear()
        navigate('/')
        setName({ userName: '' })
    }



    return (

        <div className='mobile-nav'>

            <div className='modal fade' id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Login</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <form className="black-form form px-0" onSubmit={handleLoginSubmit} >

                                <div className="form-group">
                                    <input className="form-control" placeholder="Email Id" name="mail" onChange={handleChange} />
                                    <span style={{ color: 'red' }}>{error.mail && error.mail}</span>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="password" name="password" onChange={handleChange} />
                                    <span style={{ color: 'red' }}>{error.password && error.password}</span>
                                </div>
                                <button type="submit" className="btn btn-primary submit-butt">Submit</button>
                                {msg && msg.type === 'info' ? <div class="alert alert-success" role="alert">{msg.message}</div>
                                    : msg.type === 'danger' ? <div class="alert alert-danger" role="alert">{msg.message}</div> : null}
                            </form>

                        </div>

                    </div>
                </div>
            </div>

            <div className='modal fade' id="exampleModal1" tabIndex={-1} aria-labelledby="exampleModalLabel1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel1">Sign Up</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <form className="black-form form px-0" onSubmit={handleRegisterSubmit}>


                                <div className="form-group">
                                    <input className="form-control" placeholder="Email Id" name="mail" id='mail' onChange={handleChange} />
                                    <span style={{ color: 'red' }}>{error.mail && error.mail}</span>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Name" name="name" onChange={handleChange} />
                                    <span style={{ color: 'red' }}>{error.name && error.name}</span>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="Password" name="password" id='password' onChange={handleChange} />
                                    <span style={{ color: 'red' }}>{error.password && error.password}</span>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="Confirm Password" name="confirm_password" id='confirm_password' onChange={handleChange} />
                                    <span style={{ color: 'red' }}>{error.confirm_password && error.confirm_password}</span>
                                </div>
                                <button type="submit" className="btn btn-primary submit-butt">Submit</button>
                                {msg && msg.type === 'info' ? <div class="alert alert-success" role="alert">{msg.message}</div>
                                    : msg.type === 'danger' ? <div class="alert alert-danger" role="alert">{msg.message}</div> : null}
                            </form>

                        </div>

                    </div>
                </div>
            </div>
            <section className="tour-section pt-5 pb-5" >
                <div className="container">
                    <ul className="navbar-nav ms-auto text-center">
                        <li className="nav-item"><Link className="" to="/">Home </Link></li>
                        <li className="nav-item"><Link className="" to="/about">About </Link></li>
                        <li className="nav-item"><Link className="" to="/tailormade">Tailormade</Link></li>
                        <li className="nav-item"><Link className="" to="/home-stay">Homestays</Link></li>
                        <li className="nav-item has-child"><a className="">Packages</a>
                            <ul className="submenu">
                                <li><Link className="" to="/package/incredible_india">Incredible India</Link></li>
                                <li><Link className="" to="/package/wild_africa">Wild Africa</Link></li>
                                <li><Link className="" to="/package/beautiful_asia">Beautiful Asia</Link></li>
                                <li><Link className="" to="/package/adventure_himalayas">Himalayan Adventure</Link></li>
                                <li><Link className="" to="/package/colorful_festival">Colorful Festival</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item"><Link className="" to="/testimonial"> Testimonials </Link></li>
                        <li className="nav-item"><Link className="" to="/blog"> blogs</Link></li>
                        <li className="nav-item"><Link className="" to="/contact">Contact</Link></li>
                        {name.userName ?
                            <ul class="navbar-nav ml-auto log-pack mobilemenu">
                                {/* <span style={{ color: 'black', fontSize: 18 }}>Welcome {name.userName} 👋</span> */}
                                <li className="has-child-menu">
                                    <a href="javascript:;" >Welcome {name.userName} 👋</a>
                                    <ul className="submenu">
                                        <li > <a href='/my-profile' class="dropdown-item" >My Profile</a></li>
                                        <li > <a href='/my-bookings' class="dropdown-item" >My Bookings</a></li>
                                        <li onClick={handleClick}> <a class="dropdown-item" >Logout</a></li>
                                    </ul>
                                </li>
                            </ul> :
                            <ul class="navbar-nav ml-auto">
                                <li className="nav-item ">
                                    <a data-bs-toggle="modal" data-bs-target="#exampleModal">Sign In</a>
                                </li>
                                <li className="nav-item ">
                                    <a data-bs-toggle="modal" data-bs-target="#exampleModal1">Sign Up</a>
                                </li>
                            </ul>
                        }
                    </ul>


                </div>
            </section>

        </div>

    );
}