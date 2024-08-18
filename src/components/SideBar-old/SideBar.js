import s from './SideBar.module.scss';
import classNames from 'classnames';
import useWindowDimensions from '../../hooks/screenWidth';
import { Fragment } from 'react';
import OneUpLogo from '../../assets/images/LandingPage/OneUp_Logo_132x40_px@3x.png';
import PoweredByLogo from '../../assets/images/LandingPage/IIFL logo@3x.png';
import SearchIcon from '../../assets/images/SideBar/search.svg';
import { useSelector,connect } from 'react-redux';
import { Link,useHistory,useParams  } from 'react-router-dom';
import PoweredBySecLogo from '../../assets/images/LandingPage/IIFLSec.png';

const SideBar = () => {
	const { width } = useWindowDimensions();
	const user = useSelector((state) => state.loggedIn);
	const history = useHistory();
	const logoutuser = () => {
		localStorage.removeItem('user');
		window.location.reload(); 
	};
	const pathname = window.location.pathname
	//alert(pathname)
	//let param = useParams();
	//console.log('sidebar=>',user);
	return (
		<div className={s.main}>
			{width > 768 ? (
				<Fragment>
					<div className={s.items}>
						<button onClick={() => history.push("/")} className={classNames(s.item, s.home, pathname==='/' ? s.itemActive : '')} />						
						{/* <button className={classNames(s.item, s.gridView, false ? s.itemActive : '')} />
						<button className={classNames(s.item, s.favorite, false ? s.itemActive : '')} /> */}
						{Object.keys(user).length > 0 &&
							<button onClick={() => history.push("/your_applications")} className={classNames(s.item, s.applustatus, pathname==='/your_applications' ? s.itemActive : '')} />
						}
						<a href="https://help.indiainfoline.com/portal/en/kb/iifl-help/ipo-ofs/ipos" target="_blank"><button className={classNames(s.item, s.help, false ? s.itemActive : '')} /></a>
					</div>
					<div className={s.bottom}>
					{/* {Object.keys(user).length > 0 ? (
						<button className={classNames(s.item, s.account, false ? s.itemActive : '')} />
						) : (
							''
						)} */}
					</div>
				</Fragment>
			) : (
				<div className={s.mobile}>
					<div className={s.left} onClick={() => history.push("/")}>
						<img src={OneUpLogo} alt="OneUp" className={s.logo} />
						<span>Powered by<img src={PoweredBySecLogo} alt="Powered By IIFL Securities" className={s.powered} /></span>
					</div>

					{/* <div className={s.right}>
						<button>
							<img src={SearchIcon} alt="Search" />
						</button>
						<button className={s.burger}>
							<div />
							<div />
							<div />
						</button>
						
					</div> */}
					<div className={s.mobile_menu} style={{display:'flex',alignItems:'center',gap:10}}>
							<button onClick={() => history.push("/")} className={classNames(s.item, s.home, true ? s.itemActive : '')} />						
							{/* <button className={classNames(s.item, s.gridView, false ? s.itemActive : '')} />
							<button className={classNames(s.item, s.favorite, false ? s.itemActive : '')} /> */}
							{Object.keys(user).length > 0 &&
								<button onClick={() => history.push("/your_applications")} className={classNames(s.item, s.applustatus, false ? s.itemActive : '')} />
							}
							<a href="https://help.indiainfoline.com/portal/en/kb/iifl-help/ipo-ofs/ipos" style={{lineHeight:1}} target="_blank"><button className={classNames(s.item, s.help, false ? s.itemActive : '')} /></a>
							{Object.keys(user).length > 0 &&
								<button onClick={() => logoutuser()}   style={{    border: 'none',
									lineHeight: 1,
									padding: 10,
									background: '#362e84',
									color: '#fff'}}>Logout</button>
							}
						</div>
				</div>
			)}
		</div>
	);
};

export default SideBar;
