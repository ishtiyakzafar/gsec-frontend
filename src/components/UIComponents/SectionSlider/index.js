import s from './SectionSlider.module.scss';
import { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import ImgPattern from '../../../assets/images/LandingPage/ImgPattern.svg';
import NextArrowImg from '../../../assets/images/LandingPage/Group 3118.svg';
import PrevArrowImg from '../../../assets/images/LandingPage/Group 3118 (1).svg';
import NoImg from '../../../assets/images/noimg.jpg';
import classnames from 'classnames';
import { nanoid } from 'nanoid';
import GlenmarkImg from '../../../assets/images/LandingPage/60caa3fbab9c466@3x.png';
import { getIssueDetailsFromCmsByCode, getOpenIssuesList, getUpcomingIssuesList,getTopPerformerList } from '../../../services/issuesServices';
import { dateToDaysFormatter, formatNumbers, BondCardDateFormatter, dateToRemainingTimeFormattor } from '../../../helpers/utils';
import { Link ,useHistory} from 'react-router-dom';
import { CMS_URL } from '../../../vars/url';
import GreenCircleImg from '../../../assets/images/LandingPage/Group 15347.svg';
import { useSelector,connect } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';
import { LazyLoadComponent,LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const Section3Card = ({ img, title, subHeading, amount, returns, demand, top = '' }) => {
	return (
		<div className={classnames(s.card3, demand.length > 0 ? s.active3 : '')+ " hover-animate"}>
			<div className={s.background}>
				<span>{demand}</span>
			</div>
			<div className={s.container}>
				{top.length > 0 && (
					<div className={s.top}>
						<span>{top}</span>
						{top}
					</div>
				)}
				<div className={s.image}>
					{/* <img src={ImgPattern} alt="pattern" /> */}
					<img className={s.logo} src={img} alt={title} />
				</div>
				<h3>{title}</h3>
				<span className={s.subHeading}>{subHeading}</span>
				<span className={s.light}>Min. Investment</span>
				<span className={s.amount}>
					{'₹'}
					{amount}
				</span>
				<span className={s.light}>Returns</span>
				<span className={s.returns}>{returns}</span>
			</div>
		</div>
	);
};

const Section4Card = ({ issuecode, schname, opndt, clsdt, lowprice, lotsize, upcoming, lname, closdate, opendate, issueprice, minbidqty,isUpcoming,CompanyName,IssueOpendate,OfferPrice,upcomingDetails,convertDate,setalert }) => {

	const intervalRef = useRef(null)
	const [day, setDay] = useState(1)
	const [hours, setHours] = useState(3)
	const [minutes, setMinutes] = useState(10)
	const [seconds, setSeconds] = useState(30)
	const [top, setTop] = useState('')
	const [data, setData] = useState('')
	const [active, setActive] = useState(false)
	
	//console.log('user',user)
	
	const fetchDetails = async () => {
		try {
			if(!isUpcoming){
				let {data} = await getIssueDetailsFromCmsByCode(issuecode);
				setData(data.result)
				setTop(data.result.badge)
				setActive(data.result.card_color_left !== '#ffffff' && !data.result.card_color_right !== '#ffffff')
			}
			else
			{
				setData(upcomingDetails)
			}
			
		} catch (error) {
			
		}
	}

	function Timer(hr, min, sec) {
		let day = 0
		let hours = hr
		let minutes = min
		let seconds = sec
		intervalRef.current = setInterval(() => {
			if(hours ===0 && minutes === 0 && seconds === 0){
				setDay("00") 
				setHours("00") 
				setMinutes("00")	
				setSeconds("00")
			}else{
				seconds = seconds - 1
				if(seconds === 0){
					minutes = minutes - 1
					seconds = 60
				}
				if(minutes === 0){
					hours = hours - 1
					minutes = 60
				}
				// if(hours>24)
				// {
				// 	day = hours/24
				// 	hours = hours%24
				// }
				let dayString = parseInt(day)
				let hrString = hours
				let minString = minutes
				let secString = seconds

				if(hrString.toString().length === 1) hrString = "0"+hours
				if(minString.toString().length === 1) minString = "0"+minutes
				if(secString.toString().length === 1) secString = "0"+seconds

				setDay(dayString) 
				setHours(hrString) 
				setMinutes(minString)	
				setSeconds(secString)		


			}
		}, 1000)
	}

	useEffect(() => {
		if(clsdt){
			let {hr, min, sec} = dateToRemainingTimeFormattor(opndt, clsdt)
			Timer(hr, min, sec)
		}		

		fetchDetails()

		return () => clearInterval(intervalRef.current)
	}, [clsdt])	
	
	if(data?.bottom_tag)
	{
		data.card_color_left = "#fdc052";
		data.card_color_right = "#fe5431";
		
	}
	
	
	return (
		<div className={classnames(s.card4, active ? s.active4 : '',isUpcoming===true && s.upcoming_card+' '+s.active4)+" animate__animated animate__fadeIn hover-animate"}>
			
			<div className={s.background} style={{display: data?.bottom_tag ? 'flex' : 'none'}}>
				<span style={{backgroundImage:"linear-gradient(108deg, #5b5b5b 2%, #0b0b0b 99%)"}}>{data?.bottom_tag}</span>
			</div>
			
			{(isUpcoming===true && data.report_file) &&
				<div className={s.background} style={{display:'flex'}}>
					<span style={{background: "#000"}} onClick={()=>{ window.open(CMS_URL+data.report_file) }}>
					<i className="fa fa-download" aria-hidden="true"></i> Download Report
					</span>
				</div>
				
			}
			
			<div className={s.container} onClick={()=> {isUpcoming===true && setalert("This is a upcoming IPO. \n  Will be available from "+ convertDate(data.expiry_date))}} style={{background: `linear-gradient(146deg, ${data.card_color_left!=null?data.card_color_left:'#ffffff'} -26%, ${data.card_color_right!=null?data.card_color_right:'#ffffff'} 140%)`}}>
				{top && (
					<div className={s.top} style={{background: data.badge_color,boxShadow:`-9px 6px 20px 17px ${data?.badge_color}40`}}>
						<span>{top}</span>
						{top}
					</div>
				)}

				{isUpcoming && (
					<div className={s.top} style={{background: '#000'}}>
						<span>Upcoming</span>
						Upcoming
					</div>
				)}
				<div className={s.image}>
					{/* <img src={ImgPattern} alt="pattern" /> */}
					{data.logo ?
						<img className={s.logo} src={`${CMS_URL}${data.logo}`} alt={isUpcoming ? data.issue_name : schname} />:
						<img className={s.logo} src={NoImg} alt={isUpcoming ? data.issue_name : schname} />
					 }
					 
				</div>
				
				<h3 style={{color:`${data.card_color_left==null || data.card_color_left==='#ffffff' ? '#000' : '#fff'}`}} title={isUpcoming ? data.issue_name : schname}>{isUpcoming ? data.issue_name : (data?.issue_name ? data.issue_name : schname)} </h3>
				{isUpcoming ? 				
				<span className={s.subHeading} style={{color:`${data.card_color_left==null || data.card_color_left==='#ffffff' ? '#d50a19':'#fff'}`}} >Issue Open Date: {convertDate(data.expiry_date)}</span>
				:<span className={s.subHeading}  style={{color:`${data.card_color_left==null || data.card_color_left==='#ffffff' ? '#d50a19':'#fff'}`}} >Apply within {upcoming ? dateToDaysFormatter(opendate, closdate) : (day > 0 ?`${day} days`:` ${hours}:${minutes}:${seconds}`)}</span>
				}

				<span className={s.light} style={{color:`${data.card_color_left==null || data.card_color_left==='#ffffff' ? '#a2a2a2':'#fff'}`}} >{!isUpcoming ?"Invest Minimum":"Offer Price"}</span>
				<div className={s.amount} style={{color:`${data.card_color_left==null || data.card_color_left==='#ffffff' ? '#000':'#fff'}`}}>
					
					{isUpcoming ? (data.invest_minimum_amount ? '₹'+data.invest_minimum_amount : <span style={{color:'#666',fontSize:12}}>data will be available soon</span> ) : <span className={s.mainAmount}>₹{formatNumbers(lowprice * (lotsize || 0))}</span>}
					{!isUpcoming && <span style={{color:`${data.card_color_left==null || data.card_color_left==='#ffffff' ? '#000':'#fff'}`}} className={s.shares}>/{upcoming ? minbidqty : lotsize} shares</span> }
				</div>
			</div>
		</div>
	);
};

const Section5Card = ({ img, title, subHeading, amount, returns, demand, top = '', schname, opndt, clsdt, lowprice, lotsize,noOfMandatoryBonds,issuecode,maxYield,upcomingDetails,convertDate,isUpcoming,setalert }) => {

	const [data, setData] = useState([])
	const history = useHistory();
	//console.log('user',user)
	
	const fetchDetails = async () => {
		try {
			if(!isUpcoming){
				let {data} = await getIssueDetailsFromCmsByCode(issuecode);
				if (typeof data.result !== 'string')
				{
					setData(data.result)
				}
			}
			else
			{
				setData(upcomingDetails)
			}
						
		} catch (error) {
			
		}
	}
	useEffect(() => {		
		fetchDetails()
	}, [])	
	//console.log('bimvv',data)
	if(data?.bottom_tag)
	{
		data.card_color_left = "#ed9bd9";
		data.card_color_right = "#9858ea";
	}
	else
	{
		data.card_color_left = "#fff";
		data.card_color_right = "#fff";
	}

	return (
		<div style={{cursor:'pointer'}} className={classnames(s.card5, s.active5 )+" animate__animated animate__fadeIn"} onClick={() => 
		isUpcoming ? setalert("This is a upcoming NCD. \n  Will be available from "+ convertDate(data.expiry_date)) : history.push("/ncd_details/"+issuecode)
		}>
			<div className={s.background} style={{display: data?.bottom_tag ? 'flex' : 'none'}}>
				<span style={{backgroundImage: "linear-gradient(108deg, #5b5b5b 2%, #0b0b0b 99%)"}}>{data?.bottom_tag}</span>
			</div>
			
			<div className={data?.bottom_tag?classnames(s.container, s.colorBackgroundNcd ):s.container}>
				{top.length > 0 && (
					<div className={s.top}>
						<span>{top}</span>
						{top}
					</div>
				)}
				{isUpcoming &&
					<div className={s.top}>
						<span>Upcoming</span>
						Upcoming
					</div>
				}
				<div className={s.image}>
					{/* <img src={ImgPattern} alt="pattern" /> */}
					{data.logo ?
						<img className={s.logo} src={`${CMS_URL}${data.logo}`} alt={isUpcoming ? data.issue_name : schname} style={{height:'auto'}} />:
						<img className={s.logo} src={NoImg} alt={isUpcoming ? data.issue_name : schname} style={{height:'auto'}} />
					}					
				</div>
				<h3 style={data?.bottom_tag ? {color:'#fff',fontSize:16}: {color:'#1c1c1c',fontSize:16}} >{isUpcoming ? data.issue_name : schname}</h3>
				{!isUpcoming && <span className={s.subHeading} style={data?.bottom_tag ? {color:'#f1f1f1',fontSize:14}: {color:'#d50a19',fontSize:14}}>Apply by {BondCardDateFormatter(opndt).substr(0,2)} - {BondCardDateFormatter(clsdt)}</span>}
				{isUpcoming && <span className={s.subHeading} style={{color:'#d50a19'}}>Issue Open Date {convertDate(data.expiry_date)}</span>}
				<span className={s.light} style={data?.bottom_tag ? {color:'#fff'}: {color:'#1c1c1c'}}>Min. Investment </span>
				<span className={s.amount} style={data?.bottom_tag ? {color:'#f1f1f1'}: {color:'#1c1c1c'}}>
					{'₹'}
					{isUpcoming ? data.invest_minimum_amount : formatNumbers(lowprice * (noOfMandatoryBonds || 1))}
				</span>
				{!isUpcoming &&
					<>
						<span className={s.light} style={data?.bottom_tag ? {color:'#fff'}: {color:'#1c1c1c'}}>Returns upto</span>
						<div className={s.returns} style={data?.bottom_tag ? {color:'#fff'}: {color:'#1c1c1c'}}>{maxYield}%</div>
					</>
				}
			</div>
		</div>
	);
};

const SectionSlider = ({ section, heading, items,toggleLogin,checkcount,checkcountncd}) => {
	const width=window.innerWidth;
	const val=width>=1366?5:(width>=1024?4:(width>=800?3:1));
	const settings = useRef({
		className: 'slider variable-width',
		dots: false,
		infinite: false,
		autoplay: false,
		slidesToShow: 5,
		slidesToScroll: 1,
		variableWidth: true,
		responsive: [
			{
				breakpoint: 1366,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
	const history = useHistory();
	const user = useSelector((state) => state.loggedIn);
	const slider = useRef(null);
	const [index, setIndex] = useState(0);

	const [IPOIssueList, setIPOIssueList] = useState([])
	const [BONDIssueList, setBONDIssueList] = useState([])
	const [upcomingIssueList, setUpcomingIssueList] = useState([])
	const [ipotopperformer, setTopPerformerList] = useState([]);
	const [ alert,setalert ] = useState('');
	const fetchIssues = (category) => {
		getOpenIssuesList(category).then(result => {
			if (result && result.data && result.data.isSuccess && result.data.statusCode === 200) {
				//console.log(category, result);
				if (category === "IPO") {
					
					setIPOIssueList(result.data.resultData)
					checkcount(result.data.resultData.length)
				} else {
					setBONDIssueList(result.data.resultData)
					checkcountncd(result.data.resultData.length)
				}

				
				//console.log('resultdata==>',result.data.resultData)
			}
			else
			{
				if (category === "IPO") {
					checkcount(0)
				}
				else
				{
					checkcountncd(0)
				}
			}
		}).catch(error => {
			console.log(error)
			// setError(error)
		})
	}

	const fetcipohUpcomingIssues = (category) => {
		var issue_type = ''
		if(section == 2)
		{
			issue_type = 'IPO'
		}
		else if (section == 3) {
			issue_type = 'NCD'
		}
		if(section == 2 || section == 3){
			getUpcomingIssuesList(issue_type).then(response => {
				
				let result = response?.data?.result
				
				if(result)
				{
					var resultdata = result.map(function(el) {
						var o = Object.assign({}, el);
						o.isUpcoming = true;
						return o;
					})
					// console.log('upcmxxs',resultdata)
					setUpcomingIssueList(resultdata)
				}
				//console.log('xpv',result);
				// if (result && result.response && result.response.type === "success") {
				// 	if (result.response.data.ForthcomingIssueList && result.response.data.ForthcomingIssueList.recordcount !== 0) {

				// 		let data = result?.response?.data?.ForthcomingIssueList?.ForthcomingIssue || []
				// 		//console.log(data)
				// 		setUpcomingIssueList(data)
				// 	}
				// }
			}).catch(error => {
				console.log(error)
			})
		}
	}

	const topperformer = (category) => {
		var date = new Date();
		let month = date.getMonth();		
 		var fyear = date.getFullYear();
		 if(month < 5)
		 {
			fyear = fyear-1
		 }
		getTopPerformerList(fyear).then(response => {

			let result = response?.data
			result = result.slice(0, 7);
			//console.log('resultdetails====>',result)
			setTopPerformerList(result)
			// if (result && result.response && result.response.type === "success") {
			// 	if (result.response.data.ForthcomingIssueList && result.response.data.ForthcomingIssueList.recordcount !== 0) {

			// 		let data = result?.response?.data?.ForthcomingIssueList?.ForthcomingIssue || []
			// 		console.log(data)
			// 		setUpcomingIssueList(data)
			// 	}
			// }
		}).catch(error => {
			console.log(error)
		})
	}
	
	const handleClick = (issuecode) => {
		
		//if(Object.keys(user).length > 0 ){
			history.push("/ipo_details/"+issuecode)
		// }else{
		// 	toggleLogin();
		// }
	}

	const hidesweeetalert = () => {
		setalert('')
	}


	const convertDate = (inputFormat)  => {
		function pad(s) { return (s < 10) ? '0' + s : s; }
		var d = new Date(inputFormat)
		return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
	}
	useEffect(() => {
		//fetchIssues("IPO")
		//fetchIssues("BOND")
		fetcipohUpcomingIssues()
		topperformer()
	}, [])

	return (
		<section className={s.sectionSlider}>

			{alert != '' &&
				<SweetAlert
				error
				title="Alert!"
				onConfirm={hidesweeetalert}
				>
				{alert}
				</SweetAlert>
			}
			<div className={s.header}>
				<h3>{heading}</h3>
				{/* <a href="/">Explore All</a> */}
			</div>
			<div className={(section === 4)?s.section4Wrap:""}>
				<Slider
					{...settings.current}
					ref={slider}
					afterChange={(i) => {
						console.log(i);
						setIndex(i<0?0:i);
					}}
				>
					
					{section === 1 ? (
						items.map((e) => (
							<div className={s.sliderItem} key={nanoid()}>
								<Section3Card {...e} />
							</div>
						))
					) : section === 2 ? (
						//console.log('ss',[...IPOIssueList, ...upcomingIssueList]),
						[...items, ...upcomingIssueList].map((e) => (
							
							<Link	onClick={() => { e.isUpcoming !== true &&  handleClick(e.issuecode) }}	 className={s.sliderItem} key={nanoid()}>
								<Section4Card upcoming={e?.co_code?.length} upcomingDetails={e} convertDate={convertDate} setalert={setalert} {...e} />
							</Link>
						))
					) : section === 4 ? (
						[...ipotopperformer].map((e,i) => (
							
							<div className={s.itemtop}>
							<h4 className={s.titletopperformers}>{e.CompanyName}</h4>
							<span>Today's Value</span>
							<h2 className={s.upcomingcurprice}>₹{((e.CurrentPrice/e.IssuePrice)*10000).toFixed(2)}</h2>
							<h5 className={s.upcomingpercentage}>+ {(((e.CurrentPrice/e.IssuePrice)*10000).toFixed(2) - 10000).toFixed(2)}<span> ({((e.CurrentPrice/e.IssuePrice)*100).toFixed(1)}%) </span></h5>
							
							<div className={s.topperfround} style={{width:200-(i*15),height:200-(i*15),marginTop:(i*15)}}>
								{/* <img src={GreenCircleImg} className={s.green1} alt="Green" /> */}
								<div className={s.comparecrcle} style={{width:(200-(i*15))/(e.CurrentPrice/e.IssuePrice),height:(200-(i*15))/(e.CurrentPrice/e.IssuePrice)}}>
								</div>
							</div>
							<h4  className={s.upcomingissueprice}>₹10,000</h4>
							<span>{e.IODate}</span>
							
						</div>
						))
					) : (
						[...items, ...upcomingIssueList].map((e) => (
							<div className={s.sliderItem} key={nanoid()}>
								<Section5Card upcomingDetails={e} convertDate={convertDate} setalert={setalert} {...e} />
							</div>
						))

					)}

				</Slider>
			</div>
			<div className={s.sliderButtons}>
				<button
					onClick={() => {
						slider.current.slickPrev();
						console.log(index)
					}}
					className={classnames(s.button, index === 0 ? s.buttonInactive : '')}
				>
					<img src={PrevArrowImg} alt="Previous" />
				</button>
				<button
					onClick={() => {
						slider.current.slickNext();
					}}
					className={classnames(s.button, index >= slider.current?.props.children.length - val ? s.buttonInactive : '')}
				>
					<img src={NextArrowImg} alt="Next" />
				</button>
			</div>
		</section>
	);
};

export default SectionSlider;
