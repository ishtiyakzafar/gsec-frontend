import { useForm } from "react-hook-form";
import cx from "classnames"
import { useState,useEffect } from "react";

import { getOSInfo } from "../../../helpers/getOSInfo";
import { CMS_URL } from '../../../vars/url';

import s from './BrokerRecomendation.module.scss';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { placeNewIPO } from '../../../services/issuesServices';
import CloseImg from '../../../assets/images/Login/close-button-png-30230.png';


const BrokerRecomendation = (props) => {
    const  details  = props.analystdata;
    const dispatch = useDispatch();
	// const applicationData = useSelector((state) => state.applicationData);
	const user = useSelector((state) => state.loggedIn.user);
	// console.log('details',details)
   


    return (
        <div className="ipo_popup">
            <div className={`modal fade form_ipocancel_main ${s.modalback}`} id={`analystresponse`} role="dialog"> 
                <div className={`modal-dialog modal-md modal-dialog-centered ${s.modalwrap}`}>

                    {/* <!-- Modal content--> */}
                    <div className="modal-content" style={{background:'rgba(255,255,255,0.8)'}}  >
                        <div className="modal-header border-0 text-center p-3 pb-0">
                            <img src={CloseImg} alt="Close" data-dismiss="modal" className={s.closeicon} />                            
                        </div>
                        <div className="modal-body pt-0 pb-5 dvcart">

                            <div id="step-one" className="" >

                                <h1 className={s.headingtitle}>Analysts Responses</h1>
                                <h4 className={s.headingtitle1} >Here is what most analysts have to say on your decision on investing in this IPO</h4>

                            </div>
                            
                            <div>
                                <table className={s.anlyticstbl}>
                                    <thead>
                                        <tr>
                                            <th>Analyst</th>
                                            <th style={{textAlign:'right'}}>Response</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            details.map((row,i) => {
                                                let cls=s.normamltext;
                                                if(row.recommendationString == "Buy"){
                                                    cls= s.greentext;
                                                }else if(row.recommendationString == "Neutral"){
                                                    cls= s.greytext;
                                                }else if(row.recommendationString == "Hold"){
                                                    cls= s.redtext;
                                                }  
                                                return (
                                                    <tr>
                                                        <td style={{textAlign:'left'}}>{row.brokerName} </td>
                                                        <td style={{textAlign:'right'}}><a href="javascript:void(0)" className={cls}>

                                                            {row.recommendationString === 'IPO Subscribe' && 'Subscribe'}
                                                            {row.recommendationString === 'IPO Note' && 'Neutral'}
                                                            {row.recommendationString === 'Avoid' && 'Avoid'}
                                                            
                                                        </a></td>                                                        
                                                    </tr>
                                                )
                                            })

                                        }
                                    </tbody>
                                    
                                    
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default BrokerRecomendation