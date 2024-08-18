import axios from 'axios';
import { apiServices, loginApIServices, otpApiServices,postapiservices } from './axios_client';

// This API validates the user credential
export function login(user) {
	return apiServices.post('/Authentication/login', { user });
}

// This API send the OTP
// export function sendOTP(user){
//     return loginApIServices.post("/SendOTP", {user})
// }

export const sendOTP = (panNo, mobileNo) => {
	//return otpApiServices.post(`IPO/sendotp/${panNo}/${mobileNo}`);
	return otpApiServices.post(`IPO/sendotp/`,{
		"PanNo": panNo,
		"MobileNo": mobileNo
		});	
};

// This API validates the user OTP
// export function verifyOTP(user) {
// 	return loginApIServices.post('/VerifyOTP', { user });
// }

export const verifyOTP = (panNo, mobileNo, OTP) => {
	//return otpApiServices.post(`IPO/verifyotp/${panNo}/${mobileNo}/${OTP}`);
	return otpApiServices.post(`IPO/verifyotp/`,{
		"PanNo": panNo,
		"MobileNo": mobileNo,
		"OTP": OTP
		});
};

// Phase 1 Non-IIFL Client Data
export const addAndCheckNonIiflJourneyClientDetail = (data) => {
	return postapiservices.post('/IPO/add-and-check-nonIIfl-journey-clietdetail', data);
};

// IPO Message
// This API allows user to Get Open Issues List
export function getOpenIssuesList(category) {
	return apiServices.post(`/IPO/open-issues/${category}`);
}

// This API allows user to Get IPO Open Issues Details
export function getOpenIssuesDetails(category) {
	return apiServices.post(`/IPO​/open-issues-details​/${category}`);
}

// This API allows user to
// ✓ Place New IPO
// ✓ Modify Existing IPO
// ✓ Cancel Existing IPO
export function placeNewIPO(data) {
	return apiServices.post(`/IPO​/add`, data);
}

// This API allows user to Get  Applied IPO Details
export function getAppliedIPODetails(clientcode, ipid, appno) {
	return apiServices.post(`/IPO​/get-ipo-applied-details​/${clientcode}​/${ipid}​/${appno}`);
}
