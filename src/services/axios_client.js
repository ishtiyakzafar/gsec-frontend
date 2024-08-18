import axios from 'axios'
import { getUser } from './loginServices'

//const {envurl} = process.env
//console.log('asdasd',process.env)
if(window.location.hostname === "localhost"){
    API_BASE_URL = process.env.REACT_APP_API_URL_LOCAL
    //API_BASE_URL = "https://oneupuatcb.indiainfoline.com/"
}else{
    API_BASE_URL = process.env.REACT_APP_API_URL
}

export var API_BASE_URL;


export const apiServices = axios.create({
    baseURL: API_BASE_URL
})

export const getServices = axios.create({
    baseURL: API_BASE_URL
})

const tokenConfig = (config) => {
    const user = getUser()
    if(user && user?.token){
        config.headers['Authorization'] = 'Bearer ' + user?.token;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
}

apiServices.interceptors.request.use(tokenConfig, (e) => {
    console.log(e);
    Promise.reject(e)
})

