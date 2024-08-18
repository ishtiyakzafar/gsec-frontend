import s from './ApplicationModifyProcessNavbar.module.scss';

const ApplicationModifyProcessNavbar = ({ state = 1 }) => {
	return (
		<div className={s.main}>
			<div className={s.numbers}>
				<div className={`${s.number} ${state >= 0 ? s.done : ''}`}>1</div>
				{/* <div className={`${s.line} ${state >= 1 ? s.lineDone : ''}`} />
				<div className={`${s.number} ${state >= 1 ? s.done : ''}`}>2</div> */}
				<div className={`${s.line} ${state >= 2 ? s.lineDone : ''}`} />
				<div className={`${s.number} ${state >= 2 ? s.done : ''}`}>2</div>
				<div className={`${s.line} ${state >= 3 ? s.lineDone : ''}`} />
				<div className={`${s.number} ${state >= 3 ? s.done : ''}`}>3</div>
			</div>
			<div className={s.texts}>
				<span className={`${state >= 0 ? s.done : ''}`}>Modify Bids</span>
				{/* <span className={`${state >= 1 ? s.done : ''}`}>Your Details</span> */}
				<span className={`${state >= 2 ? s.done : ''}`}>Payment</span>
				<span className={`${state >= 3 ? s.done : ''}`}>Apply</span>
			</div>
		</div>
	);
};

export default ApplicationModifyProcessNavbar;
