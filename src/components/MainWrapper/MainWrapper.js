import { Fragment, useState } from 'react';
import Footer from '../Footer/Footer';
import Login from '../Login';
import SideBar from '../SideBar/SideBar';
import s from './MainWrapper.module.scss';

const MainWrapper = ({ ChildElement, gradientSmall = false, gradient = true }) => {
	const [ login, setLogin ] = useState(false);

	const toggleLogin = () => {
		setLogin(!login);
	};

	return (
		<div className={s.main}>
			{login && <Login toggleLogin={toggleLogin} />}
			<SideBar toggleLogin={toggleLogin} />
			<div className={s.child}>
				{gradient && (
					<Fragment>
						<div className={s.Rectangle4997} />
						<div className={s.Rectangle4999} />
						<div className={s.Rectangle5109} />
						{/* <div className={s.Rectangle5108} />
						<div className={s.Rectangle51081} /> */}
						<div className={s.Rectangle5706} />
						{/* <div className={s.Rectangle4929} /> */}
						{/* {!gradientSmall && <div className={s.Rectangle4950} />} */}
					</Fragment>
				)}
				<ChildElement toggleLogin={toggleLogin} />
				<Footer />
			</div>
		</div>
	);
};

export default MainWrapper;
