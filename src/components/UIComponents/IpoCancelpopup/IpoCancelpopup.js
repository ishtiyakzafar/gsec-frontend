import { useForm } from "react-hook-form";
import cx from "classnames"
import { useState,useEffect } from "react";

import { getOSInfo } from "../../../helpers/getOSInfo";
import { CMS_URL,clevertap_key } from '../../../vars/url';

import s from './IpoCancelpopup.module.scss';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { placeNewIPO,getAppliedIPODetails } from '../../../services/issuesServices';
import CloseImg from '../../../assets/images/Login/close-button-png-30230.png';
import LoaderImg from '../../../assets/images/loader.svg';
import { Link,useHistory  } from 'react-router-dom';
import { applicationData as setApplicationData } from '../../../store/action/applicationData';

import ClevertapReact from 'clevertap-react';

const IpoCancelpopup = (props) => {
    const history = useHistory();
    const  details  = props.appdetails;
    
    const [ loading, setLoading ] = useState(false);
    const dispatch = useDispatch();
    const [rowData, setrowData] = useState([])
    const [statenoofshare, setstatenoofshare] = useState([])
    const [statebidprice, setstatebidprice] = useState([])
    const [statecutoff, setstatecutoff] = useState([])
	
	const user = useSelector((state) => state.loggedIn.user);
    const applicationData = useSelector((state) => state.applicationData);
	// console.log('user1',user)
    const noOfShares =[];
    const bidPrice = [];
    const cutOff= [];
    const tabrow=[];
    //console.log('ppp',details)
    const fetchDetails = async () => {

        //console.log('mmnnbb',details.issuetype)
        let scheduleData = details.scheduleData;
        if(details.issuetype === 'IPO')
        {
            for (let i = 0; i < scheduleData.bids.length; i++) {
                tabrow.push({
                    noOfShares: scheduleData.bids[i].noOfShares,
                    bidPrice: scheduleData.bids[i].bidPrice,
                    cutOff : scheduleData.bids[i].cutOff,
                })
                // noOfShares.push((i==1)? scheduleData.noofshares1:((i==2)? scheduleData.noofshares2 : scheduleData.noofshares3))
                // bidPrice.push((i==1)? scheduleData.bidprice1:((i==2)? scheduleData.bidprice2 : scheduleData.bidprice3))
                // cutOff.push((i==1)? scheduleData.cutoff1:((i==2)? scheduleData.cutoff2 : scheduleData.cutoff3))
                // setstatenoofshare([...noOfShares]);
                // setstatebidprice([...bidPrice]);
                // setstatecutoff([...cutOff]);
                setrowData([...tabrow])
            }
           // console.log('llll',noOfShares)
        }
       
        //console.log(tabrow)
    }
    useEffect(() => {
		fetchDetails();
	}, []);
    const cancelIPO = async () => {
        try {
            setLoading(true);
            
            var applieddata = details.scheduleData;
            let postvalue = {}
            if(details.issuetype === 'IPO')
            {
                
                ClevertapReact.initialize(clevertap_key);		   
                ClevertapReact.event("IPO_Cancel Click",{
                    "Source":"Application history page",
                    "IPO Name": applieddata.iponame,
                    "Bid Number": applieddata.applicationno,
                    "Investment Amount":applieddata.amountpaid,
                    "Investor category":applieddata.category,
                    "Application number":applieddata.applicationno,
                })

                let { data: scheduleData } = await getAppliedIPODetails((user.clientType == 'NONIIFLCLIENT')? user.panNo : user.clientcode,applieddata.iponame,applieddata.applicationno,applieddata.srno);
                scheduleData = scheduleData.resultData
                applieddata = scheduleData
                for (let i = 1; i <= scheduleData.totalbidcount; i++) {
                    tabrow.push({
                        noOfShares:(i==1)? scheduleData.noofshares1:((i==2)? scheduleData.noofshares2 : scheduleData.noofshares3),
                        bidPrice: (i==1)? scheduleData.bidprice1:((i==2)? scheduleData.bidprice2 : scheduleData.bidprice3),
                        cutOff : (i==1)? scheduleData.cutoff1:((i==2)? scheduleData.cutoff2 : scheduleData.cutoff3),
                    })
                    noOfShares.push((i==1)? scheduleData.noofshares1:((i==2)? scheduleData.noofshares2 : scheduleData.noofshares3))
                    bidPrice.push((i==1)? scheduleData.bidprice1:((i==2)? scheduleData.bidprice2 : scheduleData.bidprice3))
                    cutOff.push((i==1)? scheduleData.cutoff1:((i==2)? scheduleData.cutoff2 : scheduleData.cutoff3))
                    setstatenoofshare([...noOfShares]);
                    setstatebidprice([...bidPrice]);
                    setstatecutoff([...cutOff]);
                    setrowData([...tabrow])
                }

                //return false

                 postvalue = {
                    "ipoName": applieddata.iponame,
                    "clientcode": (user.clientType == 'NONIIFLCLIENT')? user.panNo : user.clientcode,
                    "loginId":(user.clientType == 'NONIIFLCLIENT')? user.panNo : user.loginid,
                    "noOfShares": noOfShares,
                    "bidPrice": bidPrice,
                    "cutOff": cutOff,
                    "totalBidCount": applieddata.totalbidcount,
                    "chqAmount": applieddata.amountpaid,
                    "categoryType": applieddata.category,
                    "issueType": "IPO",
                    "category": applieddata.investortype,
                    "entryType": "C",
                    "mkrid": user.loginid,
                    "subBrokerId": applieddata?.subBrokerId,
                    "signOffStatus": "",
                    "appNo": applieddata.applicationno,
                    "BidFlag":"C",
                    "formtype": "ONLINE",
                    "ipoBankName": applieddata.ipobankname,
                    "flgPassBack": applieddata.passBack,
                    "flgdiscount": applieddata.discountflg,                      
                    "pincode": "0",
                    "asbaParameter": applieddata.amountpaid > 500000 ? `${applieddata.asbaBankCode}|${applieddata.accountNumber}|${applieddata.bankLocation}|0|N` : "9999|0|NASBAL|0|N",
                    "upiNo": applieddata.upiNo,
                    "appSource":user?.AppSource ? user?.AppSource : 25,
                    "exchangeType": (applieddata.exchangeType).trim() || 'B',
                    "masterSrNo":props.appdetails.srno,
                    "crmLeadID":'0',
                    
                };
            }
            else if(details.issuetype === 'NCD')
            {
                let { data: ncddata } = await getAppliedIPODetails((user.clientType == 'NONIIFLCLIENT')? user.panNo : user.clientcode,applieddata.iponame,applieddata.applicationno,applieddata.srno,'NCD');

                
                var datadetails = ncddata?.resultData
                // Clevertap start		
                ClevertapReact.initialize(clevertap_key);
                function getSeriesNamect(array,keysearch)
                {
                    var fianalArr = [];
                    array.forEach(element => {
                        fianalArr.push(element[keysearch])
                    });
                    return fianalArr;
                }
                var payload = {
                    'Source':"Application history page",
                    'NCD Name':details.issue_name,
                    'No. of series':getSeriesNamect(datadetails.bids,'srNum').join(','),
                    'Investment Amount':datadetails.amountpaid,
                    'Investor category':datadetails.category+'|'+datadetails.investortype,
                    'Application number':datadetails.applicationno
                } 
                //console.log('NCD_Modify Click',payload);
                ClevertapReact.event("NCD_Cancel Click",payload)
                //return false
                // Clevertap End

                var noshr = []
                var bidprc = []
                var cutff = []
                datadetails?.bids.forEach(i => {
                    //console.log('xvp',i)
                    noshr.push(i.noOfShares)
                    bidprc.push(i.bidPrice)
                    cutff.push(i.cutOff)
                });

                var catt = datadetails?.investorCategory.filter(function(v, i) {
                    return (v.nsE_Code === datadetails?.investortype);
                  })

                 postvalue = {
                    "ipoName": datadetails?.iponame,
                    "clientcode": datadetails?.clientcode,
                    "loginId": (user.clientType == 'NONIIFLCLIENT')? user.panNo : user.loginid,
                    "noOfShares": noshr,
                    "bidPrice": bidprc,
                    "cutOff": cutff,
                    "totalBidCount": datadetails?.totalbidcount,
                    "chqAmount":datadetails.amountpaid,
                    "categoryType":datadetails.category,
                    "issueType": "BOND",
                    "category":datadetails?.investortype,
                    "entryType": "C",
                    "mkrid": (user.clientType == 'NONIIFLCLIENT')? user.panNo : user.loginid,
                    "subBrokerId": "",
                    "signOffStatus": "",
                    "appNo": datadetails?.applicationno,
                    "formtype": "ONLINE",
                    "ipoBankName": datadetails.ipobankname,
                    "flgPassBack": "N",
                    "flgdiscount": "N",
                    "BidFlag":"C",
                    "crmLeadID": "7522019206",
                    "pincode": "0",
                    "asbaParameter":datadetails.ipobankname !== "UPI" ? `${datadetails.asbaBankCode}|${datadetails?.accountNumber}|${datadetails?.bankLocation}|0|N` : "9999|0|NASBAL|0|N",
                    "upiNo": datadetails.ipobankname === "UPI" ? datadetails.upiNo : '',
                    "appSource":user?.AppSource ? user?.AppSource : 25,
                }
            }
            //console.log('postvalue',postvalue)
            // return false;
            
            placeNewIPO(postvalue,details.issuetype).then(res => {
					
                console.log('response',res);
                if(res.data.isSuccess == true && res.data.statusCode == '200'){
                    if(res.data.message === 'Error')
                    {
                        alert(res?.data?.resultData?.message)
                        setLoading(false);
                        return false
                    }
                    else
                    {

                        ClevertapReact.initialize(clevertap_key);
                        if(details.issuetype === 'IPO')
                        {
                            ClevertapReact.event("IPO_Cancel Success",{
                                "Source":"Application history page",
                                "IPO Name": postvalue.iponame,
                            })
                        }
                        else if(details.issuetype === 'NCD')
                        {
                            function getSeriesNamect(array,keysearch)
                            {
                                var fianalArr = [];
                                array.forEach(element => {
                                    fianalArr.push(element[keysearch])
                                });
                                return fianalArr;
                            }
                            var payload = {
                                'Source':"Application history page",
                                'NCD Name':details.issue_name,
                                'No. of series':getSeriesNamect(datadetails.bids,'srNum').join(','),
                                'Investment Amount':datadetails.amountpaid,
                                'Investor category':datadetails.category+'|'+datadetails.investortype,
                                'Application number':datadetails.applicationno
                            } 

                            ClevertapReact.event("NCD_Cancel Success",payload)
                        }
                        
                        alert('Bid successfully cancelled.')
                    }
                    setInterval(function () {
                        window.location.reload();
                    }, 1000);
                }
                else
                {
                    alert(res.data.message+' : '+res.data.resultData.message)
                    setLoading(false);
                }
                
            }).catch(error => {
                console.log(error)
                setLoading(false);
            });
    
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const editNow = async (applicationNo,iponame,srno) => {
		let clientcode = (user.clientType == 'NONIIFLCLIENT')? user.panNo : user.clientcode;

		let { data: scheduleData } = await getAppliedIPODetails(clientcode,iponame,applicationNo,srno);
		console.log('scheduleData',scheduleData);
		if(scheduleData?.isSuccess ==  true && scheduleData?.statusCode == 200){
			let details = scheduleData.resultData;
			const noOfSharesarr =[];
			const bidPricearr = [];
			const cutOffarr= [];
			const totalbidpricearr = [];
			for (let i = 1; i <= details.totalbidcount; i++) {
				
				noOfSharesarr.push((i==1)? details.noofshares1:((i==2)? details.noofshares2 : details.noofshares3));
				bidPricearr.push((i==1)? details.bidprice1:((i==2)? details.bidprice2 : details.bidprice3));
				cutOffarr.push((i==1)? details.cutoff1:((i==2)? details.cutoff2 : details.cutoff3));
				let share = (i==1)? details.noofshares1:((i==2)? details.noofshares2 : details.noofshares3);
				let price = (i==1)? details.bidprice1:((i==2)? details.bidprice2 : details.bidprice3);
				totalbidpricearr.push(parseFloat(share*price));
			}
			console.log('noOfSharesarr',noOfSharesarr)
			// setnoOfShares(noOfSharesarr => [...noOfSharesarr, false]);
			// setsharePrice(bidPricearr => [...bidPricearr, false]);
			// setcutOff(cutOffarr => [...cutOffarr, false]);
			// settotalbidprice(totalbidpricearr => [...totalbidpricearr, false])
			dispatch(setApplicationData({  
				IPOBondName:details.iponame,
				noOfShares:noOfSharesarr,
				bidPrice:bidPricearr,
				cutOff:cutOffarr,
				sharePrice:bidPricearr, 
				totalbidprice:totalbidpricearr,
				scheduleData:details,
				
			}));
			history.push(`/ipo_modify/${iponame}/${applicationNo}`)
		}
		
	};

    return (
        <div className="ipo_popup">
            <div className={`modal fade form_ipocancel_main ${s.modalback}`} id={`IPOcancel${details.applicationNo}`} role="dialog"> 
                <div className={`modal-dialog modal-md modal-dialog-centered ${s.modalwrap}`}>

                    {/* <!-- Modal content--> */}
                    <div className="modal-content"  >

                    {loading == true && 
                        <div className="loading_screen loading_inside">
                            <img src={LoaderImg} alt="loading..." />                            
                        </div>
                    }
                        <div className="modal-header border-0 text-center p-3 pb-0">
                            <img src={CloseImg} alt="Close" data-dismiss="modal" className={s.closeicon} />                            
                        </div>
                        <div className="modal-body pt-0 pb-5 dvcart">

                            <div id="step-one" className="" >

                            <h1 className={s.headingtitle}>Are you sure you want to cancel this application?</h1>

                            </div>
                            <div className={s.top}>
                                <div className={s.left}>
                                    <img src={`${CMS_URL}${details.img}`} alt={details.title} />
                                    <div className={s.heading}>
                                        <h2>{details.title}</h2>
                                        <div>
                                            
                                            <span>Application No:</span> <span className={s.no}>{details.applicationNo}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className={s.right}>

                                    <div className={s.heading}>
                                        <h2>₹{details.amountpaid}</h2>
                                        <div>
                                            
                                            <span>Total Amount</span> 
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div>
                                <table className={s.bidlisttabl}>
                                    {details.issuetype === 'IPO' &&
                                        <>
                                            <thead>
                                                <tr>
                                                    <th>Analyst</th>
                                                    <th>Qty</th>
                                                    <th>Share Price</th>
                                                    <th>Investment Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    details?.scheduleData?.bids.map((row,bid) => {
                                                        return (
                                                            <tr>
                                                                <td>{bid+1} <sup>{bid+1 === 1 ? 'st' : bid+1 === 2 ? 'nd' : bid+1 === 3 ? 'rd' : 'th'}</sup>{' Bid'}</td>
                                                                <td>{row.noOfShares}</td>
                                                                <td>₹{row.bidPrice} {row.cutOff == "Y"? `(Cut off)` : ''}</td>
                                                                <td>₹{parseFloat(row.bidPrice * row.noOfShares)}</td>
                                                            </tr>
                                                        )
                                                    })

                                                }
                                            </tbody>
                                        </>
                                    }

                                    {details.issuetype === 'NCD' &&
                                        <>
                                            <thead>
                                                <tr>
                                                    <th>Series no</th>
                                                    <th>Qty</th>
                                                    <th>Ack</th>
                                                    <th>investment</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    details?.scheduleData?.bids.map((row,bid) => {
                                                        return (
                                                            <tr>                                                                
                                                                <td>Series {row?.srNum}</td>
                                                                <td> {row?.noOfShares}</td>
                                                                <td> {row?.acknowledgmentNo}</td>
                                                                <td>₹{parseFloat(row.bidPrice * row.noOfShares)}</td>                                                                
                                                            </tr>
                                                        )
                                                    })

                                                }
                                            </tbody>
                                        </>
                                    }
                                    
                                </table>
                            </div>

                            <section className={s.foot}>
                                {details.scheduleData.applicationno != 0 &&
                                    <>
                                        {details.issuetype === 'NCD' ?
                                            <button className={s.borderbuton} data-dismiss="modal" onClick={() =>props.modifyncd(details.scheduleData)}  >
                                                <span>Modify Bids</span>
                                            </button>
                                            :                                
                                            <button className={s.borderbuton} data-dismiss="modal" onClick={() =>editNow(details.applicationNo,details.scheduleData.iponame,details.srno)}  >
                                                <span>Modify Bids</span>
                                            </button>
                                        }
                                    </>
                                }
                                <button onClick={() => cancelIPO()}>
                                    <span>Cancel All Bids</span> 
                                </button>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default IpoCancelpopup