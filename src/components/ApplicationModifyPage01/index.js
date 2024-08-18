import { Fragment, useEffect, useState } from 'react';
import s from './ApplicationModifyPage01.module.scss';
import prevarrow from '../../assets/images/ApplicationProcess/prevarrow.svg';
import NextArrow from '../../assets/images/ApplicationProcess/arrow_back_black_24dp (1).svg';
import EditImg from '../../assets/images/ApplicationProcess/mode_edit_black_24dp (1) (1).svg';
import DeleteImg from '../../assets/images/ApplicationProcess/delete_black_24dp (1).svg';
import ToggleSwitch from '../UIComponents/ToggleSwitch';
import AddImg from '../../assets/images/ApplicationProcess/add_circle_outline_black_24dp.svg';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { applicationData as setApplicationData } from '../../store/action/applicationData';
import { getIssueDetailsFromCmsByCode, getOpenIssuesDetails, getAppliedIPODetails } from '../../services/issuesServices';
import { CMS_URL } from '../../vars/url';
import cx from 'classnames';
import { Redirect, useParams } from 'react-router';
import { Link,useHistory  } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import NoImg from '../../assets/images/noimg.jpg';
import LoaderImg from '../../assets/images/loader.svg';
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
	setalertmsg
}) => {
	const [ editState, setEditState ] = useState(() => {
		return bid > 1 ? true : false;
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
	
	//console.log('investment',investment/share_init)
	// console.log(ctof)

	const handleDone = () => {
		let shareprice =(cutoffyn == "N")? parseInt(customval) : parseInt(cutOffchange);
		if(cutoffyn == "N" && customval === 0){
			alert("Enter custom value.")
		}else{
			if(investment > 200000 && investment > sliderValue)
			{
				setalert(true)
				setalertmsg(`Please avoid reducing the bid amount as it will lead to cancellation of the bid.`)
				return false
			}
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

	const changeslidervaluexs = async(value,asba=false) => {
		if(value > 200000)
		{
			var ctoff =  iiflData.lotsize * cutOffchange;
			var xcess = value -(value%ctoff);
			//alert(xcess)
			setSliderValue(xcess)		
		}
		else
		{
			if(asba===true)
			{
				setalert(true)
				setalertmsg(`Please avoid reducing the bid amount as it will lead to cancellation of the bid.`)		
			}
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
							
							<h5>How much do you want to invest?</h5>
							{investment > 200000 ?							
									<div className={s.morebid}>
										<input type="number"
											min={200000}
											className={s.custommorerange}
											// defaultValue={sliderValue}	
											value={sliderValue}
											onKeyPress={(ev) => {
												if (ev.which != 8 && ev.which != 0 && ev.which < 48 || ev.which > 57)
												{
													ev.preventDefault();
												}
											}}
											onChange={(e) => setSliderValue(e.target.value)}
											onBlur={(e) => {
												changeslidervaluexs(e.target.value,true)
											}}
										/>
									</div>
							:
									<div className={s.slider}>
										{sliderValue > 200000 ?
											<div className={s.morebid}>
												<input type="number"
													min={200000}
													className={s.custommorerange}
													value={sliderValue}
													onKeyPress={(ev) => {
														if (ev.which != 8 && ev.which != 0 && ev.which < 48 || ev.which > 57)
														{
															ev.preventDefault();
														}
													}}
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
											max={200000+(iiflData.lotsize * cutOffchange)} 
											step={iiflData.lotsize*cutOffchange}
											value={sliderValue}
											onChange={(e) => {
												// console.log(e.target.value);
												changeslidervalue(e.target.value)
												
											}}
											/>
											<div>
												<span>₹{cutOffchange * iiflData.lotsize}</span>
												<span>{iiflData.cutofflimit}</span>
											</div>
									</div>
							}
							
						</div>

						<div className={s.right}>
							<h5>Share Price</h5>
							<span className={s.light}>Range: ₹{iiflData.lowprice} - ₹{iiflData.highprice}</span>

							{/* <ToggleSwitch className={s.toggle}
							 left="Cut off"
							 right="Custom" 
							 ctof={ctof}		 
							/> */}
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
								onChange={(e) => setcustomval(e.target.value)}
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
						</div>
					</div>

					<div className={s.bottom}>
						<h4>Total Qty</h4>
						<span>{parseInt(sliderValue/cutOffchange)} Shares</span>
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
						{applicationData?.noOfShares.length > 1 && (
							<button onClick={deleteCard}>
								<img src={DeleteImg} alt="Delete" />
							</button>
						)}

						<button
							onClick={() => {
								setEditState(true);
								seteditactive(true);
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

const ApplicationModifyPage01 = ({ img, ipo_name, company, nextPage }) => {

	const redirrct = () => {
		//window.alert('dadsdas')
		window.location.replace("/ipo_details/"+issueCode);
		return false;
	}

	const { issueCode,applicationno } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();
	const user = useSelector((state) => state.loggedIn.user);
	let applicationData = useSelector((state) => state.applicationData);
	console.log('applicationData',applicationData)
	const [ data, setData ] = useState({});
	const [ totalval,settotalval ] = useState(() => { if(applicationData.totalbidprice) {return Math.max(...applicationData.totalbidprice.map((e) => parseInt(e)))} else {redirrct()}});
	const [ editactive,seteditactive ] = useState(false);
	const [ alert,setalert ] = useState(false);
	const [ alertmsg,setalertmsg] = useState('Error');
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
		settotalval(total)
		seteditactive(true)
		dispatch(setApplicationData({ ...applicationData}));
	};

	const addBid = () => {
		// These values will be different for different IPOs, values needs to be fetched before-hand
		let { noOfShares, bidPrice, cutOff,sharePrice ,totalbidprice } = applicationData;
		
		noOfShares.push(parseInt(noOfShares[0]));
		bidPrice.push(bidPrice[0]);
		// console.log('sharePrice',sharePrice)
		
		cutOff.push(cutOff[0]);
		//sharePrice.push(sharePrice[0]);
		totalbidprice.push(parseFloat(totalbidprice[0]));
		let total = Math.max(...applicationData.totalbidprice.map((e) => parseInt(e)))
		// console.log('bidPrice',bidPrice,sharePrice)
		// return false;
		settotalval(total)
			
		dispatch(setApplicationData({ ...applicationData}));
		
	};

	const deleteCard = (bidNo) => {
		let { noOfShares, bidPrice, cutOff ,sharePrice ,totalbidprice} = applicationData;
		console.log(noOfShares.length )
		if(noOfShares.length >1){
			noOfShares.splice(bidNo, 1);
			bidPrice.splice(bidNo, 1);
			cutOff.splice(bidNo, 1);
			sharePrice.splice(bidNo, 1);
			totalbidprice.splice(bidNo, 1);
			let total = Math.max(...applicationData.totalbidprice.map((e) => parseInt(e)))
			settotalval(total)
			dispatch(setApplicationData({ ...applicationData}));
		}else{
			alert("You cannot delete this bid.")
		}
	};

	const fetchDetails = async () => {
		try {
			let clientcode = (user.clientType == 'NONIIFLCLIENT')? user.panNo : user.clientcode;

			let { data: cmsData } = await getIssueDetailsFromCmsByCode(issueCode);
			let { data: iiflData } = await getOpenIssuesDetails(issueCode);			
			// let { data: scheduleData } = await getAppliedIPODetails(clientcode,issueCode,applicationno);

			var discCats = iiflData.resultData.categoryList.filter(function(v, i) {
				return (v.discountApplicable === 'Y');
			  })
			setDiscountedCategories(discCats)	

			setData({ cms: cmsData.result, iifl: iiflData.resultData, scheduled : applicationData.scheduleData });
		} catch (error) {
			console.log(error);
		}
	};

	const nextPageButton = () => {

		if(editactive === true)
		{
			setalert(true)
			setalertmsg("Please save your bid befor proceeding.")			
			return false
		}
		
		let { noOfShares, bidPrice, cutOff,sharePrice ,totalbidprice } = applicationData;
		dispatch(
			setApplicationData({
				...applicationData,
				Amount: totalval,
				upiList: data.iifl.upiList,
				categoryList: data.iifl.categoryList,
				// scheduleData :data.scheduled,
				IPOBondName:issueCode
			})
		);
		nextPage();
	};

	const hidesweeetalert = () => {
		setalert(false)
	}

	
	

	useEffect(() => {
		fetchDetails();
		
	}, []);

	return (
		<>
		{data.iifl ?
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
			<div className={s.head}>
				<div className={s.left} onClick={()=> data?.iifl?.issuecode && history.push("/ipo_details/"+data?.iifl?.issuecode) }>
					<img src={data?.cms?.logo?`${CMS_URL}${data?.cms?.logo}`:NoImg} alt={data?.cms?.issue_name} />
					
					<div className={s.title}>
						<h2>{data?.cms?.issue_name ? data?.cms?.issue_name : data?.iifl?.issueCode}</h2>
						<span>{data?.iifl?.schname}</span>
					</div>
				</div>

				<div className={s.right}>
					<h2>₹{totalval}</h2>
					<span>Total Amount</span>
				</div>
			</div>

			<section className={s.cards}>
				{applicationData?.noOfShares?.map((e, i) => {
					// console.log('noOfShares===>',noOfShares)
					return (
						<Fragment>
							<Card
								qty={applicationData.noOfShares[i]}
								investment={applicationData.totalbidprice[i]}
								share={applicationData.sharePrice[i]}
								bid={i}
								ctof={applicationData.cutOff[i]}
								setCardEdit={cardEdit}
								cardsLength={cards.length}
								handleBidEdit={handleBidEdit}
								deleteCard={() => deleteCard(i)}
								iiflData={data.iifl}
								seteditactive={seteditactive}
								setalert={setalert}
								setalertmsg={setalertmsg}
							/>
						</Fragment>
					);
				})}

				{applicationData?.noOfShares?.length < 3 && (
					<button className={s.addBid} onClick={addBid}>
						<img src={AddImg} alt="Add" />
						<span>Add more bids</span>
					</button>
				)}
			</section>

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

			<div className={s.foot}>

				<a className={s.outline} href={`/your_applications`}>
					<img src={prevarrow} alt="Prev" />
						Previous 
				</a>

				<button onClick={nextPageButton}>
					<span>Next</span>
					<img src={NextArrow} alt="Next" />
				</button>
			</div>
		</div>
		:
		<div className="loading_screen">
			<img src={LoaderImg} alt="loading..." />                            
		</div>
		}
		</>
	);
};

export default ApplicationModifyPage01;
