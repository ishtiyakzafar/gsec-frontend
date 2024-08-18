export function getOSInfo(){
    let osName = null
    let systemName = (navigator.platform).toLowerCase()
    if(systemName.includes("win")){
        osName = "Windows"
    }
    else if(systemName.includes("mac")){
        osName = "Mac"
    }
    else if(systemName.includes("linux")){
        osName = "Linux"
    }
    else if(systemName.includes("android")){
        osName = "Android"
    }

    return osName
}