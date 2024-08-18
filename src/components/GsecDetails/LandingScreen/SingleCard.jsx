import s from './GsecSection.module.scss'
import NoImg from '../../../assets/images/noimg.jpg';
import icon5 from '../AllScreen/assets/icon5.png'
const SingleCardGsec = ({details,expDays,validate,cmsData}) => {
    return (
        <>
            <div className={s.singleGsec}>
            <div className={s.gsecType}>{details?.category === 'TB' ? 'T-Bill' : details?.category === 'SD' ? 'SDL' : 'G-Sec'  }</div>
            {cmsData?.tag && <div className={s.gsecTopBadge}>{cmsData?.tag}</div>}
            <div className={s.gsecHead}>
                <div className={s.gsecLogo}>
                    <img src={cmsData?.logo ? cmsData?.logo : NoImg} alt={details?.schname} />
                </div>                
                <div className={s.gsecTitle}>
                    {cmsData?.issue_name ? cmsData?.issue_name : details?.schname}
                </div>
            </div>
            <div className={s.investDetails}>
                <div>
                    <span>Indicative Yield <img src={icon5} /></span>
                    <p>{details?.indicativeYield}%</p>
                </div>
                <div>
                    <span>Tenure</span>
                    <p>{details?.tDay} Days</p>
                </div>
            </div>
            <button className={s.applyGsecButton} onClick={validate}>
                <b>Apply Now</b> | Ends in <span className={s.cardcounter}  dangerouslySetInnerHTML={{__html: expDays}}></span>
            </button>
        </div>        
        </>

    )
}

export default SingleCardGsec;