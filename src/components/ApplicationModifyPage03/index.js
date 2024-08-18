import s from './ApplicationModifyPage03.module.scss';
import NextImg from '../../assets/images/ApplicationProcess/arrow_back_black_24dp (1).svg';
import { Link,useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loggedIn as userAction } from '../../store/action/loggedIn.action';
import { applicationData as setApplicationData } from '../../store/action/applicationData';

import {  useEffect, useRef, useState } from 'react';
import { placeNewIPO,getBankList,getBankLocationList,upiValidate} from '../../services/issuesServices';
import { addAndCheckNonIiflJourneyClientDetail } from '../../services/userServices';
import { Redirect, useParams } from 'react-router';
import LoaderImg from '../../assets/images/loader.svg';
import SweetAlert from 'react-bootstrap-sweetalert';
import prevarrow from '../../assets/images/ApplicationProcess/prevarrow.svg';

const UPIForm = ({ amount, upiList, upiId, upiCode ,referercode,setalert,upiuser,upivalidate}) => {
	return (
		<div className={s.container}>
			<h2>Enter Payment Details</h2>
			<span>UPI ID</span>
			<div className={s.input}>
				<div className={s.upiselectwrapper}>
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
						<option value="">Select</option>
						{upiList.map((e) => {
							return <option value={e.upiName}>{e.upiName}</option>;
						})}
					</select>

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
	

				<div className={s.refcodebox}>
					<label>Referrer Code (Optional) </label>
					<input
						type="text"
						placeholder="Enter Referer Code"
						value={referercode.state}
						onChange={(e) => {
							referercode.setState(e.target.value);
						}}
					/>
				</div>
				
			</div>
			
			<span className={s.upiinstr}>You will get a notification on your registered UPI App</span>
			<h5>Total Payable Amount</h5>
			<h1>₹{amount}</h1>
			{/* <Link>Have a referral code?</Link> */}
		</div>
	);
};

const ASBAForm = ({ amount, bankName,banklists,BankLocationList, accountNo, location ,bankCode,chequeNo,IPOfundingflag,referercode,fetchlocation,accreqmsg}) => {
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
							value={referercode.state}
							onChange={(e) => {
								referercode.setState(e.target.value);
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
						<select
							value={location.state}
							onChange={(e) => {
								location.setState(e.target.value);
							}}
						>
							{BankLocationList.map((e) => {
								return <option value={e.location}>{e.location}</option>;
							})}
						</select>
					</div>
				</div>
			</div>
			<h5>Total Payable Amount</h5>
			<h1>₹{amount}</h1>
			{/* <Link>Have a referral code?</Link> */}
		</div>
	);
};



const ApplicationModifyPage03 = ({ prevPage, nextPage }) => {
	const dispatch = useDispatch();
	const { issueCode,applicationno } = useParams();
	const history = useHistory();
	const [ loading, setLoading ] = useState(false);
	const applicationData = useSelector((state) => state.applicationData);
	const user = useSelector((state) => state.loggedIn.user);
	const loggedIn = useSelector((state) => state.loggedIn);
	console.log('applicationData',applicationData)
	console.log('user',user)
	const [ upiId, setUpiId ] = useState(applicationData.scheduleData.upiNo.split('@')[0] || '');
	const [ upiCode, setUpiCode ] = useState('@'+applicationData.scheduleData.upiNo.split('@')[1] || '@allbank');
	const [ bankCode, setbankCode ] = useState('');
	const [ bankName, setBankName ] = useState('');
	const [ accountNo, setAccountNo ] = useState('');
	const [ location, setLocation ] = useState('');
	const [ chequeNo, setchequeNo ] = useState('');
	const [ IPOfundingflag, setIPOfundingflag ] = useState('');
	const [ refcode, setRefcode ] = useState('');
	const [ BankList, setBankList ] = useState([]);
	const [ BankLocationList, setBankLocationList ] = useState([]);
	const [ accreqmsg, setAccountValidation ] = useState('');
	const [ referercode, setreferercode ] = useState('');
	const [ alert,setalert ] = useState('');
	const [ upiuser,seupiuser ] = useState({'statusCode':100});
	const [ finalpriceshow,setfinalpriceshow ] = useState(applicationData.Amount);
	const [ isdiscount,setisdiscount ] = useState('N');

	useEffect(() => {
		calculatediscount();
		fetchbanklist();
		upivalidate(upiId,upiCode);
	}, []);


	const calculatediscount = () =>{
		var discprice = 0
		var discountcal = applicationData.categoryList.filter(function(v, i) {
			return (v.categoryCode === applicationData.scheduleData.investortype);
		  })
		  //console.log('dsaasd',v.categoryCode);
		  // console.log('epee',discountcal);
		//   return false
		var flgdiscount = 'N'
		discountcal = discountcal[0]
		if(discountcal.discountApplicable === 'Y')
		{
			flgdiscount ='Y'
			setisdiscount(flgdiscount)
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

			// setfinalpriceshow(parseInt(applicationData.Amount) - parseInt(discprice))
			setfinalpriceshow(((parseInt(applicationData.Amount) - parseInt(discprice)) > 200000 ? parseInt(applicationData.Amount) : (parseInt(applicationData.Amount) - parseInt(discprice))))
		}
	}

	const fetchbanklist = async () => { 
		if(finalpriceshow > 500000){
			
			getBankList(applicationData.IPOBondName).then(response => {
				//console.log('response==>',response)
				
				//console.log('banklist====>',result)
				if(response.data.statusCode == 200 && response.data.isSuccess == true){
					let result = response.data.resultData;
					// console.log(result)
					setBankList(result)
					setbankCode(response.data.resultData[0].rbi_codes)
					setBankName(response.data.resultData[0].bankFName)
					fetchlocation(response.data.resultData[0].rbi_codes)
				}
				
			}).catch(error => {
				console.log(error)
			})
		}
	}
	const fetchlocation = async (bankcode) => { 
		getBankLocationList(applicationData.IPOBondName,bankcode).then(response => {
			
			if(response.data.statusCode == 200 && response.data.isSuccess == true){
				let result = response?.data?.resultData;
			 	setLocation(result[0].location)	
				setBankLocationList(result)
			}
			
		}).catch(error => {
			console.log(error)
		})
	}



	const nextButton = async () => {
		setLoading(true);
		//alert('dsadsa')
		if(finalpriceshow > 500000){ //absb
			setAccountValidation('')
			if(accountNo === '')
			{
				setAccountValidation('Account Number is required.')
				setLoading(false);
				return false;
			}else if(bankName == "" || (bankCode == "" || (bankCode === "0"))){
				setalert("Select bank name.");
				return false;
			}else if(location == ""){
				setalert("Select Location.");
				return false;
			}
		}else{
			if(upiId == ""){
				setalert("Enter UPI ID");
				setLoading(false);
				return false;
			}
		}

		if((finalpriceshow <= 500000) && (upiuser?.resultData?.success !== true))
		{
				setalert('UPI id is not verified')
				setLoading(false);
				return false
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
			
			let applieddata = applicationData?.scheduleData;

			console.log('sdadadasdsadsadasd',applieddata)

			let postvalue = {
				"ipoName": applicationData.IPOBondName,
				"clientcode": applieddata.clientcode,
				"loginId": (user.clientType == 'NONIIFLCLIENT')? user.panNo : user.loginid,
				"noOfShares":applicationData.noOfShares,
				"bidPrice": applicationData.bidPrice,
				"cutOff":applicationData.cutOff,
				"totalBidCount": applicationData.bidPrice.length,
				"chqAmount":finalpriceshow,
				"categoryType": applieddata.category,
				"issueType": "IPO",
				"category":applieddata.investortype,
				"entryType": "C",
				"mkrid":  (user.clientType == 'NONIIFLCLIENT')? user.panNo : user.loginid,
				"subBrokerId": applieddata.subBrokerId,
				"signOffStatus": "",
				"appNo": applieddata.applicationno,
				"BidFlag":"M",
				"formtype": "ONLINE",
				"ipoBankName": finalpriceshow > 500000 ? "ASBA" : "UPI",
				"flgPassBack": "N",
				"flgdiscount": isdiscount,  
				"crmLeadID": "0",
				"pincode": "0",
				"asbaParameter": finalpriceshow > 500000 ? `${bankCode}|${accountNo}|${location}|0|N` : "9999|0|NASBAL|0|N",
				"upiNo": finalpriceshow > 500000? "" : upiId+upiCode,
				"appSource":user?.AppSource ? user?.AppSource : 25,
				"exchangeType": applieddata.exchangeType,
				"masterSrNo":0,
			};
			
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
						//delete req.InvType;
						//delete req.PaymentMode;
						delete req.UPINo;
						delete req.applyfr;
						delete req.beneficiaryId;
						delete req.bidPrice;
						//delete req.categoryList;
						delete req.cattype;
						delete req.cutOff;
						delete req.dpId;
						delete req.fstname;
						delete req.ipodetails;
						delete req.lstname;
						delete req.midname;
						delete req.mobileNo;
						delete req.noOfShares;
						delete req.panNo;
						delete req.selfot;
						delete req.sharePrice;
						delete req.totalbidprice;
						
						dispatch(setApplicationData({ ...req, transcode : res.data.resultData.transcode,finalpriceshow:finalpriceshow}));
						nextPage();
					}
					else
					{ 
						setalert(res.data.message+ ': ' +res.data.resultData.message);
						//history.push("/")
					}
					setLoading(false);
					
				}).catch(error => {
					console.log(error)
					setLoading(false);
				});
			} catch (error) {
				console.log(error);
				setLoading(false);
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
						//delete req.PaymentMode;
						delete req.UPINo;
						delete req.applyfr;
						delete req.beneficiaryId;
						delete req.bidPrice;
						//delete req.categoryList;
						delete req.cattype;
						delete req.cutOff;
						delete req.dpId;
						delete req.fstname;
						delete req.ipodetails;
						delete req.lstname;
						delete req.midname;
						delete req.mobileNo;
						delete req.noOfShares;
						delete req.panNo;
						delete req.selfot;
						delete req.sharePrice;
						delete req.totalbidprice;
						
						dispatch(setApplicationData({ ...req, transcode : res.data.resultData.transcode, finalpriceshow:finalpriceshow}));
						nextPage();
					}
					else
					{
						setalert(res.data.message  +': '+  res.data.resultData.message);
						//history.push("/")
					}
					setLoading(false);
					
					
				}).catch(error => {
					setLoading(false);
					console.log(error)
				});
				
			} catch (error) {
				setLoading(false);
				console.log(error);
			}
		}

		
		
	};

	const hidesweeetalert = () => {
		setalert('')
	}
	const redirectsalert = (path="/") => {
		history.push('/your_applications')
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
					referercode={{ state: referercode, setState: setreferercode }}
					fetchlocation = {fetchlocation}
					accreqmsg = {accreqmsg}
				/>
			) : (
				<UPIForm
					amount={finalpriceshow}
					upiList={applicationData.upiList ? applicationData.upiList : []}
					upiId={{ state: upiId, setState: setUpiId }}
					upiCode={{ state: upiCode, setState: setUpiCode }}
					referercode={{ state: referercode, setState: setreferercode }}
					setalert={setalert}
					upiuser={upiuser}
					upivalidate={upivalidate}
				/>
			)}
			<div className={s.buttons}>
				<button className={s.outline} onClick={prevPage}>
				<img src={prevarrow} alt="Prev" />
					Previous
				</button>

				<button className={s.primary} onClick={nextButton}>
					<span>Next</span>
					<img src={NextImg} alt="Next" />
				</button>
			</div>
		</div>
	);
};

export default ApplicationModifyPage03;
