import { Fragment, useEffect, useState } from 'react';
import s from './ApplicationPage01.module.scss';
import NextArrow from '../../assets/images/ApplicationProcess/arrow_back_black_24dp (1).svg';
import prevarrow from '../../assets/images/ApplicationProcess/prevarrow.svg';
import EditImg from '../../assets/images/ApplicationProcess/mode_edit_black_24dp (1) (1).svg';
import DeleteImg from '../../assets/images/ApplicationProcess/delete_black_24dp (1).svg';
import ToggleSwitch from '../UIComponents/ToggleSwitch';
import AddImg from '../../assets/images/ApplicationProcess/add_circle_outline_black_24dp.svg';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { applicationData as setApplicationData } from '../../store/action/applicationData';
import { getIssueDetailsFromCmsByCode, getOpenIssuesDetails } from '../../services/issuesServices';
import { CMS_URL,clevertap_key } from '../../vars/url';
import cx from 'classnames';
import SweetAlert from 'react-bootstrap-sweetalert';
import NoImg from '../../assets/images/noimg.jpg';
import LoaderImg from '../../assets/images/loader.svg';
import { Link,useHistory  } from 'react-router-dom';
import ClevertapReact from 'clevertap-react';

const Card = ({
	bid,
	qty: qty_init,
	share: share_init,
	investment,
	edit = false,
	handleBidEdit,
	setCardEdit,
	deleteCard,
	cardsLength = 0,
	iiflData,
	ctof,
	seteditactive,
	setalert,
	setalertmsg,
	cardno,
	curedit,
}) => {
	const [ editState, setEditState ] = useState(() => {
		return cardno === curedit ? true : false;
	});
	
	const applicationData = useSelector(state => state.applicationData)
	const [ qty, setQty ] = useState(qty_init);
	const [ share, setShare ] = useState(share_init);
	const [ investmentval, setInvestment ] = useState(investment);
	const [ cutOffchange, setcutOffchange ] = useState(share_init);
	const [ customval, setcustomval ] = useState(ctof == "N" ? share_init : 0);
	const [ sliderValue, setSliderValue ] = useState(investment);
	const [ toggle, setToggle ] = useState(ctof == "N" ? true : false);
	
	const [ cutoffyn, setcutoffyn ] = useState(ctof);
	
	//console.log('investment_initial',investment_initial)
	// console.log(ctof)z

	const handleDone = () => {
		let shareprice =(cutoffyn == "N")? parseInt(customval) : parseInt(cutOffchange);
		if(cutoffyn == "N" && customval === 0){
			alert("Enter custom value.")
		}else{
			
			handleBidEdit(bid, parseInt(sliderValue/cutOffchange), parseFloat(shareprice), parseFloat(sliderValue),cutoffyn);
			setEditState(false);
			seteditactive(false);
		}

		
	};

	const changeslidervalue = async (sliderval) => {
		setSliderValue(sliderval)
		
	}

	const changeToggle = async (toggle,realcutoff) => {
		console.log(toggle)
		setToggle(toggle);
		if(toggle){ // for custom
			// console.log('if')
			setcutoffyn("N")
			setcustomval(iiflData.lowprice)
			setcutOffchange(iiflData.lowprice)
			setSliderValue(iiflData.lowprice * iiflData.lotsize)
		}else{ //for cutoff
			// console.log('else')
			setcutoffyn("Y")
			setcustomval(iiflData.lowprice)
			setcutOffchange(realcutoff)
			setSliderValue(iiflData.lotsize * iiflData.cutoff)

		}
		
	}

	const customcutoff =  (e,reallot,realLowPrice,realHighprice) => {
		console.log('toggle',e,reallot,realLowPrice,realHighprice)
		if(toggle){
			let customCurrentvalue= e.target.value;
			if(realLowPrice <= customCurrentvalue && realHighprice >=customCurrentvalue){
				customCurrentvalue = customCurrentvalue;
			}else{
				setalert(true)				
				setalertmsg(`Value should be between ${realLowPrice} and ${realHighprice}`)		
				
				setcustomval(realLowPrice);
				return false
			}
			setcustomval(customCurrentvalue);
			setcutOffchange(customCurrentvalue)
			console.log(customCurrentvalue * reallot)
			setSliderValue(customCurrentvalue * reallot)
		}else{
			// console.log('not hide')
		}
		
	}

	
	const changeslidervaluexs = async(value) => {
		if(value > 200000)
		{
			var ctoff =  iiflData.lotsize * cutOffchange;
			var xcess = value -(value%ctoff);
			//alert(xcess)
			setSliderValue(xcess)		
		}
	}

	return (
		<Fragment>
			{editState ? (
				<div className={s.cardEdit}>
					<div className={s.top}>
						<h4>
							{bid+1}
							<sup>{bid+1 === 1 ? 'st' : bid+1 === 2 ? 'nd' : bid+1 === 3 ? 'rd' : 'th'}</sup>
							{' Bid'}
						</h4>

						<button onClick={handleDone}>Done</button>
					</div>

					<div className={s.body}>
						<div className={s.left}>
							<h5>
							{sliderValue > 200000 ?
								'Enter bidding amount > rs. 2,00,000'
								:
								'How much do you want to invest?'
							}
							</h5>
							
							<div className={s.slider}>
								{sliderValue > 200000 ?
									<div className={s.morebid}>
										<input type="number"
											placeholder='Enter Amount'
											min={200000}
											onKeyPress={(ev) => {
												if (ev.which != 8 && ev.which != 0 && ev.which < 48 || ev.which > 57)
												{
													ev.preventDefault();
												}
											}}
											className={s.custommorerange}
											defaultValue={sliderValue}									
											onBlur={(e) => {
												changeslidervaluexs(e.target.value)
											}}
										/>
									</div>
									:
									<h4>₹{sliderValue}</h4>
								}								
								<input type="range"
								 min={cutOffchange  * iiflData.lotsize}
								 max={200000+((cutOffchange  * iiflData.lotsize)-(200000%(cutOffchange  * iiflData.lotsize)))+1} 
								 step={iiflData.lotsize*cutOffchange}
								 value={sliderValue}
								 onChange={(e) => {
									// console.log(e.target.value);
									changeslidervalue(e.target.value)
									
								 }}
								 />
								<div>
								<span>₹{cutOffchange * iiflData.lotsize}</span>
									<span style={{marginLeft:'auto',marginRight:'20px'}}>2L</span>
									<span className={s.moretl}> &gt;2L</span>
								</div>
							</div>
						</div>

						<div className={s.right}>
							<h5>Share Price</h5>
							{iiflData.lowprice != iiflData.highprice ?
								<span className={s.light}>Range: ₹{iiflData.lowprice} - ₹{iiflData.highprice}</span>
								:
								<span className={s.light}>Range: ₹{iiflData.lowprice}</span>
							}

							{/* <ToggleSwitch className={s.toggle}
							 left="Cut off"
							 right="Custom" 
							 ctof={ctof}		 
							/> */}
							{iiflData.lowprice != iiflData.highprice &&
								<>
									<input type="number" className={cx(s.toggler,s.customcutoff, toggle ? s.actives : s.hidecstominp)} 
										value={customval}
										min={iiflData.lowprice}
										max={iiflData.highprice}
										onKeyPress={(ev) => {
											if (ev.which != 8 && ev.which != 0 && ev.which < 48 || ev.which > 57)
											{
												ev.preventDefault();
											}
										}}
										onChange={(e) => setcustomval(parseInt(e.target.value))}
										onBlur={(e) => customcutoff(e,iiflData.lotsize,iiflData.lowprice,iiflData.highprice)}/>
									<div
										className={s.toggle}
										onClick={() => {
											changeToggle(!toggle,iiflData.cutoff)
										}}
									>
										<div className={cx(s.toggler, toggle ? s.active : '')} />
										<div className={s.text}>
											<span className={cx( toggle ? s.black : s.white)}>Cut off</span>
											<span className={cx( toggle ? s.white : s.black)}>Custom</span>
										</div>
									</div>
								</>
							}
						</div>
					</div>

					<div className={s.bottom}>
						<h4>Total Qty</h4>
						<span>{sliderValue/cutOffchange} Shares</span>
					</div>
				</div>
			) : (
				<div className={s.card}>
					<div className={s.left}>
						<div>
							<span>Bid</span>
							<h4>
								{bid+1}
								<sup>{bid+1 === 1 ? 'st' : bid+1 === 2 ? 'nd' : bid+1 === 3 ? 'rd' : 'th'}</sup>
								{' Bid'}
							</h4>
						</div>

						<div>
							<span>Qty</span>
							<h4>{investment/cutOffchange} Shares</h4>
						</div>

						<div>
							<span>Share Price</span>
							<h4>₹{(cutoffyn == "N")? parseInt(customval) : parseInt(cutOffchange)}</h4>
						</div>

						<div>
							<span>Investment Amount</span>
							<h4>₹{investment}</h4>
						</div>
					</div>
					<div className={s.right}>						
						{cardsLength > 1 && (
							<button onClick={deleteCard}>
								<img src={DeleteImg} alt="Delete" />
							</button>
						)}

						<button className="hover-animate"
							onClick={() => {
								setEditState(true);
								seteditactive(true)
							}}
						>
							<img src={EditImg} alt="Edit" />
						</button>
					</div>
				</div>
			)}
		</Fragment>
	);
};

const ApplicationPage01 = ({ img, ipo_name, company, nextPage }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const applicationData = useSelector((state) => state.applicationData);
	//console.log('applicationData',applicationData)
	const [ data, setData ] = useState({});
	const [ totalval,settotalval ] = useState(Math.max(...applicationData.totalbidprice.map((e) => parseInt(e))));
	const [ editactive,seteditactive ] = useState(false);
	const [ alert,setalert ] = useState(false);
	const [ alertmsg,setalertmsg] = useState('Error');
	const [ curedit,securedit] = useState('');
	const [ discountedCategories,setDiscountedCategories] = useState([]);
	

	const [ cards, setCards ] = useState([
		{
			qty: 200,
			share: '85',
			investment: '1,15,568',
			editState: false
		},
		{
			qty: 200,
			share: '85',
			investment: '1,15,568',
			editState: true
		}
	]);

	const cardEdit = (no, state) => {
		no = no - 1;
		let newList = cards.slice(0, no);
		console.log(newList);
		let editCard = { ...cards[no] };
		editCard = { ...editCard, editState: state };
		if (no === cards.length - 1) {
			newList = [ ...newList, { ...editCard } ];
		} else {
			newList = [ ...newList, { ...editCard }, ...cards.slice(no + 1) ];
		}
		console.log(newList);
		setCards([ ...newList ]);
	};

	const handleBidEdit = (bidNo, qty, shareprice, totalinvestment,cutoffyn) => {
		let { noOfShares, bidPrice, cutOff,sharePrice ,totalbidprice } = applicationData;
		console.log('bidNo',bidNo)
		noOfShares[bidNo] = qty;
		bidPrice[bidNo] = shareprice;
		cutOff[bidNo] = totalinvestment > 200000 ? 'N' :cutoffyn;
		sharePrice[bidNo] = shareprice;
		totalbidprice[bidNo] = totalinvestment;
		let total = Math.max(...applicationData.totalbidprice.map((e) => parseInt(e)))
		/*applicationData.totalbidprice.forEach((e) => {
			console.log(e)
			total+=parseInt(e);
		})*/
		settotalval(total)
		dispatch(setApplicationData({ ...applicationData, noOfShares, bidPrice, cutOff , sharePrice, totalbidprice}));
	};

	const addBid = () => {
		// These values will be different for different IPOs, values needs to be fetched before-hand
		let { noOfShares, bidPrice, cutOff,sharePrice ,totalbidprice } = applicationData;
		securedit(noOfShares.length)
		noOfShares.push(parseInt(noOfShares[0]));
		bidPrice.push(parseFloat(bidPrice[0]));
		cutOff.push(cutOff[0]);
		sharePrice.push(sharePrice[0]);
		totalbidprice.push(parseFloat(totalbidprice[0]));
		let total = Math.max(...applicationData.totalbidprice.map((e) => parseInt(e)))
		/*applicationData.totalbidprice.forEach((e) => {
			total+=parseInt(e);
		})*/
		
		settotalval(total)
		seteditactive(true)
		dispatch(setApplicationData({ ...applicationData, noOfShares, bidPrice, cutOff , sharePrice, totalbidprice}));
		
	};

	const deleteCard = (bidNo) => {
		let { noOfShares, bidPrice, cutOff ,sharePrice ,totalbidprice} = applicationData;
		console.log(noOfShares.length,bidNo )
		if(noOfShares.length >1){
			noOfShares.splice(bidNo, 1);
			bidPrice.splice(bidNo, 1);
			cutOff.splice(bidNo, 1);
			sharePrice.splice(bidNo, 1);
			totalbidprice.splice(bidNo, 1);
			let total = Math.max(...applicationData.totalbidprice.map((e) => parseInt(e)))
			/*applicationData.totalbidprice.forEach((e) => {
				total+=parseInt(e);
			})*/
			settotalval(total)
			dispatch(setApplicationData({ ...applicationData, noOfShares, bidPrice, cutOff, sharePrice, totalbidprice }));
		}else{
			setalert(true)
			setalertmsg("You cannot delete this bid.")
		}
	};

	const fetchDetails = async () => {
		try {
			let cmsData = {'test':123}
			try {
				cmsData = await getIssueDetailsFromCmsByCode(applicationData.IPOBondName);
			} catch (error) {
				console.log(error)
			}
			cmsData = cmsData.data
			
			let { data: iiflData } = await getOpenIssuesDetails(applicationData.IPOBondName);
			setData({ cms: cmsData?.result, iifl: iiflData.resultData  });
		} catch (error) {
			console.log(error);
		}

		ClevertapReact.initialize(clevertap_key);
		var ClevertapPayload = {
			"Source":"IPO Details Page",
			"IPO Name":applicationData.IPOBondName,
			"Bid Number":'',
			"Investment Amount": Math.max(...applicationData.totalbidprice.map((e) => parseInt(e))),
			"Price Type":applicationData.cutOff[0],
			"Journey time Start":new Date().getTime()
		}
		ClevertapReact.event("IPO_Application Step 1",ClevertapPayload)
	};

	const hidesweeetalert = () => {
		setalert(false)
	}

	const nextPageButton = () => {


		if(editactive === true)
		{
			setalert(true)
			setalertmsg("Please save your bid befor proceeding.")			
			return false
		}
		// console.log('editactive',editactive);
		// return false
		
		let { noOfShares, bidPrice, cutOff,sharePrice ,totalbidprice } = applicationData;
		dispatch(
			setApplicationData({
				...applicationData,
				//Amount: totalbidprice.reduce((a, b) => a + b, 0),
				Amount: totalval,
				upiList: data.iifl.upiList,
				categoryList: data.iifl.categoryList,
			})
		);
		nextPage();
	};

	const calculatediscount = () => {
		
		var discCats = applicationData.ipodetails.categoryList.filter(function(v, i) {
			return (v.discountApplicable === 'Y');
		  })
		setDiscountedCategories(discCats)		
	}

	useEffect(() => {
		fetchDetails();
		calculatediscount();
	}, []);

	return (
		<div className={s.main}>
{alert === true &&
	<SweetAlert
	error
	title="Alert!"
	onConfirm={hidesweeetalert}
	>
	{alertmsg}
	</SweetAlert>
}

		{!data?.iifl?.issuecode ? 
				<div className="loading_screen loading_inside">
					<img src={LoaderImg} alt="loading..." />                            
				</div>
				:
				<>
					<div className={s.head}>
						<div className={s.left} onClick={()=> history.push("/ipo_details/"+applicationData.IPOBondName)}>
							<img src={data?.cms?.logo ? `${CMS_URL}${data?.cms?.logo}`:NoImg} alt={data?.iifl?.issuecode} />

							<div className={s.title}>
								<h2>{data?.iifl?.issuecode}</h2>
								<span>{data?.iifl?.schname}</span>
							</div>
						</div>

						<div className={s.right}>
							<h2>₹{totalval}</h2>
							<span>Total Amount</span>
						</div>
					</div>

					<section className={s.cards}>
						{applicationData.noOfShares.map((e, i) => {
							return (
								<Fragment>
									<Card
										qty={applicationData.noOfShares[i]}
										investment={applicationData.totalbidprice[i]}
										share={applicationData.sharePrice[i]}
										bid={i}
										ctof={applicationData.cutOff[i]}
										setCardEdit={cardEdit}
										cardsLength={applicationData.noOfShares.length}
										handleBidEdit={handleBidEdit}
										deleteCard={() => deleteCard(i)}
										iiflData={data.iifl}
										seteditactive={seteditactive}
										setalert={setalert}
										setalertmsg={setalertmsg}
										cardno={i}
										curedit={curedit}
									/>
								</Fragment>
							);
						})}

						{applicationData.noOfShares.length < 3 && (
							<button className={s.addBid + " hover-animate"} onClick={addBid}>
								<img src={AddImg} alt="Add" />
								<span>Add more bids</span>
							</button>
						)}

						{/* Discount category notification show */}
						{discountedCategories.length > 0 &&
							<>							
								{discountedCategories.map((e, i) => {
									return (
										<div className={s.notificationstep}>
											<img src='/discount.png' alt='Discount applicable' />
											<span>
												Discount available in {e.categoryName} category of {(parseFloat(e.discountValue)).toFixed(2)} {e.discountType === 'R' ? 'Rs': '%'}
											</span>
										</div>
									)
								})}
							</>
						}

						{/* End Discount category notification show  */}


						
					</section>

					<div className={s.foot}>
						{data?.iifl?.issuecode &&
							<>
								<a className={s.outline + " hover-animate"} href={`/ipo_details/${data?.iifl?.issuecode}`}>
									<img src={prevarrow} alt="Prev" />
									Previous 
								</a>
								<button className="hover-animate" onClick={nextPageButton}>
									<span>Next</span>
									<img src={NextArrow} alt="Next" />
								</button>
							</>
						}
						
					</div>
				</>
			}
		</div>
	);
};

export default ApplicationPage01;
