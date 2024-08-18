import s from './ApplicationPage04.module.scss';
import NextImg from '../../assets/images/ApplicationProcess/arrow_back_black_24dp (1).svg';
import { Link,useHistory  } from 'react-router-dom';
import ClockImg from '../../assets/images/ApplicationProcess/Group 15651.svg';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { applicationData as setApplicationData } from '../../store/action/applicationData';
import { CMS_URL,clevertap_key } from '../../vars/url';
import { getOpenIssuesCordinate,getprintingdetails ,getpdfFromCmsByCode,getpdfcoordinate,zohoCreateToken,zohoCreateLead} from '../../services/issuesServices';
import { useEffect, useState } from 'react';
import LoaderImg from '../../assets/images/loader.svg';
import ClevertapReact from 'clevertap-react';

const ApplicationPage04 = () => {
	const history = useHistory();
	const [ loading, setLoading ] = useState(false);
	const dispatch = useDispatch();
	const applicationData = useSelector((state) => state.applicationData);
	const user = useSelector((state) => state.loggedIn.user);
	//console.log('user..',user)
	console.log('applicationDatapg4',applicationData)
	const [ details, setDetails ] = useState({});
	const [ valuedetails, setvaluedetails ] = useState({});
	const [ pdfurl, setpdfurl ] = useState({});
	const [ remaincat, setremaincat ] = useState('');
	const fetchDetails = async () => {
		setLoading(true);
		try {
			let srno = applicationData.transcode;

			if(applicationData.finalpriceshow > 500000)
			{
				var pdfdata = await getpdfcoordinate(applicationData.IPOBondName,(user.clientType == 'NONIIFLCLIENT')? user.panNo : user.clientcode,srno.split('|')[1]).then(response => {							
					console.log('details',response.data);				
					if(response.data.statusCode == 200 && response.data.isSuccess == true){
						setDetails(response.data.resultData);
						let sampledt = {};
						sampledt.issuecode = applicationData.IPOBondName
						sampledt.applicationNo = applicationData.transcode.split('|')[1]
						sampledt.coOrdinates = response.data.resultData
						let finaldetails = getpdfFromCmsByCode({'sampleRes1':sampledt,'sampleResponse2':{}});
					}
				});
			}

			

			// let srno = applicationData.transcode;
			// var pdfdata = await getpdfcoordinate(srno.split('|')[1]);
			// console.log('pdfdata=>',pdfdata)
			// let valuedata = await getprintingdetails((user.clientType == 'NONIIFLCLIENT')? user.panNo : user.clientcode,srno.split('|')[1]);
			// let valuedata = await getprintingdetails('tiwari82',467279);
			//setvaluedetails(valuedata.data);
			//console.log('details1',valuedata.data.resultData)
			let remaincat = applicationData.categoryList.filter(function(v, i) {
				return (v.categoryCode !== applicationData.InvType);
			})
			
			setremaincat(remaincat[0]?.categoryName)
			setLoading(false);			
			
		} catch (error) {
			console.log(error);
		} 
	};

	const setZoho = () => {
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
					"LeadSubStatusTemp": "Completed", //Fixed 		
					"Appsource":"25"				
				}
			})
		})

		ClevertapReact.initialize(clevertap_key);
		var ClevertapPayload = {
			"Source":"IPO Details Page",
			"IPO Name":applicationData.IPOBondName,
			"Bid Number":applicationData.transcode.split('|')[0],
			"Investment Amount": applicationData.finalpriceshow,
			"Investor category":applicationData?.cattype+'|'+applicationData?.InvType,
			"Applying for":applicationData?.selfot,
			"payment type":applicationData.finalpriceshow > 500000 ? "ASBA" : "UPI",
			"Application number":applicationData.transcode.split('|')[1]
		}

		//console.log('cpl',ClevertapPayload);
		
		ClevertapReact.event("IPO_Application Step 4",ClevertapPayload)
	}

	const downloadpdf = async () => {
		setLoading(true);
		let sampledt = {};
		sampledt.issuecode = applicationData.IPOBondName
		sampledt.applicationNo = applicationData.transcode.split('|')[1]
		sampledt.coOrdinates = details

		let finaldetails = await getpdfFromCmsByCode({'sampleRes1':sampledt,'sampleResponse2':{}});
		//console.log(finaldetails)
		setLoading(false);
		if(finaldetails.data.status == 0)
		{
			alert(finaldetails.data.message)
		}
		
		if(finaldetails.data.data.file){
			let a = document.createElement("a"); //Create <a>
			a.href = finaldetails.data.data.file; 
			a.download = "applicationstatus.pdf"; 
			a.target = "_blank";
			a.click();
		}
	}

	useEffect(() => {
		fetchDetails();
		setZoho();
	}, []);
	return (
		<div className={s.main}>
			{loading == true && 
				<div className="loading_screen loading_inside">
					<img src={LoaderImg} alt="loading..." />                            
				</div>
			}

			<div className={s.container}>
				<img src={ClockImg} alt="Application Received" />
				<h2>We have received your application requests!</h2>
				<div className={s.info}>
					<span>Amount to be blocked:</span>
					{/* <span className={s.bold}>₹{valuedetails?.resultData?.bidDetails?.totalAmt || applicationData.Amount}</span> */}
					<span className={s.bold}>₹{applicationData.finalpriceshow}</span>
					{/* <div className={s.circle} /> */}
					<span>Application Number:</span>
					<span className={s.bold}>{applicationData.transcode.split('|')[0]}</span>
				</div>

				<h3>Your next steps?</h3>
				{applicationData.finalpriceshow < 500000 ?
				<>
					<div className={s.items}>
						<span className={s.number}>1</span>
						<span className={s.text}>You will get notification on your registered UPI App</span>
					</div>

					<div className={s.items}>
						<span className={s.number}>2</span>
						<span className={s.text}>Approve the mandate in you UPI app</span>
					</div>

					<div className={s.items}>
						<span className={s.number}>3</span>
						<span className={s.text}>Get the IPO in your demat account post allotment.</span>
					</div>
				</>
				:
				<>
					<div className={s.items}>
						<span className={s.number}>1</span>
						<span className={s.text}>Download & print the Application form</span>
					</div>

					<div className={s.items}>
						<span className={s.number}>2</span>
						<span className={s.text}>Fill the required details & sign</span>
					</div>

					<div className={s.items}>
						<span className={s.number}>3</span>
						<span className={s.text}>Submit the form at your bank's Capital Market Branch</span>
					</div>
					<div className={s.items}>
						<span className={s.number}>4</span>
						<span className={s.text}>After form submission, funds will be blocked in your bank A/C</span>
					</div>
					<div className={s.items}>
						<span className={s.number}>5</span>
						<span className={s.text}>After allotment, IPO will be reflected in your account.</span>
					</div>
				</>
				}
			</div>

			<div className={s.buttons}>
				{(applicationData.finalpriceshow > 500000 && applicationData.transcode.split('|')[0] != 0) &&
					<button className={s.primary} onClick={() => downloadpdf()}>Download Pdf</button>
				}	
				<button className={s.primary} onClick={() => history.push("/your_applications")}>View Application Status</button>
				{applicationData?.categoryList.length > 1 &&
					<>					
						<button className={s.outline} onClick={() => history.push(`/ipo_details/${applicationData.IPOBondName}`)} >
						{/* {applicationData?.InvType === 'SHA' ? 'Apply as individaual' : 'Apply as stakeholder'} */}
						Apply as {remaincat}
						</button>						
					</>
				}
			</div>
		</div>
	);
};

export default ApplicationPage04;
