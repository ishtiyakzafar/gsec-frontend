import s from './NCDDetails.module.scss';
import  './ncd-application-01.css';
import fallbackimg from '../../assets/images/fallback.svg';
import Slider from 'react-custom-slider';
import cx from 'classnames';
import { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { getNCDdetails,getOpenIssuesDetails,getOpenIssuesList,getIssueDetailsFromCmsByCode } from '../../services/issuesServices';
import { dateFormatter } from '../../helpers/utils';
import { CMS_URL,clevertap_key } from '../../vars/url';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Login from '../Login';
import NoImg from '../../assets/images/noimg.jpg';
import { Link,useHistory  } from 'react-router-dom';
import BrokerRecomendation from "../UIComponents/BrokerRecomendation/BrokerRecomendation";
import LoaderImg from '../../assets/images/loader.svg';
import othimgplaceholder from '../../assets/images/IPODetails/noothrimg.svg';
import useWindowDimensions from '../../hooks/screenWidth';
import ClevertapReact from 'clevertap-react';
import { LazyLoadComponent,LazyLoadImage } from 'react-lazy-load-image-component';
import { applicationData as setApplicationData } from '../../store/action/applicationData';
import SweetAlert from 'react-bootstrap-sweetalert';

const SeriesCard = ({details,changevalue,count,setcheck,setinputslider}) => {
    const [slidervalue,setslidervalue] = useState(details.cardslide || 0)
    const [slidewidth,setslidewidth] = useState(0)
    const [morerange,setmorerange] = useState(() => { if(details.cardslide > 200000) {return true } else { return false }});
    
    
    const chnageslidervalue = (value) => {
        if(value > 200000)
        {
            setmorerange(true)
        }
        else
        {
            changevalue(count,value)
            setmorerange(false)
        }
        //changevalue(count,value)
        //setslidervalue(value)
    }

    return (
        <div class={`card ${details.check !== 1 ? 'disable':''}`}>
            <h1>
            <input type="checkbox" onClick={() => setcheck(details.check,count)} defaultChecked={details.check === 1 ? true : false} name="" id="" /> Series {details.seriesNumber}
            {/* <img src="images/verified_user_black_24dp (2).svg" alt="" /> */}
            </h1>
            
            <div class="card-info-1">
            <p><span>Effective Yield</span>{details.effectiveYield}</p>
            <p><span>Tenure</span>{details.tenure.replace('MONTHS','Months')}</p>
            <p class="cardfreq"><span>Frequency</span>{details.frequency.toLowerCase()}</p>
            </div>
            <hr />
            <p class="how-much-invest">How much do you want to invest?</p>
            <div class="price-input">
            <div id="price" class="price-bubble" style={morerange === false ? {left:(slidewidth/235000)*details.cardslide} : {left:'calc(100% - 110px)',transform:'translate(0,0)'} }>
               {morerange === false ?
                <>
                ₹{parseFloat(details.cardslide).toFixed(1)}
                </>
                :
                <>
                    <input type='number' defaultValue={details.cardslide} onBlur={(e) =>setinputslider(e.target.value,details.rate,count)} style={{background:'#fff',maxWidth:100}} />
                </>
                }
            </div>
            <input
                value={details.cardslide}
                type="range"
                onChange={(e) => chnageslidervalue(e.target.value)}
                step={details.rate}
                name="price"
                id=""
                min={details.minAmt}
                max="240000"
                ref={el => {
                    if (!el) return;
                    setslidewidth(el.getBoundingClientRect().width); // prints 200px
                  }}
            />
            <p class="price-labels">
                <span>₹{parseInt(details.minAmt).toFixed(0)}</span><span>₹2L</span><span>>₹2L</span>
            </p>
            </div>
            <div class="card-info-2">
            <div>
                <p>
                <span>Maturity Amount</span>
                {/* <img src="images/info_black_24dp (1).svg" alt="" /> */}
                </p>
                {/* <p>₹1,15,000 <span>+ ₹8,500/year</span></p> */}

                {details.frequency === 'ANNUALLY' &&
                    <>
                    <p>
                        ₹{parseFloat(details.cardslide).toFixed(0)}
                        <span class="maturity-plus">+₹                                
                        {(details.cardslide*(parseFloat(details.couponYield)/100)*(parseFloat(details.tenure.replace("MONTHS",""))/12)).toFixed(2)}
                        </span>
                    </p>
                    </>                            
                }
                {details.frequency === 'MONTHLY' &&
                    <>
                        <p>₹{parseFloat(details.cardslide).toFixed(2)}
                        <span class="maturity-plus">+₹                                
                            {(details.cardslide*(parseFloat(details.couponYield)/100)*(parseFloat(details.tenure.replace("MONTHS",""))/12)).toFixed(2)}
                        </span>
                        </p>
                    </>                            
                }
                {details.frequency === 'CUMULATIVE' &&
                    <>
                        <p>
                            {/* {(details.cardslide*[(1+parseFloat(details.effectiveYield.replace("%",""))/100)^(parseFloat(details.tenure.replace("MONTHS",""))/12)]).toFixed(1)} */}
                            ₹{(details.cardslide*(Math.pow((1+parseFloat(details.effectiveYield.replace("%",""))/100),(parseFloat(details.tenure.replace("MONTHS",""))/12)))).toFixed(2)}
                        </p>
                    </>                            
                }
            </div>
            <div>
                <p><span>Total Qty</span></p>
                <p>{details.cardqty}</p>
            </div>
            </div>
        </div>
        );    
}

const Ncdapplication1 =() =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const { issueCode } = useParams();
    const applicationData = useSelector(state => state.applicationData)
    const [series,setseries] = useState([])
    const [ncdfulldetails,setncdfulldetails] = useState({})
    const [counter,setCounter] = useState('')
    const [ swalert,setalert ] = useState('');
    const [ loading, setLoading ] = useState(true);

    
    const [remainingbalance,setremainingbalance] = useState(0)
    //console.log('applicationData',applicationData)
    const genaratelist = () => {
        if(applicationData?.series)
        {
            setseries(applicationData?.series)
            return false
        }

        let series  = applicationData.ncddetails.ipoSeriesMap
        let monhts = applicationData.monthselected
        let mainslidervalue = applicationData.mainslidervalue
        //console.log('mntha',monhts);
        //series = series.reverse()

        var noseries = series.filter(function(v, i) {
            return (monhts.includes(v.tenure));
          })
          var noofseriesit =  noseries.length
          
          //console.log('xyzzzzz',noseries)
          
        let finalseries = [];
        let firstcheckseries = -1;
        for (let i = 0; i < series.length; i++) {
            const singlseries = series[i];
            if(monhts.includes(series[i].tenure) && mainslidervalue >= series[i].minAmt)
            {
                if(firstcheckseries === -1)
                {
                    firstcheckseries = i;
                }
                    singlseries.check = 1                    
                    mainslidervalue = parseFloat(mainslidervalue) - parseFloat(series[i].minAmt)
                    singlseries.cardslide = series[i].minAmt
                    //singlseries.cardqty = (series[i].minQty/series[i].minAmt)*singlseries.cardslide
                    singlseries.cardqty = singlseries.cardslide/series[i].rate
            }
            else
            {
                singlseries.check = 0
                singlseries.cardslide = 0
            }
            finalseries.push(singlseries)
        
        }
        //console.log('1stslider',firstcheckseries)
       // console.log('remainslider',mainslidervalue)
       // finalseries = finalseries.reverse()
        if(firstcheckseries !== -1)
        {
            finalseries[firstcheckseries].cardslide = parseFloat(mainslidervalue) + parseFloat(finalseries[firstcheckseries].cardslide)
            //finalseries[firstcheckseries].cardqty = (finalseries[firstcheckseries].minQty/finalseries[firstcheckseries].minAmt)*finalseries[firstcheckseries].cardslide
            finalseries[firstcheckseries].cardqty = finalseries[firstcheckseries].cardslide/finalseries[firstcheckseries].rate
        }

        if(monhts.length < 1)
        {
            finalseries[0].cardslide = parseFloat(mainslidervalue)
            finalseries[0].cardqty = finalseries[0].cardslide/finalseries[0].rate
            finalseries[0].check = 1
        }

        //console.log('finalseries',finalseries)
        setseries([...finalseries])

        
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
            'Source':"NCD Details Page",
            'NCD Name':applicationData.ncddetails.schname,
            'No. of series':getSeriesNamect(applicationData.ncddetails.ipoSeriesMap,'seriesNumber').join(','),
            'Frequency':getSeriesNamect(applicationData.ncddetails.ipoSeriesMap,'frequency').join(','),
            'Investment Amount':applicationData.mainslidervalue,
            'Journey time Start': new Date()
        } 
        //console.log('cpl',payload);
        ClevertapReact.event("NCD_Application Step 1",payload)
        
    
    }

    const updatevalue = (i,value) => {
        //console.log('ssss',value,i)
        var updatedseries = series
        updatedseries[i].cardslide = value
        //updatedseries[i].cardqty = parseInt((updatedseries[i].minQty/updatedseries[i].minAmt)*value)
        updatedseries[i].cardqty = parseInt(value/updatedseries[i].rate)
       // updatedseries.splice(i, 1);
      //  console.log('upval',series);
        setseries([...updatedseries])
    }

    const Ncdfulldetails = async() => {
        try{
        let data = await getNCDdetails(applicationData.ncddetails.issuecode)
        //console.log('ncdfull',data)
            setncdfulldetails(data.data.resultData)
            setInterval(() => {
                setCounter(dateFormatter(new Date(applicationData.ncddetails.clsdt).getTime()));
            }, 1000);
            setLoading(false)
        }
        catch{
            localStorage.removeItem('user');
            history.push('/ncd_details/'+applicationData.ncddetails.issuecode);
			//window.location.replace('/ncd_details/'+applicationData.ncddetails.issuecode); 
        }
    }

    const ncdstepnext = () => {
        setLoading(true)
        if(series)
        {
            var finalamountsld = 0
            for (let i = 0; i < series.length; i++) {
                if(series[i].check === 1)
                {
                    finalamountsld += parseFloat(series[i].cardslide)
                }               
            }           
        }

        if(finalamountsld < (ncdfulldetails.noOfMandatoryBonds*ncdfulldetails.lowprice))
        {
            setalert('Investment should not be lower than minimum investment');
            setLoading(false)
            return false
        }
        dispatch(
			setApplicationData({
				...applicationData,
                series:series,
                ncdfulldetails:ncdfulldetails,
                mainslidervalue:finalamountsld
			})
		);

        history.push("/ncd-application-step-2")
    }

    const checkunchk = (val,i) =>{
        
        var singlseries = series
        if(val === 1)
        {
            singlseries[i].check = 0           
            singlseries[i].cardslide = 0
            singlseries[i].cardqty = 0
        }
        else
        {
            singlseries[i].check = 1
            singlseries[i].cardslide = series[i].minAmt
            singlseries[i].cardqty = series[i].minAmt/series[i].rate
        }
        setseries([...singlseries])
    }

    const setinputslider = (value,step,i) => {
        var updatedseries = series        
        var exces = value%step
        var newval = value - exces
        updatedseries[i].cardslide = newval
        //updatedseries[i].cardqty = parseInt((updatedseries[i].minQty/updatedseries[i].minAmt)*newval)
        updatedseries[i].cardqty = parseInt(updatedseries[i].cardslide/updatedseries[i].rate)
        setseries([...updatedseries])
    }

    const hidesweeetalert = () => {
    setalert('')
    }
    const redirectsalert = (path="/") => {
        history.push(path)
      }

    useEffect(() => {
		genaratelist()
        Ncdfulldetails()
        // window.onpopstate = ()=> {
        //     alert('dadas');
        // }
        
	}, []);

    useEffect(() => {
        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener('popstate', onBackButtonEvent);
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener('popstate', onBackButtonEvent); 
            window.removeEventListener("beforeunload", handleBeforeUnload); 
        };
        // window.addEventListener("beforeunload", handleBeforeUnload);
        // return () => {
        //   window.removeEventListener("beforeunload", handleBeforeUnload);
        // };
      }, []);

      const onBackButtonEvent = (e) => {
        e.preventDefault();
        //if (!finishStatus) {
            if (window.confirm("Do you want to go back ?")) {
                //setfinishStatus(true)
                // your logic
                history.push('/ncd_details/'+applicationData.ncddetails.issuecode);
            } 
            else {
                window.history.pushState(null, null, window.location.pathname);
                //setfinishStatus(false)
            }
        //}
    }

      const handleBeforeUnload = (e) => {
        e.preventDefault();
        const message =
          "Are you sure you want to leave? All provided data will be lost.";
        e.returnValue = message;
        return message;
      };

    return(
        <>
        {loading == true && 
            <div className="loading_screen">
                <img src={LoaderImg} alt="loading..." />
                <p>Please wait while fetching..</p>
            </div>
        }

            {swalert != '' &&
				<SweetAlert
				custom
				showCancel
				showCloseButton
				error
				title="Alert!"
				cancelBtnText="Back to home"
				cancelBtnBsStyle="light"
				onConfirm={hidesweeetalert}
				onCancel={redirectsalert}
				>
				{swalert}
				</SweetAlert>
			}
            <section id="header">
            <div class="header-left">
                <img onClick={() => history.push("/ncd_details/"+applicationData.ncddetails.issuecode)} src={applicationData.cmsdata?.logo ? `${CMS_URL}${applicationData.cmsdata.logo}` : NoImg} alt="" />
                <div>
                <h1>{applicationData.ncddetails.schname}</h1>
                <div class="header-heading-subtext">
                    <p  dangerouslySetInnerHTML={{__html: counter+' left to apply'}}></p>
                    {/* <p>4 Days, 06 h: 12m: 34s left to apply</p> */}
                    <p class="seperator">·</p>
                    <p><span class="lowopacity">Min Qty:</span>{applicationData.ncddetails.noOfMandatoryBonds}</p>
                    <p class="seperator">·</p>
                    <p><span class="lowopacity">Price per NCD:</span> ₹{applicationData.ncddetails.lowprice}</p>
                </div>
                </div>
            </div>
            <div class="header-right">
                <div class="steps">
                <p class="active">1</p>
                <hr/>
                <p>2</p>
                <hr />
                <p>3</p>
                <hr />
                <p>4</p>
                </div>
                <div class="step-names">
                <p>Select Series</p>
                <p>Your Details</p>
                <p>Payment</p>
                <p>Apply</p>
                </div>
            </div>
            </section>
            <section id="container" class="ncdapplication1">

            
            {series.map((e, i) => {
               return <SeriesCard details={e} changevalue={updatevalue} setcheck={checkunchk} count={i} setinputslider={setinputslider} />
            })}
 

            
            </section>
            <footer class="ncdfooter singlClmnMobile">
            {(() => {                     
                if(series)
                {
                    var serisname = []
                    var finalamount = 0
                    for (let i = 0; i < series.length; i++) {
                        if(series[i].check === 1)
                        {
                            serisname.push(series[i].seriesNumber)
                            finalamount += parseFloat(series[i].cardslide)
                        }
                        
                    }
                    return <p><span>Total investment in Series {serisname.join(',')} </span>₹ {finalamount.toLocaleString()}</p>
                }
            })()}
            <a class="next-btn" href="javascript:void(0)" onClick={ncdstepnext}>Next<i class="fas fa-arrow-right"></i></a>
            </footer>        
        </>

    )
};

export default Ncdapplication1;