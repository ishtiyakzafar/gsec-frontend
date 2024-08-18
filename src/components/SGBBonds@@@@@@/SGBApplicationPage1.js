import React, { useEffect, useState } from "react";
import "./SGBApplication1.css";
import {
  getSgbAuthDetails,
  getLedgerBalance,
  LoginThroughOtherApp,
  ValidateOtherApp,
  placeSGBOrder,
} from "../../services/issuesServices";
import SweetAlert from "react-bootstrap-sweetalert";
import { Link, useHistory } from "react-router-dom";
import SGB48 from "../../assets/images/Sgb/Soverign Gold Bonds_48 Px.webp";
import LoaderImg from "../../assets/images/loader.svg";
import { useSelector } from "react-redux";
const SGBApplicationPage1 = (props) => {
  const { handleRange, selectedRange, handleSgbTransc } = props;
  const [availbalance, setAvailbalance] = useState(25000);
  const [sgbData, setsgbData] = useState([]);
  // const [selectedRange,setSelectedRange]= useState(0)
  const [selectedgrams, setSelectedGrams] = useState(1);
  const [hidealert, setHideAlert] = useState(false);
  const [alertmsg,setAlertMsg] = useState('Something went wrong, try again!')
  const [hasFunds, setHasFunds] = useState(false);
  const [loading, setLoading] = useState(false);
  // let localStore = window.LocalStorage;
  // const [newtoken,setNewtoken] = useState(0)
  let history = useHistory();
  const user = useSelector((state) => state.loggedIn);
  const applicationData = useSelector((state) => state.applicationData);
  const [lefttime, setLeftTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    
    fetchSgbDetails()
    fetchAvailBalance()
    
  }, [loading]);
  const fetchSgbDetails =() =>{
    let response = getSgbAuthDetails("SGBMOCK");
    response
      .then((res) => {
      
        console.log("sgb", res.data.resultData);
        setsgbData(res.data.resultData);
        // setSelectedRange(res.data.resultData.highprice)
        getRemainingTimeToApply(res.data.resultData.enddate);
        setSelectedGrams(selectedRange / res.data.resultData.highprice);
        if(selectedRange === 0){
          handleRange(Number(res.data.resultData.highprice))
          console.log('handle set to ', selectedRange)
        }
      })
      .catch((err) => console.log(err));
  }
  const fetchAvailBalance =() =>{
    let balanceres = getLedgerBalance({
      clientCode: user.user.clientcode,
      amount: 0,
      marginFlg: "N",
    });
    balanceres
      .then((res) => {
        console.log(res);
        console.log(applicationData)
        setAvailbalance(String(res.data.resultData).substring(21));
      })
      .catch((err) => console.log(err));
  }
  const placeOrder = () => {
    setLoading(true);
    if(selectedRange === 0){
      handleRange(sgbData.highprice)
    }
    // console.log('place order')
    // console.log(user.user)
    let orderresponse = placeSGBOrder({
      "ipoName": sgbData.issuecode,
      "clientcode": user.user.clientcode,
      "loginId": user.user.clientcode,
      "noOfShares": [selectedgrams === 0 ? 1 : selectedgrams],
      "bidPrice": [sgbData.highprice],
      "cutOff": ["N"],
      "totalBidCount": 1,
      "chqAmount": selectedRange === 0 ? sgbData.highprice : selectedRange,
      "categoryType":"RET",
      "category": "IND",
      "issueType": "BOND",
      "entryType": "C",
      "mkrid": user.user.clientcode,
      "subBrokerId": "",
      "signOffStatus": "",
      "appNo": 0,
      "formtype": "ONLINE",
      "ipoBankName": "ASBA",
      "flgPassBack": "N",
      "flgdiscount": "N",
      "BidFlag":"N",
      "crmLeadID": "",
      "pincode": "0",
      "asbaParameter": "9999|0|NASBAL|0|N",
      "upiNo": "",
      "appSource":25
    }
    );
    orderresponse
      .then((res) => {
        
        // if(res.isSuccess !== true){
        
        //     setHideAlert(true)
          
          
        // }
        
          // setLoading(false);
          handleSgbTransc(res.data.resultData.transcode);
            
          history.push("/sgb_application_finish");

        
        // console.log(res.data.resultData.transcode);
          // handleSgbTransc(res.data.resultData.transcode);
          // setLoading(false);
          // history.push("/sgb_application_finish");

          
        // localStore.removeItem('sgb_order_amount')
        // localStore.removeItem('sgb_order_no')
        // localStore.setItem("sgb_order_no", JSON.stringify(res.transcode))
        // localStore.setItem("sgb_order_amount", JSON.stringify(selectedRange))

        // history.push('/sgb_application_finish')
      })
      .catch((err) => {
        console.log(err)
        // setAlertMsg(err)
        setHideAlert(true)
      });
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

  const handleSlider = (e) => {
    console.log(e.target.value);
    handleRange(e.target.value);
    handleGrams(e.target.value);
    checkFunds(e.target.value);
    let ranger = document.getElementById("sgb-ap1-slider");
    let bubble = document.getElementById("price");
    // if(ranger && bubble){ setBubble(ranger, bubble)};
    const val = ranger && ranger.value;
    // const price = convertToStringPrice(range)
    const min = ranger && ranger.min ? ranger.min : sgbData.highprice;
    const max = ranger && ranger.max ? ranger.max : 240000;
    const newVal = Number(((val - min) * 100) / (max - min));
    // console.log(newVal)
    // setSlidervalue(newVal)
    // setRange(newVal)
    // bubble.innerText = `₹${price}`;
    bubble.style.left = `calc(${newVal}% + (${-4.1 - newVal * 0.015}rem))`;
  };
  const handleGrams = (price) => {
    setSelectedGrams(price / sgbData.highprice);
  };
  const checkFunds = (price) => {
    price > Number(availbalance) ? setHasFunds(false) : setHasFunds(true);
  };
  const handleALertBox = () => {
    setHideAlert(false);
    setLoading(false);
    // history.push('/sovereign_gold_bond_details')
  };
  return (
    <>
      {loading === true && (
        <div className='loading_screen loading_inside'>
          <img src={LoaderImg} alt='loading...' />
        </div>
      )}
      {/* alert box */}
      {hidealert && (
          <SweetAlert error title='Alert!' onConfirm={handleALertBox}>
          {alertmsg}
          </SweetAlert>
        )}
      <section id='sgb-ap1-header'>
        <div class='sgb-ap1-header-left'>
          <Link to="/sovereign_gold_bond_details"><img src={SGB48} alt='' /></Link>
          <div>
            <h1>Sovereign Gold Bonds</h1>
            <div class='header-heading-subtext'>
              <p>{sgbData && sgbData.schemename}</p>
              <p>·</p>
              {!isNaN(lefttime.hours) && (
                <p>
                  {lefttime.days} Days {lefttime.hours} hours, {lefttime.minutes}{" "}
                  mins left to invest
                </p>
              )}
            </div>
          </div>
        </div>
        <div class='sgb-ap1-header-right'>
          <div class='steps'>
            <p>1</p>
            <hr />
            <p>2</p>
            <hr />
            <p>3</p>
          </div>
          <div class='step-names'>
            <p>Review Bids</p>
            <p>Payment</p>
            <p>Apply</p>
          </div>
        </div>
      </section>
      <section id='sgb-ap1-form'>
        <h1>Review Amount & Quantity</h1>
        <div class='sgb-ap1-input-container'>
          <div class='input'>
            <p>How much do you want to invest?</p>
            <div class='price-input'>
              <div id='price' class='sgb-app-price-bubble'>
                ₹{selectedRange === 0 ? sgbData.highprice : Number(selectedRange).toLocaleString()}
              </div>
              <input
                class='sgb-app-input'
                value={selectedRange}
                type='range'
                name='price'
                id='sgb-ap1-slider'
                min={sgbData.highprice}
                step={sgbData.highprice}
                max='240000'
                onChange={handleSlider}
              />
              <p class='sgb-app-price-labels'>
                <span>₹{Number(sgbData.highprice).toLocaleString()}</span>
                <span>₹2L</span>
                <span>{">"}₹2L</span>
              </p>
            </div>
            <div className='sgb-ap1-avail-balance'>
              <span style={{ color: (Number(availbalance) > selectedRange) ? "#333" : "crimson" }}>
                Available balance : ₹{Number(availbalance).toLocaleString()}
              </span>
              {(Number(availbalance) < selectedRange) && (
                <span
                  style={{
                    color: "crimson",
                    fontSize: "1.6rem",
                    marginTop: "10rem",
                  }}>
                  <br />
                  You have insufficient funds in your account. Please go to the
                  funds section and add the balance amount.
                </span>
              )}
            </div>
          </div>
          <div class='sgb-ap1-quantity'>
            <p>Total Qty</p>
            <p>{selectedgrams === 0 ? 1 : selectedgrams}</p>
            <p>Price per gm: ₹{sgbData.highprice}</p>
          </div>
        </div>
      </section>
      <footer id='sgb-ap1-footer'>
        <p>
          <span>Total Amount</span>₹{selectedRange === 0 ? Number(sgbData.highprice).toLocaleString() : Number(selectedRange).toLocaleString()}
        </p>

        {(Number(availbalance) > selectedRange) ? (
          <button onClick={placeOrder} class='next-btn'>
            Apply<i class='fas fa-arrow-right'></i>
          </button>
        ) : (
          <button class='adfundsdisabled' href='#'>
            Add Funds
          </button>
        )}
      </footer>
    </>
  );
};

export default SGBApplicationPage1;