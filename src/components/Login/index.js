import s from './Login.module.scss';
import NextImg from '../../assets/images/Login/arrow_back_black_24dp.svg';
import CloseImg from '../../assets/images/Login/close-button-png-30230.png';
import RocketImg from '../../assets/images/Login/Group 18205.svg';
import VerificationInput from 'react-verification-input';
import { useState } from 'react';
import { addAndCheckNonIiflJourneyClientDetail, sendOTP, verifyOTP } from '../../services/userServices';
import { otpValidate,zohoCreateToken,zohoCreateLead } from '../../services/issuesServices';
import { useDispatch, useSelector } from 'react-redux';
import { loggedIn as userAction } from '../../store/action/loggedIn.action';
import LoaderImg from '../../assets/images/loader.svg';
import { CMS_URL,clevertap_key } from '../../vars/url';
import ClevertapReact from 'clevertap-react';
import SweetAlert from 'react-bootstrap-sweetalert';

const Page2 = ({ setVerify, verifyPage1, toggleLogin, mobileNo, panNo, email,verifymsg }) => {
	const [ code, setCode ] = useState('');
	const [ otperror, setotperror ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const [ alertmsg, setAlertmsg ] = useState('');
	let dispatch = useDispatch();

	const checkCode = async (e) => {
		setCode(e);
		
	};
	
	const verifyfn = async ()=>{
		if (code.length === 6) {
			setotperror('')
			try {
				setLoading(true);
				await verifyOTP(panNo, mobileNo, code).then(res => {
					//console.log(res);
					let data= res.data;
					
					if (data.isSuccess == true && data.statusCode === 200) {

						otpValidate({"token":data.resultData.token}).then(validateresponse => {
							
							if(validateresponse.data.statusCode === 200 && validateresponse.data.isSuccess === true)
							{
								let { token } = data.resultData;
								//console.log(token)
								localStorage.setItem('user', JSON.stringify({ token}));
								addAndCheckNonIiflJourneyClientDetail({
									mobileNo,
									email,
									panNo,
									stageFlage: 'Phase1'
								}).then(response => {
									
									zohoCreateToken().then(resp =>{
										console.log('zoho',resp);
										let createzoholead = zohoCreateLead({
											"Token":resp.data.Body.Token,
											"ObjectName":"Lead",
											"Parameters":{
											"FirstName":"",
											"LastName":"OneUp User",
											"Email":email,
											"Mobile":mobileNo,
											"LeadProduct":"Equity",
											"Campaign":"IPO/NCD/SGB",
											"LeadSource":"OneUp",
											"Appsource":"25"
											}
										})
									})
								
									
									
									if(response.data.statusCode == 200 && response.data.isSuccess == true){
										let phase1Data = response.data.resultData;
										phase1Data.loginid=panNo;
										if(response.data.resultData.clientType === 'NONIIFLCLIENT')
										{
											phase1Data.clientcode=panNo;
										}
										else
										{
											phase1Data.clientcode=response.data.resultData.clientcode;
										}
										//console.log(token, phase1Data);
										localStorage.setItem('user', JSON.stringify({...phase1Data, token}));

										dispatch(userAction({ ...phase1Data, token }));

										ClevertapReact.initialize(clevertap_key);
										
										var payload = {
											"Site": {
												"Identity":phase1Data.clientcode,
												"email": email,
												"panNo":panNo,
												"mobileNo":mobileNo,
												"client-type": response.data.resultData.clientType,											
												"client-code": phase1Data.clientcode,
											}
										}
										// console.log('payload',payload)
										ClevertapReact.profile(payload)

										toggleLogin();
										setLoading(false);
									}
									else
									{
										alert(response.data.resultData)
										setLoading(false);
									}
								});
							}
							else
							{
								alert('Something went wrong.try login again.')
								window.location.reload(); 
							}
						});
					}else{
						setotperror(data.resultData.message)
						setAlertmsg(String(data.resultData.message));						
						setCode('')
						setLoading(false);
					}
				});
			} catch (error) {
				console.log(error);
			}
		}else{
			setotperror("OTP must be six digit");
			setAlertmsg(String("OTP must be six digit"));
			return false;
		}
	}

	const hidesweeetalert = () => {
		setAlertmsg('')
	}


	return (
		<div className={s.container}>
			{loading == true && 
				<div className="loading_screen loading_inside">
					<img src={LoaderImg} alt="loading..." />                            
				</div>
			}
			{alertmsg != '' &&
				<SweetAlert
				error
				title="Alert!"
				onConfirm={hidesweeetalert}
				>
				{alertmsg}
				</SweetAlert>
			}
			<img src={RocketImg} alt="Pattern" className={s.pattern} />
			<button className={s.close} onClick={() => toggleLogin()}>
				<img src={CloseImg} alt="Close" />
			</button>
			<section className={s.head}>
				<h3>Have you received the OTP?</h3>
				<span>We've sent an OTP on your mobile number ending with {mobileNo.substr(mobileNo.length - 4)}</span>
			</section>

			<section className={s.body}>
				<div className={s.input}>
					<label htmlFor="mobile-number">Enter OTP</label>
					<VerificationInput
						autoFocus={true}
						length={6}
						validChars="0-9"
						removeDefaultStyles={true}
						onChange={(e) => checkCode(e)}
						value={code}
						classNames={{
							container: s.verifyContainer,
							character: s.verifyCharacter,
							characterInactive: s.verifyCharacterInactive,
							characterSelected: s.verifyCharacterSelected
						}}
					/>
					<span className={s.margin}>
						Didn't receive OTP?<a onClick={() => verifyPage1('send')} style={{cursor:'pointer'}}>Resend OTP</a>
					</span>
					<span style={{color:'red'}}>
						OTP will be valid for 5 mins
					</span>
					{/* <span>
						{verifymsg}
					</span> */}
					<span>{otperror}</span>
				</div>
			</section>

			<section className={s.foot}>
				<button onClick={() => verifyfn()}>
					<span>Verify</span>
					<img src={NextImg} alt="Next" />
				</button>
			</section>
		</div>
	);
};

const Page1 = ({ verifyPage1, toggleLogin, mobileNo, setMobileNo, email, setEmail, panNo, setPanNo,mobileNoerror,emailerror,panNoerror }) => {
	return (
		<div className={s.container}>
			<img src={RocketImg} alt="Pattern" className={s.pattern} />
			<button className={s.close} onClick={() => toggleLogin()}>
				<img src={CloseImg} alt="Close" />
			</button>
			<section className={s.head}>
				<h3>Let's start investing!</h3>
				<span>We will send you a one time password on this mobile number.</span>
			</section>

			<section className={s.body}>
				<div className={s.input}>
					<label htmlFor="mobile-number">Mobile Number</label>
					<input
						type="number"
						id="mobile-number"
						name="mobile-number"
						
						value={mobileNo}
						onKeyPress={(ev) => {
							if (ev.which != 8 && ev.which != 0 && ev.which < 48 || ev.which > 57)
							{
								ev.preventDefault();
							}
						}}
						onChange={(e) => {
							if((e.target.value).length <= 10)
							{
								setMobileNo(e.target.value);
							}							
						}}
						onKeyUp={(e) => {
							verifyPage1()
						}}
						
						placeholder="Enter Mobile Number"
					/>
					<span style={{color: "red"}}>{mobileNoerror}</span>
				</div>

				<div className={s.input}>
					<label htmlFor="email-id">Email ID</label>
					<input
						type="text"
						id="email-id"
						name="email-id"
						placeholder="Enter Email ID"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);							
						}}
						onKeyUp={(e) => {
							verifyPage1()
						}}
					/>
					<span style={{color: "red"}}>{emailerror}</span>
				</div>

				<div className={s.input}>
					<label htmlFor="pan-number">PAN Number</label>
					<input
						type="text"
						id="pan-number"
						value={panNo}
						onChange={(e) => {
							setPanNo(e.target.value.toUpperCase());							
						}}
						onKeyUp={(e) => {
							verifyPage1()
						}}
						name="pan-number"
						maxLength="10"
						placeholder="Enter PAN Number"
					/>
					<span style={{color: "red"}}>{panNoerror}</span>
				</div>
			</section>

			<section className={s.foot}>
				<button onClick={() => verifyPage1('send')}>
					<span>Next</span>
					<img src={NextImg} alt="Next" />
				</button>
			</section>
		</div>
	);
};

const Login = ({ toggleLogin }) => {
	const [ verify, setVerify ] = useState(false);
	const [ loading, setLoading ] = useState(false);
	const [ verifymsg, setVerifymsg ] = useState('');
	const [ mobileNo, setMobileNo ] = useState('');
	const [ mobileNoerror, setMobileNoerror ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ emailerror, setEmailerror ] = useState('');
	const [ panNo, setPanNo ] = useState('');
	const [ panNoerror, setPanNoerror ] = useState('');
	const emailregex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
	const panregex = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/
	const verifyPage1 = async (flag) => {
		
		setMobileNoerror('');
		setEmailerror('');
		setPanNoerror('');

		if (! /^\d{10}$/.test(mobileNo)) {
			setMobileNoerror("Mobile number must be ten digits.")
			return false;
		} else if(!emailregex.test(String(email).toLowerCase())){
			
			setEmailerror("Email Id must be valid.")
			return false;
		}else if(!panregex.test(panNo.toUpperCase())){
			
			setPanNoerror("Pan no. must be valid.")
			return false;
		}else{
			if(flag === 'send'){	
				try {
					
					setLoading(true);
					await sendOTP(panNo, mobileNo).then(res => {
						console.log(res);
						if(res.data.isSuccess == true && res.data.statusCode == 200){
							setVerify(true);
							setVerifymsg(res.data.message);
						}
						else if(res.data.statusCode == 500)
						{
							alert(res.data.resultData)
						}
						setLoading(false);
						
					}).catch(error => {
						console.log(error)
					});
					
				} catch (error) {
					console.log(error);
				}
			}
		}
	};

	return (
		<div className={s.login}>
			<div className={verify ? s.mainVerify : s.main}>
			{loading == true && 
                        <div className="loading_screen loading_inside">
                            <img src={LoaderImg} alt="loading..." />                            
                        </div>
                    }
				{verify ? (
					<Page2
						toggleLogin={toggleLogin}
						verifyPage1={verifyPage1}
						email={email}
						mobileNo={mobileNo}
						panNo={panNo}
						setVerify={setVerify}
						verifymsg={verifymsg}
						loading={loading}
					/>
				) : (
					<Page1
						toggleLogin={toggleLogin}
						setVerify={setVerify}
						mobileNo={mobileNo}
						setMobileNo={setMobileNo}
						email={email}
						setEmail={setEmail}
						panNo={panNo}
						setPanNo={setPanNo}
						verifyPage1={verifyPage1}
						mobileNoerror={mobileNoerror}
						emailerror={emailerror}
						panNoerror={panNoerror}
						
					/>
				)}
			</div>
		</div>
	);
};

export default Login;
