import s from './IPODetails.module.scss';
import ZomatoLogo from '../../assets/images/IPODetails/Group 13768@3x.png';
import PeopleIcon from '../../assets/images/IPODetails/people_black_24dp (1).svg';
import DocumentIcon from '../../assets/images/IPODetails/description_black_24dp.svg';
import MeterImg from '../../assets/images/IPODetails/meter.jpg';
import not_sure from '../../assets/images/IPODetails/not_sure.png';
import go_forit from '../../assets/images/IPODetails/go_forit.png';
import RiseImg from '../../assets/images/IPODetails/Rise.svg';
import PlayButton from '../../assets/images/IPODetails/play_circle_black_24dp.svg';
import ZomatoImg from '../../assets/images/IPODetails/zomato.jpg';
import SovereignGoldImg from '../../assets/images/LandingPage/Soverign Gold Bonds_48 Px@3x.png';
import EventImg from '../../assets/images/LandingPage/event_black_24dp (1)@3x.png';
import Slider from 'react-custom-slider';
import cx from 'classnames';
import { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { getIssueDetailsFromCmsByCode, getOpenIssuesDetails,getOpenIssuesList,brokerRecomendation,getPerformance,getSubs } from '../../services/issuesServices';
import { dateFormatter } from '../../helpers/utils';
import { CMS_URL } from '../../vars/url';
import { useDispatch } from 'react-redux';
import { applicationData } from '../../store/action/applicationData';
import { useSelector } from 'react-redux';
import Login from '../Login';
import { Link,useHistory  } from 'react-router-dom';
import BrokerRecomendation from "../UIComponents/BrokerRecomendation/BrokerRecomendation";
import LoaderImg from '../../assets/images/loader.svg';

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

const Section1Card = ({ img, title, top, subHeading, event, button, background, color,topbackground,issueCode,history }) => {
	return (
		<div className={s.card} style={{ background }}>
			{top != null &&
				<div className={s.top} style={{background:`${topbackground}`}}>
					<span>{top}</span>
				</div>
			}
			<img src={img} alt={title} />

			<div className={s.body}>
				<h3>{title}</h3>
				<div className={s.subHeading}>
					<span className={s.light}>{subHeading}</span>
				</div>

				<div className={s.invest}>
					<img src={EventImg} alt="Invest" />
					<span>{event}</span>
				</div>
			</div>

			<div className={s.buttons}> 
				<button className={s.button} style={{ color }}  onClick={() => gotoIPO(issueCode)} >
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

	//console.log('sliderValue',sliderValue)

	const applyNow = async () => {
		let shareprice =(cutoffyn == "N")? parseInt(customval) : parseInt(cutOffchange)
		dispatch(
			applicationData({
				...applicationDataState,
				ipodetails : details,
				IPOBondName :details.issuecode,
				noOfShares:[parseInt(sliderValue/cutOffchange)],
				sharePrice:[shareprice],
				bidPrice:[parseFloat(shareprice)],
				totalbidprice :[parseFloat(sliderValue)],
				cutOff:[cutoffyn],
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
			 	toggleLogin();
			}
			
		}
	};

	const fetchDetails = async () => {
		try {
			setLoading(false);
			if(Object.keys(user).length > 0 ){
				let data = await getOpenIssuesDetails(issueCode);
				setLoading(false);
				if(data.data.isSuccess == true && data.data.statusCode == 200){
					setDetails(data.data.resultData);
					//('OpenIssuesdetails',data.data.resultData)
					
					setSliderValue(data.data.resultData.cutoff * data.data.resultData.lotsize)
					setcutOffchange(data.data.resultData.cutoff)
					setExchangetype(data.data.resultData.exchangeType)
					setInterval(() => {
						setCounter(dateFormatter(new Date(data.data.resultData.clsdt).getTime()));
					}, 1000);
				}
			}

			let brokerdata = await brokerRecomendation(issueCode);
			//console.log('brokerdata',brokerdata);
			if(brokerdata.data.head.status == 0){
				setBrokerrecomendation(brokerdata?.data?.body?.brokerReportData)
			}
			
		} catch (error) {
			console.log(error);
		} finally {
			try {
				let details = await getIssueDetailsFromCmsByCode(issueCode);
				setData(details.data.result);
				//console.log('IssueDetails',details.data.result)
				// console.log(details.data.result);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const fetchopenissues = async() => {
		let otsdata = []
		try{
			let detail = getOpenIssuesList('IPO').then(response => {
				//setopenIssue(response.data.resultData)
				let odata = response.data.resultData
			
				try
				{
					let cmsdata = {}
					{odata.map((e) => (
						getIssueDetailsFromCmsByCode(e.issuecode).then(res => {
							cmsdata = res.data.result
							e.cmsdata = cmsdata
							otsdata.push(e);
						})
					))}
					
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
		console.log('toggle',e,reallot,realLowPrice,realHighprice)
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
		console.log(toggle)
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
		if(sliderval <= 2000005)
		{
			setSliderValue(sliderval)
			setMorerange(false)
		}
		else
		{
			setMorerange(true)
		}
		// {sliderValue/cutOffchange}		
	}

	const changeslidervaluexs = async(value) => {
		
		var ctoff = details.lotsize * cutOffchange;
		var xcess = value -(value%ctoff);
		//alert(xcess)
		setSliderValue(xcess)
	}
	

	useEffect(() => {
		let i;
		i = fetchDetails();
		fetchopenissues();
		threeyrstrategy();
		getSubsdetails();
		return () => {
			try {
				clearInterval(i);
			} catch (error) {}
		};
	}, []);


	let percodde = data.co_code
	const threeyrstrategy = (percodde) => {
		
		getPerformance(issueCode).then(response => {
			let result = response?.data[0]
			setPerformance(result)			
		}).catch(error => {
			alert(error)
		})
	}
	const getSubsdetails = (percodde) => {
			
			getSubs(issueCode).then(response => {
				let result = response?.data
				setSubscription(result)
				let skx = result.replace('[{"LastUpdateDate":"9/3/2021 11:00:00 AM"}]', '')
				let datas =  JSON.parse(skx)
				var fres = datas.filter(function(v, i) {
					return (v.Category == "Retail Individual Investors (RIIs)" && v.SubCategory == "");
				  })
				  console.log('khugaa=>',fres[0])
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
						if(fres[0].NoOfTimesOfTotalMeantForTheCategory <= 1)
						{
							setSubscriptionstring('Rising Up')
						}
						if(fres[0].NoOfTimesOfTotalMeantForTheCategory > 1)
						{
							setSubscriptionstring('Sky High')
						}
					}
					if(ctm >= 810 && ctm < 1020 )
					{
						if(fres[0].NoOfTimesOfTotalMeantForTheCategory <= 0.7)
						{
							setSubscriptionstring('Smooth Sailing')
						}
						if(fres[0].NoOfTimesOfTotalMeantForTheCategory <= 1.2)
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
				alert(error)
			})
		}

	// console.log(new Intl.NumberFormat('en-IN', {
	// 	style: 'currency',
	// 	currency: 'INR',
	// 	maximumSignificantDigits: 3}).format(35000000));

	function changeNumberFormatToCrr(number, decimals, recursiveCall) {
			const decimalPoints = decimals || 2;
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

		let viewmeter = MeterImg;
		if(data.expected_listing_gains == 1)
		{
			viewmeter = not_sure
		}
		if(data.expected_listing_gains == 3)
		{
			viewmeter = go_forit
		}
		
	return (
		<>
		<div className={s.main}>
		{loading == true && 
				<div className="loading_screen">
					<img src={LoaderImg} alt="loading..." />
					<p>Please wait while fetching..</p>
				</div>
			}
			{/* {redirect && <Redirect to="/application_process" />} */}
			<section className={s.section1}>
				<div className={s.left}>
					<div className={s.innerLeft}>
						<img src={`${CMS_URL}${data.logo}`} alt={details.issuecode} />
					</div>
					<div className={s.innerRight}>
						<h1>{details.issuecode}</h1>
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
					<img src={PeopleIcon} alt="50% have oversubscribed" />
					<span>{data.subscriptions}</span>
				</div>
			</section>

			<section className={s.section3}>
				<span className={s.red}>Bid closes in {counter}</span>
				<div className={s.dot} />
				<div className={s.info}>
					<h6>Share Price:</h6>
					<span>
						₹{details.lowprice} - ₹{details.highprice}
					</span>
				</div>
				<div className={s.dot} />
				<div className={s.info}>
					<h6>Issue Size:</h6>
					<span>₹{details.issueQty}</span>
				</div>
				<div className={s.dot} />
				<a href={`${CMS_URL}${data.report_file}`}>
					<img src={DocumentIcon} alt="Download  a report." />
					<span>Download a report</span>
				</a>
			</section>

			<section className={s.section4}>
				<div className={s.columnDouble}>
					<div className={cx(s.item, s.subscriptions)}>
						<h6>Subscriptions</h6>
					</div>

					<div className={cx(s.item, s.insight)}>
						<h6>IIFL Insight</h6>
						<div className={s.meter}>
							<div className={s.top}>Don't Miss</div>
							
							<img src={viewmeter} alt="IIFL INsights" />
							<div className={s.bottom}>
								<span>Not Sure</span>
								<span>Go for it!</span>
							</div>
						</div>
						<a data-toggle="modal" data-target={`#analystresponse`} href="javascript:void(0)" >View Analyst's response</a>

					</div>
				</div>
				<div className={s.columnDouble}>
					<div className={cx(s.item, s.expected)} style={{background:`url('/${subscriptionvendorstring}.png')`}}>
						<h6>Expected Listing Gains</h6>
					
						<h5>{subscriptionvendorstring}!</h5>
					</div>

					<div className={cx(s.item, s.companyHealth)}>
						<h6>Company Health</h6>
						<div className={s.left} style={{width:(performanceyr?.Prev_OperatingIncome/performanceyr?.Prev_OperatingIncome)*100,backgroundSize:'cover',height:(performanceyr?.Prev_OperatingIncome/performanceyr?.Prev_OperatingIncome)*100}}>
							<span>{data.company_health_before_type}</span>
							<span className={s.bold} >{(new Date().getFullYear()) - 1}</span>
							{/* ₹{changeNumberFormatToCrr(performanceyr?.Prev_OperatingIncome,0)} */}
						</div>
						<div className={s.right} style={{width:(performanceyr?.Curr_OperatingIncome/performanceyr?.Prev_OperatingIncome)*100,backgroundSize:'cover',height:(performanceyr?.Curr_OperatingIncome/performanceyr?.Prev_OperatingIncome)*100}}>
							<span>{(new Date().getFullYear())}</span>
							<span className={s.bold}>{data.company_health_after_year}</span>
							{/* ₹{changeNumberFormatToCrr(performanceyr?.Curr_OperatingIncome,0)} */}
						</div>
					</div>
				</div>
				<div className={s.columnDouble}>
					<div className={cx(s.item, s.promoter)}>
						<h6>Promoter's Holdings</h6>
						<div className={s.circles}>
							<div className={s.left}>
								<h6>{data.promoters_holdings_before}%</h6>
								<span>Before IPO</span>
							</div>

							<div className={s.right}>
								<h6>{data.promoters_holdings_after}%</h6>
								<span>After IPO</span>
							</div>
						</div>
					</div>

					<div className={cx(s.item, s.performance)}>
						<h6>Company Performance</h6>

						<div className={s.bars}>
							<div className={cx(s.item, s.bar1)} >
								
								<h6>₹{changeNumberFormatToCrr(performanceyr?.Prev1_OperatingIncome,3)}</h6>
								<div style={{height:performanceyr?.Prev1_OperatingIncome/400000000}} />
								<span>{(new Date().getFullYear()) - 2}</span>
							</div>

							<div className={cx(s.item, s.bar2)}>
								<h6>₹{changeNumberFormatToCrr(performanceyr?.Prev_OperatingIncome,3)}</h6>
								<div style={{height:performanceyr?.Prev_OperatingIncome/400000000}} />
								<span>{(new Date().getFullYear()) - 1}</span>
							</div>

							<div className={cx(s.item, s.bar3)}>
								<h6>₹{changeNumberFormatToCrr(performanceyr?.Curr_OperatingIncome,3)}</h6>
								<div style={{height:performanceyr?.Curr_OperatingIncome/400000000}} />
								<span>{(new Date().getFullYear())}</span>
							</div>

							<img src={RiseImg} alt="Rise" />
						</div>

						<span>Yearly Revenue</span>
					</div>
				</div>
				<div className={s.columnSingle}>
					<div className={s.item}>
						<h4>Invest Now</h4>
						<span className={s.subHeading}>How much do you want to invest?</span>
{/* 						
						<input type="number" className={cx(s.toggler,s.custombox, toggle ? s.active : s.hidecstominp)} 
						value={customval}
						min={details.lowprice}
						max={details.highprice}
						onChange={(e) => customcutoff(e,details.lotsize,details.lowprice,details.highprice)}/> */}


						<div className={s.slider}>
							<h4>₹{sliderValue}</h4>
							{morerange === true &&
								<input type="number"
									min={200000}
									className={s.custommorerange}
									
									onBlur={(e) => {
										changeslidervaluexs(e.target.value)
									}}
								/>
							}
							<input
								type="range"
								min={cutOffchange * details.lotsize}
								max={205000}
								step={details.lotsize * cutOffchange}
								value={sliderValue}
								onChange={(e) => {
									// console.log(e.target.value);
									changeslidervalue(e.target.value)
									// setSliderValue(e.target.value);
								}}
								
							/>
							<div className={s.sub}>
								<span>₹{cutOffchange * details.lotsize}</span>
								<span>₹{details.cutofflimit}</span>
							</div>
						</div>
						<div className={s.sharePrice}>
							<div className={s.left}>
								<h4>Share Price</h4>
								<span>
									Range: ₹{details.lowprice} - ₹{details.highprice}
								</span>
							</div>
							<div
								className={s.toggle}
								// onClick={() => {
									
								// 	changeToggle(!toggle,details.cutoff)
								// }}
							>
								<div className={s.names}>
									<span style={{cursor: "pointer"}} onClick={() => {
									toggle? changeToggle(!toggle,details.cutoff) : changeToggle(toggle,details.cutoff)}}>Cut Off</span>

									{!toggle?(<span onClick={() => {
									changeToggle(!toggle,details.cutoff)}}
									style={{cursor: "pointer"}}
									>Custom</span>) : (<input type="number" className={cx(s.toggler,s.custombox, toggle ? s.active : s.hidecstominp)}
									value={customval}
									min={details.lowprice}
									max={details.highprice}
									onChange={(e) => customcutoff(e,details.lotsize,details.lowprice,details.highprice)} />)}
								</div>
								<div className={cx(s.toggler, toggle ? s.active : '')} />
							</div>
						</div>
						<div className={s.totalQty}>
							<h4>Total Qty</h4>
							<span> {sliderValue/cutOffchange} Shares</span>
						</div>
						<button className={s.apply} onClick={applyNow}>
							Apply Now
						</button>
					</div>
				</div>
			</section>

			<section className={s.section5}>
				<h3 className={s.header}>About {details.issuecode} IPO</h3>
				<div className={s.cards}>
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
						<iframe width="578" height="412" src={`https://www.youtube.com/embed/${data?.video_link}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
					</div>

					<div className={s.card2}>
						<div className={s.back} />
						<div className={s.head}>
							<h5>{details.issuecode} IPO Report</h5>
						</div>

						<div className={s.foot}>
							<a href={`${CMS_URL}${data.report_file}`}>Download Complete Report</a>
						</div>
					</div>
				</div>
			</section>

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

					<div className={s.right}>
						<img src={`${CMS_URL}${data.consideration_image}`} alt="Zomato" />
					</div>
				</div>
			</section>

			<section className={s.section7}>
				<div className={s.header}>Others also invested in</div>

				<div className={s.cards}>
					{openIssue.map((e,i) => (
						<Section1Card
							img={`${CMS_URL}${e.cmsdata?.logo}`}
							title={e.schname} 
							subHeading={`Range ₹${e.lowprice} - ₹${e.cutoff}`}
							event={`Invest by ${new Date(e.opndt).toLocaleDateString('en-US', {
								month: '2-digit',year: '2-digit'})} - ${new Date(e.clsdt).toLocaleDateString('en-US', {
									month: '2-digit',year: '2-digit'})}`}
							button="Apply Now"
							top={e.cmsdata?.tag}
							background="linear-gradient(321deg, #853f02, #d08f16, #f8e150)"
							color={e.cmsdata?.badge_color}
							topbackground = {e.cmsdata?.tag_color}
							issueCode={e?.issuecode}
							history={history}
						/>
					))}

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
		</div>
		<BrokerRecomendation analystdata={brokerrecomendation}/>
		</>
	);
};

export default IPODetails;
