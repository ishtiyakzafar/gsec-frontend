/* eslint-disable no-lone-blocks */
import { useState, useEffect } from 'react';
import ApplicationCard from '../ApplicationCard';
import s from './YourApplications.module.scss';
import ZomatoImg from '../../assets/images/ApplicationCard/Group 13768@3x.png';
import AdityaImg from '../../assets/images/ApplicationCard/Aditya.png';
import LoaderImg from '../../assets/images/loader.svg';
import { getIssueDetailsFromCmsByCode, getOpenIssuesDetails,getAppliedIPODetails,getAllCardDetails,getOpenIssuesList,getAppliedIPOList,getAppliedConfirmationSteps,getpdfFromCmsByCode,validthirdpartycheck} from '../../services/issuesServices';
import { getDateTypeForIPOSchedule, getFormattedDateApplicationHistory } from '../../helpers/getFormattedDateTime';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useHistory  } from 'react-router-dom';
import { applicationData as setApplicationData } from '../../store/action/applicationData';
import NoImg from '../../assets/images/noimg.jpg';
import Noapplied from '../../assets/images/noaplied.svg';
import { loggedIn as userAction } from '../../store/action/loggedIn.action';
import { CMS_URL,clevertap_key } from '../../vars/url';
import ClevertapReact from 'clevertap-react';

const YourApplication = () => {
	const history = useHistory();
	const [ cards, setCards ] = useState([]);
	const [ loading, setLoading ] = useState(true);
	const [cmsData, setcmsData] = useState({});
	const [cmsStack, setcmsStack] = useState('');
	const [ alloppor, setalloppor ] = useState(JSON.parse(localStorage.getItem('alloppor')) || []);
	const dispatch = useDispatch();
	// const applicationData = useSelector((state) => state.applicationData);
	const user = useSelector((state) => state.loggedIn.user);
	//console.log('user',user)

	function formatDateString(datastring)
	{
		var mdate = datastring.split(' ')[0];
		var fnldt = mdate.split('-')[1]+'/'+mdate.split('-')[2]+'/'+mdate.split('-')[0]+' 00:00:00 AM';
		//console.log('sdlt',fnldt);
		return String(fnldt);
	}

	const fetchDetails = async () => {
		ClevertapReact.initialize(clevertap_key);		   
		ClevertapReact.event("IPO_Bid Review Page Viewed",{
			"Source":"Order HistoryPage",})

		try {
			let newCards = [];
			let clientcode = (user.clientType == 'NONIIFLCLIENT')? user.panNo : user.clientcode;
			
			let myarrcms = [];
			let cmsexist = [];
			let {data: details}= await getAppliedIPOList(clientcode,'');

			if (typeof details.resultData === 'string') {
				setLoading(false)
				return false;
			}

			
			//console.log('ampa',unique)	
			
			if(details.statusCode == 200 && details.isSuccess == true){
				let unique = [...new Set(details.resultData.map(item => item.iponame))]
				//console.log('historylist',details.resultData)
				let appliedipo = details.resultData.filter(function(v, i) {
					return (v.instrumentType == "IPO" || v.instrumentType == "SGB" || v.instrumentType == "NCD");
				})

				let cmsarr = []
				try {
					for (let i = 0; i < unique.length; i++) {
						var cmp = await getIssueDetailsFromCmsByCode(unique[i]);
						cmsarr.push(cmp.data.result)
					}
				} catch (error) {
					//alert(error)
				}
				
					
			

				
				

				// console.log('appliedipo=>',appliedipo)
				// let sortcards = appliedipo.sort((a, b) =>  new Date(...a.closeDate).getTime() - new Date(...b.closeDate).getTime());

				// console.log('sortcarss=>',sortcards)

				if(appliedipo.length < 1)
				{
					setLoading(false);
				}

				appliedipo.map((e) => {

					//alert(e.iponame)
					
					if(e.instrumentType === 'IPO' || e.instrumentType == "NCD")
					{
						//getAppliedIPODetails(clientcode,e.iponame,e.applicationno,e.srno,e.instrumentType).then(response => {
							// console.log('details',response.data);

							//if(response.data.statusCode == 200 && response.data.isSuccess == true){
								//let scheduleData = response.data.resultData;
								
								//console.log('preppp',myarrcms);
								if(cmsarr)
								{
									cmsexist = cmsarr.filter(function(v, i) {
											return (v.issuecode === e.iponame);
										})
									//console.log('hola ipo',cmsexist)
								}
									
								//getIssueDetailsFromCmsByCode(e.iponame).then(res => {
									
									let cmsData ={};
									if(cmsexist){
										cmsData = cmsexist[0];
										
									}
									else{
										cmsData = {};
									}

									var bidcats = []
									// bidcats = e?.investorCategory.filter(function(v, i) {
									// 	return (v.categoryName == "RETAIL" && (v.nsE_Code == "SHA" || v.nsE_Code == "IND" || v.nsE_Code == "POL" ));
									// })
									

									//getAppliedConfirmationSteps(clientcode,e.iponame,e).then(confdata =>{
									
									let confstatus = []
									confstatus[0] = {'status':e.status,'nextSteps':e.nextSteps}
									
									// if(confdata.data.statusCode == 200 && confdata.data.isSuccess == true)
									// {
									// 	confstatus = confdata.data.resultData								
									// 	confstatus = confstatus.reverse()
									// }
									// let curstatus = confstatus.filter(function(v, i) {
									// 	return (v.applicatioNo === "62520008");
									//   })
									// console.log('confstatusx=>',confstatus)
									//console.log('scheduleData',scheduleData)

									//getOpenIssuesDetails(e.iponame).then(issueres => {
										//console.log(issueres);
										//if(issueres.data.statusCode == 200 && issueres.data.isSuccess == true){
											//let issueresponse = issueres.data.resultData;

											let dates = {
												offerStart: e?.offerStartDate !='' ? formatDateString(e?.offerStartDate) : '01/01/1990 00:00:00 AM',
												offerEnd: e?.offerEndDate !='' && formatDateString(e?.offerEndDate),
												allotmentFinalization: e?.allotmentFinalizationDate !='' && formatDateString(e?.allotmentFinalizationDate),
												refundInitiation: e?.refundInitiationDate !='' && formatDateString(e?.refundInitiationDate),
												dematTransfer: e?.dematTransferDate !='' && formatDateString(e?.dematTransferDate),
												listing: e?.listingDate !='' && formatDateString(e?.listingDate)
											};
			
											let dateTypes = getDateTypeForIPOSchedule(Object.values(dates));
											//console.log('dateTypes',dateTypes)
											const bidPrice = [];
											//alert(e.bids.length)
											for (let i = 0; i < e.bids.length; i++) {
												
												//bidPrice.push((i==1)? scheduleData.bidprice1:((i==2)? scheduleData.bidprice2 : scheduleData.bidprice3))
												bidPrice.push(e.bids[i].bidPrice)
											}

										var catcount = 0
										var snglitm = alloppor.filter(function(v, i) {
											return (v.issuecode == e.iponame);
											})
										if(snglitm[0])
										{
											catcount = (snglitm[0].categoryList).length
										}
										
										 getpdfFromCmsByCode({
												"sampleRes1": {
													"applicationNo": e.srno,
													"issuecode": e.iponame
												},
												"sampleResponse2": {
													"resultData": {            
														"panNo": clientcode
													}
												}
											}).then((pdffile) => {
											// console.log('pdfdata',pdffile)
												newCards.push({
													img: cmsData?.logo,
													fullcmsdata: cmsData,
													srno: e?.srno,
													pdffile:pdffile?.data?.data?.file,
													issue_name: e?.schemeName,
													title: e.iponame,
													applicationNo: e.applicationno,
													closeDate: e.closeDate,
													openDate:e?.openDate,
													amountpaid: e.amountpaid,
													investment: `₹${e.amountpaid} for ${e.bids.length} Bids`,
													highestBid: `₹${Math.max(...bidPrice)} (Cut Off Price)`,
													warning: e.status,
													confstatus: confstatus,
													paymentMode: e.paymentMode,
													investmentAs: e.nsE_CodeDetails,
													bidcats: bidcats,
													catcount:catcount,
													schedule: [
														{
															status: dateTypes[0],
															name: 'Offer Start',
															date: String(dates.offerStart)
															//date:''
														},
														{
															status: dateTypes[1],
															name: 'Offer End',
															date: String(dates.offerEnd)
															//date:''
														},
														{
															status: dateTypes[2],
															name: 'Allotment Finalization',
															date: String(dates.allotmentFinalization)
															//date:''
														},
														{
															status: dateTypes[3],
															name: 'Refund Initiation',
															date: String(dates.refundInitiation)
															//date:''
														},
														{
															status: dateTypes[4],
															name: 'Demat Transfer',
															date: String(dates.dematTransfer)
															//date:''
														},
														{
															status: dateTypes[5],
															name: 'Listing',
															date: String(dates.listing)
															//date:''
														}

													],
													instrumentType:e.instrumentType,
													scheduleData: e,
													issuetype:e.instrumentType,
													srno:e.srno,
												});
												setCards([ ...newCards ]);
												setLoading(false);
										//}
										});	
									//});
									
								//});
						
							//}
						//});
					}
					else if(e.instrumentType === 'SGB')
					{
						newCards.push({
							img: cmsData?.logo,
							pdffile:'',
							issue_name: 'Sovereign Gold Bond',
							title: 'Sovereign Gold Bond',
							applicationNo: e?.applicationno,
							openDate: e?.openDate,
							closeDate: e?.closeDate,
							amountpaid: e?.amountpaid,
							investment: e?.amountpaid,
							highestBid: e?.amountpaid,
							warning: e.status,
							confstatus: [{status:e.status}],
							paymentMode: e.paymentMode,
							investmentAs: e.nsE_CodeDetails,
							bidcats: [],
							schedule: [],
							scheduleData: e,
							instrumentType:e.instrumentType,
							srno:e.srno,
							issuetype:e.instrumentType,
						});
						setCards([ ...newCards ]);
						setLoading(false);
					}
					
					
					
				})
				//console.log('hokaobj',yourObject)
				// let sortcards2 = newCards.sort((a, b) =>  new Date(...a.closeDate).getTime() - new Date(...b.closeDate).getTime());
				// console.log('apddttaa=>',sortcards2);
				// setCards([...sortcards2]);
				//setLoading(false);
			}
			else
			{
				setLoading(false);
			}
			

			
			// // loop start
			// {
			// 	//let datax = await getAppliedIPODetails();
			// 	// this data will be fetched from API no. 5
			// 	let data = {
			// 		srno: 426914,
			// 		iponame: 'JDIAL',
			// 		category: 'RET',
			// 		applicationno: 80031775,
			// 		clientcode: 'TIWARI82',
			// 		investortype: 'IND',
			// 		biddate: '2021-08-05T13:39:35.833',
			// 		status: 'processing',
			// 		totalbidcount: 2,
			// 		rdoformtype: 'Onlin',
			// 		ipobankname: 'BHOPAL',
			// 		bankrefid: '0',
			// 		transcode: 'INDB4269141',
			// 		transstatus: ' ',
			// 		amountpaid: 30000,
			// 		chequeno: '0',
			// 		cm_name:
			// 			'Devendra Tiwari                                                                                     ',
			// 		cm_panno: 'AENPT1332H',
			// 		da_dpid: 'IN302269',
			// 		da_actno: '12128940',
			// 		subBrokerId: '',
			// 		asbaBankCode: '9999',
			// 		accountNumber: '0',
			// 		bankLocation: 'NASBAL',
			// 		cm_mobile: '7042788868',
			// 		passBack: 'N',
			// 		discountflg: 'N',
			// 		crmLeadID: '',
			// 		pincode: '0',
			// 		upiNo: 'ram.pal2587@UPI',
			// 		nsE_CodeDetails: 'INDIVIDUAL',
			// 		schemeName: 'JUST DIAL LIMITED',
			// 		noofshares1: 19,
			// 		bidprice1: 755,
			// 		cutoff1: 'Y',
			// 		noofshares2: 0,
			// 		bidprice2: 0,
			// 		cutoff2: 'N',
			// 		noofshares3: 0,
			// 		bidprice3: 0,
			// 		cutoff3: '',
			// 		lowprice: '750',
			// 		highprice: '755',
			// 		lotsize: '19',
			// 		investorCategory: [
			// 			{
			// 				nsE_Code: 'IND',
			// 				nsE_CodeDetails: 'INDIVIDUAL'
			// 			}
			// 		]
			// 	};

			// 	let { data: { result: cmsData } } = await getIssueDetailsFromCmsByCode(data.iponame);

			// 	// let {data: {resultData: scheduleData}} = await getOpenIssuesDetails(data.iponame);
			// 	let scheduleData = {
			// 		ipid: 233,
			// 		issuecode: 'JDIAL',
			// 		schname: 'JUST DIAL LIMITED',
			// 		opndt: '2021-08-01T00:00:00',
			// 		clsdt: '2022-07-31T00:00:00',
			// 		lowprice: 750,
			// 		highprice: 755,
			// 		cutoff: 755,
			// 		lotsize: 19,
			// 		issueQty: '17.50 cr.',
			// 		status: 'Y',
			// 		fixprice: 750,
			// 		noOfMandatoryBonds: 0,
			// 		preallotmentdiscout: 0,
			// 		cutofflimit: 200000,
			// 		discountType: 'R',
			// 		upiflag: null,
			// 		offerStartDate: '2021-09-04T00:00:00',
			// 		offerEndDate: '2021-09-04T00:00:00',
			// 		allotmentFinalizationDate: '2021-09-04T00:00:00',
			// 		refundInitiationDate: '2021-09-04T00:00:00',
			// 		dematTransferDate: '2021-09-04T00:00:00',
			// 		listingDate: '2021-09-04T00:00:00',
			// 		maxYield: 0,
			// 		categoryList: [
			// 			{
			// 				categoryCode: 'IND',
			// 				categoryName: 'INDIVIDUAL',
			// 				categoryType: 'RETAIL',
			// 				issuecode: 'JDIAL'
			// 			},
			// 			{
			// 				categoryCode: 'SHA',
			// 				categoryName: 'SHA',
			// 				categoryType: 'RETAIL',
			// 				issuecode: 'JDIAL'
			// 			},
			// 			{
			// 				categoryCode: 'EMP',
			// 				categoryName: 'EMPLOYEES',
			// 				categoryType: 'RETAIL',
			// 				issuecode: 'JDIAL'
			// 			}
			// 		]
			// 	};

			// 	let dates = {
			// 		offerStart: new Date(scheduleData.offerStartDate),
			// 		offerEnd: new Date(scheduleData.offerEndDate),
			// 		allotmentFinalization: new Date(scheduleData.allotmentFinalizationDate),
			// 		refundInitiation: new Date(scheduleData.refundInitiationDate),
			// 		dematTransfer: new Date(scheduleData.dematTransferDate),
			// 		listing: new Date(scheduleData.listingDate)
			// 	};

				// let dateTypes = getDateTypeForIPOSchedule(Object.values(dates));

			// 	newCards.push({
			// 		img: cmsData.logo,
			// 		title: data.iponame,
			// 		applicationNo: data.applicationno,
			// 		amountpaid: data.amountpaid,
			// 		investment: `₹${data.amountpaid} for ${data.totalbidcount} Bids`,
			// 		highestBid: `₹${data.bidprice1} (Cut Off Price)`,
			// 		warning: 'Payment request Accepted by Bank. Please accept the UPI mandate received.',
			// 		paymentMode: `${data.amountpaid > 200000 ? 'ASBA' : 'UPI'}`,
			// 		investmentAs: `${data.investorCategory[0].nsE_CodeDetails}`,
			// 		schedule: [
			// 			{
			// 				status: dateTypes[0],
			// 				name: 'Offer Start',
			// 				date: getFormattedDateApplicationHistory(dates.offerStart)
			// 			},
			// 			{
			// 				status: dateTypes[1],
			// 				name: 'Offer End',
			// 				date: getFormattedDateApplicationHistory(dates.offerEnd)
			// 			},
			// 			{
			// 				status: dateTypes[2],
			// 				name: 'Allotment Finalization',
			// 				date: getFormattedDateApplicationHistory(dates.allotmentFinalization)
			// 			},
			// 			{
			// 				status: dateTypes[3],
			// 				name: 'Refund Initiation',
			// 				date: getFormattedDateApplicationHistory(dates.refundInitiation)
			// 			},
			// 			{
			// 				status: dateTypes[4],
			// 				name: 'Demat Transfer',
			// 				date: getFormattedDateApplicationHistory(dates.dematTransfer)
			// 			},
			// 			{
			// 				status: dateTypes[5],
			// 				name: 'Listing',
			// 				date: getFormattedDateApplicationHistory(dates.listing)
			// 			}
			// 		]
			// 	});
			// }

			// // loop end
			// console.log(newCards)
			// setCards([ ...newCards ]);
		} catch (error) {
			console.log(error)
			alert(error)
			// setLoading(true);
			var serror = String(error)
			if(serror.includes("Request failed with status code 401"))
			{
				alert('Session expired, Please login again!')
				localStorage.removeItem('user');
				window.location.replace("/");
			}
			else
			{
				alert(error)
			}
		}
	};

	const fetchthirdpart = async () =>{
		const urlSearchParams = new URLSearchParams(window.location.search)
		const urltoken = urlSearchParams.get('token');
		const requestercode = urlSearchParams.get('RequesterCode');
		let AppSource = urlSearchParams.get('AppSource');
		//alert(AppSource)
		if(urltoken)
		{
			try {
				let  data = await validthirdpartycheck(urltoken,requestercode);
				console.log('tptdata',data)
				if(data.data.statusCode == 200 && data.data.isSuccess == true){

					var token = data.data.resultData.token;
					let clientdetails = {
						"panNo": "",
						"firstName": "",
						"middleName": "",
						"surName": "",
						"mobileNo": "",
						"email": "",
						"clientcode": data.data.resultData.clientCode,
						"loginid": data.data.resultData.requesterCode,
						"dpType": "",
						"dpid": "",
						"beneficiaryID": "",
						"bankBranch": "",
						"bankName": "",
						"bankAccountNo": "",
						"investorStatus": "",
						"mkrid": "",
						"mkrDt": "",
						"dateOfbith": "",
						"address": "",
						"pincode": "",
						"secondHolderName": "",
						"secondHolderPan": "",
						"thirdHolderName": "",
						"thirdHolderPan": "",
						"issuecode": "",
						"leadid": "",
					   	"clientType": "IIFLCLIENT",	
						"AppSource": AppSource,
					  }
					//console.log('cd=>',clientdetails)  
					//alert(token)
					//alert(clientdetails)
					localStorage.setItem('user', JSON.stringify({...clientdetails,token}));
					dispatch(userAction({ ...clientdetails, token }));
					window.location.replace("/");
					return false					
				}
				else
				{	
					alert('Invalid Session')					
					setTimeout(() => {
						localStorage.removeItem('user');
						window.location.replace("/");
					  }, 2000);
					alert('Invalid Session')
				}
			}
			catch (error) {
				alert(error);
				//console.log(error);
			}
		}
		// else
		// {
		// 	alert('')
		// }
	}

	useEffect(() => {
		fetchDetails();
		fetchthirdpart();
	}, []);

	return (
		<div className={s.main}>
			<h1>Your Applications</h1>
			{loading == true && 
				<div className="loading_screen">
					<img src={LoaderImg} alt="loading..." />
					{/* <p>Please wait while fetching..</p> */}
				</div>
			}
			{!cards.length &&
				<>
					<div className={s.noapplieddata}>
						<img src={Noapplied} alt="no applied IPO" />
						<h2>You haven't applied in anywhere IPOs so far!</h2>
						<p>You haven't applied anywhere yet! Explore & invest in some of the great opportunities available right now before you miss out.</p>
						<a href="#" onClick={() => { history.push("/") }} className={s.explorebtn}>Explore IPOs now!</a>	
					</div>
				</>
			}
			{/* {cards.sort((a, b) => new Date(a.closeDate).getTime() < new Date(b.closeDate).getTime() ? 1:-1).map((e) => {
				return <ApplicationCard details={e} setLoading={setLoading} />;
			})} */}
			{cards.sort((a, b) => a.srno < b.srno ? 1:-1).map((e,key) => {
				return <ApplicationCard details={e} setLoading={setLoading} alloppor={alloppor} keyvl={e.title} />;
			})}
			{/* {cards.map((e) => {
				return <ApplicationCard details={e} setLoading={setLoading} />;
			})} */}
		</div>
	);
};

export default YourApplication;
