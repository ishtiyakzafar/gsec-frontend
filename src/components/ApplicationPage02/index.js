import s from './ApplicationPage02.module.scss';
import NextImg from '../../assets/images/ApplicationProcess/arrow_back_black_24dp (1).svg';
import Toggle from '../UIComponents/ToggleSwitch';
import AddImg from '../../assets/images/ApplicationProcess/add_circle_outline_black_24dp.svg';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { applicationData as setApplicationData } from '../../store/action/applicationData';
import DeleteImg from '../../assets/images/ApplicationProcess/delete_black_24dp (1).svg';
import SweetAlert from 'react-bootstrap-sweetalert';
import prevarrow from '../../assets/images/ApplicationProcess/prevarrow.svg';
import { CMS_URL,clevertap_key } from '../../vars/url';
import ClevertapReact from 'clevertap-react';

const DematUi = ({dematDetails,removeDmat,changedemaatname,changedemaatpan}) => {
	
	return (
		<div className={s.dematrepeat}>
		{dematDetails.map((el, i) =>    
						
				<div className={s.singledemat} key={i}>
					<div className={s.inputs}>
						<div>
							<span>Full name (Holder {2+i})</span>
							<input
								type="text"
								placeholder="Full name"
								value={el.fullName}
								onChange={(e) => changedemaatname(e.target.value,i)}
							/>
						</div>

						<div>
							<span>PAN No. (Holder {2+i})</span>
							<input
								type="text"
								placeholder="PAN No." 
								value={el.pan}
								onChange={(e) => changedemaatpan(e.target.value,i)}
								//onChange={(e) => fullName.setState(e.target.value)}
							/>
						</div>
						<button className={s.removeDmat}  onClick={() =>removeDmat(i)} >
							<img src={DeleteImg} alt="Delete" />
						</button>
					</div>
				</div>
		       
	)
	}
	 </div> 
	)
	// return (
		
		
	// )
}

const Form = ({ fullName, mobileNo, panNo, applyingFor, dpId, beneficiaryId,selfotrchk,user,email,selffulnm }) => {
	//console.log('xuser',user)
	return (
		<div className={s.form}>
			<h3>Applicant's Details</h3>
			
			<div className={s.inputs}>
				<div>
					<span>Full Name</span>					
					<input
						type="text"
						placeholder="Enter Full Name (as per PAN)"
						// value={(selfotrchk === 'self' && (user.firstName+user.middleName+user.surName) !=="") ? `${user.firstName} ${user.middleName} ${user.surName}` : fullName.state}
						value={selfotrchk == 'self' ? fullName.state : fullName.othstate}
						
						onChange={(e) => {fullName.setState(e.target.value); if(selfotrchk === 'self'){ fullName.selfsetState(e.target.value) } else { fullName.othsetState(e.target.value) }  }}
					/>
				</div>
				<div>
					<span>Mobile Number</span>
					<input
						type="text"
						placeholder="Enter Mobile No."
						value={selfotrchk == 'self' ? user.mobileNo : mobileNo.state}
						readOnly={selfotrchk == 'self' ? true : false}
						style={selfotrchk == 'self' ? {cursor:'not-allowed',opacity:0.5}:{opacity:1}}
						onKeyPress={(ev) => {
							if (ev.which != 8 && ev.which != 0 && ev.which < 48 || ev.which > 57)
							{
								ev.preventDefault();
							}
						}}
						onChange={(e) => {  if((e.target.value).length > 10){ return false;} mobileNo.setState(e.target.value); if(selfotrchk === 'self'){ mobileNo.selfsetState(e.target.value) } else { mobileNo.othsetState(e.target.value) } }}
					/>
				</div>
				<div>
					<span>Email ID</span>
					<input
						type="email"
						placeholder="Email ID"
						value={selfotrchk == 'self' ? user.email : email.state}
						readOnly={selfotrchk == 'self' ? true : false}
						style={selfotrchk == 'self' ? {cursor:'not-allowed',opacity:0.5}:{opacity:1}}
						onChange={(e) => {email.setState(e.target.value);  if(selfotrchk === 'self'){ email.selfsetState(e.target.value) } else { email.othsetState(e.target.value) } } }
					/>
				</div>
				<div>
					<span>PAN No.</span>
					<input
						type="text"
						placeholder="Enter PAN No."
						value={selfotrchk == 'self' ? user.panNo : panNo.state}
						readOnly={selfotrchk == 'self' ? true : false}
						style={selfotrchk == 'self' ? {cursor:'not-allowed',opacity:0.5}:{opacity:1}}
						onChange={(e) => {panNo.setState(e.target.value); if(selfotrchk === 'self'){ panNo.selfsetState(e.target.value) } else { panNo.othsetState(e.target.value) }  }}
					/>
				</div>
				{selfotrchk == 'self' &&
					(
						mobileNo.setState(user.mobileNo),
						fullName.setState(fullName.selfstate),
						dpId.setState(dpId.selfstate),
						beneficiaryId.setState(beneficiaryId.selfstate),
						panNo.setState(user.panNo),
						email.setState(user.email)
						// dpId.setState(user.dpid),
						// beneficiaryId.setState(user.beneficiaryID)
					)
				}

				{selfotrchk == 'other' &&
					(
						mobileNo.setState(mobileNo.othstate),
						fullName.setState(fullName.othstate),
						dpId.setState(dpId.othstate),
						beneficiaryId.setState(beneficiaryId.othstate),
						panNo.setState(panNo.othstate),
						email.setState(email.othstate)
						// dpId.setState(user.dpid),
						// beneficiaryId.setState(user.beneficiaryID)
					)
				}
			
			</div>
			{/* {(() => {
				alert(dpId.state)
				console.log('dasdas=>',user)
			})()} */}
		
			<h3>Demat Account details</h3>
			<div className={s.inputs}>
				<div>
					<span>Who are you applying for? </span>
					<Toggle
						left="NSDL"
						right="CDSL"
						state={{
							state: applyingFor.state !== 'NSDL',
							setState: () => {
								applyingFor.setState((state) => {
									return state === 'NSDL' ? 'CDSL' : 'NSDL';
								});
							}
						}}
					/>
				</div>
				{applyingFor.state != 'CDSL' &&
					<div>
						<span>DP ID</span>
						{user.dpId}
						<input
							type="text"
							placeholder="Enter DP ID"
							maxLength="8"
							value={dpId.state}
							onChange={(e) => {dpId.setState(e.target.value.toUpperCase()); if(selfotrchk === 'self'){ dpId.selfsetState(e.target.value.toUpperCase()) } else { dpId.othsetState(e.target.value.toUpperCase()) }   }}
						/>
					</div>
				}
				<div>
					<span>Beneficiary ID</span>
					<input
						type="text"
						placeholder="Enter Beneficiary ID"
						maxLength={applyingFor.state === 'CDSL' ? 16 : 8}
						value={beneficiaryId.state}
						onChange={(e) => {beneficiaryId.setState(e.target.value); if(selfotrchk === 'self'){ beneficiaryId.selfsetState(e.target.value) } else { beneficiaryId.othsetState(e.target.value) } } }						
					/>
				</div>
			</div>
		</div>
	);
};

const ApplicationPage02 = ({ prevPage, nextPage }) => {
	const dispatch = useDispatch();
	const applicationData = useSelector((state) => state.applicationData);
	const user = useSelector((state) => state.loggedIn.user);


	//console.log('ugajugaju=>',applicationData)
	//console.log('use apppage 2r',user)
	// In actual case it will come from Redux
	// const loggedIn = useSelector((state) => state.loggedIn);

	
	
	const getFetchname = () => {		
		if(applicationData?.fstname && applicationData?.selfot == "self")
		{
			return ((applicationData?.fstname+' '+applicationData?.midname+' '+(applicationData?.lstname ? applicationData?.lstname : '')).trim()).replace(/\s+/g, " ") 
		}
		else
		{
			if(Object.keys(user).length > 0)
			{
				return ((user?.firstName+' '+user?.middleName+' '+user?.surName).trim()).replace(/\s+/g, " ")
			}
			else
			{
				return ''
			}
		}
	}

	const getFetchnameoth = () => {
		if(applicationData?.fstname && applicationData?.selfot != "self")
		{
			return ((applicationData?.fstname+' '+applicationData?.midname+' '+(applicationData?.lstname ? applicationData?.lstname : '')).trim()).replace(/\s+/g, " ") 
		}
		else
		{
			return ''
		}
	}

	const getFetchmobile = () => {
		if(applicationData?.mobileNo)
		{
			return applicationData?.mobileNo
		}
		else if(user?.mobileNo)
		{
			return user.mobileNo
		}
	}

	const getFetchbnf = () => {
		if(applicationData?.beneficiaryId)
		{
			return applicationData?.beneficiaryId
		}
		else if(user?.beneficiaryID)
		{
			return user.beneficiaryID
		}
	}
	const getFetchdpid = () => {
		if(applicationData?.dpId)
		{
			return applicationData?.dpId
		}
		else if(user?.dpid)
		{
			return user.dpid
		}
	}
	const getFetchselfothr = () => {
	
		if(applicationData?.selfot === 'self')
		{
			return false
		}
		else if(applicationData?.selfot === 'other')
		{
			return true
		}
	}

	const loggedIn = false;
	const [ fullName, setFullName ] = useState(getFetchname() || '');
	const [ mobileNo, setMobileNo ] = useState(getFetchmobile() || '');
	const [ panNo, setPanNo ] = useState(user.panNo || '');
	const [ email, setEmail ] = useState(user.email || '');
	const [ applyingFor, setApplyingFor ] = useState(applicationData?.applyfr || 'NSDL');
	const [ dpId, setDpId ] = useState(getFetchdpid() || '');
	const [ beneficiaryId, setBeneficiaryId ] = useState(getFetchbnf() || '');
	const [ investingAs, setInvestingAs ] = useState(applicationData?.InvType || 'IND');
	const [ selfOther, setSelfOther ] = useState(getFetchselfothr() || false );
	const [ dematDetails, setDematDetails ] = useState(applicationData?.dematDetailsapp || []);
	const [ alertmsg, setAlertmsg ] = useState('');

	const [ selffulnm, setselffulnm ] = useState(getFetchname() || '');
	const [ selfdpid, setselfdpid ] =  useState(getFetchdpid() || '');
	const [ selfbfid, setselfbfid ] = useState(getFetchbnf() || '');
	
	const [ othfulnm, setothfulnm ] = useState(getFetchnameoth() || '');
	const [ othdpid, setothdpid ] = useState(()=>{ return (applicationData?.dpId && applicationData?.selfot != "self") ? applicationData?.dpId : '' } );
	
	
	const [ othbfid, setothbfidd ] = useState(()=>{ return (applicationData?.beneficiaryId && applicationData?.selfot != "self") ? applicationData?.beneficiaryId : '' } );
	const [ othmobno, setothmobno ] = useState(()=>{ return (applicationData?.mobileNo && applicationData?.selfot != "self") ? applicationData?.mobileNo : '' } );
	const [ othpnno, setothpnno ] =  useState(()=>{ return (applicationData?.panNo && applicationData?.selfot != "self") ? applicationData?.panNo : '' } ); 
	const [ othemail, setothemail ] =  useState(()=>{ return (applicationData?.email && applicationData?.selfot != "self") ? applicationData?.email : '' } );

	const hidesweeetalert = () => {
		setAlertmsg('')
	}

	const removeDmat = async(i) => {
		let values = dematDetails;
		values.splice(i,1);
		setDematDetails([...values]); 
	}

	const changedemaatname =(val,i) => {		
		let values = dematDetails;
		values[i].fullName = val;
		setDematDetails([...values]);
	}

	
	const changedemaatpan =(val,i) => {		
		let values = dematDetails;
		values[i].pan = val;
		setDematDetails([...values]);
	}

	const addDmat = () => {
		let dematadd = dematDetails
		console.log(dematadd)
		dematadd.push({fullName: "", pan: "" });
		setDematDetails([...dematadd]);
	}
	let dematDetailsapp = dematDetails;
	let selfotrchk = 'self';
	if(selfOther == true){
		selfotrchk = "other";
	}
	const panregex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/
	const nextButton = () => {
		// in the IPO Add api these information aren't being used
		let categoryType = "";
		applicationData?.categoryList.map((e) => {
			if(investingAs === e.categoryCode){
				categoryType = e.categoryType;
			}
		})
		let selfot = "self";
		let applyfr = "NSDL";
		let fstname = "Guest";
		let midname = "";
		let lstname = "";
		if(selfOther == true){
			selfot = "other";
		}
		if(applyingFor == "CDSL"){
			applyfr = "CDSL";
		}

		if(user?.clientType == 'NONIIFLCLIENT' || selfot != 'self'){
			if(fullName.replace(" ", "").length == 0){
				setAlertmsg('Enter Full name');
				return false;
			}

			// if(! /^[a-zA-Z]([-']?[a-zA-Z]+)*( [a-zA-Z]([-']?[a-zA-Z]+)*)+$/.test(fullName)) {
			// 	setAlertmsg("Name is not valid,Please enter your full name, Eg: John Doe")
			// 			return false;
			//  }

			if(! /^[a-zA-Z ]*$/.test(fullName)) {
				setAlertmsg("Name is not valid,Please enter your full name, Eg: John Doe")
						return false;
			 }
			if(selfot != 'self')
			{
				if(! /^\d{10}$/.test(mobileNo)){
					
					setAlertmsg("Mobile number must be ten digits.")
						return false;
					
				}
			}
			if(selfot != 'self')
			{
				if(!panregex.test(panNo.toUpperCase())){
				
					setAlertmsg("Pan no. must be valid.")
					return false;
				}
			}
			if(selfot != 'self')
			{
				if(! /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
				
					setAlertmsg("E-mail must be valid.")
					return false;
				}
			}
			//alert(applyfr)
			if(applyfr != 'CDSL')
			{
				if(dpId.length != 8)
				{
					setAlertmsg("DP ID invalid")
					return false;	
				}
				if (dpId.startsWith("IN") == false) {					
					setAlertmsg('Please enter valid NSDL DP ID');
					return false;
				}
				if (isNaN(dpId.substring(2, 8))) {
					setAlertmsg('Please enter valid NSDL DP ID');
					return false;
				}
				if(beneficiaryId.length != 8 )
				{
					setAlertmsg("Invalid Beneficiary.")
					return false;
				}
			}
			else
			{
				if(beneficiaryId.length != 16 )
				{
					setAlertmsg("Invalid Beneficiary.")
					return false;
				}
			}

			if(beneficiaryId.length != 8 && beneficiaryId.length != 16){
				setAlertmsg("Invalid Beneficiary.")
				return false;
			}else{
				let name = fullName.split(" ");
				// alert(name)
				// alert(name[0])
				// alert(name.length)
				if(name.length == 3){
					fstname = name[0];
					midname = name[1];
					lstname = name[2];
				}else{
					fstname = name[0];
					lstname = name[1] ? name[1] : '';
				}
				// alert(fstname)
				// return false
				
				dispatch(setApplicationData({ ...applicationData,
					InvType: investingAs,
					cattype: categoryType,
					fstname : fstname,
					midname: midname,
					lstname: lstname,
					mobileNo,
					panNo,
					mobileNo,
					dpId,
					beneficiaryId,
					applyfr:applyfr,
					selfot:selfot,
					dematDetailsapp:dematDetailsapp,
					email:email,

				}));

				ClevertapReact.initialize(clevertap_key);
				var ClevertapPayload = {
					"Source":"IPO Details Page",
					"IPO Name":applicationData.IPOBondName,
					"Bid Number":'',
					"Investment Amount": Math.max(...applicationData.totalbidprice.map((e) => parseInt(e))),
					"Investor category":categoryType+'|'+investingAs,
					"Applying for":selfot
				}

				//console.log('cpl',ClevertapPayload);
				
				ClevertapReact.event("IPO_Application Step 2",ClevertapPayload)
				//return false
				setTimeout(function(){ 
					nextPage();
				}, 800);

			}
			
		}else{

			ClevertapReact.initialize(clevertap_key);
			var ClevertapPayload = {
				"Source":"IPO Details Page",
				"IPO Name":applicationData.IPOBondName,
				"Bid Number":'',
				"Investment Amount": Math.max(...applicationData.totalbidprice.map((e) => parseInt(e))),
				"Investor category":categoryType+'|'+investingAs,
				"Applying for":selfot
			}
			//console.log('cpl',ClevertapPayload);
			ClevertapReact.event("IPO_Application Step 2",ClevertapPayload)


			dispatch(setApplicationData({ ...applicationData,
				InvType: investingAs,
				cattype: categoryType,
				// fstname : fstname,
				// midname: midname,
				// lstname: lstname,
				// mobileNo,
				// panNo,
				// mobileNo,
				// dpId,
				// beneficiaryId,
				selfOther,
				// applyfr:applyfr,
				selfot:selfot

			}));

			

			setTimeout(function(){ 
				nextPage();
			}, 800);			
		}
		
	};

	return (
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
			<div className={s.container}>
				<h2>About your application</h2>
				
				<div className={s.input1}>
					<div className={s.toggleContainer}>
						<span className={s.light}>Who are you applying for?</span>
						<Toggle
							left="Self"
							right="Other"
							state={{
								state: selfOther,
								setState: () => {
									setSelfOther((state) => !state);
									setMobileNo('')
									setPanNo('')
									setEmail('')
									setFullName('')
									setDpId('')
									setBeneficiaryId('')
									setInvestingAs(applicationData?.InvType || 'IND')
								}
							}}
						/>
					</div>
					<div>
						<span className={s.light}>Investing as</span>
						<select
							value={investingAs}
							onChange={(e) => {
								setInvestingAs(e.target.value);
							}}
						>
							{/* These options will be coming from categories of Open Issue Details API */}
							
							{applicationData.categoryList.map((e) => {
								return <option value={e.categoryCode}>{e.categoryName}</option>;
							})}
						</select>
					</div>
				</div>

				{Object.keys(user).length > 0 && user?.clientType !== 'NONIIFLCLIENT' ? (
					<>
					
					{selfOther===true &&
						<Form
							fullName={{ state: fullName, setState: setFullName , selfstate: selffulnm, selfsetState: setselffulnm , othstate: othfulnm, othsetState: setothfulnm }}
							mobileNo={{ state: mobileNo, setState: setMobileNo , othstate: othmobno, othsetState: setothmobno }}
							panNo={{ state: panNo, setState: setPanNo , othstate: othpnno, othsetState: setothpnno }}
							applyingFor={{ state: applyingFor, setState: setApplyingFor }}
							dpId={{ state: dpId, setState: setDpId , selfstate: selfdpid, selfsetState: setselfdpid , othstate: othdpid, othsetState: setothdpid   }}
							beneficiaryId={{ state: beneficiaryId, setState: setBeneficiaryId , selfstate: selfbfid, selfsetState: setselfbfid  , othstate: othbfid, othsetState: setothbfidd  }}
							selfotrchk = {selfotrchk}
							user = {user}
							email = {{state: email , setState:setEmail , othstate: othemail, othsetState: setothemail}}
						/>
					}
					</>
				) : (
					<Form
						fullName={{ state: fullName, setState: setFullName , selfstate: selffulnm, selfsetState: setselffulnm , othstate: othfulnm, othsetState: setothfulnm }}
						mobileNo={{ state: mobileNo, setState: setMobileNo , othstate: othmobno, othsetState: setothmobno }}
						panNo={{ state: panNo, setState: setPanNo , othstate: othpnno, othsetState: setothpnno }}
						applyingFor={{ state: applyingFor, setState: setApplyingFor }}
						dpId={{ state: dpId, setState: setDpId , selfstate: selfdpid, selfsetState: setselfdpid , othstate: othdpid, othsetState: setothdpid   }}
						beneficiaryId={{ state: beneficiaryId, setState: setBeneficiaryId , selfstate: selfbfid, selfsetState: setselfbfid  , othstate: othbfid, othsetState: setothbfidd  }}
						selfotrchk = {selfotrchk}
						user = {user}
						email = {{state: email , setState:setEmail , othstate: othemail, othsetState: setothemail}}
					/>
				)}
				{Object.keys(user).length > 0 && user?.clientType === 'NONIIFLCLIENT' && selfOther===false &&
					<>
						<DematUi
							dematDetails={dematDetails}
							removeDmat={removeDmat}
							changedemaatname={changedemaatname}
							changedemaatpan={changedemaatpan}
						/>
					
					
						<button className={s.addHolder + " hover-animate"} onClick={addDmat}>
							
							{dematDetails.length<2  && selfOther===false &&
								<>
								<img src={AddImg} alt="Add Holder" />
								<span>{dematDetails.length>0?'Add another holder':'Add holder details for Joint Demat Account'} </span>
								</>
							}
							
						</button>

						<a href='https://iserve.indiainfoline.com/common/openaccount' target="_blank" className={s.addHolder+' '+s.anchorTag + " hover-animate"}><img src={AddImg} alt="Demat link" /> Don't have a demmat account? Click here to apply</a>
					</>
				}
			</div>

			<div className={s.buttons}>
				<button className={s.outline + " hover-animate"} onClick={prevPage}>
				<img src={prevarrow} alt="Prev" />
					Previous
				</button>

				<button className={s.primary + " hover-animate"} onClick={nextButton}>
					<span>Next</span>
					<img src={NextImg} alt="Next" />
				</button>
			</div>
		</div>
	);
};

export default ApplicationPage02;
