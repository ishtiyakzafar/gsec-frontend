import React, { useEffect, useState } from "react";
import s from './GsecSection.module.scss'
import SingleCardGsec from './SingleCard.jsx';
import { Link,useHistory  } from 'react-router-dom';
import { getIssueDetailsFromCmsByCode } from '../../../services/issuesServices';
import { dateFormatter } from "../../../helpers/utils";



const GsecCard = ({details}) => {
    const [cmsData, setcmsData] = useState({});
    const [exptimer, setexptimer] = useState('');
    const [ counterInterval, setcounterInterval ] = useState({});

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

    const getCmsData = async(issuecode) => {
        let cmsdata = {}        
        try {
            cmsdata = await getIssueDetailsFromCmsByCode(issuecode);            
            setcmsData(cmsdata?.data?.result)
        } catch (error) {
            cmsdata = {}
        }
    }
    const validate = () => {
        var user = localStorage.getItem('user');
        if(!user)
        {
            alert('Not authorized')
        }
       
    }
    useEffect(() => {
        clearInterval(counterInterval);
        getCmsData(details?.issuecode);
        applyTimer(details?.clsdt);
    }, []);
    

    return(
        <SingleCardGsec details={details} expDays={exptimer} cmsData={cmsData} validate={validate} />      
    );
}

const GsecSection = ({details}) => {
    const history = useHistory();
    //console.log('gsd',details)
    return (
        <>
        <h1 className={s.gseclandingheading}>Goverment securities & T-Bills</h1>
        <div className={s.gseclandingWrap}>
            {details.map((e,litm) => {
                if(litm > 1)
                {
                    return;
                }
                    return (
                        <>
                          <GsecCard details={e} />
                        </>
                    )
            })}
         </div>
        {details.length > 2 &&
            <button className={s.allbondsbutton} onClick={() => history.push({pathname: "/investment-details/",issues:details})}>View all bonds ({details.length})</button>
        }
        </>
    );
}

export default GsecSection;
