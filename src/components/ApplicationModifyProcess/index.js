import { useState } from 'react';
import ApplicationModifyPage01 from '../ApplicationModifyPage01';
import ApplicationModifyProcessNavbar from '../ApplicationModifyProcessNavbar';
import s from './ApplicationModifyProcess.module.scss';
import ZomatoImg from '../../assets/images/ApplicationProcess/Image 39@3x.png';
import ApplicationModifyPage03 from '../ApplicationModifyPage03';
import ApplicationModifyPage04 from '../ApplicationModifyPage04';
import ApplicationModifyPage02 from '../ApplicationModifyPage02';
import checkImage from '../../assets/images/ApplicationProcess/check_circle_black_24dp.svg';
import { useSelector } from 'react-redux';
import { applicationData as setApplicationData } from '../../store/action/applicationData';

const title = 'Zomato IPO';
const company = 'Zomato Pvt. Ltd.';

const ApplicationModifyProcess = () => {
	const [ pageNo, setPageNo ] = useState(0);

	const applicationData = useSelector((state) => state.applicationData);
	
	if(Object.keys(applicationData).length < 1)
	{
		window.location.replace("/");
	}
	
	// window.onbeforeunload = function () {
	// 	return 'Changes you made may not be saved.Are you really want to perform the action?';
	// }
	return (
		<div className={s.main}>
			<div className={s.container}>
				<ApplicationModifyProcessNavbar state={pageNo} />
				{pageNo === 0 && (
					<ApplicationModifyPage01
						ipo_name={title}
						company={company}
						img={ZomatoImg}
						
						nextPage={() => setPageNo(2)}
					/>
				)}
				{/* {pageNo === 1 && <ApplicationModifyPage02 prevPage={() => setPageNo(0)} nextPage={() => setPageNo(2)} />} */}
				{pageNo === 2 && <ApplicationModifyPage03 prevPage={() => setPageNo(0)} nextPage={() => setPageNo(3)} />}
				{pageNo === 3 && <ApplicationModifyPage04 />}
			</div>

			<div className={s.sideBar}>
				<h2>How to improve your chance of allotment?</h2>
				<div className={s.items}>
					<div>
						<img src={checkImage} alt="check" /> <span style={{marginLeft: "13px"}}>Bid at cut off price/higher price</span>
					</div>

					{/* <div>
						<img src={checkImage} alt="check" /> <span style={{marginLeft: "13px"}}>Avoid big applications.</span>
					</div> */}

					<div>
						<img src={checkImage} alt="check" /> <span style={{marginLeft: "13px"}}>Apply via your other family members account </span>
					</div>

					<div>
						<img src={checkImage} alt="check" /> <span style={{marginLeft: "13px"}}>Avoid last moment subscription</span>
					</div>

					{/* <div>
						<img src={checkImage} alt="check" /> <span style={{marginLeft: "13px"}}>Buy parent or holding company shares</span>
					</div> */}
				</div>
			</div>
		</div>
	);
};

export default ApplicationModifyProcess;
