import { useState } from 'react';
import ApplicationPage01 from '../ApplicationPage01';
import ApplicationProcessNavbar from '../ApplicationProcessNavbar';
import s from './ApplicationProcess.module.scss';
import ZomatoImg from '../../assets/images/ApplicationProcess/Image 39@3x.png';
import ApplicationPage03 from '../ApplicationPage03';
import ApplicationPage04 from '../ApplicationPage04';
import ApplicationPage02 from '../ApplicationPage02';
import checkImage from '../../assets/images/ApplicationProcess/check_circle_black_24dp.svg';
import { useSelector } from 'react-redux';
import { applicationData as setApplicationData } from '../../store/action/applicationData';

const title = 'Zomato IPO';
const company = 'Zomato Pvt. Ltd.';

const ApplicationProcess = () => {
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
				<ApplicationProcessNavbar state={pageNo} />
				{pageNo === 0 && (
					<ApplicationPage01
						ipo_name={title}
						company={company}
						img={ZomatoImg}
						nextPage={() => setPageNo(1)}
					/>
				)}
				{pageNo === 1 && <ApplicationPage02 prevPage={() => setPageNo(0)} nextPage={() => setPageNo(2)} />}
				{pageNo === 2 && <ApplicationPage03 prevPage={() => setPageNo(1)} nextPage={() => setPageNo(3)} />}
				{pageNo === 3 && <ApplicationPage04 />}
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

export default ApplicationProcess;
