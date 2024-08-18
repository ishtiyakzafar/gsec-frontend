import { Fragment, useState,useEffect } from 'react';
import s from './ApplicationCard.module.scss';
import DeleteImg from '../../assets/images/ApplicationCard/delete_black_24dp.svg';
import EditImg from '../../assets/images/ApplicationCard/mode_edit_black_24dp (1).svg';
import WarningImg from '../../assets/images/ApplicationCard/warning_black_24dp.svg';
import DoneImg from '../../assets/images/ApplicationCard/done_black_24dp.svg';
import WaitImg from '../../assets/images/ApplicationCard/schedule_black_24dp.svg';
import CaretImg from '../../assets/images/ApplicationCard/expand_more_black_24dp (1).svg';
import CalendarImg from '../../assets/images/ApplicationCard/event_black_24dp (2).svg';
import { CMS_URL,clevertap_key } from '../../vars/url';
import IpoCancelpopup from "../UIComponents/IpoCancelpopup/IpoCancelpopup";
import {  getAppliedIPODetails,getNCDdetails,getpdfcoordinate,getpdfcoordinatencd,getpdfFromCmsByCode } from '../../services/issuesServices';
import { useDispatch } from 'react-redux';
import { applicationData as setApplicationData } from '../../store/action/applicationData';
import { applicationData } from '../../store/action/applicationData';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router';
import { Link,useHistory  } from 'react-router-dom';
import NoImg from '../../assets/images/noimg.jpg';
import cx from 'classnames';
import ClevertapReact from 'clevertap-react';

const ApplicationCard = ({details,setLoading,alloppor,keyvl
	
	
	
}) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.loggedIn.user);
	const [ showTimeLine, setShowTimeLine ] = useState(true);
	const [modalType, setModalType] = useState(null);
	const [ redirect, setRedirect ] = useState(false);
	const [ appno, setappno ] = useState(false);
	const [ openmodal, setopenmodal ] = useState(false);
	const [ isapply, setisapply ] = useState(0);
	const [ modaldata, setmodaldata ] = useState({});	
	const applicationData = useSelector((state) => state.applicationData);

	
	
	
	const editNow = async (applicationNo,iponame,srno) => {
		
		ClevertapReact.initialize(clevertap_key);		   
		ClevertapReact.event("IPO_Modify Click",{
			"Source":"Application history page",
			"IPO Name":iponame,
			"Bid Number":applicationNo,
			"Investment Amount":details.investment,
			"Investor category":details.investmentAs,
			"Application number":details.applicationNo,

		})
		setLoading(true)
		let clientcode = (user.clientType == 'NONIIFLCLIENT')? user.panNo : user.clientcode;

		let { data: scheduleData } = await getAppliedIPODetails(clientcode,iponame,applicationNo,srno);
		console.log('scheduleData',scheduleData);
		if(scheduleData?.isSuccess ==  true && scheduleData?.statusCode == 200){
			let details = scheduleData.resultData;
			const noOfSharesarr =[];
			const bidPricearr = [];
			const cutOffarr= [];
			const totalbidpricearr = [];
			for (let i = 1; i <= details.totalbidcount; i++) {
				
				noOfSharesarr.push((i==1)? details.noofshares1:((i==2)? details.noofshares2 : details.noofshares3));
				bidPricearr.push((i==1)? details.bidprice1:((i==2)? details.bidprice2 : details.bidprice3));
				cutOffarr.push((i==1)? details.cutoff1:((i==2)? details.cutoff2 : details.cutoff3));
				let share = (i==1)? details.noofshares1:((i==2)? details.noofshares2 : details.noofshares3);
				let price = (i==1)? details.bidprice1:((i==2)? details.bidprice2 : details.bidprice3);
				totalbidpricearr.push(parseFloat(share*price));
			}
			console.log('noOfSharesarr',noOfSharesarr)
			// setnoOfShares(noOfSharesarr => [...noOfSharesarr, false]);
			// setsharePrice(bidPricearr => [...bidPricearr, false]);
			// setcutOff(cutOffarr => [...cutOffarr, false]);
			// settotalbidprice(totalbidpricearr => [...totalbidpricearr, false])
			dispatch(setApplicationData({  
				IPOBondName:details.iponame,
				noOfShares:noOfSharesarr,
				bidPrice:bidPricearr,
				cutOff:cutOffarr,
				sharePrice:bidPricearr, 
				totalbidprice:totalbidpricearr,
				scheduleData:details,
				
			}));
			history.push(`/ipo_modify/${iponame}/${applicationNo}`)
		}
		
	};

	const fetchopenmodal = async (status,data) => {
		setopenmodal(status);
		setmodaldata(data);
	}
	
	const modifyncd = async(hdata) => {
		setLoading(true)
		//console.log('hdt',hdata)
		
		var {data} = await getNCDdetails(hdata.iponame)
		//console.log('ncdfull',data)
		

		// Clevertap start		
		ClevertapReact.initialize(clevertap_key);
		function getSeriesNamect(array,keysearch)
		{
			var fianalArr = [];
			array.forEach(element => {
				fianalArr.push(element[keysearch])
			});
			return fianalArr;
		}
		var payload = {
			'Source':"Application history page",
			'NCD Name':hdata.schemeName,
			'No. of series':getSeriesNamect(hdata.bids,'srNum').join(','),
			'Investment Amount':hdata.amountpaid,
			'Investor category':hdata.category+'|'+hdata.investortype,
			'Application number':hdata.applicationno
		} 
		//console.log('NCD_Modify Click',payload);
		ClevertapReact.event("NCD_Modify Click",payload)
		//return false
		// Clevertap End

		
		if(data.isSuccess === true && data.statusCode === 200)
		{

			dispatch(setApplicationData({  
				ncdhistory:hdata,
				ncdfulldetails:data.resultData,
				clientcode:(user.clientType == 'NONIIFLCLIENT')? user.panNo : user.clientcode,
			}));

			if(user.clientType === 'NONIIFLCLIENT')
			{
				history.push(`/ncd-application-step-2`)
			}
			else
			{
				history.push(`/ncd-application-step-3`)	
				
			}			
		}
		
	}

	useEffect(() => {
		checkapplymore();
	}, []);

	const createPdf = async(details) => {
		var pdfdata = {}
		
		if(details?.instrumentType === "NCD")
		{
			pdfdata = await getpdfcoordinatencd(details?.title,user?.clientcode,details?.srno)
		}
		else
		{		
			 pdfdata = await getpdfcoordinate(details?.title,user?.clientcode,details?.srno);
		}
		let sampledt = {};
		sampledt.issuecode = details?.title
		sampledt.applicationNo = details?.srno
		sampledt.coOrdinates = pdfdata.data.resultData
		sampledt.ismodify = 1
		let finaldetails = await getpdfFromCmsByCode({'sampleRes1':sampledt,'sampleResponse2':{}});
		if(finaldetails.data.status == 0)
		{
			alert(finaldetails.data.message)
			return false
		}
		if(finaldetails.data.data.file){
			let a = document.createElement("a"); //Create <a>
			a.href = finaldetails.data.data.file; 
			a.download = "applicationstatus.pdf"; 
			a.target = "_blank";
			a.click();
		}
		//console.log('pdfdetails',finaldetails);
	}

	const checkapplymore = () => {		
		let itemobj = alloppor;
		var snglitm = itemobj.filter(function(v, i) {
			return (v.issuecode == keyvl);
		  })
		  
		if(snglitm[0])
		{
			var applycat = (snglitm[0].categoryList).length
			if(applycat > 1)
			{
				setisapply(1)
			}
		}
	}
	
	
	return (
		<>
		
		{details?.instrumentType === 'IPO' &&
			<div className={s.main}>
			{redirect && <Redirect to="/ipo_modify" />}
				<div className={s.top}>
					<div className={s.left}>
						<img src={details.img ? `${CMS_URL}${details.img}`:NoImg} alt={details.title} />
						<div className={s.heading}>
							<h2>{details.issue_name}</h2>
							<div>
								<span className={s.green}>Applied</span>
								<span>Application No:</span> <span className={s.no}>{details.applicationNo}</span>
							</div>
						</div>
					</div>

					<div className={s.right}>
						{/* <p style={{color:'#000'}}>
						{details.closeDate}
						{new Date(details.closeDate).getTime()}
						</p> */}
						{details.applicationNo !== 0 &&
							<>
								{(new Date(details.closeDate).getTime() > new Date().getTime() || isNaN(new Date(details.closeDate).getTime())) && 
									<>
										{details.amountpaid <= 200000 &&
											<a data-toggle="modal" data-target={`#IPOcancel${details.applicationNo}`} href="javascript:void(0)" className={s.outline}><img src={DeleteImg} alt="Delete" /></a>
										}
										{details.amountpaid > 500000 &&
											<a href={details?.pdffile ? details?.pdffile : '#'} onClick={(e) => {
												if(!details?.pdffile)
												{
													createPdf(details);
												}
											}} target={details?.pdffile ? "_blank":"_self"} className={s.outline}><img src="./downloadicon.svg" /></a>
										}
										
										<button className={s.outline} onClick={() =>editNow(details.applicationNo,details.scheduleData.iponame,details.srno)}>
											<img src={EditImg} alt="Edit" />
										</button>
										{details.catcount > 1 &&
											<button className={s.primary}  onClick={() => history.push(`/ipo_details/${details.scheduleData.iponame}`)}>							
												{/* Apply again as {details.bidcats[0].nsE_Code == 'SHA' ? 'shareholder':(details.bidcats[0].nsE_Code == 'POL' ? 'Policyholder' : 'Individual')} */}
												Apply Again
											</button>
										}
									</>
								}
							</>
						}
						{details.applicationNo === 0 &&
							<>
							{(new Date(details.closeDate).getTime() > new Date().getTime() || isNaN(new Date(details.closeDate).getTime())) && 							
								<a data-toggle="modal" data-target={`#IPOcancel${details.applicationNo}`} href="javascript:void(0)" className={s.outline}><img src={DeleteImg} alt="Delete" /></a>							
							}
							{details.catcount > 1 &&
								<button className={s.primary}  onClick={() => history.push(`/ipo_details/${details.scheduleData.iponame}`)}>							
									{/* Apply again as {details.bidcats[0].nsE_Code == 'SHA' ? 'shareholder':(details.bidcats[0].nsE_Code == 'POL' ? 'Policyholder' : 'Individual')} */}
									Apply Again
								</button>
							}
							</>

						}
					</div>
				</div>

				<div className={s.body}>
					<div>
						<span>Invested total of</span>
						<h4>{details.investment}</h4>
					</div>

					<div>
						<span>Your Highest Bid</span>
						<h4>{details.highestBid}</h4>
					</div>

					<div>
						<span>Payment Mode</span>
						<h4>{details.paymentMode}</h4>
					</div>

					<div>
						<span>Invested as</span>
						<h4>{details.investmentAs}</h4>
					</div>
				</div>

				{/* {new Date() < new Date(details.schedule[3].date) && */}
					<>
						{details.warning.length > 0 && (
							<div className={details.confstatus.length > 0 ? cx(s.warning,s.greenwrning) : s.warning }>
								
								{details.confstatus.length > 0 ?
									<>
										<img src={WarningImg} alt="Warning" />
										<span>{details.confstatus[0].status}  {details.confstatus[0].nextSteps ? ','+details.confstatus[0].nextSteps : ''}</span>
									</>
									:
									<>
										<img src={WarningImg} alt="Warning" />
										<span>Application status will be updated shortly</span>
									</>
								}
							</div>
						)}
					</>
				{/* } */}
				
				{showTimeLine && (
					
					<div className={s.timeline}>
						{/* <div style={{color:'#000'}}>{JSON.stringify(details.schedule)}</div> */}
						<div className={s.numbers}>
							{details.schedule.map((e, i) => {
								return (
									<Fragment>
										<div className={s.number}>
											{e.status === 0 ? (
												<div className={s.notDone}>
													<img src={WaitImg} alt="Not done" />
												</div>
											) : e.status === 1 ? (
												<div className={s.wait}>
													<img src={WaitImg} alt="Wait" />
												</div>
											) : (
												<div className={s.done}>
													<img src={DoneImg} alt="Done" />
												</div>
											)}
										</div>

										{i !== details.schedule.length - 1 && (
											<Fragment>
												{e.status === 2 ? (
													<div className={s.doneLine} />
												) : (
													<div className={s.line} />
												)}
											</Fragment>
										)}
									</Fragment>
								);
							})}
						</div>

						<div className={s.text}>
							{details.schedule.map((e, i) => {
								return (
									<div className={s.item}>
										<h5>{e.name}</h5>
										<span>{new Date(e.date).toLocaleDateString('en-IN', {
								month: 'short',day: '2-digit',year:'numeric'})}</span>
									</div>
								);
							})}
						</div>
					</div>
				)}
			{details?.instrumentType !== 'SGB' &&
				<div className={s.foot}>
					<button onClick={() => setShowTimeLine(!showTimeLine)}>
						<span>{showTimeLine ? 'Hide IPO Schedule' : 'View IPO Schedule'}</span>
						<img src={CaretImg} alt="Arrow" className={showTimeLine ? s.up : ''} />
					</button>

					{/* <button>
						<img src={CalendarImg} alt="Calendar" />
						<span>Save IPO Schedule to calendar</span>
					</button> */}
				</div>
			}
			</div>
		}
		{details?.instrumentType === 'SGB' &&
			<div className={s.main}>
				<div className={s.sgbtoprow}>
					<div className={s.logo}>
						<img src="/sgb.webp" />
					</div>
					<div className={s.sgbdetails}>
						<h3>{details.issue_name}</h3>
						<div className={s.sgbapplywrap}>
							<span className={s.status}>Applied</span>
							<p>Bidding Date: <b>{new Date(details.openDate).toLocaleDateString('en-US', {
								month: 'long',day: '2-digit'})} - {new Date(details.closeDate).toLocaleDateString('en-US', {
									month: 'long',day: '2-digit'})}</b>   |  Min. Investment: ₹{details?.scheduleData?.lowprice}/1gm  |  Fixed Returns: 2.5%</p>
						</div>
					</div>
					<div className={s.applybuttondiv}>
						{(new Date(details.closeDate).getTime() > new Date().getTime() || isNaN(new Date(details.closeDate).getTime())) && 
							<a href="/sovereign_gold_bond_details">Apply more</a>
						}
					</div>
				</div>
				<div className={s.sgbbottomrow}>
					<div className={s.singlesgbbottom}>
						<span>Application No</span>
						<p>{details?.applicationNo}</p>
					</div>
					<div className={s.singlesgbbottom}>
						<span>Application Date</span>
						<p>{new Date(details.closeDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} </p>
					</div>					
					<div className={s.singlesgbbottom}>
						<span>Quantity</span>
						<p>{(parseFloat(details.amountpaid/details?.scheduleData?.lowprice)).toFixed(2)} g</p>
					</div>					
					<div className={s.singlesgbbottom}>
						<span>Invested total of</span>
						<p>₹{Number(details.amountpaid).toLocaleString("en-US", {minimumFractionDigits: 0})}</p>
					</div>
				</div>
			</div>
		}

		{details?.instrumentType === 'NCD' &&
			<div className={s.main+' '+s.ncdmainrow}>
				<div className={s.sgbtoprow}>
					<div className={s.logo}>
						<img src={details.img ? `${CMS_URL}${details.img}`:NoImg} style={{maxWidth:100}} />
					</div>
					<div className={s.sgbdetails}>
						<h3>{details.issue_name}</h3>
						<div className={s.sgbapplywrap}>
							<span className={s.status}>Applied</span>
							<p>Bidding Date: <b>{new Date(details.openDate).toLocaleDateString('en-IN', {
								month: 'long',day: '2-digit'})} - {new Date(details.closeDate).toLocaleDateString('en-IN', {
									month: 'long',day: '2-digit'})}</b>   |  Highest Yield: {details?.scheduleData?.maxYield ? details?.scheduleData?.maxYield+'%' : 'NA'} </p>
						</div>
					</div>
					{(new Date(details.closeDate).getTime() > new Date().getTime() && !isNaN(new Date(details.closeDate).getTime())) && 
						<div className={s.applybuttondiv} style={{display:'flex',gap:15}}>							
							<a data-toggle="modal" style={{background:'none',maxWidth:80}} data-target={`#IPOcancel${details.applicationNo}`} href="javascript:void(0)" className={s.outline}><img src={DeleteImg} alt="Delete" /></a>
							{/* <a style={{background:'none',maxWidth:80}} onClick={()=>modifyncd(details.scheduleData)} href="javascript:void(0)" className={s.outline}><img src={EditImg} alt="Modify" /></a> */}
							<a href={`ncd_details/${details.scheduleData.iponame}`}>Apply Again </a>
						</div>
					}
				</div>
				<div className={s.sgbbottomrow}>
					<div className={s.singlesgbbottom}>
						<span>Application No</span>
						<p>{details?.applicationNo}</p>
					</div>
					<div className={s.singlesgbbottom}>
						<span>Series</span>
						<p>{new Date(details.closeDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} </p>
					</div>					
					<div className={s.singlesgbbottom}>
						<span>Payment Mode</span>
						<p>{details?.scheduleData?.ipobankname}</p>
					</div>					
					<div className={s.singlesgbbottom}>
						<span>Invested total of</span>
						<p>₹{Number(details.amountpaid).toLocaleString("en-US", {minimumFractionDigits: 0})}</p>
					</div>
				</div>
				{(new Date(details.closeDate).getTime() > new Date().getTime() && !isNaN(new Date(details.closeDate).getTime())) && 
					<div className={s.ncdmobileapplyrow} style={{display:'flex',gap:15}}>
						<a data-toggle="modal" style={{background:'none',maxWidth:80}} data-target={`#IPOcancel${details.applicationNo}`} href="javascript:void(0)" className={s.outline}><img src={DeleteImg} alt="Delete" /></a>
						<a style={{background:'none',maxWidth:80}} onClick={()=>modifyncd(details.scheduleData)} href="javascript:void(0)" className={s.outline}><img src={EditImg} alt="Modify" /></a>
						<a className={s.applybtn} href={`ncd_details/${details.scheduleData.iponame}`}>Apply Again</a>
					</div>
				}

				{details?.scheduleData?.ipobankname === 'ASBA' &&
					<div className={s.ncdbottom}>
						<span>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
								<path data-name="warning_black_24dp" d="M1 21h22L12 2zm12-3h-2v-2h2zm0-4h-2v-4h2z" style={{fill:'#f36f21'}} />
							</svg>
							Please download the ASBA Application form & submit to the nearest branch.
						</span>
						<span>
							<svg data-name="file_download_black_24dp (1)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
								<path data-name="Path 12861" d="M0 0h24v24H0z" style={{fill:'none'}}/>
								<path data-name="Path 12862" d="M19 9h-4V3H9v6H5l7 7zM5 18v2h14v-2z" style={{fill:'#f36f21'}}/>
							</svg>
							<a href={details?.pdffile ? details?.pdffile : '#'} onClick={(e) => {
								if(!details?.pdffile)
								{
									createPdf(details);
								}
							} } target={details?.pdffile ? "_blank":"_self"}> Download ASBA Form</a>
						</span>
						{/* <span>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
								<path data-name="Path 12863" d="M0 0h24v24H0z" style={{fill:'none'}}/>
								<path data-name="Path 12864" d="M12 8a4 4 0 1 0 4 4 4 4 0 0 0-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06zM12 19a7 7 0 1 1 7-7 6.995 6.995 0 0 1-7 7z" style={{fill:'#f36f21'}}/>
							</svg>
							<a href='javascript:void(0)'>Locate nearest branch</a>
						</span> */}
					</div>
				}
			</div>
		}
		<IpoCancelpopup 
			appdetails={details}
			modifyncd={modifyncd}
		/>
		</>
	);
};

export default ApplicationCard;
