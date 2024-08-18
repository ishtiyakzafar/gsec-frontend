export function getUser(){
    try{
        let user = JSON.parse(localStorage.getItem('user'))
        if(user && user.token){
            return user
        }
    }
    catch(err){
        return null
    }

    return null
}