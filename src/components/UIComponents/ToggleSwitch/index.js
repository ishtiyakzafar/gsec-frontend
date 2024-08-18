import { useState } from 'react';
import s from './ToggleSwitch.module.scss';

const ToggleSwitch = ({ className = null, left = '', right = '',ctof="Y" ,state = { state: '', setState: () => {} } }) => {
	console.log(state);
	
	return (
		<div
			className={`${s.toggle} ${className ? className : ''}`}
			onClick={() => {
				state.setState();
			}}
		>
			<div className={`${s.toggler} ${state.state ? s.active : ''}`} />
			<div className={s.text}>
				<span className={`${state.state ? s.black : s.white}`}>{left}</span>
				<span className={`${state.state ? s.white : s.black}`}>{right}</span>
			</div>
		</div>
	);
};

export default ToggleSwitch;
