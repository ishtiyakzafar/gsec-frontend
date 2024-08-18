import { getServices } from "./axios_client"

export function getUser(){
    try{
        let user = JSON.parse(localStorage.getItem('usr'))
        if(user && user.token){
            return user
        }
    }
    catch(err){
        return null
    }

    return null
}


export function adminLogin(data){
    return getServices.post(`/admin/login`, data)
}
