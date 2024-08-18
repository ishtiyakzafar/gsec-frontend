import React, { useEffect, useState } from "react";
import s from './DetailsScreen.module.scss'
import NoImg from '../../../assets/images/noimg.jpg';
import icon6 from './assets/icon6.png';
import icon5 from './assets/icon5.png';
import { dateFormatter } from '../../../helpers/utils';

const SingleIndemand = ({details}) => {
    const [ counterInterval, setcounterInterval ] = useState({});
    const [exptimer, setexptimer] = useState('');


    const applyTimer = (closedate) => {

        let date_1 = new Date(closedate);
        let date_2 = new Date();
        let difference = date_1.getTime() - date_2.getTime();
        let expDays = Math.ceil(difference / (1000 * 3600 * 24));
        if(expDays > 1)
        {
            setexptimer(`${expDays} Days`)
        }
        else
        {
            let counterInt = setInterval(() => {
                setexptimer(dateFormatter(new Date(closedate).getTime()));
            }, 1000);
            setcounterInterval(counterInt)
        }
    }

    useEffect(() => {
        clearInterval(counterInterval);
        applyTimer(details?.clsdt);
    }, []);

    return (
        <>
            <div className={s.SingleIndemand}>
                <span className={s.gsecType}>{details?.category === 'TB' ? 'T-Bill' : details?.category === 'SD' ? 'SDL' : 'G-Sec'  }</span>
                <span className={s.timer}><img src={icon6} alt={'Timer'}/><label dangerouslySetInnerHTML={{__html: exptimer}}></label></span>
                <div className={s.head}>
                    <img src={details?.cmsData?.logo ? details?.cmsData?.logo : NoImg} />
                    <h2>{details?.cmsData?.issue_name ? details?.cmsData?.issue_name :  details?.schname}</h2>                    
                </div>
                <div className={s.investmentDetailsCard}>
                    <div>
                        <p>Indicative Yield <img src={icon5} alt="more" /></p>
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
                <button>Apply Now</button>
            </div>
        </>
    );
}

export default SingleIndemand;