import s from './IPODetails.module.scss';
import ZomatoLogo from '../../assets/images/IPODetails/Group 13768@3x.png';
import PeopleIcon from '../../assets/images/IPODetails/people_black_24dp (1).svg';
import DocumentIcon from '../../assets/images/IPODetails/description_black_24dp.svg';
import MeterImg from '../../assets/images/IPODetails/meter.jpg';
import RiseImg from '../../assets/images/IPODetails/Rise.svg';
import PlayButton from '../../assets/images/IPODetails/play_circle_black_24dp.svg';
import ZomatoImg from '../../assets/images/IPODetails/zomato.jpg';
import SovereignGoldImg from '../../assets/images/LandingPage/Soverign Gold Bonds_48 Px@3x.png';
import EventImg from '../../assets/images/LandingPage/event_black_24dp (1)@3x.png';
import Slider from 'react-custom-slider';
import cx from 'classnames';
import { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { getIssueDetailsFromCmsByCode, getOpenIssuesDetails } from '../../services/issuesServices';
import { dateFormatter } from '../../helpers/utils';
import { CMS_URL } from '../../vars/url';
import { useDispatch } from 'react-redux';
import { applicationData } from '../../store/action/applicationData';
import { useSelector } from 'react-redux';

const expectedListingGains = {
	'0': 'Sky High',
	'1': 'High',
	'2': 'Moderate',
	'3': 'Low',
	'4': 'Very Low'
};

const Section1Card = ({ img, title, top, subHeading, event, button, background, color }) => {
	return (
		<div className={s.card} style={{ background }}>
			<div className={s.top}>
				<span>{top}</span>
			</div>

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
				<button className={s.button} style={{ color }}>
					{button}
				</button>
			</div>
		</div>
	);
};

const IPODetails = () => {
	const dispatch = useDispatch();

	const [ sliderValue, setSliderValue ] = useState(0);
	const [ toggle, setToggle ] = useState(false);
	const { issueCode } = useParams();
	const [ details, setDetails ] = useState({});
	const [ counter, setCounter ] = useState('');
	const [ data, setData ] = useState('');
	const [ redirect, setRedirect ] = useState(false);
	const applicationDataState = useSelector((state) => state.applicationData);
	// const user = useSelector((state) => state.loggedIn);
	//console.log('sliderValue',sliderValue)

	const applyNow = async () => {
		//console.log(sliderValue === 0 ? details.lowprice * details.lotsize : sliderValue);
		// console.log('applicationDataState',applicationDataState)
		// return false
		dispatch(
			applicationData({
				...applicationDataState,
				IPOBondName: 'JDIAL',
				NoOfShares: [ 10 ],
				noOfShares:[19],
				
				// price:  sliderValue === 0 ? details.lowprice * details.lotsize : sliderValue ,
				BidPrice: [ 10],
				bidPrice: [ sliderValue === 0 ? details.lowprice * details.lotsize : parseInt(sliderValue)],
				cutOff: [ 'Y'],
				cutOffToUse: details.cutOff
			})
		);

		setRedirect(true);
	};

	const fetchDetails = async () => {
		try {
			let data = await getOpenIssuesDetails(issueCode);
			//console.log(data)
			if(data.data.isSuccess == true && data.data.statusCode == 200){
				setDetails(data.data.resultData);
				console.log('OpenIssuesdetails',data.data.resultData)
				
				setSliderValue(data.data.resultData.cutoff * data.data.resultData.lotsize)
				setInterval(() => {
					setCounter(dateFormatter(new Date(data.data.resultData.clsdt).getTime()));
				}, 1000);
			}
		} catch (error) {
			console.log(error);
		} finally {
			try {
				let details = await getIssueDetailsFromCmsByCode(issueCode);
				setData(details.data.result);
				console.log('IssueDetails',details.data.result)
				// console.log(details.data.result);
			} catch (error) {
				console.log(error);
			}
		}
	};

	useEffect(() => {
		let i;
		i = fetchDetails();

		return () => {
			try {
				clearInterval(i);
			} catch (error) {}
		};
	}, []);

	return (
		<div className={s.main}>
			{redirect && <Redirect to="/application_process" />}
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
				<button>Most Awaited IPO</button>
				<div>
					<img src={PeopleIcon} alt="50% have oversubscribed" />
					<span>50% have oversubscribed</span>
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
				<a href="/">
					<img src={DocumentIcon} alt="Download Prospectus" />
					<span>Download Prospectus</span>
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
							<img src={MeterImg} alt="IIFL INsights" />
							<div className={s.bottom}>
								<span>Not Sure</span>
								<span>Go for it!</span>
							</div>
						</div>
						<a href="/">View Analyst's response</a>
					</div>
				</div>
				<div className={s.columnDouble}>
					<div className={cx(s.item, s.expected)}>
						<h6>Expected Listing Gains</h6>
						<h5>{expectedListingGains[data.expected_listing_gains]}!</h5>
					</div>

					<div className={cx(s.item, s.companyHealth)}>
						<h6>Company Health</h6>
						<div className={s.left}>
							<span>{data.company_health_before_type}</span>
							<span className={s.bold}>{data.company_health_before_year}</span>
						</div>
						<div className={s.right}>
							<span>{data.company_health_after_type}</span>
							<span className={s.bold}>{data.company_health_after_year}</span>
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
							<div className={cx(s.item, s.bar1)}>
								<h6>₹0.7k Cr</h6>
								<div />
								<span>2019</span>
							</div>

							<div className={cx(s.item, s.bar2)}>
								<h6>₹1.4k Cr</h6>
								<div />
								<span>2020</span>
							</div>

							<div className={cx(s.item, s.bar3)}>
								<h6>₹2.9k Cr</h6>
								<div />
								<span>2021</span>
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
						<div className={s.slider}>
							<h4>₹{sliderValue}</h4>
							<input
								type="range"
								min={details.cutoff * details.lotsize}
								max={200000}
								step={1}
								value={sliderValue}
								onChange={(e) => {
									console.log('currentTarget',e.currentTarget.value);
									setSliderValue(e.target.value);
								}}
							/>
							<div className={s.sub}>
								<span>₹{details.highprice * details.lotsize}</span>
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
								onClick={() => {
									setToggle(!toggle);
								}}
							>
								<div className={s.names}>
									<span>Cut Off</span>
									<span>Custom</span>
								</div>
								<div className={cx(s.toggler, toggle ? s.active : '')} />
							</div>
						</div>
						<div className={s.totalQty}>
							<h4>Total Qty</h4>
							<span>200 Shares</span>
						</div>
						<button className={s.apply} onClick={applyNow}>
							Apply Now
						</button>
					</div>
				</div>
			</section>

			<section className={s.section5}>
				<h3 className={s.header}>About Zomato IPO</h3>
				<div className={s.cards}>
					<div className={s.card1}>
						<div className={s.image}>Zomato</div>
						<div className={s.gradient} />
						<div className={s.text}>
							<div className={s.head} />
							<div className={s.foot}>
								<h6>{'What is an IPO & why should you invest in it?'}</h6>
								<span>Zomato IPO</span>
							</div>
							<img src={PlayButton} alt="Play" className={s.play} />
						</div>
					</div>

					<div className={s.card2}>
						<div className={s.back} />
						<div className={s.head}>
							<h5>Zomato IPO Report</h5>
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
					<div className={s.left}>
						<p>
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
						</div>
					</div>

					<div className={s.right}>
						<img src={`${CMS_URL}${data.consideration_image}`} alt="Zomato" />
					</div>
				</div>
			</section>

			<section className={s.section7}>
				<div className={s.header}>Others also invested in</div>

				<div className={s.cards}>
					<Section1Card
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
					/>
				</div>
			</section>
		</div>
	);
};

export default IPODetails;
