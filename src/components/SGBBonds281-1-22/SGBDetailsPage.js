import React, { useEffect, useState } from "react";
import { getSgbDetails,getOpenIssuesList, getIssueDetailsFromCmsByCode } from "../../services/issuesServices";
import styled from 'styled-components'
import { Link, useHistory } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import s from '../IPODetails/IPODetails.module.scss';
import "./SGBDetailsPage.css";
import SideBar from "../SideBar/SideBar";
import { CMS_URL } from '../../vars/url';
import NoImg from '../../assets/images/noimg.jpg';
import Footer from "../Footer/Footer";
import { dateToRemainingTimeFormattor } from "../../helpers/utils";
import SGB48 from "../../assets/images/Sgb/Soverign Gold Bonds_48 Px.webp";
import EventImg from '../../assets/images/LandingPage/event_black_24dp (1)@3x.png';
import Despblack24 from "../../assets/images/Sgb/description_black_24dp.svg";
import G20899 from "../../assets/images/Sgb/Group 20899.svg";
import G20903 from "../../assets/images/Sgb/Group 20903.svg";
import G20898 from "../../assets/images/Sgb/Group 20898.png";
import G20897 from "../../assets/images/Sgb/Group 20897.svg";
import G20875 from "../../assets/images/Sgb/Group 20875.svg";
import G20924 from "../../assets/images/Sgb/Group 21013.png";
import G20890 from "../../assets/images/Sgb/Group 20890.svg";
import G13500 from "../../assets/images/Sgb/group-13500.svg";
import G13497 from "../../assets/images/Sgb/group-13497.svg";
import G13445 from "../../assets/images/Sgb/Group 13445.svg";
import G13752 from "../../assets/images/Sgb/group-13752.svg";
import G13643 from "../../assets/images/Sgb/Group 13643.svg";
import G13604 from "../../assets/images/Sgb/Group 13604.svg";
import Iffl_sec from "../../assets/images/Sgb/IIFL Sec .svg";

import CheckCircleB24 from "../../assets/images/Sgb/check_circle_black_24dp.svg";
import Maskgroup94 from "../../assets/images/Sgb/Mask Group 94.webp";
import playcircleblack24 from "../../assets/images/Sgb/play_circle_black_24dp.svg";
import Greenarrow from "../../assets/images/Sgb/green-arrow.svg";
import redarrow from "../../assets/images/Sgb/red-arrow.svg";
import polygon70 from "../../assets/images/Sgb/Polygon 70.svg";
import Polygon25 from "../../assets/images/Sgb/Polygon 25.svg";
import Physicalgold from "../../assets/images/Sgb/NoPath - Copy (2).webp";
import G18776 from "../../assets/images/Sgb/Group 18776.webp";
import Glemarklogo from "../../assets/images/Sgb/60caa3fbab9c466.webp";
import Aditibirla from "../../assets/images/Sgb/03ddb594de05403.webp";
import Novoco from "../../assets/images/Sgb/88ca95c534a24bc.webp";
import LoaderImg from "../../assets/images/loader.svg";
import { useSelector } from "react-redux";
import Login from "../Login";
const SGBDetailsPage = (props) => {
  const { handleRange, selectedRange, customrange, disableranger, handleCustRange, handleDisRange } = props;
  const user = useSelector((state) => state.loggedIn);
  let history = useHistory();
  const [ details, setDetails ] = useState({});
  const [sgbData, setSgbData] = useState([]);
  const [hidealert, setHideAlert] = useState(false);
  // const [customrange,setCustomRange]= useState(200000)
  // const [disableranger, setDisableRanger] = useState(false);
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ openIssue, setopenIssue ] = useState([]);
  // const [selectedRange,setSelectedRange]= useState(2780)
  const [selectedgrams, setSelectedGrams] = useState(1);
  const [leftTime, setLeftTime] = useState({
    days: null,
    hours: null,
    minutes: null,
    seconds: null,
  });
  useEffect(() => {
    // fetchopenissues();
    let response = getSgbDetails();
    response
      .then((res) => {
        console.log(res.data.resultData[0]);
        fetchSgbData(res.data.resultData[0]);
        getRemainingTimeToApply(res.data.resultData[0].clsdt);
        handleRange(res.data.resultData[0].highprice);
        setLoading(false);
      })
      .catch((err) => console.log(err));
    // console.log(response)
    let locals = window.localStorage;
    if (locals.getItem("user") !== undefined) {
      console.log(JSON.parse(locals.getItem("user")));
    }
  }, []);
  const toggleLogin = () => {
    setLogin(!login);
  };
  const fetchSgbData = (data) => {
    setSgbData(data);
    fetchopenissues();
  };
  const getRemainingTimeToApply = (closeDate) => {
    // Set the date we're counting down to
    var countDownDate = new Date(closeDate).getTime();

    // Update the count down every 1 second
    // eslint-disable-next-line no-unused-vars
    var x = setInterval(function () {
      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"
      // document.getElementById("demo").innerHTML = days + "d " + hours + "h "
      // + minutes + "m " + seconds + "s ";
      setLeftTime({
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      });

      // If the count down is over, write some text
      // if (distance < 0) {
      //   clearInterval(x);
      //   document.getElementById("demo").innerHTML = "EXPIRED";
      // }
    }, 1000);
  };

  const getGoldReturnsEightYears = (goldprice) => {
    let totalReturns =
    (goldprice * 10) * [1 + (8 * 2.5) / 100] + (goldprice * 10) * (1 + 20/100);
    return Number(totalReturns).toLocaleString();
  };
  const handleSlider = (e) => {
    console.log(e.target.value);
    handleRange(e.target.value);
    handleGrams(e.target.value);
    let ranger = document.getElementById("sgb-home-slider");
    let bubble = document.getElementById("price");
    // if(ranger && bubble){ setBubble(ranger, bubble)};
    if(e.target.value > 200000){
      console.log('price is > 2lakhs')
      // setDisableRanger(true)
      handleDisRange(true)
      // setCustomRange(200000)
      handleCustRange(200000)
    }
    const val = ranger && ranger.value;
    // const price = convertToStringPrice(range)
    const min = ranger && ranger.min ? ranger.min : 15567;
    const max = ranger && ranger.max ? ranger.max : 240000;
    const newVal = Number(((val - min) * 100) / (max - min));
    
    // console.log(`${newVal}% + (${-4.1 - newVal * 0.015}))`)
    // setSlidervalue(newVal)
    // setRange(newVal)
    // bubble.innerText = `₹${price}`;
    if(ranger.value >= 200000){
      bubble.style.float = 'right';
      bubble.style.left = 'unset';
      bubble.style.border = 'none';
    }
    if(ranger.value < 200000){
      bubble.style.left = `calc(${newVal}% + (${-4.1 - newVal * 0.015}rem))`;
      bubble.style.float = 'none';
      // bubble.style.border = '0.7rem solid';
    }
    
  };
  const handleCustomRange =(e) =>{
    // setCustomRange(e.target.value)
    handleCustRange(e.target.value)
  }
  const handleCustomRangeBlur = () =>{
      if(customrange > 200000 && customrange < sgbData.highprice * 4000){
        let cgrams =  Math.floor(customrange / sgbData.highprice)
        let finalPrice = cgrams * sgbData.highprice
        handleRange(finalPrice)
        setSelectedGrams(cgrams)
        // setDisableRanger(false)
        handleDisRange(false)
        // setCustomRange(finalPrice)
        handleCustRange(finalPrice)
      }else{
        handleRange(Math.floor(200000 / sgbData.highprice) * sgbData.highprice)
        setSelectedGrams(Math.floor(200000 / sgbData.highprice))
        
        // setDisableRanger(false)
        handleDisRange(false)
        // setCustomRange(200000)
        handleCustRange(200000)
      }
  }
  const handleGrams = (price) => {
    setSelectedGrams(price / sgbData.highprice);
  };
  const handleSGBApply = () => {
    console.log("handlesgbapply");
    if (Object.keys(user).length > 0) {
      if (user.user.clientType === "NONIIFLCLIENT") {
        setHideAlert(true);
      } else {
        setHideAlert(false);
        history.push("/sgb_apply");
      }
    } else {
      toggleLogin(!login);
    }

    // history.push("/sgb_apply");
  };
  const handleALertBox = () => {
    setHideAlert(false);
  };
  const fetchopenissues = async() => {
		let otsdata = []
		try{
			let detail = getOpenIssuesList('IPO').then(response => {
				//setopenIssue(response.data.resultData)
				let odata = response.data.resultData
				
				
				//console.log('detailsdata',detailsdata)
				try
				{
						
					let cmsdata = {}
					odata.map((e) => {
						// if(Object.keys(user).length == 0 ){	
						// 	if(e.issuecode == issueCode){
								
						// 		setDetails(e);
						
						// 		setSliderValue(e.cutoff * e.lotsize)
						// 		setcutOffchange(e.cutoff)
						// 		setExchangetype(e.exchangeType)
						// 		setInterval(() => {
						// 			setCounter(dateFormatter(new Date(e.clsdt).getTime()));
						// 			setopenclosedt(new Date(e.clsdt).toLocaleDateString('en-IN', {
						// 				day: '2-digit',month: 'short',year:'numeric'}))
						// 		}, 1000);
						// 	} 
						// }
						
						getIssueDetailsFromCmsByCode(e.issuecode).then(res => {
							cmsdata = res.data.result
							e.cmsdata = cmsdata
							otsdata.push(e);
						})
					})
					
					setopenIssue(odata)		
						
				}
				catch(error)
				{
					alert(error);
				}
				//console.log('agaazoo=>',response.data.resultData);
			})			
		}
		catch(error)
		{
			alert(error);
		}
	}
  const gotoIPO = (issueCode) => {

    window.location.href = "/ipo_details/"+issueCode;
  
  }
  
  const Section1Card = ({ img, title, top, subHeading, event, button, background, color,topbackground,issueCode,history,iscolor }) => {
    return (
      <div className={s.card + " hover-animate"} style={{ background }}>
        {top != null &&
          <div className={s.top} style={{background:`${topbackground}`}}>
            <span>{top}</span>
          </div>
        }
        <div className={s.cardBody}>
          <img src={img} alt={title} />				
  
          <div className={s.body}>
            <h3  style={iscolor=='N' ? {color:'#000'} : {width:'initial'}}>{title}</h3>
            <div className={s.subHeading}>
              <span className={s.light} style={iscolor=='N' ? {color:'#000'} : {width:'initial'}}>{subHeading}</span>
            </div>
  
            <div className={s.invest}>
              <img src={EventImg} style={iscolor=='N' ? {filter:'invert(1)'} : {filter:'inherit'}} alt="Invest" />
              <span style={iscolor=='N' ? {color:'#000'} : {width:'initial'}}>{event}</span>
            </div>
          </div>
        </div>
  
        <div className={s.buttons}> 
          <button className={s.button} style={iscolor=='N' ? {border:'1px solid #000'} : {border:'none'}}  onClick={() => gotoIPO(issueCode)} >
            {button}
          </button>
        </div>
      </div>
    );
  };
  
  return (
    
    <>
      {loading === true && (
        <div className='loading_screen loading_inside'>
          <img src={LoaderImg} alt='loading...' />
        </div>
      )}
      {login && <Login toggleLogin={toggleLogin} />}
      <SideBar/>
      <div className='sgb-dp-container'>
        {/* login popup */}

        {/* alert box */}
        {hidealert && (
          <SweetAlert error title='Alert!' onConfirm={handleALertBox}>
            Since you dont't have a DEMAT account with IIFL, you can't apply for
            SGB at the moment.
          </SweetAlert>
        )}
        {/* headers */}
        <div class='sgb-dp-header'>
          <div class='sgb-dp-header-left'>
            <div class='sgb-dp-header-inner-left-top'>
              <img src={SGB48} alt='' />
              <div>
                <h1>Sovereign Gold Bond</h1>
                <p>{sgbData.schname}</p>
              </div>
            </div>
          </div>
          <div class='header-right'>
            <div class='background-color'></div>
            <h1>
              ₹{sgbData.highprice} <span>/1 gm</span>
            </h1>
            <p>Minimum Investment</p>
          </div>
          <div class='header-left-bottom'>
            <p>2.5% Additional Returns</p>
            <div>
              <p>
                Price: <span>₹{sgbData.highprice}/gm</span>
              </p>
              {/* <p>·</p>
            <a href="#"><img src={Despblack24} alt="" />Download
              Prospectus</a> */}
            </div>
          </div>
        </div>
        {/* sgb details */}
        <section id='SGB-details'>
          <div class='background-color'></div>
          <div class='sgb-details-container'>
            <div class='sgb-details-card'>
              <p class='sgb-detail-card-heading'>Highly Secure</p>
              <div class='img'>
                <img src={G20903} alt='' />
              </div>
              <div class='sgb-detail-card-info'>
                <h3>Issued by RBI</h3>
                <p>
                  No issue of storage & <br />
                  high purity maintained
                </p>
              </div>
            </div>
            <div class='sgb-details-card'>
              <p class='sgb-detail-card-heading'>
                Tax Free <br class='mobile-line-breaks' />
                Fixed returns
              </p>
              <div class='img'>
                <img src={G20898} alt='' />
              </div>
              <div class='sgb-detail-card-info'>
                <h3>Paid Annually</h3>
                <p>No tax on interest earned</p>
              </div>
            </div>
            <div class='sgb-details-card'>
              <p class='sgb-detail-card-heading'>Application Closes in</p>
              <div class='img'>
                <img src={G20899} alt='' />
              </div>
              <div class='sgb-detail-card-info'>
                <h3>{!isNaN(leftTime.days) && leftTime.days} Days</h3>
                {/* <p>{dateToRemainingTimeFormattor(sgbData.opndt,sgbData.clsdt)}</p> */}
                {/* <p>{getRemainingTimeToApply(sgbData.clsdt)}</p> */}
                <p>{`${leftTime.hours ? leftTime.hours : 0}h ${
                  leftTime.minutes
                }m ${leftTime.seconds}s`}</p>
              </div>
            </div>
            <div class='sgb-details-card'>
              <h2>Invest Now!</h2>
              <p>{sgbData.schname}</p>
              <p>How much do you want to invest?</p>
              <div class='price-input'>
               <div id='price' class='sgb-details-price-bubble'>
                  {(selectedRange < 200000 ) ?
                  selectedRange !== 0 && `₹${Number(selectedRange).toLocaleString()}`
                  :
                  <input 
                    type='number'
                    min={200000}
                    value={customrange} 
                    className="sgb-more-range-input"
                    onChange={handleCustomRange} 
                    onBlur={handleCustomRangeBlur}
                    onKeyUp={(e) =>{
                      e.preventDefault()
                      console.log('clicked', e.key)
                      if(e.key === 'Enter'){
                        handleCustomRangeBlur()
                        }
                      }}
                    autoFocus={true}
                    />
                  
                  }
                     
                </div>
                
                {/* <div className="sgb-more-range">
                  <input 
                    type='number'
                    min={200000} 
                    className="sgb-more-range-input" 
                    onBlur={() => console.log('blurred') }/>
                </div> */}
                <input
                  class='sgb-details-input'
                  value={selectedRange}
                  type='range'
                  name='price'
                  id='sgb-home-slider'
                  min={sgbData.highprice}
                  step={sgbData.highprice}
                  max='240000'
                  onChange={handleSlider}
                  disabled={disableranger}
                />
                <p class='sgb-details-price-labels'>
                  <span>₹{Number(sgbData.highprice).toLocaleString()}</span>
                  <span>₹2L</span>
                  <span>{">"}₹2L</span>
                </p>
              </div>

              <div class='quantity'>
                <p>Total Qty</p>
                <p>{selectedgrams} gms</p>
              </div>
              <div class='invest-cta'>
                <a href='#' onClick={() => handleSGBApply()}>
                  Invest Now
                </a>
                {/* <Link to="/sgb_apply">Invest Now</Link> */}
              </div>
            </div>
            <div class='sgb-details-card'>
              <p class='sgb-detail-card-heading'>Additional Charges</p>
              <div class='img'>
                <img src={G20897} alt='' />
              </div>
              <div class='sgb-detail-card-info'>
                <p>
                  No making or <br class='desktop-line-breaks' />
                  Storage <br class='mobile-line-breaks' />
                  Charges
                </p>
              </div>
            </div>
            <div class='sgb-details-card'>
              <p class='sgb-detail-card-heading'>Tradable in Market</p>
              <div class='img'>
                <img src={G20875} alt='' />
              </div>
              <div class='sgb-detail-card-info'>
                <p>
                  Sell on stock market or <br />
                  Sell Bond.
                </p>
              </div>
            </div>
            <div class='sgb-details-card'>
              <p class='sgb-detail-card-heading'>Maturity Of Gold Bonds</p>
              <div class='img'>
                <img src={G20924} alt='' />
              </div>
              <div class='sgb-detail-card-info'>
                <p>Early exit in 5 years.</p>
              </div>
            </div>
          </div>
        </section>
        {/* sgbgolds */}
        <section id='goldvs'>
          <div class='top-bg-img'>
            <img src={G20890} alt='' />
            <img src={G13500} alt='' />
            <img src={G13497} alt='' />
            <img src={G13497} alt='' />
          </div>
          <div class='down-bg-img'>
            <img src={G13752} alt='' />
            <img src={G13643} alt='' />
          </div>
          <h1>
            Gold vs Sovereign Gold <br class='mobile-line-breaks' />
            Bonds
          </h1>
          <div class='benefits-container'>
            <div class='benefits'>
              <div class='rectangle-1'></div>
              <h2>
                Benefits of Sovereign <br />
                Gold Bond
              </h2>
              <ul>
                <li>
                  <img src={CheckCircleB24} alt='' />
                  <span>No making or storage charges</span>
                </li>
                <li>
                  <img src={CheckCircleB24} alt='' />
                  <span>
                    You get an extra interest of
                    <br class='mobile-line-breaks' />
                    2.5% for holding
                  </span>
                </li>
                <li>
                  <img src={CheckCircleB24} alt='' />
                  <span>No GST. You get tax free profit.</span>
                </li>
                <li>
                  <img src={CheckCircleB24} alt='' />
                  <span>Safe and secure</span>
                </li>
              </ul>
              <hr />
              <div class='video-section'>
                <div class='video'>
                  <img src={Maskgroup94} alt='' />
                  <a href="https://www.youtube.com/watch?v=Krs8MFHlEIg" rel="noreferrer noopener" target="__blank" ><img src={playcircleblack24} alt='' /></a>
                </div>
                <div class='video-info'>
                  <h2>
                    How are sovereign Gold Bonds <br />
                    better than Physical Gold?
                  </h2>
                  <p>
                    <img src={G13445} alt='' />
                    <span>Youtube</span>
                    <span>·</span>
                    <span>2 days ago</span>
                  </p>
                </div>
              </div>
            </div>
            <div class='comparisons'>
              <div class='rectangle-1'></div>
              <h2>8 years returns comparison</h2>
              <div class='comparison-container'>
                <div class='comparsion-1'>
                  <div class='category'>
                    <p>Sovereign Gold Bond</p>
                    <img src={SGB48} alt='' />
                    <h2>₹{Number(sgbData.highprice * 10).toLocaleString()}</h2>
                    <p>For 10 Gm of Gold</p>
                  </div>
                  <div class='points'>
                    <ul>
                      <span>&nbsp;</span>
                      <hr />
                      <li>
                        <img src={Greenarrow} alt='' />
                        Additional 2.5% Interest
                      </li>
                      <li>
                        <img src={Greenarrow} alt='' />
                        If gold value goes up by 20%
                      </li>
                    </ul>
                  </div>
                  <div class='total-returns'>
                    <p>Total Returns</p>
                    <p>₹{getGoldReturnsEightYears(sgbData.highprice)}</p>
                    <p class='after'>After 8 Years</p>
                    <span>
                      <span>
                        <img src={polygon70} alt='' />
                        <img src={Polygon25} alt='' />
                      </span>
                      40%
                    </span>
                  </div>
                </div>
                <div class='comparsion-1'>
                  <div class='category'>
                    <p>Physical Gold</p>
                    <img src={Physicalgold} alt='' />
                    <h2>₹{Number(sgbData.highprice * 10).toLocaleString()}</h2>
                    <p>For 10 Gm of Gold</p>
                  </div>
                  <div class='points'>
                    <ul>
                      <span>&nbsp;</span>
                      <li>
                        <img src={Greenarrow} alt='' />
                        If gold value goes up by 20%
                      </li>
                      <hr />
                      <li>
                        <img src={redarrow} alt='' />
                        Making charges
                      </li>
                      <li>
                        <img src={redarrow} alt='' />
                        Storage charges
                      </li>
                      <li>
                        <img src={redarrow} alt='' />
                        Tax on returns
                      </li>
                    </ul>
                  </div>
                  <div class='total-returns'>
                    <p>Total Returns</p>
                    <p>
                      ₹{Number(sgbData.highprice * 10 * (1 + 20 / 100)).toLocaleString()}
                    </p>
                    <p class='after'>After 8 Years</p>
                    <span>
                      <span>
                        <img src={polygon70} alt='' />
                        <img src={Polygon25} alt='' />
                      </span>
                      20%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* sgb benefits table */}
        <section id='benefits'>
          <div class='benefits-table-container'>
            <div class='rectangle-1'></div>
            <h1>Benefits of Sovereign Gold Bond</h1>
            <table>
              <tr>
                <th></th>
                <th>Sovereign Gold Bond</th>
                <th>Physical Gold</th>
                <th>Gold ETF</th>
              </tr>
              <tr>
                <td>Returns/Earning</td>
                <td>More than actual return on Physical Gold</td>
                <td>Lower than real return on gold due to making charges</td>
                <td>
                  Less than actual return on physical gold (annual expense
                  deducted)
                </td>
              </tr>
              <tr>
                <td>Sovereign Guarantee</td>
                <td>Yes</td>
                <td>N/A</td>
                <td>No</td>
              </tr>
              <tr>
                <td>Interest on the Investment</td>
                <td>Yes, 2.5% of price of gold</td>
                <td>No</td>
                <td>No</td>
              </tr>
              <tr>
                <td>Fund Management Fees</td>
                <td>No</td>
                <td>No</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Broker Charges</td>
                <td>No</td>
                <td>No</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Exit/Redemption</td>
                <td>Only from 5th year</td>
                <td>Exit any time</td>
                <td>Exit any time</td>
              </tr>
              <tr>
                <td>Tradable</td>
                <td>Yes</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Storage/ Insurance charges</td>
                <td>No</td>
                <td>Yes</td>
                <td>No</td>
              </tr>
              <tr>
                <td>Quality Check required</td>
                <td>No, (High Purity)</td>
                <td>Yes</td>
                <td>No</td>
              </tr>
              <tr>
                <td>Liquidity</td>
                <td>Limited</td>
                <td>High Liquidity</td>
                <td>High Liquidity</td>
              </tr>
            </table>
          </div>
        </section>
        {/* sgb about */}
        <section id='about'>
          <h1>About SGB</h1>
          <div class='background-color top-bg'></div>
          <div class='background-color down-bg'></div>
          <div class='about'>
            <div class='info'>
              <p>
                SGBs are government securities <br class='mobile-line-breaks' />
                denominated in grams of gold. They are{' '}
                <br class='mobile-line-breaks' />
                {/* <br class='desktop-line-breaks' /> */}
                 substitutes for holding physical gold.
                <br class='mobile-line-breaks' />
                <br class='desktop-line-breaks' /> 
                {" "}Investors have to pay the issue price in
                {/* <br class='desktop-line-breaks' /> */}
                <br class='mobile-line-breaks' />
                cash and the bonds will be redeemed in
                <br class='mobile-line-breaks' />
                cash on maturity.
                <br class='desktop-line-breaks' />
                 SGB is free from
                {/* <br class='desktop-line-breaks' /> */}
                issues <br class='mobile-line-breaks' />
                like making charges and purity in the
                <br class='mobile-line-breaks' />
                case of gold in jewellery form.
              </p>
              <a href='#' class='about-cta'>
                Read More
              </a>
            </div>
            <div class='video'>
              <a href="https://www.youtube.com/watch?v=Krs8MFHlEIg" rel="noreferrer noopener" target="_blank"><img src={G18776} alt='' /></a>
            </div>
          </div>
        </section>
        {/* dynamic ipo cards */}
        <section className={s.section7} style={{marginLeft: '7rem', zoom: 0.80}}>
				<div className={s.header}>Others also invested in</div>

				<div className={s.cards}>
					{openIssue.map((e,i) => {
						return e?.issuecode !== details.issuecode && 
						<Section1Card
							img={e.cmsdata?.logo?`${CMS_URL}${e.cmsdata?.logo}`:NoImg }
							title={e.schname} 
							subHeading={`Range ₹${e.lowprice} - ₹${e.cutoff}`}
							event={`Invest by ${new Date(e.opndt).toLocaleDateString('en-IN', {
								day: '2-digit',month: 'short'})} - ${new Date(e.clsdt).toLocaleDateString('en-IN', {
									day: '2-digit',month: 'short'})}`}
							button="Apply Now"
							top={e.cmsdata?.tag}
							background={`linear-gradient(321deg, ${e?.cmsdata?.card_color_left?e?.cmsdata?.card_color_left:'#fff'}, ${e?.cmsdata?.card_color_right})`}
							color={e.cmsdata?.badge_color}
							topbackground = {e.cmsdata?.tag_color}
							issueCode={e?.issuecode}
							history={history}
							iscolor={(e?.cmsdata?.card_color_left && e?.cmsdata?.card_color_left !== '#ffffff')?'Y':'N'}
						/>
						
					})}

					{/* <Section1Card
						img={SovereignGoldImg}
						title="IIFL Home Finance Bonds"
						subHeading="Invest minimum ₹1,13,500"
						event="Invest by 04 - 09 Aug"
						button="Get 11.05% Fixed Returns "
						top="Fixed Reurns"
						background="linear-gradient(148deg, #21f3f3 -23%, #214cf3 92%)"
						color="#241f55"
					/> */}
				</div>
			</section>
      {/* <div class="sgb-others-container">
      <div class="sgb-others-card-container">
        <div class="sgb-other-card">
          <img src={SGB48} alt="" />
          <div class="sgb-other-card-info">
            <h1>
              Equitas Holdings <br />
              Limited Apr 16
            </h1>
            <p>Range ₹1- ₹5</p>
            <p><img src="" alt="" />Invest by 02 Aug -22 Nov</p>
            <a href="#">Apply Now</a>
          </div>
        </div>
        <div class="sgb-other-card">
          <img src={SGB48} alt="" />
          <div class="sgb-other-card-info">
            <h1>
              Equitas Holdings <br />
              Limited Apr 16
            </h1>
            <p>Range ₹1- ₹5</p>
            <p><img src="" alt="" />Invest by 02 Aug -22 Nov</p>
            <a href="#">Apply Now</a>
          </div>
        </div>
        <div class="sgb-other-card">
          <img src={SGB48} alt="" />
          <div class="sgb-other-card-info">
            <h1>
              Equitas Holdings <br />
              Limited Apr 16
            </h1>
            <p>Range ₹1- ₹5</p>
            <p><img src="" alt="" />Invest by 02 Aug -22 Nov</p>
            <a href="#">Apply Now</a>
          </div>
        </div>
        <div class="sgb-other-card">
          <img src={SGB48} alt="" />
          <div class="sgb-other-card-info">
            <h1>
              Equitas Holdings <br />
              Limited Apr 16
            </h1>
            <p>Range ₹1- ₹5</p>
            <p><img src="" alt="" />Invest by 02 Aug -22 Nov</p>
            <a href="#">Apply Now</a>
          </div>
        </div>
        <div class="sgb-other-card">
          <img src={SGB48} alt="" />
          <div class="sgb-other-card-info">
            <h1>
              Equitas Holdings <br />
              Limited Apr 16
            </h1>
            <p>Range ₹1- ₹5</p>
            <p><img src="" alt="" />Invest by 02 Aug -22 Nov</p>
            <a href="#">Apply Now</a>
          </div>
        </div>
        <div class="sgb-other-card">
          <img src={SGB48} alt="" />
          <div class="sgb-other-card-info">
            <h1>
              Equitas Holdings <br />
              Limited Apr 16
            </h1>
            <p>Range ₹1- ₹5</p>
            <p><img src="" alt="" />Invest by 02 Aug -22 Nov</p>
            <a href="#">Apply Now</a>
          </div>
        </div>
        
        
      </div>
    </div> */}
        {/* sgb others */}
        {/* <section id='others'>
          <div class='background-color'></div>
          <h1>Others also invested in</h1>
          <div class='others-container'>
            <div class='other-card'>
              <div class='other-logo'>
                <img src={Glemarklogo} alt='' />
              </div>
              <div class='other-info'>
                <h2>
                  Glemmark Life <br />
                  Sciences IPO
                </h2>
                <p class='apply-limit'>Apply within 48:45:30</p>
                <p class='minimum'>Invest Minimum</p>
                <p class='rate'>
                  ₹13,900<span>/20 Shares </span>
                </p>
              </div>
            </div>
            <div class='other-card'>
              <div class='other-logo'>
                <img src={Aditibirla} alt='' />
              </div>
              <div class='other-info'>
                <h2>
                  Aditya Birla <br />
                  Ultratech Cement...
                </h2>
                <p class='apply-limit'>Apply within 48:45:30</p>
                <p class='minimum'>Invest Minimum</p>
                <p class='rate'>
                  ₹13,900<span>/20 Shares </span>
                </p>
              </div>
            </div>
            <div class='other-card'>
              <div class='tax-benefit'>
                <span>%</span>Tax Benefits
              </div>
              <div class='other-logo'>
                <img src={SGB48} alt='' />
              </div>
              <div class='other-info'>
                <h2>Sovereign Gold Bond</h2>
                <p>Scheme 2021-22 Series - V</p>
                <p class='apply'>Apply by 04 - 18 Aug</p>
                <p class='minimum'>
                  <span>Min. Investment</span>₹4.236/ 1 gm
                </p>
                <p class='fix-return'>
                  <span>Fixed Returns</span>2.5% + Price of Gold
                </p>
              </div>
            </div>
            <div class='other-card'>
              <div class='other-logo'>
                <img src={Novoco} alt='' />
              </div>
              <div class='other-info'>
                <h2>Sovereign Gold Bond</h2>
                <p class='apply'>Apply by 04 - 18 Aug</p>
                <p class='minimum'>
                  <span>Min. Investment</span>₹1,13,900
                </p>
                <p class='fix-return'>
                  <span>Fixed Returns</span>11.05%
                </p>
              </div>
            </div>
          </div>
        </section> */}
      </div>
      <footer id="sgb-details-footer">
        <div class="footer-top">
          <div class="footer-logo">
            <img src={G13604} alt="" />
            <p>Powered by <img src={Iffl_sec} alt="" /></p>
          </div>
          <div class="footer-info">
            <p>
              IIFL SECURITIES LTD. SEBI REGN. NO. <br />
              : INZ000164132 | AMRFA: ARN NO: 47791 BSE <br />
              MFD: 10234|RA NO: INH000000248 | IA NO: <br />
              INA000000623 | Depository Participation:
              <br />
              NSDL & CDSL: INDP185 2016
            </p>
          </div>
          <div class="footer-links">
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms and Conditions</a></li>
              <li><a href="#">Help and Support</a></li>
              <li><a href="#">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        <hr />
        <div class="footer-down">
          <p>Copyright © IIFL Securities Ltd. All rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default SGBDetailsPage;
