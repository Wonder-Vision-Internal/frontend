"use client"
import axios from 'axios';

const headers = {
    'Content-Type': 'multipart/form-data'
};

const OpenApi = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: headers
});


export default OpenApi;