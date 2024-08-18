import s from './ApplicationModifyPage02.module.scss';
import NextImg from '../../assets/images/ApplicationProcess/arrow_back_black_24dp (1).svg';
import Toggle from '../UIComponents/ToggleSwitch';
import AddImg from '../../assets/images/ApplicationProcess/add_circle_outline_black_24dp.svg';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { applicationData as setApplicationData } from '../../store/action/applicationData';

const Form = ({ fullName, mobileNo, panNo, applyingFor, dpId, beneficiaryId }) => {
	return (
		<div className={s.form}>
			<h3>Applicant's Details</h3>
			<div className={s.inputs}>
				<div>
					<span>Full Name</span>
					<input
						type="text"
						placeholder="Enter Full Name (as per PAN)"
						value={fullName.state}
						onChange={(e) => fullName.setState(e.target.value)}
					/>
				</div>
				<div>
					<span>Mobile Number</span>
					<input
						type="text"
						placeholder="Enter Account No."
						value={mobileNo.state}
						onChange={(e) => mobileNo.setState(e.target.value)}
					/>
				</div>
				<div>
					<span>PAN No.</span>
					<input
						type="text"
						placeholder="Enter PAN No."
						value={panNo.state}
						onChange={(e) => panNo.setState(e.target.value)}
					/>
				</div>
			</div>

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
				<div>
					<span>DP ID</span>
					<input
						type="text"
						placeholder="Enter DP ID"
						value={dpId.state}
						onChange={(e) => dpId.setState(e.target.value)}
					/>
				</div>
				<div>
					<span>Beneficiary ID</span>
					<input
						type="text"
						placeholder="Enter Beneficiary ID"
						value={beneficiaryId.state}
						onChange={(e) => beneficiaryId.setState(e.target.value)}
					/>
				</div>
			</div>
		</div>
	);
};

const ApplicationModifyPage02 = ({ prevPage, nextPage }) => {
	const dispatch = useDispatch();
	const applicationData = useSelector((state) => state.applicationData);
	const user = useSelector((state) => state.user);
	console.log('user',user)
	// In actual case it will come from Redux
	// const loggedIn = useSelector((state) => state.loggedIn);
	
	const loggedIn = false;
	const [ fullName, setFullName ] = useState('');
	const [ mobileNo, setMobileNo ] = useState(user.mobileNo || '');
	const [ panNo, setPanNo ] = useState(user.panNo || '');
	const [ applyingFor, setApplyingFor ] = useState('NSDL');
	const [ dpId, setDpId ] = useState(user.dpid || '');
	const [ beneficiaryId, setBeneficiaryId ] = useState(user.beneficiaryID || '');
	const [ investingAs, setInvestingAs ] = useState('IND');
	const [ selfOther, setSelfOther ] = useState(false);

	const nextButton = () => {
		// in the IPO Add api these information aren't being used
		dispatch(setApplicationData({ ...applicationData, InvType: investingAs, fullName, mobileNo, panNo, applyingFor,dpId, beneficiaryId, selfOther}));
		nextPage();
	};

	return (
		<div className={s.main}>
			<div className={s.container}>
				<h2>About your application</h2>

				<div className={s.input1}>
					<div>
						<span className={s.light}>Who are you applying for?</span>
						<Toggle
							left="Self"
							right="Other"
							state={{
								state: selfOther,
								setState: () => {
									setSelfOther((state) => !state);
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
							<option value="IND">Individual</option>
							<option value="SHA">SHA</option>
						</select>
					</div>
				</div>

				{Object.keys(user).length > 0 && user?.clientType !== 'NONIIFLCLIENT' ? (
					<div />
				) : (
					<Form
						fullName={{ state: fullName, setState: setFullName }}
						mobileNo={{ state: mobileNo, setState: setMobileNo }}
						panNo={{ state: panNo, setState: setPanNo }}
						applyingFor={{ state: applyingFor, setState: setApplyingFor }}
						dpId={{ state: dpId, setState: setDpId }}
						beneficiaryId={{ state: beneficiaryId, setState: setBeneficiaryId }}
					/>
				)}

				<button className={s.addHolder}>
					<img src={AddImg} alt="Add Holder" />
					<span>Add holder details for Joint Demat Account</span>
				</button>
			</div>

			<div className={s.buttons}>
				<button className={s.outline} onClick={prevPage}>
					Previous
				</button>

				<button className={s.primary} onClick={nextButton}>
					<span>Next</span>
					<img src={NextImg} alt="Next" />
				</button>
			</div>
		</div>
	);
};

export default ApplicationModifyPage02;
