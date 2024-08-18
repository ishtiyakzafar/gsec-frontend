import s from './LandingPage.module.scss';
import { Fragment, useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import OneUpLogo from '../../assets/images/LandingPage/OneUp_Logo_132x40_px@3x.png';
import PoweredByLogo from '../../assets/images/LandingPage/IIFLSec.png';
import HeadstartImg from '../../assets/images/LandingPage/Headstart_338x288.svg';
import HeadstartMobileImg from '../../assets/images/LandingPage/Group 18083.svg';
import PatternImg from '../../assets/images/LandingPage/Pattern_328 px.svg';
import ZomatoImg from '../../assets/images/zomato.png';
import IciciImg from '../../assets/images/LandingPage/icici@3x.png';
import IIFLImg from '../../assets/images/LandingPage/iifl.png';
import CanaraImg from '../../assets/images/LandingPage/canara@3x.png';
import HDFCImg from '../../assets/images/LandingPage/hdfc.png';
import ImgPattern from '../../assets/images/LandingPage/ImgPattern.svg';
import SovereignGoldImg from '../../assets/images/LandingPage/Soverign Gold Bonds_48 Px@3x.png';
import GlenmarkImg from '../../assets/images/LandingPage/60caa3fbab9c466@3x.png';
import PeopleImg from '../../assets/images/LandingPage/people_black_24dp (1)@3x.png';
import EventImg from '../../assets/images/LandingPage/event_black_24dp (1)@3x.png';
import NextArrowImg from '../../assets/images/LandingPage/Group 3118.svg';
import PrevArrowImg from '../../assets/images/LandingPage/Group 3118 (1).svg';
import MinusButtonImg from '../../assets/images/LandingPage/Group 15346.svg';
import PlusButtonImg from '../../assets/images/LandingPage/Group 15345.svg';
import ArrowImg from '../../assets/images/LandingPage/Arrow@3x.png';
import TickImg from '../../assets/images/LandingPage/check_circle_black_24dp@3x.png';
import videoImg from '../../assets/images/LandingPage/NoPath - Copy (13)@3x.png';
import GoldPattern from '../../assets/images/LandingPage/Group 13677.svg';
import RhinoImg from '../../assets/images/LandingPage/rhino.png.jpg';
import GoldBarImg from '../../assets/images/LandingPage/goldBar.png';
import GreenCircleImg from '../../assets/images/LandingPage/Group 15347.svg';
import HDFCImgHor from '../../assets/images/LandingPage/Image 29@3x.png';
import classnames from 'classnames';
import { nanoid } from 'nanoid';
import Footer from '../Footer/Footer';
import { getInDemandIssuesFromCms, getOpenIssuesList,getOpenIssuesDetails, getUpcomingIssuesList,getSubs,logOutUser,validthirdpartycheck,zohoCreateToken,getSgbDetails } from '../../services/issuesServices';
import {
	dateToDaysFormatter,
	formatNumbers,
	BondCardDateFormatter,
	dateToRemainingTimeFormattor
} from '../../helpers/utils';
import VideoSlider from '../UIComponents/VideoSlider';
import SectionSlider from '../UIComponents/SectionSlider';
import useWindowDimensions from '../../hooks/screenWidth';
import SearchIcon from '../../assets/images/SideBar/search_white.svg';
import Login from '../Login';
import { useDispatch,useSelector,connect } from 'react-redux';
import { CMS_URL,clevertap_key,CMS_API_URL } from '../../vars/url';
import { Link,useHistory  } from 'react-router-dom';
import { loggedIn as userAction } from '../../store/action/loggedIn.action';
import { applicationData } from '../../store/action/applicationData';
import ClevertapReact from 'clevertap-react';
import { LazyLoadComponent,LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import stars from '../../assets/images/stars.svg';
import ellipse from '../../assets/images/ellipsestars.svg';
import SweetAlert from 'react-bootstrap-sweetalert';
import LoaderImg from '../../assets/images/loader.svg';
import GsecSection from '../GsecDetails/LandingScreen/GsecSection';

const Section1Card = ({
	issue_type,
	logo,
	upper_tag_logo,
	title,
	card_color_left,
	card_color_right,
	apply_button_text,
	issuecode,
	invest_minimum_amount,
	invest_within,
	top,
	subHeading,
	event,
	button,
	background,
	color,
	expiry_date,
	subsdata,
	openipodt,
	issue_name,
	user,
	applyipoind,
}) => {
	const { width } = useWindowDimensions();
	const history = useHistory();
	const handleClicksec = (issuecode,issue_type='IPO') => {
		ClevertapReact.initialize(clevertap_key);
		ClevertapReact.event("In-Demand	Know More",{
			'path':window.location.hostname,
			'client-type': Object.keys(user).length > 0 ? user.user.clientType : 'Pre-login',
			'client-code': Object.keys(user).length > 0 ? user.user.clientCode : 'Pre-login',
			'user-agent':navigator.userAgent,
			'app-source':Object.keys(user).length > 0 ? (user?.user?.AppSource ? user?.user?.AppSource  : 25) : 25,
			"Source":"Landing Page",
			"issue-Type":issue_type,
			"Issuecode":issuecode})
		if(issue_type === 'IPO')
		{
			//ClevertapReact.event("IPO Detail Page")
			history.push("/ipo_details/"+issuecode)
			
		}
		else if(issue_type === 'NCD')
		{
			//ClevertapReact.event("NCD Detail Page")
			history.push("/ncd_details/"+issuecode)
		}
		else
		{
			//ClevertapReact.event("SGB Detail Page")
			history.push("/sovereign_gold_bond_details")
		}
	}

	// get price and date from broking api
	var mandatebond = ''
	var mandateprice = ''
	var mndtdateclos = ''
	var noOfmandateBond = 0
	var allisue = JSON.parse(localStorage.getItem("alloppor"));
	if(allisue)
	{
		var thisissue = allisue.filter(function(v, i) {
			return (v.issuecode == issuecode);
		})	

		var thisissue = thisissue[0]

		mandatebond = thisissue?.noOfMandatoryBonds
		mandateprice = thisissue?.lowprice
		//mndtdateclos = new Date(thisissue?.clsdt).toLocaleDateString('en-IN', { weekday:"long", year:"numeric", month:"short", day:"numeric"})
		mndtdateclos = new Date(thisissue?.clsdt).toLocaleDateString('en-IN', {day:'2-digit',month: '2-digit',year: 'numeric'})
	}
	//end get price and date from broking api


	// Styling color
	if(issue_type === 'IPO')
	{
		card_color_left="#4940a9";
		card_color_right="#241f55";
	}
	else if(issue_type === 'NCD')
	{
		card_color_left="#21f3f3";
		card_color_right="#214cf3";
	}
	else
	{
		card_color_left="#f8e150";
		card_color_right="#853f02";
	}
	// End Styling color

	return (
		<div
			className={s.card+" animate__animated animate__fadeIn hover-animate"}
			style={{ background: `linear-gradient(321deg,  ${card_color_right}, ${card_color_left})` }}
		>
			
			{upper_tag_logo !== 'none' &&				
				<div className={s.top+" animate__animated animate__zoomIn"}>
					<span>
						<img src={`${CMS_API_URL}/icons/${upper_tag_logo}.svg`} alt={upper_tag_logo} />
						
							{upper_tag_logo === 'fire' && 'On fire!'}
							{upper_tag_logo === 'percentage' && 'Tax benefits'}
							{upper_tag_logo === 'rupees' && 'Fixed returns'}
						
					</span>
				</div>
			}

			{width > 768 && <img src={`${CMS_URL}${logo}`} alt={issuecode} />}
			
			<div className={s.body}>
				
				{width > 768 ? (
					<Fragment>
						<h3 style={card_color_left === '#ffffff' ? {color:'#000'} : {width:'initial'} }>{issue_name}</h3>
						{/* {subsdata &&
							<span style={{color:'#fff'}}>							
								IPO subscribed by {(subsdata*100).toFixed(2)}%
							</span>
						} */}
						
						
						
					</Fragment>
				) : (
					<div className={s.mobileHead}>
						<img src={`${CMS_URL}${logo}`} alt={issuecode} />
						<div className={s.heading}>
							<h3 style={card_color_left === '#ffffff' ? {color:'#000'} : {width:'initial'} }>{issue_name}</h3>
							{/* <div className={s.subHeading}>
								{openipodt.map((e,litm) => {
									if(issuecode==e.issuecode){
										return (
											<>
												<span style={card_color_left === '#ffffff' ? {color:'#000'} : {width:'initial'} }>Invest minimum ₹{e.lowprice*e.lotsize}</span>
												<span className={s.light} style={card_color_left === '#ffffff' ? {color:'#000'} : {width:'initial'} }>/ {e.lotsize} Shares </span>
											</>
										)
									}
									
								})}
							</div> */}
							{/* <div className={s.sgbdetailssubindeemand}>
								{(issue_type==='SGB' || issue_type==='NCD') &&
									<>
										<span style={card_color_left === '#ffffff' ? {color:'#000'} : {width:'initial'} }>Invest minimum ₹ {mandateprice*(mandatebond || 1)}/ {mandatebond || 1} Shares</span>
									<span className={s.investby}><img src={EventImg}  alt="Invest" /><span>Invest Before {mndtdateclos} 5:00 PM.</span></span>
									</>
								}
							</div> */}
						</div>
					</div>
				)}

						<div className={s.subHeading}>
							<span className={s.light}>
								{openipodt.map((e,litm) => {
										if(issuecode==e.issuecode){
											return (
												<>
													<span style={card_color_left === '#ffffff' ? {color:'#000'} : {width:'initial'} }>Invest minimum ₹{e.lowprice*e.lotsize}</span>
													<span className={s.light} style={card_color_left === '#ffffff' ? {color:'#000'} : {width:'initial'} }>/ {e.lotsize} Shares </span>
												</>
											)
										}
										
									})}								
							</span>
						</div>

					<div className={s.sgbdetailssubindeemand}>
						
						{(issue_type==='SGB' || issue_type==='NCD') &&
							<>
							
								<span style={card_color_left === '#ffffff' ? {color:'#000'} : {width:'initial'} }>Invest minimum ₹ {mandateprice*(mandatebond || 1)}/ {mandatebond || 1} Shares</span>
								<span className={s.invest}><img src={EventImg}  alt="Invest" /><span>Invest Before {mndtdateclos} 5:00 PM.</span></span>
							</>
						}
					</div>
				
					
					{openipodt.map((e,litm) => {
						if(issuecode==e.issuecode){
							return (
								<>
								<div className={s.invest}>
									<img src={EventImg} style={card_color_left === '#ffffff' ? {filter:'invert(1)'} : {filter:'inherit'}} alt="Invest" />
										<span style={card_color_left === '#ffffff' ? {color:'#000'} : {width:'initial'} }>Invest Before {new Date(e.clsdt).toLocaleDateString('en-IN', {
									day:'2-digit',month: '2-digit',year: 'numeric'})} 5:00 PM.</span>
								</div>
								</>
							)
						}							
					})}					
				
			</div>

			<div className={s.buttons}>
				<button className={s.button} style={card_color_left === '#ffffff' ? {color:'#000',background:'#ccc'} : {width:'inherit'} } onClick={() => handleClicksec(issuecode,issue_type)}>
					{/* {apply_button_text ? apply_button_text : 'Apply Now'} */}
					Know More
				</button>

				{/* {Object.keys(user).length > 0 && <button className={s.button2} onClick={() => applyipoind(issuecode)} >Apply Now</button> } */}
			</div>
		</div>
	);
};

const Section1BigCard = ({
	logo,
	upper_tag_logo,
	card_color_left,
	card_color_right,
	apply_button_text,
	issuecode,
	invest_minimum_amount,
	invest_minimum_shares,
	invest_within,
	subscriptions,
	know_more,
	expiry_date,
	subsdata,
	openipodt,
	issue_name,
	user,
	applyipoind,
}) => {
	const { width } = useWindowDimensions();
	const history = useHistory();
	const handleClicksec = (issuecode) => {

		// console.log(user.user.clientCode);
		// console.log('test',user.user);
		// return false;
		ClevertapReact.initialize(clevertap_key);
		ClevertapReact.event("In-Demand	Know More",{
			'path':window.location.hostname,
			'client-type': Object.keys(user).length > 0 ? user.user.clientType : 'Pre-login',
			'client-code': Object.keys(user).length > 0 ? user.user.clientcode : 'Pre-login',
			'user-agent':navigator.userAgent,
			'issue-Type':'ipo',
			'app-source':Object.keys(user).length > 0 ? (user?.user?.AppSource ? user?.user?.AppSource  : 25) : 25,
			'Source':'Landing Page',
			'Issuecode':issuecode})
		
			history.push("/ipo_details/"+issuecode)		
	}
	card_color_left="#4940a9";
	card_color_right="#241f55";
	return (
		<div className={s.card1+' '+s.bigCardInDeemand+" animate__animated animate__fadeIn hover-animate"} style={{ background: `linear-gradient(321deg,  ${card_color_right}, ${card_color_left})` }} >
			
			{upper_tag_logo !== 'none' &&
				<div className={s.top+" animate__animated animate__zoomIn"}>
					<span>
						<img src={`${CMS_API_URL}/icons/${upper_tag_logo}.svg`} alt={upper_tag_logo} />
						{upper_tag_logo === 'fire' && 'On fire!'}
						{upper_tag_logo === 'percentage' && 'Tax benefits'}
						{upper_tag_logo === 'rupees' && 'Fixed returns'}
						{upper_tag_logo === 'discount' && 'On discount'}
					</span>
				</div>
			}
			{width > 768 && <img src={`${CMS_URL}${logo}`} style={{borderRadius:'50%'}} alt={issuecode} />}

			<div className={s.right}>
				{width > 768 ? (
					<Fragment>
						<h3 style={card_color_left === '#ffffff' ? {color:'#000'} : {width:'initial'} }>{issue_name}</h3>
						<div className={s.subHeading}>
							{openipodt.map((e,litm) => {
								if(issuecode==e.issuecode){
									return (
										<>
											<span style={card_color_left === '#ffffff' ? {color:'#000'} : {width:'initial'} }>Invest minimum ₹{e.lowprice*e.lotsize}</span>
											<span style={card_color_left === '#ffffff' ? {color:'#000'} : {width:'initial'} } className={s.light}>/ {e.lotsize} Shares </span>
										</>
									)
								}
								
							})}
							
							

							
						</div>
					</Fragment>
				) : (
					<div className={s.mobileHead}>
						<img src={`${CMS_URL}${logo}`} alt={issuecode} />
						<div className={s.heading}>
							<h3>{issue_name}</h3>
							<div className={s.subHeading}>
								{openipodt.map((e,litm) => {
									if(issuecode==e.issuecode){
										return (
											<>
												<span style={card_color_left === '#ffffff' ? {color:'#000'} : {width:'initial'} }>Invest minimum ₹{e.lowprice*e.lotsize}</span>
												<span style={card_color_left === '#ffffff' ? {color:'#000'} : {width:'initial'} } className={s.light}>/ {e.lotsize} Shares </span>
											</>
										)
									}
									
								})}
							</div>
						</div>
					</div>
				)}

				
					<div className={s.sub}>
						<img src={PeopleImg} alt="Subscription" />
						{subsdata ?
							<span>							
								IPO subscribed by {(subsdata*100).toFixed(2)}%
							</span>
							:
							<span>
								Subscription count will be updated soon
							</span>
						}
					</div>
				

				<div className={s.invest}>
					
					{openipodt.map((e,litm) => {
						if(issuecode==e.issuecode){
							return (
								<>
								<img src={EventImg} style={card_color_left === '#ffffff' ? {filter:'invert(1)'} : {filter:'inherit'} } alt="Invest" />
									<span style={card_color_left === '#ffffff' ? {color:'#000'} : {width:'initial'} }>Invest Before {new Date(e.clsdt).toLocaleDateString('en-IN', {
								day:'2-digit',month: '2-digit',year: 'numeric'})} 5:00 PM.</span>
								</>
							)
						}							
					})}
					
					
				</div>

				<div className={s.buttons}>
					<button className={s.button1} onClick={() => handleClicksec(issuecode)} style={card_color_left === '#ffffff' ? {color:'#000',background:'#ccc'} : {maxwidth:'initial'} }>Know More</button>

					<button className={s.button2} onClick={() => applyipoind(issuecode)} style={card_color_left === '#ffffff' ? {color:'#000',background:'#ccc'} : {maxwidth:'initial'} } >Apply Now</button> 
					{/* {know_more && <button className={s.button2} onClick={() => handleClicksec(issuecode)} ></button>} */}
				</div>
			</div>
			<img className={s.stars} src={stars} alt="star" />
		</div>
	);
};

const LandingPage = ({ toggleLogin }) => {
	//localStorage.removeItem('user');

	const user = useSelector((state) => state.loggedIn);
	const applicationDataState = useSelector((state) => state.applicationData);
	//console.log('applicationDataState',applicationDataState)
	const { width } = useWindowDimensions();
	const history = useHistory();
	const [ aplynwlgin,setaplynwlgin ] = useState('');
	const [ notifyemail,setnotifyemail ] = useState(user?.user?.email || '');
	let dispatch = useDispatch();
	// console.log(user);
	const [ inDemandCards, setInDemandCards ] = useState([]);
	const [ inDemandCards2, setInDemandCards2 ] = useState([]);
	const [ checkIndemand, setcheckIndemand ] = useState(true);

	const [sgbdata,setSgbData] = useState([])
	const [sgbprice,setSgbPrice] = useState(2770)
	const [leftTime,setLeftTime] = useState({days:0,hours:0,minutes:0,seconds:0})
	const [hidealert,setHideAlert] = useState(false)
	const [ login, setLogin ] = useState(false);


	const videoItems = useRef([ 'tbRdAJOcJqk','l2gTWyjId9g', 'weNwnd-sx_8', 'BYE6CycJW-s', 'bqDdDMCj05g' ]);

	const [ SGBIssueList, setSGBIssueList ] = useState([]);
	const [ ipoissuelist, setipoissuelist ] = useState([]);
	const [ ncdissuelist, setncdissuelist ] = useState([]);
	const [ gsecissuelist, setgsecissuelist ] = useState([]);
	const [ indemandexist, setindemandexist ] = useState(true);
	const [ countipo, setcountipo ] = useState(0);
	const [ countncd, setcountncd ] = useState(0);
	const [ isallexist, setisallexist ] = useState(true);
	const [ loading, setLoading ] = useState(false);
	const [ toRedirect, setoRedirect ] = useState('');
	const [ swalert,setalert ] = useState('');
	const [ alertType,setalertType ] = useState(false);
	// const [ youtube, setYoutube ] = useState(false);

	

	const fetchIssues = (category) => {
		getOpenIssuesList(category)
			.then((result) => {
				if (result && result.data && result.data.isSuccess && result.data.statusCode === 200) {
					// console.log(category, result);
					setSGBIssueList(result.data.resultData);
					//console.log('akkipooo',result);
				}
			})
			.catch((error) => {
				console.log(error);
				// setError(error)
			});
	};

	const fetchIssuesIPO = (category) => {
		getOpenIssuesList(category)
			.then((result) => {
				if (result && result.data && result.data.isSuccess && result.data.statusCode === 200) {
					// console.log(category, result);
					setipoissuelist(result.data.resultData);
					//console.log('akkipooo',result);
				}
			})
			.catch((error) => {
				console.log(error);
				// setError(error)
			});
	};

	const fetchInDemand = async () => {
		try {
			//let { data: { result } } = await getInDemandIssuesFromCms();
			let {data} = await getInDemandIssuesFromCms();
			let result = data.result
			if(data?.statusCode !== 200)
			{
				//alert('ukkp')
				setindemandexist(false)
			}
			else
			{
				try
				{
					result.map((e,i) => {
						getSubs(e.co_code).then(response => {
							let subres = []
							subres = response?.data
							//alert(i)
							var fres = subres.filter(function(v, i) {
								return (v.Category == "Retail Individual Investors (RIIs)" && v.SubCategory == "");
							  })
							  
							  result[i].subsdata = fres[0].NoOfTimesOfTotalMeantForTheCategory;
						}).catch(error => {
							console.log(error)						
						})
					})
				}
				catch(error)
				{
					alert(error)
				}
				
				setInterval(() => {
					setInDemandCards2(result);
				}, 100);
				//console.log('xxcc=>',result)

			}
		
		} catch (error) {
			setindemandexist(false)
			console.log(error);
		}

		// setTimeout(function(){
		// 	setYoutube(true)
		//  }, 5000);

	};

	const fetchthirdpart = async () =>{
		const urlSearchParams = new URLSearchParams(window.location.search)
		const urltoken = urlSearchParams.get('token');
		const requestercode = urlSearchParams.get('RequesterCode');
		let AppSource = urlSearchParams.get('AppSource');
		let redir = urlSearchParams.get('P');
		//alert(AppSource)
		if(urltoken)
		{
			setLoading(true);
			try {
				let  data = await validthirdpartycheck(urltoken,requestercode);
				//console.log('tptdata',data)

				//return false;
				//localStorage.clear();
				localStorage.removeItem('WZRK_ARP');
				localStorage.removeItem('WZRK_EV');
				localStorage.removeItem('WZRK_G');
				localStorage.removeItem('WZRK_L');
				localStorage.removeItem('WZRK_META');
				localStorage.removeItem('WZRK_PR');

				if(data.data.statusCode == 200 && data.data.isSuccess == true){

					var token = data.data.resultData.token;
					let clientdetails = {
						"panNo": "",
						"firstName": "",
						"fullname": data.data.resultData.clientName,
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
						"bankName": data.data.resultData.bankName,
						"bankAccountNo": data.data.resultData.bankAccountNo,
						"upiHandle": data.data.resultData.upiHandle,
						"upiName": data.data.resultData.upiName,
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


					ClevertapReact.initialize(clevertap_key);
					

						var payload = {
							"Site": {
							"Identity":data.data.resultData.clientCode,
							"email": '',
							"loginId": data.data.resultData.requesterCode,
							"mobileNo":'',
							"client-type": 'IIFLCLIENT',											
							"client-code": data.data.resultData.clientCode,
						}
						}
						// console.log('payload',payload)
						ClevertapReact.profile(payload)
						
					setTimeout(() => {
						if(redir == 'H')
						{
							window.location.replace("/your_applications");
							
						}
						else if (redir == 'L') {
							window.location.replace("/");
						}
						else if(redir?.length > 1)
						{
							setoRedirect(redir)
							//window.location.replace("/ipo_details/"+redir);
						}
						else
						{
							window.location.replace("/");
						}
					}, 1000);
					
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
		else
		{
			
			ClevertapReact.initialize(clevertap_key);				   
			ClevertapReact.event("IPO_Home Page Viewed",{
				'path':window.location.hostname,
				'client-type': Object.keys(user).length > 0 ? user.user.clientType : 'Pre-login',
				'user-agent':navigator.userAgent,
				'app-source':Object.keys(user).length > 0 ? (user?.user?.AppSource ? user?.user?.AppSource  : 25) : 25,
			})
		}
	}

	const fetchSgbDetails = () =>{
		console.log('called in useffect landingpage')
		// console.log('user details',user.user.clientType)
		let response = getSgbDetails()
      		response
        		.then(res => {
          			console.log('landingpagesgb',res.data.resultData[0])
          			fetchSgbData(res.data.resultData[0])
					getRemainingTimeToApply(res.data.resultData[0].clsdt)
					setSgbPrice(res.data.resultData[0].highprice)
        		})
        		.catch(err => console.log(err))
	}
	const fetchSgbData =(data) =>{
		// console.log('etchsgb called')
		setSgbData(data)
		//console.log(sgbdata)
	}
	const handleSGBApply = () =>{
		// console.log('handlesgbapply')
		if(Object.keys(user).length > 0 ){
			if(user.user.clientType === 'NONIIFLCLIENT'){
			  setHideAlert(true)
			}else{
			  setHideAlert(false)
			  history.push('/sgb_apply')
		  
			}
		  }else{
			toggleLogin(!login)
		  }
		  
	}
	const handleALertBox = () =>{
		setHideAlert(false)
	}

	const allexist = async () => {
		
		//let {data :{statusCode}} = await getOpenIssuesList('all');
		

		let {data} = await getOpenIssuesList('all');
		
		if(data.statusCode === 404)
		{
			setisallexist(false)
		}
		else
		{
			localStorage.setItem('alloppor', JSON.stringify(data.resultData));
			let ipolist = data.resultData.filter(function(v, i) {
				return (v.category.trim() == "IPO");
			})

			let ncdlist = data.resultData.filter(function(v, i) {
				return (v.category.trim() == "BOND");
			})

			let sgblist = data.resultData.filter(function(v, i) {
				return (v.category.trim() == "SGB");
			})

			let gseclist = data.resultData.filter(function(v, i) {
				return (v.category.trim() == "GS" || v.category.trim() == "TB" || v.category.trim() == "SD");
			})
			
			setipoissuelist([...ipolist]);
			setncdissuelist([...ncdlist]);
			setgsecissuelist([...gseclist]);

			if(sgblist[0])
			{
				fetchSgbData(sgblist[0])
				getRemainingTimeToApply(sgblist[0].clsdt)
				setSgbPrice(sgblist[0].highprice)
			}

			//console.log('adddddlldta',sgblist)
		}
	}

	const redirectToDetails = async () => {
		
		if(toRedirect === '')
		{			
			return false;
		}
		var allisue = JSON.parse(localStorage.getItem("alloppor"));
		if(allisue)
		{
			var isstyTypeNI = allisue.filter(function(v, i) {
				return (v.issuecode == toRedirect);
			})
			if(isstyTypeNI[0]?.category.trim() == "BOND")
			{
				window.location.replace("/ncd_details/"+toRedirect);
			}
			else if(isstyTypeNI[0]?.category.trim() == "IPO")
			{
				window.location.replace("/ipo_details/"+toRedirect);
			}			
			else if(isstyTypeNI[0]?.category.trim() == "SGB")
			{
				window.location.replace("/sovereign_gold_bond_details/");
			}
			else
			{
				window.location.replace("/");
			}
			
		}
	}

	const finalizeIndemand =  async () => {
		//console.log('dasd')
		// if(inDemandCards.length < 1 || checkIndemand === false )
		// {
		// 	return false
		// }
		
		//setcheckIndemand(false)

		//console.log('dasdas');
		var allisue = JSON.parse(localStorage.getItem("alloppor"));
		if(allisue)
		{
			// Get array column name only 
			var issuecdarr =  allisue.map(x=>x['issuecode'])
			
			var indemFinal = inDemandCards2.filter(function(v, i) {
				return (issuecdarr.includes(v.issuecode));
			})
			setInDemandCards(indemFinal)
			
		}
	}

	useEffect(() => {		
		//fetchIssues('SGB');
		//fetchIssuesIPO('IPO');
		fetchInDemand();		
		allexist();
		fetchthirdpart();
		//fetchSgbDetails();
	}, []);

	useEffect(() => {
		redirectToDetails();
	}, [toRedirect]);

	
	useEffect(() => {
		finalizeIndemand();
	}, [inDemandCards2]);


	const [ counter, setCounter ] = useState(1);

	const handleCounter = (action) => {
		if (action === 'add') {
			setCounter((counter) => counter + 1);
			setSgbPrice(sgbdata.highprice * (counter + 1))
		} else {
			if (counter !== 1 && sgbprice >=sgbdata.highprice) {
				setCounter((counter) => counter - 1);
				setSgbPrice(sgbprice - sgbdata.highprice)
			}
		}
	};

	const getGoldReturnsEightYears = (goldprice) =>{
		let totalReturns = (goldprice * counter) * [1 + (8 * 2.5) / 100] + (goldprice * counter) * (0.2);
		return Number(totalReturns).toLocaleString()
	  }
	  const getRemainingTimeToApply =(closeDate) =>{
		// Set the date we're counting down to
		var countDownDate = new Date(closeDate).getTime();
  
		// Update the count down every 1 second
		// eslint-disable-next-line no-unused-vars
		var x = setInterval(function() {
		
		  // Get today's date and time
		  var now = new Date().getTime();
  
		  // Find the distance between now and the count down date
		  var distance = countDownDate - now;
  
		  // Time calculations for days, hours, minutes and seconds
		  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
		  // Output the result in an element with id="demo"
		  // document.getElementById("demo").innerHTML = days + "d " + hours + "h "
		  // + minutes + "m " + seconds + "s ";
		  setLeftTime({days:days,hours:hours,minutes:minutes,seconds:seconds})
  
		  // If the count down is over, write some text 
		  // if (distance < 0) {
		  //   clearInterval(x);
		  //   document.getElementById("demo").innerHTML = "EXPIRED";
		  // }
		}, 1000);
		
	  }

	const logoutuser = () => {
		let user = JSON.parse(localStorage.getItem('user'))
		if(user && user?.token)
		{
			logOutUser({"Token":user?.token}).then(response => {
				if(response.data.isSuccess === true && response.data.statusCode === 200)
				{
					localStorage.removeItem('user');
					window.location.reload(); 
				}
				else
				{
					localStorage.removeItem('user');
					window.location.reload(); 
				}
			});
		}
		
	};

	const applyipoind = async (issuecode) => {
		//alert(issuecode)
		ClevertapReact.initialize(clevertap_key);
		// ClevertapReact.event("IPO_Login Initiated",{
		// 	"Source":"IPO HomePage ApplyNow",})
		ClevertapReact.event("In-Demand	Apply Now",{
			'path':window.location.hostname,
			'client-type': Object.keys(user).length > 0 ? user.user.clientType : 'Pre-login',
			'client-code': Object.keys(user).length > 0 ? user.user.clientcode : 'Pre-login',
			'user-agent':navigator.userAgent,
			'issue-Type':'ipo',
			'app-source':Object.keys(user).length > 0 ? (user?.user?.AppSource ? user?.user?.AppSource  : 25) : 25,
			'Source':'Landing Page',
			'Issuecode':issuecode})
		
		
		if(aplynwlgin !== '' && Object.keys(user).length > 0)
		{
			let {data} = await getOpenIssuesDetails(issuecode);
			//console.log('oppaa=>',data.resultData)
			let details = data.resultData
		
			dispatch(
				applicationData({
					...applicationDataState,
					ipodetails : details,
					IPOBondName :details.issuecode,
					noOfShares:[parseInt(details.lotsize)],
					sharePrice:[details.highprice],
					bidPrice:[parseFloat(details.highprice)],
					totalbidprice :[parseFloat(details.highprice*details.lotsize)],
					cutOff:["Y"],
					exchangetype:details.exchangeType
				})
			);

			history.push("/application_process")
		}else{
			
			setaplynwlgin(issuecode);
			if(Object.keys(user).length < 1)
			{
				toggleLogin();
			}			
		}
		
	}

	

	useEffect(() => {
		// updated useerdeails
		if(aplynwlgin !== '')
		{
			if(Object.keys(user).length > 0 ){
				//alert('upuum')
				applyipoind(aplynwlgin)
			}
		}
		
		}, [user,aplynwlgin]);

	const checkcountipo = (count) => {
		setcountipo(count)
	}

	const checkcountncd = (count) => {
		setcountncd(count)
	}

	

	const notifyme = () => {
		ClevertapReact.initialize(clevertap_key);
		var clienttype = 'Pre-Login'
		if(user?.user?.clientType)
		{
			 clienttype = user?.user?.clientType
		}

		if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(notifyemail))
		{
			setalert('invalid E-mail ID')
			setalertType(false);
			return false
		}

		var payload = {
			"Site": {
			 "email": notifyemail,
			 "client-type": clienttype,
			 "interested": "Y",
			 "client-code": user?.user?.panNo,
		   }
		  }
		 // console.log('payload',payload)
		  ClevertapReact.profile(payload)
		  setalert('You wil be notified if there is any opportunities')
		  setalertType(true);
		  setnotifyemail('');
	}

	const hidesweeetalert = () => {
		setalert('')
		}
	return (
		<div className={s.main}>

			{swalert != '' &&
				<SweetAlert
				custom
				error
				success={alertType}
				title="Alert!"
				cancelBtnText="Back to home"
				cancelBtnBsStyle="light"
				onConfirm={hidesweeetalert}				
				>
				{swalert}
				</SweetAlert>
			}

			{loading == true && 
                        <div className="loading_screen loading_inside">
                            <img src={LoaderImg} alt="loading..." />                            
                        </div>
                    }

			{width > 768 && <img src={PatternImg} alt="Pattern" className={s.patternImg} />}
			<div className={s.Ellipse245} />
			{/* <img src={GoldPattern} alt="Gold Pattern" className={s.goldPattern} /> */}

			<nav className={s.navbar}>
				<div className={s.left}>
					{width > 768 && (
						<div className={s.logo} onClick={() => history.push("/")}>
							{/* <img src={OneUpLogo} alt="OneUp" /> */}
							<LazyLoadImage
									alt="OneUp"
									effect="blur"
									src={OneUpLogo} />
							<span>Powered by 
									<LazyLoadImage
									alt="OneUp"
									effect="blur"
									className={s.poweredBy}
									src={PoweredByLogo} />
								{/* <img src={PoweredByLogo} alt="Powered by IIFL" className={s.poweredBy} /> */}
							</span>
						</div>
					)}

					<h1>
					{Object.keys(user).length > 0 ? (
								<>
								Hello {user.user.fullname ? user.user.fullname : user.user.clientcode },<br/>
								<span>There are great opportunities lined up for you today!</span>
								</>
							) 
							:
							<>
								{width > 768 ? (
										'Your head-start on Incredible investment opportunities!'
									) : (
										'Head-start your investment opportunities!'
									)}
							</>
					}						
					</h1>
				</div>

				<div className={s.right}>
					{width > 768 && (
						<Fragment>
							{Object.keys(user).length > 0 ? (
								<>
								{/* <div className={s.userdetails}>									
									<img src='/usericon.png' />
									<div className={s.userdtt}>
										{user.user.firstName ?
											<h4>{user.user.firstName} {user.user.middleName} {user.user.surName}</h4>
										:
											<h4>{user.user.mobileNo}</h4>
										}
										<p>{user.user.panNo}</p>
									</div>
								</div> */}
								<div className={s.loginbtns}>
									<button onClick={() => history.push("/your_applications")} className={s.loginstatus + " hover-animate"}>View Status</button>
									
									{(() => {
  
										if(user?.user?.AppSource != "1" && user?.user?.AppSource != "5" && user?.user?.AppSource != "6" && user?.user?.AppSource != "10" && user?.user?.AppSource != "0")
										{
											return <button className="hover-animate" onClick={() => logoutuser()}>Logout</button>
										}

									})()}
									


									
								</div>
								</>
							) : (
								<button className="hover-animate" onClick={() => {toggleLogin(); 	
								// ClevertapReact.initialize(clevertap_key);		   
								// ClevertapReact.event("IPO_Login Initiated",{
								// 	"Source":"IPO HomePage",
								//   })
								}}>Login</button>
							)}
						</Fragment>
					)}
					{/* {width < 768 && (
						<>
						{Object.keys(user).length === 0 && (
							<button onClick={() => toggleLogin()}  style={{float: 'right',padding: '10px 25px',
								fontSize: '14px',
								lineHeight: 1,
								height:' max-content'}}>Login</button>
						)}
						</>
					)} */}
					
					{/* <img src={width > 768 ? HeadstartImg : HeadstartMobileImg} alt="Headstart" /> */}
					{width > 768 ? <LazyLoadImage
									alt="Headstart"
									effect="blur"
									delayTime="3000"
									src={HeadstartImg} /> : <LazyLoadImage
									alt={"Headstart"}
									effect="blur"
									delayTime="3000"
									src={HeadstartMobileImg} />}
				</div>
			</nav>
			
			{indemandexist &&
				<LazyLoadComponent>
					<section className={s.section1}>
						<h3 className={s.header1}>In Demand</h3>

						<div className={s.cards}>
							
								{inDemandCards.length < 1 &&
									<>
										<div className={s.shimmers}>
											<div className={s.shimmeritem}>									
											</div>
											<div className={s.shimmeritem}>
											</div>
											<div className={s.shimmeritem}>
											</div>
										</div>
									</>
								}
							{inDemandCards.map((e,itm) => {
								return <Fragment>{e.card_type === 1 && <Section1BigCard {...e} openipodt={ipoissuelist} user={user} applyipoind={applyipoind} />}</Fragment>;
							})}

							{inDemandCards.map((e,itm) => {
								return <Fragment>{e.card_type === 0 && <Section1Card {...e} openipodt={ipoissuelist} user={user} applyipoind={applyipoind} />}</Fragment>;
							})}

							{/* <Section1Card
								img={SovereignGoldImg}
								title="Sovereign Gold Bond"
								subHeading="Scheme 2021-22 Series - V"
								event="Invest by 04 - 09 Aug"
								button="Apply Now"
								top="Tax benefits"
								background="linear-gradient(321deg, #853f02, #d08f16, #f8e150)"
								color="#8f4a05"
							/>

							<Section1Card
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
				</LazyLoadComponent>
			}

			{/* <section className={s.section2}>
				<h2 className={s.header2}>New Launches this month!</h2>
				{width > 768 ? (
					<button>
						<img src={SearchIcon} alt="" />
					</button>
				) : (
					<div className={s.search}>
						<input type="text" placeholder="Search IPOs, MFs, NCDs..." />
						<button>
							<img src={SearchIcon} alt="" />
						</button>
					</div>
				)}
			</section> */}

			{/* <SectionSlider
				section={1}
				items={section3Items.current}
				heading={width > 768 ? 'Hot new Mutual Funds this month' : 'New Mutual Funds!'}
				toggleLogin={toggleLogin}
			/> */}
			{/* {JSON.stringify(user)} */}
			{!isallexist &&
				<LazyLoadComponent>
				<div className={s.notifyindemand}>
					<h2>Stay tuned for great <br/> opportunities lined up for you!</h2>
					<p>No investment options are available at the moment. But we will notify you as soon as <br/> any opportunities arise.</p>
					<div className={s.notifyform}>
						{(user?.user?.clientType === 'NONIIFLCLIENT' || Object.keys(user).length < 1) &&
							<input type='email' value={notifyemail} onChange={(e) => setnotifyemail(e.target.value)} placeholder='Enter Email ID'/>
						}
						<button onClick={notifyme}>Notify Me!</button>
					</div>
				</div>
				</LazyLoadComponent>
			}
			
			{ipoissuelist.length > 0 &&
				<LazyLoadComponent>
					<SectionSlider
						section={2}
						items={ipoissuelist}
						heading={width > 768 ? 'Incredible market launches' : 'Incredible market launches'}
						toggleLogin={toggleLogin}
						checkcount = {checkcountipo}
					/>
				</LazyLoadComponent>
			}
			
			{ncdissuelist.length > 0 &&
				<LazyLoadComponent>
					<SectionSlider
						section={3}
						items={ncdissuelist}
						heading={'Get fixed return with bonds'}
						toggleLogin={toggleLogin}
						checkcountncd = {checkcountncd}
					/>
				</LazyLoadComponent>
			}

			{/* SGB Bonds  */}			
			{sgbdata?.issuecode &&
				<section className={s.section3}>
					<h3 className={s.header}>Get into Gold!</h3>
					<div className={s.container}>
						<div className={s.left}>
							<img src={GoldBarImg} alt="GoldBar" className={s.goldBar} />
							{width > 768 && (
								<div className={s.innerLeft}>
									<img src={SovereignGoldImg} alt="Sovereign Gold" />
								</div>
							)}

							<div className={s.innerRight}>
								{width > 768 ? (
									<Fragment>
										<h2>Sovereign Gold Bond</h2>
										<span className={s.subHeading}>{sgbdata ? sgbdata.schname :'Scheme 2021-22 Series - V'}</span>
									</Fragment>
								) : (
									<div className={s.mobileHead}>
										<div className={s.innerLeft}>
											<img src={SovereignGoldImg} alt="Sovereign Gold" />
										</div>
										<div className={s.heading}>
											<h2>Sovereign Gold Bond</h2>
											<span className={s.subHeading}>{sgbdata ? sgbdata.schname :'Scheme 2021-22 Series - V'}</span>
										</div>
									</div>
								)}

								<div className={s.invest}>
									<img src={EventImg} alt="Invest" />
									<span>Invest within {' '}
									{!isNaN(leftTime.hours) && `${leftTime.days} Days ${leftTime.hours} hours, ${leftTime.minutes} mins`}
									</span>
								</div>
								<div className={s.circles}>
									<div className={s.leftCircle}>
										<span>You Invest</span>
										<div className={s.buttons}>
											<button onClick={() => handleCounter('minus')}>
												<img src={MinusButtonImg} alt="Minus" />
											</button>
											<span>{counter} gm</span>
											<button onClick={() => handleCounter('add')}>
												<img src={PlusButtonImg} alt="Plus" />
											</button>
										</div>
										<span className={s.light}>₹{Number(sgbprice).toLocaleString()}</span>
									</div>
									<div className={s.arrow}>
										<img src={ArrowImg} alt="Arrow" />
									</div>

									<div className={s.rightCircle}>
										<span>You Get</span>
										<h4>₹{getGoldReturnsEightYears(sgbdata.highprice)}</h4>
										<span className={s.light}>If price goes up by 20% in 8 years</span>
									</div>
								</div>

								<div className={s.buttonsC}>
								
									<a href='#' onClick={() => handleSGBApply()}><button className={s.button1}>Apply Now</button></a>
									<Link to='/sovereign_gold_bond_details'><button className={s.button2}>Know More</button></Link>
								</div>
							</div>
						</div>

						<div className={s.right}>
							<h3>Sovereign Gold Bonds vs Physical Gold</h3>
							<div className={s.list}>
								<div className={s.item}>
									<img src={TickImg} alt="Tick" />
									<span>No making or storage charges</span>
								</div>
								<div className={s.item}>
									<img src={TickImg} alt="Tick" />
									<span>You get an extra interest of 2.5% for holding</span>
								</div>
								<div className={s.item}>
									<img src={TickImg} alt="Tick" />
									<span>No GST. You get tax free profit.</span>
								</div>
								<div className={s.item}>
									<img src={TickImg} alt="Tick" />
									<span>Safe and secure</span>
								</div>
							</div>

							<div className={s.line} />

							<div className={s.youtube}>
								<div className={s.image}>
									<a href="https://www.youtube.com/watch?v=Krs8MFHlEIg" rel="noreferrer noopener" target="_blank"><img src={videoImg} alt="Video" /></a>
								</div>

								<div className={s.body}>
									<h5>How are sovereign Gold Bonds better than Physical Gold?</h5>
									<span>Youtube . 2 days ago</span>
								</div>
							</div>
						</div>
					</div>
				</section>
			}

			{/* G sec part started */}
			{gsecissuelist.length > 0 &&
				<div className={s.gseclandingwrap}>
					<GsecSection details={gsecissuelist} />
				</div>
			}
			{/* G sec part ended */}
			
			<LazyLoadComponent>
				<section className={s.section4}>
					{/* <h3 className={s.header}>If you had invested in these IPOs...</h3> */}
					
					<SectionSlider
					section={4}
					items={[]}
					heading={width > 768 ? 'If you had invested in these IPOs...' : 'If you had invested in these IPOs...'}
					toggleLogin={toggleLogin}
					/>

					{/* <div className={s.container}>
						<div className={s.item}>
							<span>Today's Value</span>
							<h2>₹1,04,452</h2>
							<img src={GreenCircleImg} className={s.green1} alt="Green" />
							<h4>₹50,000</h4>
							<span>Jun 2018</span>
							<img src={HDFCImgHor} alt="HDFC" />
						</div>
						<div className={s.item}>
							<span>Today's Value</span>
							<h2>₹1,04,452</h2>
							<img src={GreenCircleImg} className={s.green1} alt="Green" />
							<h4>₹50,000</h4>
							<span>Jun 2018</span>
							<img src={HDFCImgHor} alt="HDFC" />
						</div>
						<div className={s.item}>
							<span>Today's Value</span>
							<h2>₹1,04,452</h2>
							<img src={GreenCircleImg} className={s.green1} alt="Green" />
							<h4>₹50,000</h4>
							<span>Jun 2018</span>
							<img src={HDFCImgHor} alt="HDFC" />
						</div>
						<div className={s.item}>
							<span>Today's Value</span>
							<h2>₹1,04,452</h2>
							<img src={GreenCircleImg} className={s.green1} alt="Green" />
							<h4>₹50,000</h4>
							<span>Jun 2018</span>
							<img src={HDFCImgHor} alt="HDFC" />
						</div>
					</div> */}
				</section>
			</LazyLoadComponent>
			
				<LazyLoadComponent effect="blur" delayTime="300">
					<VideoSlider items={videoItems.current} />
				</LazyLoadComponent>
				
				{/* <div style={{minHeight:300}}></div> */}
			
		</div>
	);
};

 export default LandingPage;

