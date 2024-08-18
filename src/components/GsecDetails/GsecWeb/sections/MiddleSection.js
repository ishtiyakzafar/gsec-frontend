import s from './Sections.module.scss'
import NoImg from '../../../../assets/images/noimg.jpg';
import shield from '../assets/shield2.png'
import icon1 from '../assets/icon1.png'
import icon2 from '../assets/icon2.png'
import icon3 from '../assets/icon3.png'
import icon4 from '../assets/icon4.png'

const MiddleSection = () => {
    return (
        <>
        <div className={s.MiddleSection}>
            <h2>Why to choose G-Sec?</h2>
            <div className={s.middleLeft}>
                <div className={s.singleBox}>
                    <img src={icon1} />
                    <h4>Govt. guarantee</h4>
                    <p>Unlike other fixed income products like bank FD’s, debt funds etc that carry a credit risk, G-Secs are guaranteed by Govt. of India.</p>
                </div>

                
                <div className={s.singleBox}>
                    <img src={icon2} />
                    <h4>Better returns than FDs</h4>
                    <p>Lock in attractive interest rates with upto 40 years, unlike bank FDs that have a maximum tenure of 10 years.</p>
                </div>

                
                <div className={s.singleBox}>
                    <img src={icon3} />
                    <h4>Portfolio diversification</h4>
                    <p>Investment in government bonds makes a well-diversified portfolio for the investor. It mitigates the risk of the overall portfolio since government bonds are risk-free investments. </p>
                </div>

                
                <div className={s.singleBox}>
                    <img src={icon4} />
                    <h4>No TDS</h4>
                    <p>No tax deduction at source like bank FDs. Pay taxes as per your income tax slab at end of the financial year.</p>
                </div>

            </div>

            <div className={s.middleRight}>
                <h2>About govt. securities <button>Watch video</button></h2>
                <div className={s.middleShild}>
                    <img src={shield} />
                    <h2>Understand Goverment Securities (G-secs)</h2>
                    <p>
                        G-secs are becoming popular in the investment world for fixed and safe returns.
                    </p>
                    <button><span>Read More</span></button>
                </div>
            </div>
        </div>
        </>
    );
}

export default MiddleSection;