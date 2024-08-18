import NoImg from '../../../assets/images/noimg.jpg';
import s from './DetailsScreen.module.scss'
import icon5 from './assets/icon5.png';

const Detailssingle = ({details,cmsData}) => {
    return (
        <>
            <div className={s.singleDetails}>
                <span className={s.topTag}>{cmsData?.tag}</span>
                <div className={s.headTop}>
                    <div>
                        <img src={cmsData?.logo ? cmsData?.logo : NoImg} />
                    </div>
                    <div>
                        <h2>{cmsData?.issue_name ? cmsData?.issue_name : details?.schname}</h2>
                        <span>{details?.category === 'TB' ? 'T-Bill' : details?.category === 'SD' ? 'SDL' : 'G-Sec'  }</span>
                    </div>
                </div>
                <div className={s.investmentDetailsCard}>
                    <div>
                        <p>Indicative Yield <img src={icon5} /></p>
                        <h2>{details?.indicativeYield}%</h2>
                    </div>
                    <div>
                        <p>Tenure</p>
                        <h2>{details?.gsecTenure}</h2>
                    </div>
                    <div>
                        <p>Interest Freq.</p>
                        <h2>{details?.category === 'TB' ? 'At maturity' : details?.category === 'SD' ? 'Every 6 months' : 'Every 6 months'  }</h2>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Detailssingle;