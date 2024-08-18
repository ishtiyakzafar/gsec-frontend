import s from './IPODetails.module.scss';
import ZomatoLogo from '../../assets/images/IPODetails/Group 13768@3x.png';
import PeopleIcon from '../../assets/images/IPODetails/people_black_24dp (1).svg';
import DocumentIcon from '../../assets/images/IPODetails/description_black_24dp.svg';
import MeterImg from '../../assets/images/IPODetails/meter.png';
import not_sure from '../../assets/images/IPODetails/not_sure.png';
import go_forit from '../../assets/images/IPODetails/go_forit.png';
import RiseImg from '../../assets/images/IPODetails/Rise.svg';
import PlayButton from '../../assets/images/IPODetails/play_circle_black_24dp.svg';
import ZomatoImg from '../../assets/images/IPODetails/zomato.jpg';
import SovereignGoldImg from '../../assets/images/LandingPage/Soverign Gold Bonds_48 Px@3x.png';
import EventImg from '../../assets/images/LandingPage/event_black_24dp (1)@3x.png';
import fallbackimg from '../../assets/images/fallback.svg';
import Slider from 'react-custom-slider';
import cx from 'classnames';
import { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { getIssueDetailsFromCmsByCode, getOpenIssuesDetails,getOpenIssuesList,brokerRecomendation,getPerformance,getSubs,getPromoterHoldings,getHelth,getIpoFunding } from '../../services/issuesServices';
import { dateFormatter } from '../../helpers/utils';
import { CMS_URL,clevertap_key } from '../../vars/url';
import { useDispatch } from 'react-redux';
import { applicationData } from '../../store/action/applicationData';
import { useSelector } from 'react-redux';
import Login from '../Login';
import NoImg from '../../assets/images/noimg.jpg';
import { Link,useHistory  } from 'react-router-dom';
import BrokerRecomendation from "../UIComponents/BrokerRecomendation/BrokerRecomendation";
import LoaderImg from '../../assets/images/loader.svg';
import countdownimg from '../../assets/images/IPODetails/countdownimg.svg';
import othimgplaceholder from '../../assets/images/IPODetails/noothrimg.svg';
import useWindowDimensions from '../../hooks/screenWidth';
import ClevertapReact from 'clevertap-react';
import { LazyLoadComponent,LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import SweetAlert from 'react-bootstrap-sweetalert';


const expectedListingGains = {
	'0': 'Sky High',
	'1': 'High',
	'2': 'Moderate',
	'3': 'Low',
	'4': 'Very Low'
};

const gotoIPO = (issueCode) => {

	window.location.href = "/ipo_details/"+issueCode;

}

const Section1Card = ({ img, title, top, subHeading, event, button, background, color,topbackground,issueCode,history,iscolor }) => {
	return (
		<div className={s.card + " hover-animate"} style={{ background }}>
			{top != null &&
				<div className={s.top} style={{background:`${topbackground}`}}>
					<span>{top}</span>
				</div>
			}
			<div className={s.cardBody}>
				<img src={img} alt={title} />				

				<div className={s.body}>
					<h3  style={iscolor=='N' ? {color:'#000'} : {width:'initial'}}>{title}</h3>
					<div className={s.subHeading}>
						<span className={s.light} style={iscolor=='N' ? {color:'#000'} : {width:'initial'}}>{subHeading}</span>
					</div>

					<div className={s.invest}>
						<img src={EventImg} style={iscolor=='N' ? {filter:'invert(1)'} : {filter:'inherit'}} alt="Invest" />
						<span style={iscolor=='N' ? {color:'#000'} : {width:'initial'}}>{event}</span>
					</div>
				</div>
			</div>

			<div className={s.buttons}> 
				<button className={s.button} style={iscolor=='N' ? {border:'1px solid #000'} : {border:'none'}}  onClick={() => {
						history.push("/ipo_details/"+issueCode)
						//history.go(0)
					}} >
					{button}
				</button>
			</div>
		</div>
	);
};

const IPODetails = ({ toggleLogin }) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [ loading, setLoading ] = useState(true);

	const [ sliderValue, setSliderValue ] = useState(0);
	const [ toggle, setToggle ] = useState(false);
	const { issueCode } = useParams();
	const [ details, setDetails ] = useState({});
	const [ inallDetails,setinallDetails ] = useState({});
	const [ counter, setCounter ] = useState('');
	const [ data, setData ] = useState('');
	const [ redirect, setRedirect ] = useState(false);
	const [ cutOffchange, setcutOffchange ] = useState(0);
	const [ customval, setcustomval ] = useState(0);
	const [ totalshare, settotalshare ] = useState(0);
	const [ cutoffyn, setcutoffyn ] = useState("Y");
	const applicationDataState = useSelector((state) => state.applicationData);
	const user = useSelector((state) => state.loggedIn);
	const [ openIssue, setopenIssue ] = useState([]);
	const [ brokerrecomendation, setBrokerrecomendation ] = useState([]);
	const [ performanceyr, setPerformance ] = useState([]);
	const [ subscriptionvendor, setSubscription ] = useState([]);
	const [ subscriptionvendorstring, setSubscriptionstring ] = useState('Smooth Sailing');
	const [ exchangetype, setExchangetype ] = useState('');
	const [ morerange, setMorerange ] = useState(false);
	const [ promoholder, setPromoholder ] = useState([]);
	const [ companyhelth, setHelth ] = useState([]);
	const { width } = useWindowDimensions();
	const [ openclosedt,setopenclosedt ] = useState();
	const [ slidewidth,setslidewidth ] = useState(0);
	const [ aplynwlgin,setaplynwlgin ] = useState(false);
	const [ enterpress,setenterpress ] = useState(false);
	const [ alertmsg, setAlertmsg ] = useState('');
	const [ counterInterval, setcounterInterval ] = useState({});
	
	


	const applyNow = async () => {

		if(Object.keys(user).length < 1 ){
			setaplynwlgin(true);
			 toggleLogin();
			 return false
		}

		let shareprice =(cutoffyn == "N")? parseInt(customval) : parseInt(cutOffchange)
		if(aplynwlgin === true)
		{
			let {data} = await getOpenIssuesDetails(issueCode);
			//console.log('oppaa=>',data.resultData)
			let details = data.resultData
		}
		dispatch(
			applicationData({
				...applicationDataState,
				ipodetails : details,
				IPOBondName :details.issuecode,
				noOfShares:[parseInt(sliderValue/cutOffchange)],
				sharePrice:[shareprice],
				bidPrice:[parseFloat(shareprice)],
				totalbidprice :[parseFloat(sliderValue)],
				cutOff:[parseFloat(sliderValue) > 200000 ? 'N' :cutoffyn],
				exchangetype:exchangetype
			})
		);
		if(cutoffyn == "N" && customval === 0){
			alert("Enter custom value.")
		}else{
			// application_process

			if(Object.keys(user).length > 0 ){
				history.push("/application_process")
			}else{
				setaplynwlgin(true);
			 	toggleLogin();
			}
			
		}
	};

	if(aplynwlgin === true)
	{
		if(Object.keys(user).length > 0 ){
			//alert('upuum')
			applyNow()
		}
	}

	const fetchDetails = async () => {
		try {
			
			setLoading(false);
			if(Object.keys(user).length > 0 ){
				setLoading(true);
				try{
					let data = await getOpenIssuesDetails(issueCode);
					setLoading(false);
					if(data.data.isSuccess == true && data.data.statusCode == 200){
						setDetails(data.data.resultData);
						//('OpenIssuesdetails',data.data.resultData)
						
						setSliderValue(data.data.resultData.cutoff * data.data.resultData.lotsize)
						setcutOffchange(data.data.resultData.cutoff)
						setExchangetype(data.data.resultData.exchangeType)

						ClevertapReact.initialize(clevertap_key);
						var ClevertapPayload = {
							"Source":"IPO Details Page",
							"IPO Name":issueCode,
							"Share Price":data.data.resultData.lowprice+' - '+data.data.resultData.highprice,
							"IPO size": ((data.data.resultData.issueQty*((data.data.resultData.lowprice+data.data.resultData.highprice)/2))/10000000).toFixed(2)+' cr',
							"Subscription Status":''
						}
						//console.log('cpl',ClevertapPayload)

						ClevertapReact.event("IPO_Details Page Viewed",ClevertapPayload)
						
						let counterInt = setInterval(() => {
							setCounter(dateFormatter(new Date(data.data.resultData.clsdt).getTime()));
							setopenclosedt(new Date(data.data.resultData.clsdt).toLocaleDateString('en-IN', {
								day: '2-digit',month: 'short',year:'numeric'}))
						}, 1000);
						setcounterInterval(counterInt)

					}
				}
				catch(err)
				{
					setLoading(true);
					alert('Session expired, Please login again!')
					localStorage.removeItem('user');
					window.location.reload(); 
				}
				
			}

			
			
		} catch (error) {
			console.log(error);
		} finally {
			try {
				let details = await getIssueDetailsFromCmsByCode(issueCode);
				setData(details.data.result);
				//console.log('IssueDetails',details.data.result)
				// console.log(details.data.result);

				//let percodde = data.co_code
				//const threeyrstrategy = (percodde) => {
				//	alert(details.data.statusCode)
				if(details.data.statusCode === 200)	
				{
					getPerformance(details.data.result.co_code).then(response => {
						let result = response?.data[0]
						let highestperf = Math.max(result.Curr_OperatingIncome,result.Prev1_OperatingIncome,result.Prev_OperatingIncome)
						// highestperf =  highestperf.toString().length;
						// highestperf = Math.pow(10,highestperf-1)
						result.highestperf = highestperf;
						//alert(JSON.stringify(result))
						setPerformance(result)			
					}).catch(error => {
						console.log(error)
					})
					getPromoterHoldings(details.data.result.co_code).then(response => {
						let result = response?.data[0]
						setPromoholder(result)			
					}).catch(error => {
						console.log(error)
					})
					getHelth(details.data.result.co_code).then(response => {
						let result = response?.data[0]
						
						setHelth(result)			
					}).catch(error => {
						console.log(error)
					})
					

					//const getSubsdetails = (percodde) => {
						//alert(data.co_code)
						getSubs(details.data.result.co_code).then(response => {
							let result = response?.data

							//console.log('khugaabc=>',result)
							//setSubscription(result)
							//let skx = result.replace('[{"LastUpdateDate":"9/3/2021 11:00:00 AM"}]', '')
							//let datas =  JSON.parse(result)
							var fres = result.filter(function(v, i) {
								return (v.Category == "Retail Individual Investors (RIIs)" && v.SubCategory == "");
							  })
							  //console.log('khugaa=>',fres[0])
							  setSubscription(fres[0])
							  
							  var d = new Date();
								var h = d.getHours();
								var m = d.getMinutes();
								var ctm = h*60+m;
								
								if(ctm >= 600 && ctm < 810)
								{
									if(fres[0].NoOfTimesOfTotalMeantForTheCategory <= 0.5)
									{
										setSubscriptionstring('Smooth Sailing')
									}
									if(fres[0].NoOfTimesOfTotalMeantForTheCategory <= 1 && fres[0].NoOfTimesOfTotalMeantForTheCategory > 0.5)
									{
										setSubscriptionstring('Rising Up')
									}
									if(fres[0].NoOfTimesOfTotalMeantForTheCategory > 1)
									{
										setSubscriptionstring('Sky High')
									}
								}
								if(ctm >= 810 )
								{
									if(fres[0].NoOfTimesOfTotalMeantForTheCategory <= 0.7)
									{
										setSubscriptionstring('Smooth Sailing')
									}
									if(fres[0].NoOfTimesOfTotalMeantForTheCategory <= 1.2 && fres[0].NoOfTimesOfTotalMeantForTheCategory > 0.7)
									{
										setSubscriptionstring('Rising Up')
									}
									if(fres[0].NoOfTimesOfTotalMeantForTheCategory > 1.2)
									{
										setSubscriptionstring('Sky High')
									}
								}
								//alert(fres[0].NoOfTimesOfTotalMeantForTheCategory)
								//alert(subscriptionvendorstring)
			
							setSubscription(fres[0])
						}).catch(error => {
							console.log(error)
						})
					//}

					let brokerdata = await brokerRecomendation(details.data.result.co_code);
					//console.log('brokerdata',brokerdata);
					if(brokerdata.data.head.status == 0){
						setBrokerrecomendation(brokerdata?.data?.body?.brokerReportData)
					}
				//}
				
				}


			} catch (error) {
				console.log(error);
			}
		}
	};

	const fetchopenissues = async() => {
		let otsdata = []
		dispatch(applicationData({}))
		
		try{
			let detail = getOpenIssuesList('IPO').then(response => {
				//setopenIssue(response.data.resultData)
				let odata = response.data.resultData
				
				
				//console.log('detailsdata',detailsdata)
				try
				{
						
					let cmsdata = {}
					odata.map((e,loopi) => {
						if(Object.keys(user).length == 0 ){	
							if(e.issuecode == issueCode){
								
								setDetails(e);
								setinallDetails(e);
						
								setSliderValue(e.cutoff * e.lotsize)
								setcutOffchange(e.cutoff)
								setExchangetype(e.exchangeType)

								let counterInt = setInterval(() => {
									setCounter(dateFormatter(new Date(e.clsdt).getTime()));
									setopenclosedt(new Date(e.clsdt).toLocaleDateString('en-IN', {
										day: '2-digit',month: 'short',year:'numeric'}))
								}, 1000);
								setcounterInterval(counterInt)							

								

								ClevertapReact.initialize(clevertap_key);
								var ClevertapPayload = {
									"Source":"IPO Details Page",
									"IPO Name":issueCode,									
									"Subscription Status":''
								}
								//console.log('cpl',ClevertapPayload)
								ClevertapReact.event("IPO_Details Page Viewed",ClevertapPayload)
							} 
						}
						else
						{
							if(e.issuecode == issueCode){
								//console.log('dsad',e);
								setinallDetails(e);
							}
						}
						
						getIssueDetailsFromCmsByCode(e.issuecode).then(res => {
							cmsdata = res.data.result
							e.cmsdata = cmsdata
							otsdata.push(e);
						})
					})
					
					setopenIssue(odata)		
						
				}
				catch(error)
				{
					alert(error);
				}
				//console.log('agaazoo=>',response.data.resultData);
			})			
		}
		catch(error)
		{
			alert(error);
		}
	}

	const customcutoff =  (e,reallot,realLowPrice,realHighprice) => {
		//console.log('toggle',e,reallot,realLowPrice,realHighprice)
		if(toggle){
			let customCurrentvalue= e.target.value;
			if(realLowPrice <= customCurrentvalue && realHighprice >=customCurrentvalue){
				customCurrentvalue = customCurrentvalue;
			}else{
				customCurrentvalue = realLowPrice;
			}
			setcustomval(customCurrentvalue);
			setcutOffchange(customCurrentvalue)
			setSliderValue(customCurrentvalue * reallot)
		}else{
			// console.log('not hide')
		}
		
	}
	const changeToggle = async (toggle,realcutoff) => {
		//console.log(toggle)
		setToggle(toggle);
		if(toggle){ // for custom
			// console.log('if')
			setcutoffyn("N")
			setcustomval(details.lowprice)
			setcutOffchange(details.lowprice)
			setSliderValue(details.lowprice * details.lotsize)
		}else{ //for cutoff
			// console.log('else')
			setcutoffyn("Y")
			setcustomval(details.lowprice)
			setcutOffchange(realcutoff)
			setSliderValue(details.lotsize * details.cutoff)

		}
		
	}

	const changeslidervalue = async (sliderval) => {
		if(sliderval <= 200000)
		{
			setSliderValue(sliderval)
			setMorerange(false)
		}
		else
		{
			setMorerange(true)
		}	
	}

	const changeslidervaluexs = async(value) => {
		if(value < 200000)
		{
			value = 200000
		}
			var ctoff = details.lotsize * cutOffchange;
			var xcess = value -(value%ctoff);
			//alert(xcess)
			setSliderValue(xcess)
			
	}

	useEffect(() => {
		// updated useerdeails
		if(enterpress === true)
		{
			//console.log('bhaag',sliderValue);
			applyNow()
		}
		
		}, [sliderValue,enterpress]);
	

	useEffect(() => {
		scrollTop();
		clearInterval(counterInterval);
		// let i;
		// i = fetchDetails();
		fetchDetails();
		fetchopenissues();
		// threeyrstrategy();
		// getSubsdetails();
		// return () => {
		// 	try {
				
		// 		clearInterval(i);
		// 	} catch (error) {}
		// };
	}, [issueCode]);

	const scrollTop = () =>{
		var element = document.querySelector("section#topsection");
		if(element)
		{
  			element.scrollIntoView();
		}
	 };
	// ipo funding url genarate part start
	const ipofunding = async() => {
		setLoading(true)
		try {
			
			var postdata = { 
				"requesterCode": user.user.clientcode, 
				"clientCode": user.user.clientcode, 
				"appSource": user?.user?.AppSource || 25,
				"clientType": 6, 
				"Page":"L" ,
				"issueCode":issueCode
				}			
			let {data:{resultData}} = await getIpoFunding(postdata);

			//return false
			if(resultData)
			{
				window.location.replace(resultData.url);
			}
		} 		
		catch (error) {
			setLoading(false)			
			setAlertmsg(String(error));
		}
	}
	// ipo funding url genarate part End

	// console.log(new Intl.NumberFormat('en-IN', {
	// 	style: 'currency',
	// 	currency: 'INR',
	// 	maximumSignificantDigits: 3}).format(35000000));

	function changeNumberFormatToCrr(number, decimals, recursiveCall) {
			const decimalPoints = decimals || 0;
			const noOfLakhs = number / 100000;
			let displayStr;
			let isPlural;
		
			// Rounds off digits to decimalPoints decimal places
			function roundOf(integer) {
				return integer.toLocaleString(undefined, {
					minimumFractionDigits: decimalPoints,
					maximumFractionDigits: decimalPoints,
				});
			}
		
			if (noOfLakhs >= 1 && noOfLakhs <= 99) {
				const lakhs = roundOf(noOfLakhs);
				isPlural = lakhs > 1 && !recursiveCall;
				displayStr = `${lakhs} Lakh${isPlural ? 's' : ''}`;
			} else if (noOfLakhs >= 100) {
				const crores = roundOf(noOfLakhs / 100);
				const crorePrefix = crores >= 100000 ? changeNumberFormatToCrr(crores, decimals, true) : crores;
				isPlural = crores > 1 && !recursiveCall;
				displayStr = `${crorePrefix} Cr${isPlural ? '' : ''}`;
			} else {
				displayStr = roundOf(+number);
			}
		
			return displayStr;
		}

		function YouTubeGetID(url){
			url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
			return (url[2] !== undefined) ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
		}

		let viewmeter = MeterImg;
		if(data.expected_listing_gains == 0)
		{
			viewmeter = not_sure
		}
		if(data.expected_listing_gains == 2)
		{
			viewmeter = go_forit
		}

		const hidesweeetalert = () => {
			setAlertmsg('')
		}

		const downloadClickEvent = () => {
			ClevertapReact.initialize(clevertap_key);
			var ClevertapPayload = {
				"Source":"IPO Details Page",
				"IPO Name":issueCode,
				'client-type': Object.keys(user).length > 0 ? user.user.clientType : 'Pre-login',
				'client-code': Object.keys(user).length > 0 ? user.user.clientcode : 'Pre-login',
				'user-agent':navigator.userAgent,				
				'app-source':Object.keys(user).length > 0 ? (user?.user?.AppSource ? user?.user?.AppSource  : 25) : 25,
			}
			ClevertapReact.event("IPO_Details Download Report",ClevertapPayload)
		}
		
	return (
		<>		
		<div className={s.main}>
			{alertmsg != '' &&
				<SweetAlert
				error
				title="Alert!"
				onConfirm={hidesweeetalert}
				>
				{alertmsg}
				</SweetAlert>
			}
		{loading == true && 
				<div className="loading_screen">
					<img src={LoaderImg} alt="loading..." />
					<p>Please wait while fetching..</p>
				</div>
			}
			{/* {redirect && <Redirect to="/application_process" />} */}
			
			<section className={s.section1} id="topsection">
			
				<div className={s.left}>
					<div className={s.innerLeft}>
							<LazyLoadImage
								alt={details.issuecode}
								effect="blur"								
								src={data.logo ? `${CMS_URL}${data.logo}` : NoImg} />
						{/* <img src={data.logo ? `${CMS_URL}${data.logo}` : NoImg} alt={details.issuecode} /> */}
					</div>
					<section className={cx(s.section2,s.sec2mobile)}>
						<h1>{data.issue_name ? data.issue_name : details.issuecode}</h1>
						{data.tag!= null && <><button style={{background:data.tag_color}}>{data.tag}</button><div className={s.secmobilescheme}>{details.schname}</div></> }
						<div>	
						{subscriptionvendor?.NoOfTimesOfTotalMeantForTheCategory &&
							<>
							<LazyLoadImage
								alt={"50% have oversubscribed"}
								effect="blur"								
								src={PeopleIcon} />
							{/* <img src={PeopleIcon} alt="50% have oversubscribed" />							 */}
							<span style={{fontSize:12}}>The subscription count is soaring by {(subscriptionvendor?.NoOfTimesOfTotalMeantForTheCategory*100).toFixed(2)}%</span>
							</>
						}
						</div>
					</section>
					<div className={s.innerRight}>
						<h1>{data.issue_name ? data.issue_name : details.issuecode}</h1>
						<span>{details.schname}</span>
					</div>
				</div>
				

				<div className={s.right}>
					<span className={s.topLine}>Minimum Investment</span>

					<div className={s.bottomLine}>
						<h3>₹{details.lowprice * details.lotsize}</h3>
						<span>/{details.lotsize} Shares </span>
					</div>
				</div>
			</section>

			<section className={s.section2}>
				{data.tag!= null && <button style={{background:data.tag_color}}>{data.tag}</button> }
				<div>
				{subscriptionvendor?.NoOfTimesOfTotalMeantForTheCategory &&
					<>
						<LazyLoadImage
							alt={"50% have oversubscribed"}
							effect="blur"								
							src={PeopleIcon} />
					{/* <img src={PeopleIcon} alt="50% have oversubscribed" />					 */}
					<span>The subscription count is soaring by {(subscriptionvendor?.NoOfTimesOfTotalMeantForTheCategory*100).toFixed(2)}%</span>
					</>
				}
				</div>
			</section>

			<section className={s.section3}>
				<span className={s.red}><span>Bid closes in</span> <span>{openclosedt}</span> </span>
				<div className={s.dot} />
				<div className={s.info}>
					<h6>Share Price:</h6>
					<span>
						₹{details.lowprice} - ₹{details.highprice}
					</span>
				</div>
				<div className={s.dot} />
				<div className={s.info}>
					<h6>Issue size :</h6>
					<span>
					{((details.issueQty*((details.lowprice+details.highprice)/2))/10000000).toFixed(2) } Cr.
					</span>
				</div>
				{data.report_file &&
					<>
					<div className={s.dot} />				
					<a href={`${CMS_URL}${data.report_file}`} onClick={(e) => {downloadClickEvent()}} target="_blank">
						<img src={DocumentIcon} alt="Download  a report." />
						<span>Download report</span>
					</a>
					</>
				}
			</section>

			<section className={s.section4}>
				<div className={s.columnDouble}>
					<div className={cx(s.item, s.subscriptions)}>
						
						{subscriptionvendor?.NoOfTimesOfTotalMeantForTheCategory &&
							<h6>
								<span style={{fontSize:'28px',display:'block'}}>
									{(subscriptionvendor?.NoOfTimesOfTotalMeantForTheCategory*1).toFixed(2)}X
								</span>
								Subscriptions							
							</h6>
						}
							{!subscriptionvendor?.NoOfTimesOfTotalMeantForTheCategory &&
								<div className={s.fallback}>
									<h6>Subscriptions</h6>
									<img src={fallbackimg} alt="Information would be available soon!" />
									<p>Information would be available soon!</p>
								</div>
							}
						{(() => {  
							if(subscriptionvendor?.NoOfTimesOfTotalMeantForTheCategory >= 1 && subscriptionvendor?.NoOfTimesOfTotalMeantForTheCategory <2)
							{
								return <img src="/subs/sub2x.svg" />
							}
							else if(subscriptionvendor?.NoOfTimesOfTotalMeantForTheCategory >= 2 && subscriptionvendor?.NoOfTimesOfTotalMeantForTheCategory <4)
							{
								return <img src="/subs/sub3x.svg" />
							}
							else if(subscriptionvendor?.NoOfTimesOfTotalMeantForTheCategory >= 4 && subscriptionvendor?.NoOfTimesOfTotalMeantForTheCategory <6)
							{
								return <img src="/subs/sub4x.svg" />
							}
							else if(subscriptionvendor?.NoOfTimesOfTotalMeantForTheCategory >= 6)
							{
								return <img src="/subs/sub5x.svg" />
							}
							else if(subscriptionvendor?.NoOfTimesOfTotalMeantForTheCategory < 1)
							{
								return <img src="/subs/sub1x.svg" />
							}							

							})()}
							
					</div>

					<div className={cx(s.item, s.insight)}>
						<h6>IIFL Insight</h6>
						<div className={s.meter}>
							
							<div className={s.top}  style={(data.expected_listing_gains == 1 || !data.expected_listing_gains) ? {fontWeight:'bold'}:{fontWeight:'normal'}}>Neutral</div>
							
							<img src={viewmeter} alt="IIFL INsights" />
							<div className={s.bottom}>								
								<span style={data.expected_listing_gains == 0  ? {fontWeight:'bold'}:{fontWeight:'normal'}}>Not Sure</span>
								<span style={data.expected_listing_gains == 2 ? {fontWeight:'bold'}:{fontWeight:'normal'}}>Go for it!</span>
							</div>
						</div>
						<a data-toggle="modal" data-target={`#analystresponse`} href="javascript:void(0)" >View Analyst's response</a>

					</div>
				</div>
				{/* {width < 500 &&
					<>
						<div className={s.columnDouble+' '+s.columnsinglmob}>					
							<div className={cx(s.item, s.companyHealth)}>
								<h6>Company Health</h6>
								{performanceyr?.Curr_OperatingIncome ?
								<>
								<div className={s.left} style={{width:(performanceyr?.Prev_OperatingIncome/performanceyr?.Prev_OperatingIncome)*100,backgroundSize:'cover',height:(performanceyr?.Prev_OperatingIncome/performanceyr?.Prev_OperatingIncome)*100}}>
									<span>{ companyhelth?.Prev_ReportedPAT < 1 ? 'Loss':'Profit'}</span>
									<span className={s.bold} >{(new Date().getFullYear()) - 1}</span>
									<span style={{color:'#fff'}}>₹{changeNumberFormatToCrr(Math.abs(companyhelth?.Prev_ReportedPAT),0)}</span>
								</div>
								<div className={s.right} style={{width:(performanceyr?.Curr_OperatingIncome/performanceyr?.Prev_OperatingIncome)*100,backgroundSize:'cover',height:(performanceyr?.Curr_OperatingIncome/performanceyr?.Prev_OperatingIncome)*100}}>
									<span>{ companyhelth?.Curr_ReportedPAT < 1 ? 'Loss':'Profit'}</span>
									<span className={s.bold}>{(new Date().getFullYear())}</span>
									<span style={{color:'#fff'}}>₹{changeNumberFormatToCrr(Math.abs(companyhelth?.Curr_ReportedPAT),0)}</span>
								</div>
								</>
								:
								<div className={s.fallback}>
									<img src={fallbackimg} alt="Information would be available soon!" />
									<p>Information would be available soon!</p>
								</div>
								}
							</div>
						</div>
					</>
				} */}
				<div className={s.columnDouble}>
					<div className={cx(s.item, s.expected)}>
						<h6>Expected Listing Gains</h6>
						<img src={`/${subscriptionvendorstring}.png`} />
						<h5>{subscriptionvendorstring}!</h5>
					</div>
					<div className={cx(s.item, s.companyHealth)}>
							<h6>Company Health</h6>
							{performanceyr?.Curr_OperatingIncome ?
							<>
							<div className={s.left} style={companyhelth?.Prev_ReportedPAT > companyhelth?.Curr_ReportedPAT ?{width:'110px',backgroundSize:'cover',height:'110px'}:{width:'90px',backgroundSize:'cover',height:'90px'} }>
								<span>{ companyhelth?.Prev_ReportedPAT < 1 ? 'Loss':'Profit'}</span>
								<span className={s.bold} >{(new Date().getFullYear()) - 1}</span>
								<span style={{color:'#fff'}}>₹{changeNumberFormatToCrr(Math.abs(companyhelth?.Prev_ReportedPAT),0)}</span>
							</div>
							<div className={s.right} style={companyhelth?.Prev_ReportedPAT < companyhelth?.Curr_ReportedPAT ?{width:'110px',backgroundSize:'cover',height:'110px'}:{width:'90px',backgroundSize:'cover',height:'90px'} }>
								<span>{ companyhelth?.Curr_ReportedPAT < 1 ? 'Loss':'Profit'}</span>
								<span className={s.bold}>{(new Date().getFullYear())}</span>
								<span style={{color:'#fff'}}>₹{changeNumberFormatToCrr(Math.abs(companyhelth?.Curr_ReportedPAT),0)}</span>
							</div>
							</>
							:
							<div className={s.fallback}>
								<img src={fallbackimg} alt="Information would be available soon!" />
								<p style={{fontSize: "1.3rem"}}>Information would be available soon!</p>
							</div>
							}
						</div>
					{/* {width >= 500 ?
						<>
						<div className={cx(s.item, s.companyHealth)}>
							<h6>Company Health</h6>
							{performanceyr?.Curr_OperatingIncome ?
							<>
							<div className={s.left} style={{width:(performanceyr?.Prev_OperatingIncome/performanceyr?.Prev_OperatingIncome)*100,backgroundSize:'cover',height:(performanceyr?.Prev_OperatingIncome/performanceyr?.Prev_OperatingIncome)*100}}>
								<span>{ companyhelth?.Prev_ReportedPAT < 1 ? 'Loss':'Profit'}</span>
								<span className={s.bold} >{(new Date().getFullYear()) - 1}</span>
								<span style={{color:'#fff'}}>₹{changeNumberFormatToCrr(Math.abs(companyhelth?.Prev_ReportedPAT),0)}</span>
							</div>
							<div className={s.right} style={{width:(performanceyr?.Curr_OperatingIncome/performanceyr?.Prev_OperatingIncome)*100,backgroundSize:'cover',height:(performanceyr?.Curr_OperatingIncome/performanceyr?.Prev_OperatingIncome)*100}}>
								<span>{ companyhelth?.Curr_ReportedPAT < 1 ? 'Loss':'Profit'}</span>
								<span className={s.bold}>{(new Date().getFullYear())}</span>
								<span style={{color:'#fff'}}>₹{changeNumberFormatToCrr(Math.abs(companyhelth?.Curr_ReportedPAT),0)}</span>
							</div>
							</>
							:
							<div className={s.fallback}>
								<img src={fallbackimg} alt="Information would be available soon!" />
								<p>Information would be available soon!</p>
							</div>
							}
						</div>
						</>
						:
						<>
						<div className={cx(s.item, s.blocktimer)}>
							<h6>Application Closes in</h6>
							<img src={countdownimg} alt="Count-down" />
							<div className={s.cardcounter}  dangerouslySetInnerHTML={{__html: counter}}>							
							</div>
						</div>
						</>
					} */}
				</div>
				<div className={s.columnDouble+' '+s.fullmobilecolumn}>
					{/* <div className={cx(s.item, s.promoter)}>
						<h6>Promoter's Holdings {promoholder?.NameOfShareholder && ' : '+promoholder?.NameOfShareholder}</h6>
						<div className={s.circles}>
							<div className={s.left}>
								<h6>₹{changeNumberFormatToCrr(promoholder?.PreOffer_Holding_Nos,2)}</h6>
								<span>Before IPO</span>
							</div>

							<div className={s.right}>
								<h6>₹{changeNumberFormatToCrr(promoholder?.PreOffer_Holding_Pct,2)}</h6>
								<span>After IPO</span>
							</div>
						</div>
					</div> */}
					{width >= 1 &&
					<>
						<div className={cx(s.item, s.blocktimer)}>
							<h6>Application Closes in</h6>
							<img src={countdownimg} alt="Count-down" />
							<div className={s.cardcounter}  dangerouslySetInnerHTML={{__html: counter}}>
							</div>
						</div>
					</>
					}

					

					<div className={cx(s.item, s.performance)}>
						<h6>{width >= 500 ?'Company Performance':'Performance'}</h6>
					{performanceyr?.Curr_OperatingIncome ?
						<>
						<div className={s.bars}>
							<div className={cx(s.item, s.bar1)} >									
								<h6>{changeNumberFormatToCrr(performanceyr?.Prev1_OperatingIncome,0)}</h6>
								<div style={{height:(performanceyr?.Prev1_OperatingIncome/performanceyr?.highestperf)*120}} />
								<span>{(new Date().getFullYear()) - 2}</span>
							</div>

							<div className={cx(s.item, s.bar2)}>
								<h6>{changeNumberFormatToCrr(performanceyr?.Prev_OperatingIncome,0)}</h6>
								<div style={{height:(performanceyr?.Prev_OperatingIncome/performanceyr?.highestperf)*120}} />
								<span>{(new Date().getFullYear()) - 1}</span>
							</div>

							<div className={cx(s.item, s.bar3)}>
								<h6>{changeNumberFormatToCrr(performanceyr?.Curr_OperatingIncome,0)}</h6>
								<div style={{height:(performanceyr?.Curr_OperatingIncome/performanceyr?.highestperf)*120}} />
								<span>{(new Date().getFullYear())}</span>
							</div>

							<img src={RiseImg} className={performanceyr?.Curr_OperatingIncome < performanceyr?.Prev_OperatingIncome && s.tolowrise } alt="Rise" />
						</div>
						<span>Yearly Revenue (in ₹)</span>
						</>
						:
						<div className={s.fallback}>
							<img src={fallbackimg} alt="Information would be available soon!" />
							<p>Information would be available soon!</p>
						</div>
					}
						
					</div>
				</div>
				<div className={s.columnSingle}>
					<div className={s.item}>
						<h4>Invest Now</h4>
						<span className={s.subHeading}>
						{morerange === true ?
							'Enter bidding amount > rs. 2,00,000'
							:
							'How much do you want to invest?'
						}
						</span>
{/* 						
						<input type="number" className={cx(s.toggler,s.custombox, toggle ? s.active : s.hidecstominp)} 
						value={customval}
						min={details.lowprice}
						max={details.highprice}
						onChange={(e) => customcutoff(e,details.lotsize,details.lowprice,details.highprice)}/> */}


						<div className={s.slider}>		
						
							<div className={s.slidervaluwrp} style={morerange === false ? {left:(slidewidth/235000)*sliderValue} : {right:0,transform:'translate(0,0)'} } > 
							
									
									{morerange === true ?
										<input type="number"
											min={200000}
											placeholder="Enter Amount"
											className={s.custommorerange}
											onKeyPress={(ev) => {
												if (ev.which != 8 && ev.which != 0 && ev.which < 48 || ev.which > 57)
												{
													ev.preventDefault();
												}
												if (ev.key === "Enter") {
													
													changeslidervaluexs(ev.target.value,true)
													setenterpress(true)
													
												}
												
												
											  }}
											onBlur={(e) => {
												changeslidervaluexs(e.target.value)
											}}
										/>
										:
										<h4>₹{sliderValue}</h4>
									}
							</div>
							<div className={s.filledwidth} style={{width:((slidewidth/(200000+((cutOffchange*details.lotsize)-(200000%(cutOffchange*details.lotsize)))+1))*sliderValue)-12 || 12,maxWidth:slidewidth}}>
								
							</div>
							<input
								type="range"
								min={cutOffchange * details.lotsize}
								max={200000+((cutOffchange  * details.lotsize)-(200000%(cutOffchange  * details.lotsize)))+1}
								step={details.lotsize * cutOffchange}
								value={sliderValue}
								onChange={(e) => {
									// console.log(e.target.value);
									changeslidervalue(e.target.value)
									// setSliderValue(e.target.value);
								}}
								ref={el => {
									if (!el) return;
									setslidewidth(el.getBoundingClientRect().width); // prints 200px
								  }}
								className={s.sliderbar}
								
							/>
							<div className={s.sub}>
								<span className={s.initiallimit}>₹{cutOffchange * details.lotsize}</span>
								{/* <span>₹{details.cutofflimit}</span> */}
								<span className={s.belowlimt}>₹2L</span>
								<span className={s.morelimit}>{'>₹2L'}</span>
							</div>
						</div>
						<div className={s.sharePrice}>
							<div className={s.left}>
								<h4>Share Price</h4>
								{details.lowprice != details.highprice ?
									<span>
										Range: ₹{details.lowprice} - ₹{details.highprice}
									</span>
									:
									<span>
										Range: ₹{details.lowprice}
									</span>
								}
							</div>
							{details.lowprice != details.highprice &&
								<>
									<div className={s.toggle}>
										
										<div className={s.names}>
											<span style={{cursor: "pointer"}} className={cx(s.labelccf, toggle ? s.fade : '')} onClick={() => {
											toggle? changeToggle(!toggle,details.cutoff) : changeToggle(toggle,details.cutoff)}}>Cut Off</span>
									
											{!toggle?(<span onClick={() => {
											changeToggle(!toggle,details.cutoff)}}
											style={{cursor: "pointer"}}
											>Custom</span>) : (<div className={s.custwrapwrap}><span style={{maxWidth:'10px'}}>₹</span><input type="number" className={cx(s.toggler,s.custombox, toggle ? s.active : s.hidecstominp)}
											value={customval}
											min={details.lowprice}
											max={details.highprice}
											onChange={(e) => setcustomval(parseInt(e.target.value))}
											onBlur={(e) => customcutoff(e,details.lotsize,details.lowprice,details.highprice)} /></div>)}
										</div>
										<div className={cx(s.toggler, toggle ? s.active : '')} />
											
									</div>
								</>									
							}
						</div>
						<div className={s.totalQty}>
							<h4>Total Qty</h4>
							<span> {sliderValue/cutOffchange} Shares</span>
						</div>
						<button className={s.apply + " hover-animate"} onClick={applyNow}>
							Apply Now
						</button>
					</div>
				</div>
			</section>

			<section className={s.section5}>
			{(data?.other_considerations || data.consideration_image) &&
				<h3 className={s.header}>About {data.issue_name ? data.issue_name : details.issuecode}</h3>
			}
				<div className={s.cards}>
				{data?.video_link &&
					<div className={s.card1}>
						{/* <div className={s.image}>Zomato</div>
						<div className={s.gradient} />
						<div className={s.text}>
							<div className={s.head} />
							<div className={s.foot}>
								<h6>{'What is an IPO & why should you invest in it?'}</h6>
								<span>Zomato IPO</span>
							</div>
							<img src={PlayButton} alt="Play" className={s.play} />
						</div> */}						
							<iframe width="578" height="412" src={`https://www.youtube.com/embed/${YouTubeGetID(data?.video_link)}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>						
					</div>
				}
				{data.report_file &&
					<>
					<div className={s.card2}>
						<a href={`${CMS_URL}${data.report_file}`} target="_blank">
							<div className={s.back} />
							<div className={s.head}>
								<h5>{data.issue_name ? data.issue_name : details.issuecode}  Report</h5>
							</div>

							<div className={s.foot}>
								{data.report_file &&
									<a href={`${CMS_URL}${data.report_file}`} onClick={(e) => {downloadClickEvent()}} target="_blank">Download Complete Report</a>
								}
							</div>
						</a>
					</div>
					</>
				}				
				{(inallDetails?.funding === 'Y' && user?.user?.clientType === "IIFLCLIENT") &&
					<>
					<div className={s.card3funding}>
						<button className={s.fundingbtn}>IPO Funding</button>
						<h2>
							Low on funds <br></br>and need money?
						</h2>
						<p>
							DON'T sell your investments as you can<br></br>always get a easy loan of <span className={s.bold}>1 crore</span> with <br></br>low interest rates.
						</p>
						<div className={s.btnwrap}>
							<a href='javascript:void(0)' onClick={()=> ipofunding()} className={s.applynow}>Apply Now</a>
							<a href='javascript:void(0)' onClick={()=> ipofunding()} >Know More</a>
						</div>
					</div>
					</>
				}
				</div>
			</section>
			{data?.other_considerations &&
				<section className={s.section6}>
					<h3 className={s.header}>Other Considerations</h3>

					<div className={s.container}>
						<div className={s.left}  dangerouslySetInnerHTML={{__html: data.other_considerations}}>
						
							{/* <p>
								Zomato Limted was incorporated as "DC Foodiebay Online Services Private Limited" in 2010.
								The Company's Technology platform connects customers, restaurant partners, and delivery
								partners, serving their multiple needs. As of December 31, 2020, Zomato Limited was present
								in 526 cities in India, with 350,174 Active restaurant listings. It also has a presence in
								23 countries across the globe.
							</p>

							<div className={s.columns}>
								<div>
									<h6>Parent Organisation</h6>
									<span>Zomato Ltd.</span>
								</div>
								<div>
									<h6>Founded</h6>
									<span>2010</span>
								</div>
								<div>
									<h6>Managing Director</h6>
									<span>Deepinder Goyal</span>
								</div>
							</div>

							<div className={s.list}>
								<div className={s.item}>
									<div />
									<span>
										The company also has a history of net losses and chances of increased expenses in
										the future
									</span>
								</div>

								<div className={s.item}>
									<div />
									<span>
										The company also has intense competition in food delivery and other businesses
									</span>
								</div>

								<a href="/">Read More</a>
							</div> */}
						</div>
						{data.consideration_image ?
							<div className={s.right}>
								<img src={`${CMS_URL}${data.consideration_image}`} alt={data?.issue_name} />
							</div>
							:
							<div className={s.right}>
								<img src={othimgplaceholder} alt={data?.issue_name} />
							</div>
						}


					</div>
				</section>
			 }	
			{openIssue.length > 1 &&
				<section className={s.section7}>
					<div className={s.header}>Others also invested in</div>

					<div className={s.cards}>
						{openIssue.map((e,i) => {
							return e?.issuecode !== details.issuecode && 
							<Section1Card
								img={e.cmsdata?.logo?`${CMS_URL}${e.cmsdata?.logo}`:NoImg }
								title={e.schname} 
								subHeading={`Range ₹${e.lowprice} - ₹${e.cutoff}`}
								event={`Invest by ${new Date(e.opndt).toLocaleDateString('en-IN', {
									day: '2-digit',month: 'short'})} - ${new Date(e.clsdt).toLocaleDateString('en-IN', {
										day: '2-digit',month: 'short'})}`}
								button="Apply Now"
								top={e.cmsdata?.tag}
								background={`linear-gradient(321deg, ${e?.cmsdata?.card_color_left?e?.cmsdata?.card_color_left:'#fff'}, ${e?.cmsdata?.card_color_right})`}
								color={e.cmsdata?.badge_color}
								topbackground = {e.cmsdata?.tag_color}
								issueCode={e?.issuecode}
								history={history}
								iscolor={(e?.cmsdata?.card_color_left && e?.cmsdata?.card_color_left !== '#ffffff')?'Y':'N'}								
							/>
							
						})}

						{/* <Section1Card
							img={SovereignGoldImg}
							title="IIFL Home Finance Bonds"
							subHeading="Invest minimum ₹1,13,500"
							event="Invest by 04 - 09 Aug"
							button="Get 11.05% Fixed Returns "
							top="Fixed Reurns"
							background="linear-gradient(148deg, #21f3f3 -23%, #214cf3 92%)"
							color="#241f55"
						/> */}
					</div>
				</section>
			}
		</div>
		<BrokerRecomendation analystdata={brokerrecomendation}/>
		</>
	);
};

export default IPODetails;
