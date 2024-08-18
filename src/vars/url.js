let host = window.location.hostname
let path = ''
let clevertap = '96K-4KW-9K6Z'
if(host === 'localhost')
{
    //path = "http://localhost:3005"
    path = process.env.REACT_APP_API_URL_LOCAL
    clevertap = process.env.REACT_APP_CLEVERTAP_LOCAL
    

}
// else if(host === 'oneupuat')
// {
//     //path = "https://oneupcb.indiainfoline.com"
//     path = "https://oneupuatcb.indiainfoline.com"
// }
else
{
    path = process.env.REACT_APP_API_URL
    clevertap = process.env.REACT_APP_CLEVERTAP
    //clevertap = "86K-4KW-9K6Z"
}

export const CMS_URL = process.env.REACT_APP_MEDIA_PATH;
export const CMS_API_URL = path;
export const clevertap_key = clevertap;
