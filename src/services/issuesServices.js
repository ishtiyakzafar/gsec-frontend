import { apiServices, getServices} from './axios_client'


// IPO Message
// This API allows user to Get Open Issues List 
export function createIssue(data){
    return apiServices.post(`/issue/create`, data)
}
export function createBanner(data){
    return apiServices.post(`/banner/create`, data)
}
export function getPaginatedIssues(numOfItems, pageNum){
    return apiServices.get(`/issue/paginated/?numOfItems=${numOfItems}&pageNum=${pageNum}`)
}
export function getPaginatedBanners(numOfItems, pageNum){
    return apiServices.get(`/banner/paginated/?numOfItems=${numOfItems}&pageNum=${pageNum}`)
}
export function deleteIssue(id){
    return apiServices.get(`/issue/delete/${id}`)
}
export function getIssueById(id){
    return apiServices.get(`/issue/detail/${id}`)
}
export function updateIssue(id, data){
    return apiServices.put(`/issue/update/${id}`, data)
}





