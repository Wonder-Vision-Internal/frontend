import React,{useState,useEffect} from 'react'
import { useNavigate, useParams,useLocation } from 'react-router-dom'
import {useDispatch} from 'react-redux'
// import axios from 'axios'
import OpenApi from './OpenApi'
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';



const PrivateRoute = ({Component}) => {
// const {Component} = props
const [isLoading, setIsLoading] = useState(true);

const navigate = useNavigate()
const dispatch = useDispatch()
const location = useLocation()
const {slug} = useParams()
const firstName = location.pathname.split('/')[1];
const logout = async()=>{
    
    const token = await localStorage.getItem('userToken')
    // console.log('token',token);
    const formData = new FormData()
    formData.append('token',token)
    console.log('f',firstName);
    console.log('c',slug);
    setIsLoading(true);
    OpenApi.post('/verifytoken',formData)
    .then((response)=>{
        setIsLoading(false);
    })
    .catch((err)=>{
        console.log('e',err);
        if(err.response.status == 403 || err.response.status == 400){
            localStorage.clear()
            if(firstName === 'cart-page'){
              navigate(`/package-details/${slug}`)
            }
            else{
              navigate('/')
            }
            
            setIsLoading(false);
            toast.error(err.response.data.message)
        }else{
          setIsLoading(false);
          toast.error('Internal Error')
        }
    })
}

// useEffect(()=>{
// logout()
// },[])


useEffect(()=>{
  logout()
  const getExpTime = localStorage.getItem('tokenExpTime')
const currentTime = Date.now()
const timeRemaining = getExpTime - currentTime
console.log('t',timeRemaining);
if(timeRemaining>0)
setTimeout(logout, timeRemaining);
},[])
  
  return (
    <>
    {isLoading ? 
        <div style={{ position: 'relative', top: '10%', left: '45%' }}>
        <p style={{ fontSize: 20, color: '#AE0000' }}>Loading...</p>
        <ClipLoader color={'#123abc'} loading={isLoading} size={100} />
      </div> :
    <Component/>}
    </>
  )
 
}

export default PrivateRoute