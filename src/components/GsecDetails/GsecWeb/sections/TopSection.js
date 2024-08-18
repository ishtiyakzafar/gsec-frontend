import s from './Sections.module.scss'
import shield from '../assets/shield.png'
const TopSection = () => {
    return (
        <>
            <div className={s.topWrapper}>
                <div className={s.topLeft}>
                    <img src={shield} />
                </div>
                <div className={s.topRight}>
                    <h5>risk-free and better than fd</h5>
                    <h2>Goverment Securities (G-secs)</h2>
                    <p>G-sec refer to goverment securities which are safest alternative to bank FDs, which are guranteed by the govt. of India</p>

                    <div className={s.investmentDetails}>
                        <div>
                            <span>Minimum investment</span>
                            <h3>₹10,000</h3>
                        </div>
                        
                        <div>
                            <span>Tenure</span>
                            <h3>91 days - 30 Yrs</h3>
                        </div>
                        
                        <div>
                            <span>Indicative yeild</span>
                            <h3><small>upto</small> 7.8%</h3>
                        </div>
                    </div>

                    <button>Explore Now</button>

                </div>
            </div>
        </>
    )
}

export default TopSection