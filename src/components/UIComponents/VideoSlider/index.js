import s from './VideoSlider.module.scss';
import { useRef, useState } from 'react';
import Slider from 'react-slick';
import NextArrowImg from '../../../assets/images/LandingPage/Group 3118.svg';
import PrevArrowImg from '../../../assets/images/LandingPage/Group 3118 (1).svg';
import classnames from 'classnames';
import { nanoid } from 'nanoid';
// import "animate.css";

const VideoCard = ({ img }) => {
	return (
		<div className={s.videoItem}>
			<i className="fa fa-youtube-play" aria-hidden="true"></i>
			<img style={{cursor: "pointer"}} onClick={() => window.open('http://www.youtube.com/watch?v='+img)} src={`https://i3.ytimg.com/vi/${img}/maxresdefault.jpg`} alt="url youtube" />
			{/* <iframe width="556" height="320" src={`https://www.youtube.com/embed/${img}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
		</div>
	);
};

const VideoSlider = ({ section, items }) => {
	const settings = useRef({
		className: 'slider variable-width',
		dots: false,
		infinite: false,
		autoplay: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		variableWidth: true,
		responsive: [
			{
				breakpoint: 1366,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
	const slider = useRef(null);
	const [ index, setIndex ] = useState(0);

	return (
		<section className={s.sectionSlider}>
			<div className={s.header}>
				<h3>The Basics</h3>
				<a href="/" style={{display: "none"}}>View All</a>
			</div>

			<Slider
				{...settings.current}
				ref={slider}
				afterChange={(i) => {
					console.log(i);
					setIndex(i);
				}}
			>
				{items.map((e) => (
					<div className={s.videoSliderItem +" animate__animated animate__fadeIn"} key={nanoid()}>
						<VideoCard img={e} />
					</div>
				))}
			</Slider>
			<div className={s.sliderButtons}>
				<button
					onClick={() => {
						slider.current.slickPrev();
					}}
					className={classnames(s.button, index === 0 ? s.buttonInactive : '')}
				>
					<img src={PrevArrowImg} alt="Previous" />
				</button>
				<button
					onClick={() => {
						slider.current.slickNext();
					}}
					className={classnames(s.button, index === items.length-1 ? s.buttonInactive : '')}
				>
					<img src={NextArrowImg} alt="Next" />
				</button>
			</div>
		</section>
	);
};

export default VideoSlider;
