import s from './ApplicationPage03.module.scss';
import NextImg from '../../assets/images/ApplicationProcess/arrow_back_black_24dp (1).svg';
import { Link,useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loggedIn as userAction } from '../../store/action/loggedIn.action';
import { applicationData as setApplicationData } from '../../store/action/applicationData';

import {  useEffect, useRef, useState } from 'react';
import { placeNewIPO,getBankList,getBankLocationList,upiValidate,zohoCreateToken,zohoCreateLead} from '../../services/issuesServices';
import { addAndCheckNonIiflJourneyClientDetail } from '../../services/userServices';
import LoaderImg from '../../assets/images/loader.svg';
import SweetAlert from 'react-bootstrap-sweetalert';
import prevarrow from '../../assets/images/ApplicationProcess/prevarrow.svg';
import { CMS_URL,clevertap_key } from '../../vars/url';
import ClevertapReact from 'clevertap-react';

const UPIForm = ({ amount, upiList, upiId, upiCode, refcode,setalert,upiuser,upivalidate }) => {
	return (
		<div className={s.container}>
			<h2>Enter Payment Details</h2>
			<div className={s.upiinputwrp}>
				<div>
			<span>UPI ID</span>			
			<div className={s.input}>
				<input
					type="text"
					placeholder="Enter UPI ID"
					value={upiId.state}
					onChange={(e) => {
						let lstchar = e.target.value.substr(e.target.value.length - 1)
						if(lstchar === '@')
						{
							setalert('@ Not Allowed')
							return false;
						}
						else
						{
							upiId.setState(e.target.value);
							// upivalidate(e.target.value,upiCode.state)
						}
					}}
					onBlur={(e) => {
						if(e.target.value.includes("@")){
							setalert('@ is not allowed')
							var upisplit = e.target.value.split('@')[0]
							upiId.setState(upisplit);
						}
						upivalidate(e.target.value,upiCode.state)
					}}
					
				/>
				<select
					value={upiCode.state}
					onChange={(e) => {
						upiCode.setState(e.target.value);
						upivalidate(upiId.state,e.target.value)
					}}
				>
					<option value="">Select UPI</option>
					{upiList.map((e) => {
						return <option value={e.upiName}>{e.upiName}</option>;
					})}
				</select>
			</div>
			<div className={s.upiusermsg}>				
				{Object.keys(upiuser).length > 0 &&
					<>
						{upiuser.statusCode === 100 ? <p>Please provide your upi id</p> : (upiuser.statusCode !== 200 ? <p>something went wrong try later</p> : 
							<>
								{upiuser?.resultData?.success === true ?							
									<p className={s.upifetchsuccess}>
										Verified {upiuser.resultData.customer_name} ({upiuser.resultData.vpa})
									</p> 
									:
									<p className={s.upifetchfailed}>
										Not Verified {upiuser.resultData.customer_name} ({upiuser.resultData.vpa})
									</p> 
								}
							</>
						)}
					</>
				}
			</div>
			</div>
				<div className={s.inputContainer}>
					<span>Referrer Code (Optional) </span>
					<div className={s.input}>
						<input
							type="text"
							placeholder="Enter Referrer Code"
							value={refcode.state}
							onChange={(e) => {
								refcode.setState(e.target.value);
							}}
						/>
					</div>
				</div>
			</div>
			<span>You will get a notification on your registered UPI App</span>
			<h5>Total Payable Amount</h5>
			<h1>₹{amount}</h1>
			{/* <Link>Have a referral code?</Link> */}
		</div>
	);
};

const ASBAForm = ({ amount, bankName,banklists,BankLocationList, accountNo, location ,bankCode,chequeNo,IPOfundingflag,refcode,fetchlocation,accreqmsg,chequeno}) => {
	//alert('dadsad')
	//console.log('banklists',banklists)
	return (
		<div className={s.ASBAcontainer}>
			<h2>Enter Payment Details</h2>
			<div className={s.inputs}>
				<div className={s.inputContainer}>
					<span>Bank Name</span>
					
					<div className={s.input}>
						<select
							value={bankCode.state}
							onChange={(e) => {
								bankCode.setState(e.target.value);
								bankName.setState(e.target[e.target.selectedIndex].getAttribute('data-val'));
								fetchlocation(e.target.value)
							}}
						>
							<option>Select Bank</option>
							{banklists.map((e) => {
								return <option value={e.rbi_codes} data-val={e.bankFName}>{e.bankFName}</option>;
							})}
						</select>
					</div>
				</div>				
				<div className={s.inputContainer}>
					<span>Account Number</span>
					<div className={s.input}>
						<input
							type="number"
							placeholder="Enter Account No."
							value={accountNo.state}
							onKeyPress={(ev) => {
								if (ev.which != 8 && ev.which != 0 && ev.which < 48 || ev.which > 57)
								{
									ev.preventDefault();
								}
							}}
							onChange={(e) => {
								accountNo.setState(parseInt(e.target.value));
							}}
						/>
					</div>
					<small style={{color: "red"}}>{accreqmsg}</small>
				</div>
			
				<div className={s.inputContainer}>
					<span>Referrer Code (Optional) </span>
					<div className={s.input}>
						<input
							type="text"
							placeholder="Enter Referrer Code"
							value={refcode.state}
							onChange={(e) => {
								refcode.setState(e.target.value);
							}}
						/>
					</div>
				</div>
				
			</div>
			<h2>Help us find the nearest branch</h2>
			<div className={s.inputs}>
				<div className={s.inputContainer}>
					<span>Your Current Location</span>
					<div className={s.input}>
					<div className={s.input}>						
						<select
							value={location.state}
							onChange={(e) => {
								location.setState(e.target.value);
							}}
						>
							<option>Select Location</option>
							{BankLocationList.map((e) => {
								return <option value={e.location}>{e.location}</option>;
							})}
						</select>
					</div>					
					</div>
				</div>
				<div className={s.inputContainer} style={{display:'none'}}>
					<span>cheque No</span>
					<div className={s.input}>
						<input
							type="number"
							placeholder="Enter Cheque No"
							value={chequeNo.state}
							onKeyPress={(ev) => {
								if (ev.which != 8 && ev.which != 0 && ev.which < 48 || ev.which > 57)
								{
									ev.preventDefault();
								}
							}}
							onChange={(e) => {
								chequeNo.setState(parseInt(e.target.value));
							}}
						/>
					</div>
				</div>
			</div>
			<h5>Total Payable Amount</h5>
			<h1>₹{amount}</h1>
			{/* <Link>Have a referral code?</Link> */}
		</div>
	);
};



const ApplicationPage03 = ({ prevPage, nextPage }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [ loading, setLoading ] = useState(false);
	const applicationData = useSelector((state) => state.applicationData);
	const user = useSelector((state) => state.loggedIn.user);
	const loggedIn = useSelector((state) => state.loggedIn);
	console.log('applicationData',applicationData)
	console.log('user',user)
	const [ upiId, setUpiId ] = useState(user?.upiName ||'');
	const [ upiCode, setUpiCode ] = useState(user?.upiHandle ||'');
	const [ bankCode, setbankCode ] = useState(user?.bankName ||'');
	const [ bankName, setBankName ] = useState(user?.bankName ||'');
	const [ accountNo, setAccountNo ] = useState(user?.bankAccountNo ||'');
	const [ location, setLocation ] = useState(user?.bankBranch ||'');
	const [ chequeNo, setchequeNo ] = useState('');
	const [ IPOfundingflag, setIPOfundingflag ] = useState('');
	const [ refcode, setRefcode ] = useState('');
	const [ BankList, setBankList ] = useState([]);
	const [ BankLocationList, setBankLocationList ] = useState([]);
	const [ accreqmsg, setAccountValidation ] = useState('');
	const [ alert,setalert ] = useState('');
	const [ upiuser,seupiuser ] = useState({'statusCode':100});
	const [ finalpriceshow,setfinalpriceshow ] = useState(applicationData.Amount);
	const [ isdiscount,setisdiscount ] = useState('N');
	
	
	useEffect(() => {
		
		fetchbanklist();
		calculatediscount();
		upivaliditycheck();

		
	}, []);
	const upivaliditycheck = async() =>
	{
		if(user?.upiName)
		{
			let {data} = await upiValidate(user?.upiName+user?.upiHandle)
			seupiuser(data)
		}
		
	}
	const calculatediscount = () =>{
		var discprice = 0
		var discountcal = applicationData.ipodetails.categoryList.filter(function(v, i) {
			return (v.categoryCode === applicationData.InvType);
		  })
		  //console.log('dsaasd',v.categoryCode);
		  // console.log('epee',discountcal);
		//   return false
		var flgdiscount = 'N'
		discountcal = discountcal[0]
		if(discountcal.discountApplicable === 'Y')
		{
			flgdiscount ='Y'
			if(discountcal.discountType === 'P')
			{
				discprice = (applicationData.Amount * discountcal.discountValue)/100
			}
			else if(discountcal.discountType === 'R')
			{
				var max = Math.max(...applicationData.totalbidprice)				
				var index = applicationData.totalbidprice.indexOf(max)
				discprice = applicationData.noOfShares[index]*discountcal.discountValue
			}

			setfinalpriceshow(((parseInt(applicationData.Amount) - parseInt(discprice)) > 200000 ? parseInt(applicationData.Amount) : (parseInt(applicationData.Amount) - parseInt(discprice))))
			setisdiscount(((parseInt(applicationData.Amount) - parseInt(discprice)) > 200000 ? 'N' : 'Y'))
		}
	}
	const fetchbanklist = async () => { 

		//console.log('sdasdasd',applicationData)

		ClevertapReact.initialize(clevertap_key);
		var ClevertapPayload = {
			"Source":"IPO Details Page",
			"IPO Name":applicationData.IPOBondName,
			"Bid Number":'',
			"Investment Amount": finalpriceshow,
			"Investor category":applicationData.cattype+'|'+applicationData.InvType,
			"Applying for":applicationData.selfot,
			"payment type":finalpriceshow > 500000 ? "ASBA" : "UPI",
			"Failure message":""
		}
		//console.log('cpl',ClevertapPayload);		
		ClevertapReact.event("IPO_Application Step 3",ClevertapPayload)


		if(finalpriceshow > 500000){
			
			getBankList(applicationData.IPOBondName).then(response => {
				//console.log('response==>',response)
				
				//console.log('banklist====>',result)
				if(response.data.statusCode == 200 && response.data.isSuccess == true){
					let result = response.data.resultData;
					// console.log(result)
					setBankList(result)
					// setbankCode(user?.bankName || response.data.resultData[0].rbi_codes)
					// setBankName(user?.bankName || response.data.resultData[0].bankFName)
					// fetchlocation(user?.bankBranch ||response.data.resultData[0].rbi_codes)
				}
				
			}).catch(error => {
				console.log(error)
			})

			if(user?.bankName)
			{
				fetchlocation(user?.bankName)
			}
		}
	}
	const fetchlocation = async (bankcode) => { 
		getBankLocationList(applicationData.IPOBondName,bankcode).then(response => {
			
			if(response.data.statusCode == 200 && response.data.isSuccess == true){
				let result = response?.data?.resultData;
			 	//setLocation(result[0].location)	
				setBankLocationList(result)
			}
			
		}).catch(error => {
			console.log(error)
		})
	}



	const nextButton = async () => {
		//console.log('aplll',applicationData)
		
		// var discprice = 0
		// var discountcal = applicationData.ipodetails.categoryList.filter(function(v, i) {
		// 	return (v.categoryCode === applicationData.InvType);
		//   })
		 
		// var flgdiscount = 'N'
		// discountcal = discountcal[0]
		// if(discountcal.discountApplicable === 'Y')
		// {
		// 	flgdiscount ='Y'
		// 	if(discountcal.discountType === 'P')
		// 	{
		// 		discprice = (applicationData.Amount * discountcal.discountValue)/100
		// 	}
		// 	else if(discountcal.discountType === 'R')
		// 	{
		// 		var max = Math.max(...applicationData.totalbidprice)				
		// 		var index = applicationData.totalbidprice.indexOf(max)
		// 		discprice = applicationData.noOfShares[index]*discountcal.discountValue
		// 	}

		// 	if((parseFloat(applicationData.Amount) - parseFloat(discprice)) > 200000)
		// 	{
		// 		flgdiscount ='N'
		// 	}
		// }
		//console.log('discp',discprice)
		//return false
		if(finalpriceshow > 500000){ //absb
			setAccountValidation('')
			if(accountNo === '' || accountNo.length<9)
			{
				setalert('Account Number is not valid.')
				return false;
			}else if(bankName == "" || (bankCode == "" || (bankCode === "0"))){
				setalert("Select bank name.");
				return false;
			}else if(location == ""){
				setalert("Select Location.");
				return false;
			}
			// else if(chequeNo === "" || chequeNo.length != 6)
			// {
			// 	setalert("Cheque Number is not valid");
			// 	return false;
			// }
		}else{
			if(upiId == ""){
				setalert("Enter UPI ID");
				return false;
			}
		}
		
		if((finalpriceshow < 500000) && (upiuser?.resultData?.success !== true))
		{
				setalert('UPI id is not verified')
				return false
		}

		setLoading(true);
		if(user.clientType == "NONIIFLCLIENT" || applicationData.selfot !== "self"){
			//console.log("212",applicationData);
			let {data:addncheck} = await addAndCheckNonIiflJourneyClientDetail({
				"mobileNo": applicationData.mobileNo,
				"email": applicationData.email,
				"panNo": applicationData.panNo,
				"stageFlage": 'Phase1'
			})

			console.log('addncheck',addncheck);
			//return false
			//return false
			if(addncheck.isSuccess == true && addncheck.statusCode == 200)
			{
				var addchkresult = addncheck.resultData

				await addAndCheckNonIiflJourneyClientDetail({
					"panNo": addchkresult.panNo,
					"firstName": applicationData.fstname,
					"middleName": applicationData.midname,
					"surName": applicationData.lstname,
					"mobileNo": applicationData.mobileNo,
					"email": applicationData.email,
					"clientcode": addchkresult.clientcode,
					"dpType": applicationData.applyfr,
					"dpid": applicationData.applyfr === 'NSDL' ? applicationData.dpId : '',
					"beneficiaryID": applicationData.beneficiaryId,
					"bankBranch": applicationData.selfot !== "self" ? addchkresult.bankBranch : location,
					"bankName": applicationData.selfot !== "self" ? addchkresult.bankName : bankCode,
					"bankAccountNo": applicationData.selfot !== "self" ? addchkresult.bankAccountNo : accountNo,
					"investorStatus": "Process",
					"mkrid": "",
					"mkrDt": "",
					"dateOfbith": "",
					"address": "",
					"pincode": "",
					"secondHolderName": applicationData?.dematDetailsapp[0]?.fullName,
					"secondHolderPan":  applicationData?.dematDetailsapp[0]?.pan,
					"thirdHolderName": applicationData?.dematDetailsapp[1]?.fullName,
					"thirdHolderPan": applicationData?.dematDetailsapp[1]?.pan,
					"issuecode": applicationData.IPOBondName,
					"clientType": addchkresult.clientType,
					"leadid": "",
					"stageFlage": "Phase2"

				}).then(response => {
								
					console.log('details',response.data);

					if(response.data.statusCode != 200 && response.data.isSuccess != true)
					{
						setalert(response.data.resultData.message);
						return false
					}	
					
					if(response.data.statusCode == 200 && response.data.isSuccess == true && applicationData.selfot == "self"){
						// let phase1Data = response.data.resultData;
						// let token = user.token;
						// localStorage.setItem('user', JSON.stringify({...phase1Data, token}));
						// //phase1Data.token = token;
						// dispatch(userAction({ ...phase1Data,token }));
						zohoCreateToken().then(resp =>{
							console.log('zoho',resp);
							let createzoholead = zohoCreateLead({
								"Token":resp.data.Body.Token,
								"ObjectName":"Lead",
								"Parameters":{
									"FirstName":applicationData.fstname,
									"LastName": applicationData.lstname, //Dynamic from the field “Name”
									"Mobile": applicationData.mobileNo,  //Dynamic from the field “mobile number”
									"Email": applicationData.email,  //Dynamic from the field “email id”
									"LeadProduct": "Equity", //Fixed
									"Campaign": "IPO", //Fixed
									"LeadSource": "OneUp", //Fixed
									"LeadSubStatusTemp": "Incomplete", //Fixed
									"Appsource":"25"
								}
							})
						})

						
					}


				});
			}
			else
			{
				setalert(addncheck.resultData);
				return false
			}

			
		}
		// return false;
		let details = {
			...applicationData,
			// PaymentMode: applicationData.Amount > 500000 ? 'ASBA' : 'UPI',
			PaymentMode: finalpriceshow > 500000 ? 'ASBA' : 'UPI',
			UPINo: upiId+upiCode,
			BankLoc: location,
			BankCode: bankCode,
			BankName: bankName,
			
		};
		dispatch(setApplicationData(details));

			console.log(upiId+upiCode)

			let myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");
			myHeaders.append("Authorization", 'Basic '+btoa('rzp_live_yfrViLsZvqF3g4:oU68F8CHlY6o2AWV7DWOKPSm') );
			

			let raw = JSON.stringify({
			"vpa": upiId+upiCode
			});

			
			
			
			let postvalue = {
				"ipoName": applicationData.IPOBondName,
				"clientcode": (user.clientType == 'NONIIFLCLIENT')? applicationData.panNo : (applicationData.selfot === "self" ? user.clientcode : applicationData.panNo),
				"loginId":(user.clientType == 'NONIIFLCLIENT')? user.panNo : (applicationData.selfot === "self" ? user.loginid : user.loginid),
				"noOfShares":applicationData.noOfShares,
				"bidPrice": applicationData.bidPrice,
				"cutOff":applicationData.cutOff,
				"totalBidCount": applicationData.bidPrice.length,
				"chqAmount":finalpriceshow,
				"categoryType": finalpriceshow > 200000 ? "HNI" : "RET",
				"issueType": "IPO",
				"category":applicationData.InvType,
				"entryType": "C",
				"mkrid":  (user.clientType == 'NONIIFLCLIENT')? user.panNo : user.loginid,
				"subBrokerId": refcode,
				"signOffStatus": "",
				"appNo": 0,
				"BidFlag":"N",
				"formtype": "ONLINE",
				"ipoBankName": finalpriceshow > 500000 ? "ASBA" : "UPI",
				"flgPassBack": "N",
				"flgdiscount": isdiscount,  
				"crmLeadID": '0',
				"pincode": "0",
				"asbaParameter": finalpriceshow > 500000 ? `${bankCode}|${accountNo}|${location}|0|N` : "9999|0|NASBAL|0|N",
				"upiNo": finalpriceshow > 500000? "" : upiId+upiCode,
				"appSource":user?.AppSource ? user?.AppSource : 25,
				"exchangeType": applicationData.exchangetype,
				"masterSrNo":0,
			};
			
			//console.log("postvalue",postvalue)
			
		if(finalpriceshow > 500000){	
			try {
				let req = {
					...details
				};
		
				placeNewIPO(postvalue).then(res => {
					
					// console.log('response',res,req);
					if(res.data.isSuccess == true && res.data.statusCode == '200'){
	
						delete req.upiList;
						//delete req.Amount;
						delete req.BankCode;
						delete req.BankLoc;
						delete req.BankName;
						// delete req.IPOBondName;
						// delete req.InvType;
						delete req.PaymentMode;
						delete req.UPINo;
						delete req.applyfr;
						delete req.beneficiaryId;
						delete req.bidPrice;
						//delete req.categoryList;
						//delete req.cattype;
						delete req.cutOff;
						delete req.dpId;
						//delete req.fstname;
						delete req.ipodetails;
						//delete req.lstname;
						delete req.midname;
						//delete req.mobileNo;
						delete req.noOfShares;
						delete req.panNo;
						//delete req.selfot;
						delete req.sharePrice;
						delete req.totalbidprice;
						
						dispatch(setApplicationData({ ...req, transcode : res.data.resultData.transcode,finalpriceshow:finalpriceshow}));
						nextPage();
					}
					else
					{
						zohoCreateToken().then(resp =>{
							console.log('zoho',resp);
							let createzoholead = zohoCreateLead({
								"Token":resp.data.Body.Token,
								"ObjectName":"Lead",
								"Parameters":{
									"FirstName":"",
									"LastName": applicationData.lstname, //Dynamic from the field “Name”
									"Mobile": applicationData.mobileNo,  //Dynamic from the field “mobile number”
									"Email": applicationData.email,  //Dynamic from the field “email id”
									"LeadProduct": "Equity", //Fixed
									"Campaign": "IPO", //Fixed
									"LeadSource": "OneUp", //Fixed
									"LeadSubStatusTemp": "Incomplete", //Fixed
									"Appsource":"25"				
								}
							})
						})

						ClevertapReact.initialize(clevertap_key);
						var ClevertapPayload = {
							"Source":"IPO Details Page",
							"IPO Name":applicationData.IPOBondName,
							"Bid Number":'',
							"Investment Amount": finalpriceshow,
							"Investor category":applicationData.cattype+'|'+applicationData.InvType,
							"Applying for":applicationData.selfot,
							"payment type":finalpriceshow > 500000 ? "ASBA" : "UPI",
							"Failure message":res.data.resultData.message
						}
						//console.log('cpl',ClevertapPayload);						
						ClevertapReact.event("IPO_Application Step 3",ClevertapPayload)
						
						setalert(res.data.resultData.message);

					}

					setLoading(false);
					
				}).catch(error => {
					console.log(error)
				});
			} catch (error) {
				console.log(error);
			}
		}else{
			
			// let requestOptions = {
			// 	method: 'POST',
			// 	headers: myHeaders,
			// 	body: raw,
			// 	redirect: 'follow'
			// };
			// console.log(requestOptions)
			// fetch("https://api.razorpay.com/v1/payments/validate/vpa", requestOptions)
			// .then((response) => response.json())
			// .then((result) => {
			// 	console.log('result',result)
			// 	//if(result.success == true){
					
			// 	//}
			// 	if(result.success == true){
			// 		try {
			// 			let req = {
			// 				...details
			// 			};
			// 			placeNewIPO(postvalue).then(res => {
			// 				// console.log('response',res,req);
			// 				if(res.data.isSuccess == true && res.data.statusCode == '200'){
			
			// 					delete req.upiList;
			// 					//delete req.Amount;
			// 					delete req.BankCode;
			// 					delete req.BankLoc;
			// 					delete req.BankName;
			// 					// delete req.IPOBondName;
			// 					//delete req.InvType;
			// 					delete req.PaymentMode;
			// 					delete req.UPINo;
			// 					delete req.applyfr;
			// 					delete req.beneficiaryId;
			// 					delete req.bidPrice;
			// 					//delete req.categoryList;
			// 					delete req.cattype;
			// 					delete req.cutOff;
			// 					delete req.dpId;
			// 					delete req.fstname;
			// 					delete req.ipodetails;
			// 					delete req.lstname;
			// 					delete req.midname;
			// 					delete req.mobileNo;
			// 					delete req.noOfShares;
			// 					delete req.panNo;
			// 					delete req.selfot;
			// 					delete req.sharePrice;
			// 					delete req.totalbidprice;
								
			// 					dispatch(setApplicationData({ ...req, transcode : res.data.resultData.transcode}));
			// 					nextPage();
			// 				}
			// 				else
			// 				{
			// 					setalert(res.data.resultData.message);
			// 				}
			// 				setLoading(false);
							
			// 			}).catch(error => {
			// 				console.log(error)
			// 			});
						
			// 		} catch (error) {
			// 			console.log(error);
			// 		}
			// 	}
			// })
			// .catch(error => console.log('error', error));

			try {
				let req = {
					...details
				};
				
				placeNewIPO(postvalue).then(res => {
					// console.log('response',res,req);
					if(res.data.isSuccess == true && res.data.statusCode == '200'){
	
						delete req.upiList;
						//delete req.Amount;
						delete req.BankCode;
						delete req.BankLoc;
						delete req.BankName;
						// delete req.IPOBondName;
						//delete req.InvType;
						delete req.PaymentMode;
						delete req.UPINo;
						delete req.applyfr;
						delete req.beneficiaryId;
						delete req.bidPrice;
						//delete req.categoryList;
						//delete req.cattype;
						delete req.cutOff;
						delete req.dpId;
						//delete req.fstname;
						delete req.ipodetails;
						//delete req.lstname;
						delete req.midname;
						//delete req.mobileNo;
						delete req.noOfShares;
						delete req.panNo;
						//delete req.selfot;
						delete req.sharePrice;
						delete req.totalbidprice;
						
						dispatch(setApplicationData({ ...req, transcode : res.data.resultData.transcode,finalpriceshow:finalpriceshow}));
						nextPage();
					}
					else
					{
						zohoCreateToken().then(resp =>{
							console.log('zoho',resp);
							let createzoholead = zohoCreateLead({
								"Token":resp.data.Body.Token,
								"ObjectName":"Lead",
								"Parameters":{
									"FirstName":"",
									"LastName": applicationData.lstname, //Dynamic from the field “Name”
									"Mobile": applicationData.mobileNo,  //Dynamic from the field “mobile number”
									"Email": applicationData.email,  //Dynamic from the field “email id”
									"LeadProduct": "Equity", //Fixed
									"Campaign": "IPO", //Fixed 
									"LeadSource": "OneUp", //Fixed 
									"LeadSubStatusTemp": "Incomplete", //Fixed 		
									"Appsource":"25"				
								}
							})
						})

						ClevertapReact.initialize(clevertap_key);
						var ClevertapPayload = {
							"Source":"IPO Details Page",
							"IPO Name":applicationData.IPOBondName,
							"Bid Number":'',
							"Investment Amount": finalpriceshow,
							"Investor category":applicationData.cattype+'|'+applicationData.InvType,
							"Applying for":applicationData.selfot,
							"payment type":finalpriceshow > 500000 ? "ASBA" : "UPI",
							"Failure message":res.data.resultData.message
						}

						//console.log('cpl',ClevertapPayload);
						
						ClevertapReact.event("IPO_Application Step 3",ClevertapPayload)

						setalert(res.data.resultData.message);
						//history.push("/")
					}
					setLoading(false);
					
				}).catch(error => {
					console.log(error)
				});
				
			} catch (error) {
				console.log(error);
			}
		}
		
	};

	const hidesweeetalert = () => {
		setalert('')
	}

	const redirectsalert = (path="/") => {
		history.push('/ipo_details/'+applicationData.IPOBondName)
	}

	const upivalidate = async (upiId,upiCode) => {
		//alert(upiId+upiCode)
		if(upiId.length > 2)
		{
			let {data} = await upiValidate(upiId+upiCode)
			seupiuser(data)
			//console.log('upiresult',data)
		}
	}

	return (
		<div className={s.main}>

		{alert != '' &&
				<SweetAlert
				custom
				showCancel
				showCloseButton
				error
				title="Alert!"
				cancelBtnText="Back to home"
				cancelBtnBsStyle="light"
				onConfirm={hidesweeetalert}
				onCancel={redirectsalert}
				>
				{alert}
				</SweetAlert>
			}
			
			{loading == true && 
                        <div className="loading_screen loading_inside">
                            <img src={LoaderImg} alt="loading..." />                            
                        </div>
                    }
			{finalpriceshow > 500000 ? (
				<ASBAForm
					amount={finalpriceshow}
					bankName={{ state: bankName, setState: setBankName }}
					banklists={BankList}
					BankLocationList = {BankLocationList}
					accountNo={{ state: accountNo, setState: setAccountNo }}
					location={{ state: location, setState: setLocation }}
					bankCode={{ state: bankCode, setState: setbankCode }}
					chequeNo={{ state: chequeNo, setState: setchequeNo }}
					IPOfundingflag={{ state: IPOfundingflag, setState: setIPOfundingflag }}
					refcode = {{state: refcode, setState: setRefcode}}
					fetchlocation = {fetchlocation}
					accreqmsg = {accreqmsg}
				/>
			) : (
				<UPIForm
					amount={finalpriceshow}
					upiList={applicationData.upiList ? applicationData.upiList : []}
					upiId={{ state: upiId, setState: setUpiId }}
					upiCode={{ state: upiCode, setState: setUpiCode }}
					refcode = {{state: refcode, setState: setRefcode}}
					setalert={setalert}
					upiuser={upiuser}
					upivalidate={upivalidate}
				/>
			)}

			<div className={s.buttons}>
				<button className={s.outline + " hover-animate"} onClick={prevPage}>
				<img src={prevarrow} alt="Prev" />
					Previous
				</button>

				<button className={s.primary + " hover-animate"} onClick={nextButton}>
					<span>Next</span>
					<img src={NextImg} alt="Next" />
				</button>
			</div>
		</div>
	);
};

export default ApplicationPage03;
