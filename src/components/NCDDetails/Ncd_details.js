import s from './NCDDetails.module.scss';
import  './ncdstyle.css';
import fallbackimg from '../../assets/images/fallback.svg';
import Slider from 'react-custom-slider';
import cx from 'classnames';
import { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { getNCDdetails,getOpenIssuesDetails,getOpenIssuesList,getIssueDetailsFromCmsByCode } from '../../services/issuesServices';
import { dateFormatter } from '../../helpers/utils';
import { CMS_URL,clevertap_key } from '../../vars/url';
import { useDispatch } from 'react-redux';
import { applicationData } from '../../store/action/applicationData';
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
import timesvg from './images/Time.svg';
import ratesvg from './images/Group 18377.svg';
import growthsvg from './images/growth.svg';
import allotmentsvg from './images/allotment.svg';

const NCDDetails = ({ toggleLogin }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { issueCode } = useParams();    
    const [ allncds, setallncds ] = useState([]);
    const [ ncddetails, setncddetails ] = useState({});
    const [ cmsdata, setcmsdata] = useState({});
    const [ slidervalue, setslidervalue] = useState(0);
    const [ counter, setCounter ] = useState('');
    const [ monthapplication, setmonthapplication] = useState([]);
    const applicationDataState = useSelector((state) => state.applicationData);
    const user = useSelector((state) => state.loggedIn);
    const [slidewidth,setslidewidth] = useState(0)
    const [morerange,setmorerange] = useState(false);
    const [cmsallncd,setcmsallncd] = useState([]);
    const [ratingStar,setratingStar] = useState(0);
    const [counterInterval,setcounterInterval] = useState({});
    const [ loading, setLoading ] = useState(true);
    const [ applyLogin, setapplyLogin ] = useState(false);

    const ncddetai =  async () => {
        try{
            let {data:{resultData}} = await getOpenIssuesList('BOND')

            dispatch(applicationData({}))
            setallncds(resultData)

            var cmsarrall = []
            
            for (let i = 0; i < resultData.length; i++) {
              try {
                var  {data:{result}} = await getIssueDetailsFromCmsByCode(resultData[i].issuecode)
                cmsarrall.push(result)
              } catch (error) {
                cmsarrall.push({})
              }
              
            }
            setcmsallncd(cmsarrall)
            
            var details = resultData.filter(function(v, i) {
                return (v.issuecode === issueCode);
              })
              //console.log('xxxrr',details[0])
            setncddetails(details[0])

            var rating = details[0].bondRating
            rating = rating?.replace(/[^a-zA-Z ]/g, "")
            var retstar = 0;
            if(rating == 'AAA')
            {
              retstar = 5;
            }
            if(rating == 'AA')
            {
              retstar = 4.5;
            }
            if(rating == 'A')
            {
              retstar = 4;
            }
            if(rating == 'BBB')
            {
              retstar = 3.5;
            }
            if(rating == 'BB')
            {
              retstar = 3.5;
            }
            if(rating == 'B')
            {
              retstar = 3;
            }
            if(rating == 'C')
            {
              retstar = 2;
            }
            if(rating == 'D')
            {
              retstar = 1;
            }

            setratingStar(retstar);

            if(details[0])
            {
              setslidervalue(details[0].noOfMandatoryBonds*details[0].highprice)
              
              var setTimerInterval = setInterval(() => {
                setCounter(dateFormatter(new Date(details[0].clsdt).getTime()));
                //console.log('ccxx',dateFormatter(new Date(details[0].clsdt).getTime()));
                // setopenclosedt(new Date(data.data.resultData.clsdt).toLocaleDateString('en-IN', {
                //   day: '2-digit',month: 'short',year:'numeric'}))
              }, 1000);

              setcounterInterval(setTimerInterval);
              
            }

            
        }
        catch(e)
        {
            alert('Something went wrong try again later')
            setLoading(false)
        }
        finally{
            try {
              let {data:{result}} = await getIssueDetailsFromCmsByCode(issueCode);              
              setcmsdata(result)
            } catch (error) {
              console.log(error)
              setcmsdata({})
            }
           
            //console.log('mcddddcvrtp',details[0]);
            function tenureret(array=details[0].ipoSeriesMap, columnName="tenure") {
                return array.map(function(value,index) {
                    return value[columnName];
                })
            }
            ClevertapReact.initialize(clevertap_key);
            var payload = {
              'Source':"NCD Details Page",
              'NCD Name':details[0].schname,
              'Price per bond':details[0].lowprice,
              'NCD size':(details[0].highprice*details[0].issueQty)/1000000,
              'tenure':tenureret().join(','),
              'Series':(details[0].ipoSeriesMap).length,
            }
            ClevertapReact.event("NCD_Details Page Viewed",payload)

            setLoading(false)
        }
    }

    const setmonthselection = (value) => {
      if(monthapplication.includes(value))
      {
        var index = monthapplication.indexOf(value);
        monthapplication.splice(index, 1);       
      }
      else
      {
        monthapplication.push(value)
      }
      setmonthapplication([...monthapplication])
      //console.log('apuldta',monthapplication)
    }

  const applyncd = () => {
    setLoading(true)
    var sendmonth = []
    if(monthapplication.length < 1)
    {
      // var monthunique = [...new Map(ncddetails.ipoSeriesMap.map(item =>
      //   [item['tenure'], item])).values()];        
      //   monthunique.forEach(e => {
      //     sendmonth.push(e.tenure)
      //   });
      sendmonth = []
    }
    else
    {
      sendmonth = monthapplication
    }
    dispatch(
			applicationData({
				...applicationDataState,
				monthselected:sendmonth,
        mainslidervalue:slidervalue,
        ncddetails:ncddetails,
        cmsdata:cmsdata,
			})
		);

    if(Object.keys(user).length > 0 ){
      history.push("/ncd-application-step-1")
    }else{
      setLoading(false);
      setapplyLogin(true)
			toggleLogin();
    }


  }

  const applyAutoLogin = async() => {
    if(Object.keys(user).length > 0  && applyLogin === true){
      applyncd();
    }
  }

  const setinputslider = (value) => {
    var exces = value%ncddetails.highprice
    var newval = value - exces
    setslidervalue(newval)
  }

  const convertDate = (inputFormat)  => {
		function pad(s) { return (s < 10) ? '0' + s : s; }
		var d = new Date(inputFormat)
		return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
	}

 

    useEffect(() => {
      //clearInterval();
      let unmounted = false;
    if (!unmounted) {
      scrollTop();
		  ncddetai();
    }
    return () => {
      unmounted = true;
    }
	}, [issueCode]);


  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      applyAutoLogin();
    }
    return () => {
      unmounted = true;
    }
  }, [user]);

  const scrollTop = () =>{
		var element = document.querySelector("header#topsection");
    if(element)
    {
  		element.scrollIntoView();
    }
	 };

    return (     
      <>
      {loading == true && 
				<div className="loading_screen">
					<img src={LoaderImg} alt="loading..." />
					<p>Please wait while fetching..</p>
				</div>
			}
          {ncddetails && 
            <>
            <div class="ncd_details_wrap">
              <header id='topsection'>
      <div class="header-left">         
        <img src={cmsdata?.logo ? `${CMS_URL}${cmsdata.logo}` : NoImg} alt="" />
        <div class="header-info">
          <h1>{ncddetails.schname}</h1>
          <p className='issueSizeNcd MobileOnly'>Issue Size: ₹{((ncddetails.highprice*ncddetails.issueQty)/1000000).toLocaleString()} Cr</p>
        </div>
      </div>
      <div class="header-right">
        <div class="background-color"></div>
        <h1>₹{(ncddetails.highprice * ncddetails.noOfMandatoryBonds).toLocaleString()}</h1>
        <p>Minimum Investment</p>
      </div>
      <div class="header-bottom">
        <p>Issue Size: ₹{((ncddetails.highprice*ncddetails.issueQty)/1000000).toLocaleString()} Cr</p>
        <p><span>Price per NCD:</span> ₹1000</p>
        <p>·</p>
        {cmsdata?.report_file &&
          <a href={CMS_URL+cmsdata?.report_file} target='_blank' >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path data-name="Path 12141" d="M0 0h24v24H0z" style={{fill:'none'}}/>
                <path data-name="Path 12142" d="M14 2H6a2 2 0 0 0-1.99 2L4 20a2 2 0 0 0 1.99 2H18a2.006 2.006 0 0 0 2-2V8zm2 16H8v-2h8zm0-4H8v-2h8zm-3-5V3.5L18.5 9z" style={{fill:'#2e276f'}}/>
            </svg>          
            Download  Product Note 
          </a>
        }
      </div>
              </header>
              <section id="details">
                <div class="background-color"></div>
                <div class="details-container">
                  <div class="details-card">
                    <h2>Expected 1 yr Returns</h2>
                    <div class="img">
                      <p><span>This Bond</span>{ncddetails.maxYield}%</p>
                      <p><span>Fixed Deposit</span>4.5%</p>
                    </div>
                    <h2>High Returns</h2>
                  </div>
                  <div class="details-card">
                    <h2>Rating</h2>
                    <div class="img">
                      {/* <img src={ratesvg} alt="" /> */}
                      <div class="ratingstarmain">
                        <span class="ratinginner" style={{width:(150*ratingStar)/5}}>                        
                        </span>
                      </div>
                      <h2>CRISIL {ncddetails.bondRating?.split("/")[0]}</h2>
                    </div>
                    <h2>{ncddetails.bondRating?.split("/")[1]}</h2>
                  </div>
                  <div class="details-card">
                    <h2>Application Closes in</h2>
                    <div class="img">
                      <img src={timesvg} alt="" />
                    </div>
                    <div class="cardcounter"  dangerouslySetInnerHTML={{__html: counter}}></div>
                  </div>
                  <div class="details-card" id='applyncddiv'>
                    <h1>Invest Now</h1>
                    <h2>How much do you want to invest?</h2>
                    <div class="price-input">
                      <div id="price" class="price-bubble" style={morerange === false ? {left:(slidewidth/235000)*slidervalue} : {left:'calc(100% - 110px)',transform:'translate(0,0)'} }>
                      {morerange === false ?
                        <>₹{slidervalue}</>
                        :
                        <>
                          <input type='number' placeholder='Enter Amount' onChange={(e)=> {setslidervalue(e.target.value)}}  onBlur={(e) =>setinputslider(e.target.value)} />
                        </>
                      }
                        
                      </div>
                      <input
                        value={slidervalue}
                        type="range"
                        name="price"
                        id=""
                        step={ncddetails.highprice}
                        min={ncddetails.noOfMandatoryBonds*ncddetails.highprice}
                        max={200001 + ((200000%ncddetails.highprice) || ncddetails.highprice)}
                        onChange={(e)=> {setslidervalue(e.target.value)
                          if(e.target.value > 200000 )
                          {
                            setmorerange(true)
                          }
                          else
                          {
                            setmorerange(false)
                          }
                        }}
                        ref={el => {
                          if (!el) return;
                          setslidewidth(el.getBoundingClientRect().width); // prints 200px
                        }}
                      />
                      <p class="price-labels">
                        <span>₹{ncddetails.noOfMandatoryBonds*ncddetails.highprice}</span><span>₹2L</span><span>>₹2L</span>
                      </p>
                    </div>
                    <h2>How long are you willing to invest?</h2>
                    <div class="duration">
                    {(() => {
                     
                     if(ncddetails.ipoSeriesMap)
                     {
                       
                        const arrayUniqueByKey = [...new Map(ncddetails.ipoSeriesMap.map(item =>
                          [item['tenure'], item])).values()];
                          const finalarr = []
                          for (let index = 0; index < arrayUniqueByKey.length; index++) {
                            let frr = {}
                            
                            frr.month = arrayUniqueByKey[index].tenure
                            
                            let subtype = []
                            for (let i = 0; i < ncddetails.ipoSeriesMap.length; i++) {
                              if(arrayUniqueByKey[index].tenure === ncddetails.ipoSeriesMap[i].tenure)
                                {
                                    var inttenure = ncddetails.ipoSeriesMap[i].effectiveYield
                                    subtype.push(inttenure)

                                }
                              
                            }
                            frr.type = subtype
                            finalarr.push(frr)
                          }
                         // console.log(finalarr)
                              return (
                                  <div className='duration_wrapper'>                                    
                                    {finalarr.map((e,i) => {
                                     return <label for={i} class="container">
                                      <input type="checkbox" onChange={() => setmonthselection(e.month)} value={e.month} name={i} />
                                      <p>{e.month} <span>
                                        {e?.type[0] !== e.type[e.type.length-1] ?
                                          <>
                                            {e?.type[0]} to {e.type[e.type.length-1]}returns
                                          </>
                                          :
                                          <>
                                             {e?.type[0]} returns
                                          </>
                                        }
                                        </span></p>
                                    </label>
                                    })}
                                  </div>
                              )
                          
                     }

                    })()}


                    </div>
                    <a href="javascript:void(0)" onClick={applyncd} >Apply Now</a>
                  </div>
                  <div class="details-card">
                    <h2>Subscriptions</h2>
                    <img src={fallbackimg} style={{margin:'auto',display:'block'}} alt="Information would be available soon!" />
                    {/* <div class="img">
                      <h2>₹400 Cr <span>/ ₹700 Cr</span></h2>
                      <div class="bar">
                        <div class="inner-bar"></div>
                      </div>
                    </div>
                    <p>Only ₹300 Cr Left</p> */}
                    <p>Information would be available soon!</p>
                  </div>
                  <div class="details-card">
                    <h2>Maturity Period</h2>
                    <div class="img">
                      <img src={growthsvg} alt="" />
                    </div>
                    {(() => {
                     
                        if(ncddetails.ipoSeriesMap)
                        {
                        const arrayUniqueByKey = [...new Map(ncddetails.ipoSeriesMap.map(item =>
                          [item['tenure'], item])).values()];
                          //console.log('ccc',arrayUniqueByKey);
                          function arrayColumn(array, columnName) {
                              return array.map(function(value,index) {
                                  return value[columnName].replace('MONTHS','');
                              })
                          }
                          var months = arrayColumn(arrayUniqueByKey, 'tenure');
                          var monthsstr = months.slice(0, -1).join(',')+' & '+months.slice(-1)+' Months';
                          return <h2>{monthsstr}</h2>
                        }
                      })()}
                    
                  </div>
                  <div class="details-card">
                    <h2>Allotment Type</h2>
                    <div class="img">
                      <img src={allotmentsvg} alt="" />
                      <p>First Come, First Serve</p>
                      <p>Hurry up. Its filling fast!</p>
                    </div>
                  </div>
                </div>
              </section>
              <section id="specific-terms">
                <h1>
                  Specific terms for each of <br class="mobile-line-breaks" />
                  the Secured NCDs
                </h1>
                <div class="background-color"></div>
                <div class="specific-terms-container">
                {/* {JSON.stringify(ncddetails.ipoSeriesMap)} */}
                {ncddetails.ipoSeriesMap &&
                  <>
                    {ncddetails.ipoSeriesMap.map((e,i) => {
                      var rate = parseFloat(e.rate).toFixed(2);
                      return (
                      <div class="terms-card">
                        <h2>
                          Series {e.seriesNumber}
                          {/* <img src="images/verified_user_black_24dp (2).svg" alt="" /> */}
                        </h2>
                        <div class="term-card-info">
                          <p class="yield"><span>Effective Yield</span>{e.effectiveYield}</p>
                          <p><span>Tenure</span>{e.tenure}</p>
                          <p><span>Frequency</span>{e.frequency}</p>
                          <p><span>Min Qty</span>{e.minQty}</p>
                          <p><span>Price Per NCD</span>₹{rate}</p>
                          <p>
                       
                            {e.frequency === 'ANNUALLY' &&
                              <>
                                <span>Maturity Amount</span>₹{parseFloat(rate).toFixed(0)}
                                <span class="maturity-plus">+₹                                
                                {(rate*(parseFloat(e.couponYield)/100)*(parseFloat(e.tenure.replace("MONTHS",""))/12)).toFixed(2)}
                                </span>
                              </>                            
                            }

                            {e.frequency === 'MONTHLY' &&
                              <>
                                <span>Maturity Amount</span>₹{parseFloat(rate).toFixed(0)}
                                <span class="maturity-plus">+₹                                
                                {(rate*(parseFloat(e.couponYield)/100)*(parseFloat(e.tenure.replace("MONTHS",""))/12)).toFixed(2)}
                                </span>
                              </>                            
                            }

                            {e.frequency === 'CUMULATIVE' &&
                              <>
                                <span>Maturity Amount</span>₹
                                {(rate*(Math.pow((1+parseFloat(e.effectiveYield.replace("%",""))/100),(parseFloat(e.tenure.replace("MONTHS",""))/12)))).toFixed(2)}
                              </>                            
                            }
                           
                          </p>
                        </div>
                        {/* <a href="#applyncddiv">Apply Now</a> */}
                      </div>
                      )
                    })}
                  </>
                }
                  
                </div>
              </section>

              {cmsdata?.other_considerations &&
                <section id="other-consideration">
                  <div class="background-color"></div>
                  <h1>Other Considerations</h1>
                  <div class="other-consider-info">
                    <div class="other-left" dangerouslySetInnerHTML={{__html: cmsdata.other_considerations}}>
                      
                    </div>
                    <div class="other-right">                    
                         <LazyLoadImage
                         alt={'other considaration'}
                         effect="blur"								
                         src={cmsdata?.consideration_image ? `${CMS_URL}${cmsdata?.consideration_image}` : othimgplaceholder} />                     
                    </div>
                  </div>
                </section>
              }
                {allncds.length > 1 &&
                  <section id="others">
                    <h1>Others also invested in</h1>
                    <div class="background-color"></div>
                    <div class="others-container">
                    {allncds.map((e,i) => (                      
                      <>
                      {e.issuecode !== issueCode &&
                        <>
                        <a href={`/ncd_details/${e.issuecode}`} onClick={(ev)=>{ ev.preventDefault(); clearInterval(counterInterval); history.push(`/ncd_details/${e.issuecode}`)}}>
                          <div class="other-card">
                            <div class="other-logo">
                              {cmsallncd.map((ecms,k) => {
                                var isexstcm = 0;
                                cmsallncd.forEach(element => {
                                  if(element.issuecode == e.issuecode)
                                  {
                                    isexstcm = 1;
                                  }
                                });                                
                                return(
                                  <>
                                    {isexstcm==1 ? 
                                    <>
                                    {ecms.issuecode == e.issuecode && 
                                      <>
                                        
                                        <img src={ecms?.logo ? `${CMS_URL}${ecms.logo}` : NoImg} style={{width:75,height:75,borderRadius:50}} alt="" />
                                      </>                                      
                                    }
                                    </>
                                    :
                                      <>
                                      {k < 1 &&
                                        <img src={NoImg} style={{width:75,height:75,borderRadius:50}} alt="" />
                                      }
                                      </>
                                    }
                                  </>
                                )
                              })}                              
                            </div>
                            <div class="other-info">
                                <h2 style={{color:'#333'}}>
                                  {e.schname}
                                </h2>
                                <p class="apply-limit">Apply within  {convertDate(e.clsdt)}
                                </p>
                                <p class="minimum">Invest Minimum</p>
                                <p class="rate">₹{e.highprice * e.noOfMandatoryBonds}<span></span></p>
                              </div>
                            </div>
                          </a>
                        </>
                      }
                      </>
                      ))}
                    </div>
                  </section>
                }                
              </div>
            </>
          }
      </>
    );
};


export default NCDDetails;
