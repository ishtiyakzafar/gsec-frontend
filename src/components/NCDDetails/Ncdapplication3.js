import  './ncd-application-03.css';
import fallbackimg from '../../assets/images/fallback.svg';
import Slider from 'react-custom-slider';
import cx from 'classnames';
import { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import {getBankList,getBankLocationList,addncd,upiValidate,zohoCreateToken,zohoCreateLead} from '../../services/issuesServices';
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
import { applicationData as setApplicationData } from '../../store/action/applicationData';
import SweetAlert from 'react-bootstrap-sweetalert';
import { addAndCheckNonIiflJourneyClientDetail } from '../../services/userServices';


const Ncdapplication3 =() =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const applicationData = useSelector(state => state.applicationData)
    const user = useSelector((state) => state.loggedIn.user);
    const [banklist,setbanklist] = useState([])
    const [banklocationlist,setbanklocationlist] = useState([])
    const [noofshares,setnoofshares] = useState([])
    const [bidPrice,setbidPrice] = useState([])
    const [cutoff,setcutoff] = useState([])
    const [chqAmount,setchqAmount] = useState(0)
    const [bankname,setbankname] = useState(user?.bankName ||'')
    const [accountno,setaccountno] = useState(user?.bankAccountNo ||'')
    const [bankbranch,setbankbranch] = useState(user?.bankBranch ||'')
    const [paymenttype,setpaymenttype] = useState('UPI')
    const [upiname,setupiname] = useState(user?.upiName ||'')
    const [upihandle,setupihandle] = useState(user?.upiHandle ||'')
    const [upiuser,setupiuser] = useState({'statusCode':100})
    const [ alert,setalert ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [counter,setCounter] = useState('')
    const [refercode,setrefercode] = useState('')
    //console.log('apddhuhu',applicationData)

    const upivaliditycheck = async() =>
    {
      if(user?.upiName)
      {
        let {data} = await upiValidate(user?.upiName+user?.upiHandle)
        setupiuser(data)
      }
      
    }

    const fetchbanklist = async() => {
        let {data} = await getBankList(applicationData.ncdfulldetails.issuecode)
        setInterval(() => {
            setCounter(dateFormatter(new Date(applicationData.ncdfulldetails.enddate).getTime()));
        }, 1000);
        setbanklist(data.resultData)

       
        let shares = []
        let  bids =[]
        let cutoff =[]
        let totamnt = 0
        if(applicationData?.ncdhistory)
        {
 
          applicationData?.ncdhistory?.bids.forEach(e => {            
            shares.push(e.noOfShares)            
            bids.push(e.bidPrice)
            cutoff.push("Y")            
          });

          setpaymenttype(applicationData?.ncdhistory?.ipobankname)
          if(applicationData?.ncdhistory?.ipobankname === 'ASBA')
          {
            setbankname(applicationData?.ncdhistory?.asbaBankCode)
            setaccountno(applicationData?.ncdhistory?.accountNumber)
            fetchlocation(applicationData?.ncdhistory?.asbaBankCode)
            setbankbranch(applicationData?.ncdhistory?.bankLocation)
            
          }

        }else
        {
          if(user?.bankName)
          {
            fetchlocation(user?.bankName)
          }
          
          ClevertapReact.initialize(clevertap_key);

          function getSeriesNamect(array,keysearch)
          {
              var fianalArr = [];
              array.forEach(element => {
                  fianalArr.push(element[keysearch])
              });
              return fianalArr;
          }

          ClevertapReact.event("NCD_Application Step 3",{
            'Source':"NCD Details Page",
            'NCD Name':applicationData.ncdfulldetails.schemename,             
            'Applying for':applicationData.selfoth,
            'No. of series':getSeriesNamect(applicationData.ncdfulldetails.ipoSeriesMap,'seriesNumber').join(','),
            'Investment Amount':applicationData.mainslidervalue,
            'Investor category': applicationData.ncdcat,
            'payment type':'',
            'Failure message':''
          })


          applicationData.series.forEach(e => {
            if(e.cardqty)
            {
              shares.push(e.cardqty)
              bids.push(parseInt(e.cardslide/e.cardqty))
            }
            else
            {
              shares.push(0)
              bids.push(0)
            }
            //bids.push(e.cardslide)
            //bids.push(e.rate)
            cutoff.push("Y")
            totamnt = parseFloat(totamnt) + parseFloat(e.cardslide)
          });




        }

       
        setnoofshares([...shares])
        setbidPrice([...bids])
        setcutoff([...cutoff])
        setchqAmount(totamnt)
        if(totamnt > 500000)
        {
          setpaymenttype('ASBA')
        }


         

    }

    const fetchlocation = async(bankcode) => {
        let {data} = await getBankLocationList(applicationData.ncdfulldetails.issuecode,bankcode)
  
            //console.log(data)
            setbanklocationlist([...data.resultData])
          
        
    }

    const placencd = async() => {
      
      // if(user.clientType == "NONIIFLCLIENT" || typeapply !== "Self"){
      //   //console.log("212",applicationData);
      //   await addAndCheckNonIiflJourneyClientDetail({
      //     "panNo": applicationData.panNo,
      //     "firstName": applicationData.fstname,
      //     "middleName": applicationData.midname,
      //     "surName": applicationData.lstname,
      //     "mobileNo": applicationData.mobileNo,
      //     "email": user.email,
      //     "clientcode": "",
      //     "dpType": applicationData.applyfr,
      //     "dpid": applicationData.dpId,
      //     "beneficiaryID": applicationData.beneficiaryId,
      //     "bankBranch": "",
      //     "bankName": bankName,
      //     "bankAccountNo": accountNo,
      //     "investorStatus": "Process",
      //     "mkrid": "",
      //     "mkrDt": "",
      //     "dateOfbith": "",
      //     "address": "mumbai test",
      //     "pincode": "545454",
      //     "secondHolderName": applicationData?.dematDetailsapp[0]?.fullName,
      //     "secondHolderPan":  applicationData?.dematDetailsapp[0]?.pan,
      //     "thirdHolderName": applicationData?.dematDetailsapp[1]?.fullName,
      //     "thirdHolderPan": applicationData?.dematDetailsapp[1]?.pan,
      //     "issuecode": applicationData.IPOBondName,
      //     "clientType": user.clientType,
      //     "leadid": "",
      //     "stageFlage": "Phase2"
  
      //   }).then(response => {
                
      //     console.log('details',response.data);
          
      //     if(response.data.statusCode == 200 && response.data.isSuccess == true && applicationData.selfot == "self"){
      //       let phase1Data = response.data.resultData;
      //       let token = user.token;
      //       localStorage.setItem('user', JSON.stringify({...phase1Data, token}));
      //       //phase1Data.token = token;
      //       dispatch(userAction({ ...phase1Data,token }));
            
      //     }
  
      //   });
  
        
      // }

      if(paymenttype === 'UPI')
      {
        if(upiname === '' || upihandle === '')
        {
          setalert('Upi is required')
          return false
        }
        if(upiuser?.resultData?.success !== true )
        {
          setalert('Invalid UPI id')
          return false
        }

      }
      else
      {
        if(bankname === '')
        {
          setalert('Please select bank')
          return false
        }

        if(bankbranch === '')
        {
          setalert('Bank branch is required')
          return false
        }
        
        if(accountno === 0 || accountno.length < 10)
        {
          setalert('Invalid account number')
          return false
        }

      }
      setLoading(true);
      try{

        if(applicationData?.ncdhistory)
        {

          var catt = applicationData.ncdfulldetails?.categoryList.filter(function(v, i) {
            return (v.categoryName === applicationData.ncdhistory?.nsE_CodeDetails);
          })

          console.log('userall',user);

          

          var postvalue = {
            "ipoName": applicationData.ncdhistory.iponame,
            "clientcode": (user.clientType === 'NONIIFLCLIENT')? user.panNo : user.clientcode,
            "loginId": (user.clientType == 'NONIIFLCLIENT')? user.panNo : user.loginid,
            "noOfShares": noofshares,
            "bidPrice": bidPrice,
           // "cutOff": cutoff,
            "totalBidCount": (applicationData.ncdhistory.bids).length,
            "chqAmount": applicationData.ncdhistory.amountpaid,
            "categoryType": applicationData.ncdhistory.category,
            "issueType": "BOND",
            "category":applicationData.ncdhistory?.investortype,
            "entryType": "C",
            "mkrid": (user.clientType == 'NONIIFLCLIENT')? user.panNo : user.loginid,
            "subBrokerId": refercode,
            "signOffStatus": "",
            "appNo": applicationData.ncdhistory.applicationno,
            "formtype": "ONLINE",
            "ipoBankName": paymenttype,
            "flgPassBack": "N",
            "flgdiscount": "N",
            "BidFlag":"M",
            "crmLeadID": "7522019206",
            "pincode": "0",
            "asbaParameter":  paymenttype !== "UPI" ? `${bankname}|${accountno}|${bankbranch}|0|N` : "9999|0|NASBAL|0|N",
            "upiNo": paymenttype === "UPI" ? upiname+upihandle : '',
            "appSource":user?.AppSource ? user?.AppSource : 25,
          }
        }
        else{

        if(user.clientType == "NONIIFLCLIENT" || applicationData.applyfr !== "self"){
            //console.log("212",applicationData);
            await addAndCheckNonIiflJourneyClientDetail({
              "mobileNo": applicationData.mobileNo,
              "email": applicationData.email,
              "panNo": applicationData.panNo,
              "stageFlage": 'Phase1'
            })
      
            //return false
            
            await addAndCheckNonIiflJourneyClientDetail({
              "panNo": applicationData.panNo,
              "firstName": applicationData.fstname,
              "middleName": applicationData.midname,
              "surName": applicationData.lstname,
              "mobileNo": applicationData.mobileNo,
              "email": applicationData.email,
              "clientcode": "",
              "dpType": applicationData.applyfr,
              "dpid": applicationData.applyfr === 'NSDL' ? applicationData.dpid : '',
              "beneficiaryID": applicationData.beneficiaryID,
              "bankBranch": "",
              "bankName": bankname,
              "bankAccountNo": accountno,
              "investorStatus": "Process",
              "mkrid": "",
              "mkrDt": "",
              "dateOfbith": "",
              "address": "",
              "pincode": "545454",
              "secondHolderName": applicationData?.dematDetailsapp[0]?.fullName,
              "secondHolderPan":  applicationData?.dematDetailsapp[0]?.pan,
              "thirdHolderName": applicationData?.dematDetailsapp[1]?.fullName,
              "thirdHolderPan": applicationData?.dematDetailsapp[1]?.pan,
              "issuecode": applicationData.ncddetails.issuecode,
              "clientType": user.clientType,
              "leadid": "",
              "stageFlage": "Phase2"
      
            }).then(response => {
                    
              console.log('details',response.data);
              
              if(response.data.statusCode == 200 && response.data.isSuccess == true ){
                // let phase1Data = response.data.resultData;
                // let token = user.token;
                // localStorage.setItem('user', JSON.stringify({...phase1Data, token}));
                // //phase1Data.token = token;
                // dispatch(userAction({ ...phase1Data,token }));
                  zohoCreateToken().then(resp =>{
                    console.log('zoho',resp);
                    let createzoholead = zohoCreateLead({
                      "Token":resp.data.Body.Token,
                      "ObjectName":"Lead",
                      "Parameters":{
                        "FirstName":"",
                        "LastName": applicationData.lstname ? applicationData.lstname : 'Oneup User', //Dynamic from the field “Name”
                        "Mobile": applicationData.mobileNo,  //Dynamic from the field “mobile number”
                        "Email": applicationData.email,  //Dynamic from the field “email id”
                        "LeadProduct": "Equity", //Fixed
                        "Campaign": "NCD", //Fixed
                        "LeadSource": "OneUp", //Fixed
                        "LeadSubStatusTemp": "Incomplete", //Fixed
                        "Appsource":"25"
                      }
                    })
                  })
                
              }
      
            });
      
            
          }

          var catt = applicationData.ncdfulldetails?.categoryList.filter(function(v, i) {
            return (v.categoryCode === applicationData.ncdcat.split('|')[0]);
          })

          

          var postvalue = {
            "ipoName": applicationData.ncddetails.issuecode,
            "clientcode": applicationData?.clientcode,
            "loginId": (user.clientType == 'NONIIFLCLIENT')? user.panNo : user.loginid,
            "noOfShares": noofshares,
            "bidPrice": bidPrice,
           // "cutOff": cutoff,
            "totalBidCount": noofshares.length,
            "chqAmount":chqAmount,
            "categoryType": catt[0].bidLimit < chqAmount ? 'HNI' : 'RET',
            "issueType": "BOND",
            "category":applicationData.ncdcat.split('|')[0],
            "entryType": "C",
            "mkrid": (user.clientType == 'NONIIFLCLIENT')? user.panNo : user.loginid,
            "subBrokerId": refercode,
            "signOffStatus": "",
            "appNo": 0,
            "formtype": "ONLINE",
            "ipoBankName": paymenttype,
            "flgPassBack": "N",
            "flgdiscount": "N",
            "BidFlag":"N",
            "crmLeadID": "7522019206",
            "pincode": "0",
            "asbaParameter":  paymenttype !== "UPI" ? `${bankname}|${accountno}|${bankbranch}|0|N` : "9999|0|NASBAL|0|N",
            "upiNo": paymenttype === "UPI" ? upiname+upihandle : '',
            "appSource":user?.AppSource ? user?.AppSource : 25,
          }
        }
        // var postvalue = {
        //   "ipoName": applicationData.ncddetails.issuecode,
        //   "clientcode":  user.clientcode,
        //   "loginId": user.clientcode,
        //   "noOfShares": noofshares,
        //   "bidPrice": bidPrice,
        //   "cutOff": [
        //     "Y","Y","Y","Y","Y","Y","Y"
        //   ],
        //   "totalBidCount": noofshares.length,
        //   "chqAmount":chqAmount,
        //   "categoryType": "RET",
        //   "issueType": "BOND",
        //    "category":applicationData.ncdcat,
        //   "entryType": "C",
        //   "mkrid": "",
        //   "subBrokerId": "",
        //   "signOffStatus": "",
        //   "appNo": 0,
        //   "formtype": "ONLINE",
        //   "ipoBankName": "ASBA",
        //   "flgPassBack": "N",
        //   "flgdiscount": "N",
        //   "BidFlag":"N",
        //   "crmLeadID": "7522019206",
        //   "pincode": "0",
        //   "asbaParameter": `${bankname}|${accountno}|${bankbranch}|0|N`,
        //   "upiNo": "",
        //   "appSource":user?.AppSource ? user?.AppSource : 25,
        // }
        
        let {data} = await addncd(postvalue)
        if(data.isSuccess === true && data.statusCode === 200)
        {
          dispatch(
            setApplicationData({
              ...applicationData,
              placedncddetails:data.resultData,
              paymenttype:paymenttype,
              totalpaid:applicationData?.ncdhistory ? applicationData.ncdhistory.amountpaid : chqAmount
            })
          );
          
        // Clevertap start
        function getSeriesNamect(array,keysearch)
        {
            var fianalArr = [];
            array.forEach(element => {
                fianalArr.push(element[keysearch])
            });
            return fianalArr;
        }
         ClevertapReact.initialize(clevertap_key);         
        
        if(applicationData?.ncdhistory)
        {
          
          ClevertapReact.event("NCD_Modify Success",{
            'Source':"Application history page",
            'NCD Name':applicationData.ncdfulldetails.schemename,
            'No. of series':getSeriesNamect(applicationData.ncdfulldetails.ipoSeriesMap,'seriesNumber').join(','),
            'Investment Amount':'',
            'Investor category': '',
            'Application number':'',
          })
        }
        else
        {           
          ClevertapReact.event("NCD_Application Step 3",{
            'Source':"NCD Details Page",
            'NCD Name':applicationData.ncdfulldetails.schemename,             
            'Applying for':applicationData.selfoth,
            'No. of series':getSeriesNamect(applicationData.ncdfulldetails.ipoSeriesMap,'seriesNumber').join(','),
            'Investment Amount':applicationData.mainslidervalue,
            'Investor category': applicationData.ncdcat,
            'payment type':paymenttype,
            'Failure message':''
          })
        }
         
         // Clevertap End
          history.push("/ncd-application-step-4")
        }
        else
        {
          zohoCreateToken().then(resp =>{
            console.log('zoho',resp);
            let createzoholead = zohoCreateLead({
              "Token":resp.data.Body.Token,
              "ObjectName":"Lead",
              "Parameters":{
                "FirstName":"",
                "LastName": applicationData.lstname, //Dynamic from the field “Name”
                "Mobile": applicationData.mobileNo,  //Dynamic from the field “mobile number”
                "Email": applicationData.email,  //Dynamic from the field “email id”
                "LeadProduct": "Equity", //Fixed
                "Campaign": "NCD", //Fixed
                "LeadSource": "OneUp", //Fixed
                "LeadSubStatusTemp": "Incomplete", //Fixed
                "Appsource":"25"
              }
            })
          })

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
             'Source':"NCD Details Page",
             'NCD Name':applicationData.ncdfulldetails.schemename,
             'No. of series':getSeriesNamect(applicationData.ncdfulldetails.ipoSeriesMap,'seriesNumber').join(','),
             'Applying for':applicationData.selfoth,
             'Investment Amount':applicationData.mainslidervalue,
             'Investor category': applicationData.ncdcat,
             'payment type':paymenttype,
             'Failure message':data.resultData.message
         } 
         
         ClevertapReact.event("NCD_Application Step 3",payload)
         // Clevertap End

          setalert(data.resultData.message);
          setLoading(false);
        }
      }
      catch(e)
      {
        console.log('alerterrrrr',e)
        setalert('Something went wrong try later!');
        setLoading(false);
      }

    }

    const validateupi = async(upihandle) => {

      if(upiname.includes("@"))
      {
        setalert('@ not allowed')
        setupiname(upiname.split('@')[0])
      }
      if(upiname !== '' && upihandle !== '')
      {
        let {data} = await upiValidate(upiname+upihandle)
        setupiuser(data)
      }
    }

    const hidesweeetalert = () => {
      setalert('')
    }
  
    const redirectsalert = (path="/") => {
      history.push('/ncd_details/'+applicationData.ncdfulldetails.issuecode)
    }

    useEffect(() => {
      fetchbanklist();
      upivaliditycheck();
    }, []);

   

    return (
        <>
        {alert != '' &&
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
				{alert}
				</SweetAlert>
			}

{loading === true && 
                        <div className="loading_screen loading_inside">
                            <img src={LoaderImg} alt="loading..." />                            
                        </div>
                    }
<section id="header">
      <div class="header-left">
      <img onClick={() => history.push("/ncd_details/"+applicationData.ncdfulldetails.issuecode)} src={applicationData.cmsdata?.logo ? `${CMS_URL}${applicationData.cmsdata.logo}` : NoImg} alt="" />
        <div>
        <h1>{applicationData.ncdfulldetails.schemename}</h1>
          <div class="header-heading-subtext">
          <p  dangerouslySetInnerHTML={{__html: counter+' left to apply'}}></p>
          </div>
        </div>
      </div>
      <div class="header-right">
        <div class="steps">
          <p class="active">1</p>
          <hr class="active" />
          <p class="active">2</p>
          <hr class="active" />
          <p class="active">3</p>
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
    <section id="container" class="ncdstep3">
      <h1>Enter Payment Details</h1>
      {chqAmount <= 500000 &&
        <div class="row-1">
          <p>Payment Method</p>
          <div class="type" onClick="chooseOption()" style={applicationData?.ncdhistory ?{pointerEvents:'none'}:{cursor:'pointer'} }>
            <div class="switch" style={paymenttype==="UPI" ? {transform:'translate(0%, 0px)'} : {transform:'translate(100%, 0px)'}} onClick="chooseOptionBySwitch()">{paymenttype}</div>
            <span onClick={() => setpaymenttype("UPI")}>UPI</span>
            <span onClick={() => setpaymenttype("ASBA")} >ASBA</span>
          </div>
        </div>
      }
      {paymenttype === 'UPI'? 
      <div class="wpimain">
        <div>
          <p>UPI ID</p>
          <div class="upiwrap">                  
            <input type='text' placeholder='Enter UPI ID' value={upiname} onChange={(e) => setupiname(e.target.value)} onBlur={(e) => validateupi(upihandle)} />
            <select value={upihandle} onChange={(e)=>{setupihandle(e.target.value) 
              setTimeout(() => {
                validateupi(e.target.value)
              }, 100);
              }}>
              <option value="">Select UPI</option>
              {applicationData.ncdfulldetails.upiList.map((e,i) => {
                  return (
                      <option value={e.upiName}>{e.upiName}</option>
                      )
              })}
            </select>
          </div>
          <div class="upimsg">
            {Object.keys(upiuser).length > 0 &&
              <>
                {upiuser.statusCode === 100 ? <p>Please provide your upi id</p> : (upiuser.statusCode !== 200 ? <p>something went wrong try later</p> : 
                  <>
                    {upiuser?.resultData?.success === true ?							
                      <p class="upifetchsuccess">
                        Verified {upiuser.resultData.customer_name} ({upiuser.resultData.vpa})
                      </p> 
                      :
                      <p class="upifetchfailed">
                        Not Verified {upiuser.resultData.customer_name} ({upiuser.resultData.vpa})
                      </p> 
                    }
                  </>
                )}
              </>
            }
          </div>
        </div>
        <div>
            <p>Referrer Code (Optional)</p>
            <input type="text" onChange={(e) => setrefercode(e.target.value)} placeholder="Enter Referrer Code" />
          </div>
      </div>
      :
      <>
        <div class="row-2">
          <div>
            <p>Bank Name</p>
            <div class="bank-name">
              <select value={bankname} onChange={(e) => {fetchlocation(e.target.value);setbankname(e.target.value)}}>
                <option value="">Select Bank</option>
                {banklist.map((e,i) => {
                      return (
                          <option value={e.rbi_codes}>{e.bankFName}</option>
                          )
                  })}
              </select>
            </div>
          </div>
          <div>
            <p>Account Number</p>
            
            <input type="text" disabled={applicationData?.ncdhistory ? true : false} defaultValue={applicationData?.ncdhistory ? applicationData?.ncdhistory?.accountNumber : (user?.bankAccountNo ? user?.bankAccountNo : '' )} onChange={(e) => setaccountno(e.target.value)} placeholder="Enter Account No." />
          </div>
          <div>
            <p>Referrer Code (Optional)</p>
            <input type="text" onChange={(e) => setrefercode(e.target.value)} placeholder="Enter Referrer Code" />
          </div>
        </div>
        <h1>Help us find the nearest branch</h1>
        <div class="row-3">
          <div>
            <p>Your Current Location</p>
            <div class="location">
              <select value={bankbranch} onChange={(e) => setbankbranch(e.target.value)}>
                  <option value="">Select Location</option>
                  {banklocationlist.map((e,i) => {
                      return (
                          <option value={e.location}>{e.location}</option>
                          )
                  })}
              </select>
              {/* <img src="/gps_fixed_black_24dp.svg" style={{width:20}} alt="" /> */}
            </div>
          </div>
        </div>
      </>
      }

    </section>
    <footer class="ncdfooter">
    {(() => {
        if(applicationData?.ncdhistory?.bids)
        {
            var serisname = []
            var finalamount = 0
            for (let i = 0; i < applicationData?.ncdhistory?.bids.length; i++) {
                if(applicationData?.ncdhistory?.bids[i].noOfShares > 0)
                {
                    serisname.push(applicationData?.ncdhistory?.bids[i].srNum)
                    finalamount += parseFloat(applicationData?.ncdhistory?.bids[i].totalAmount)
                }
                
            }
            return <p><span>Total investment in Series {serisname.join(',')} </span>₹ {applicationData?.ncdhistory?.amountpaid.toLocaleString()}</p>
        }
        else
        {
            if(applicationData.series)
            {
                var serisname = []
                var finalamount = 0
                for (let i = 0; i < applicationData.series.length; i++) {
                    if(applicationData.series[i].check === 1)
                    {
                        serisname.push(applicationData.series[i].seriesNumber)
                        finalamount += parseFloat(applicationData.series[i].cardslide)
                    }
                    
                }
                return <p><span>Total investment in Series {serisname.join(',')} </span>₹ {finalamount.toLocaleString()}</p>
            }
        }
        })()}
      
      <div class="buttons">
        {!applicationData?.ncdhistory &&
          <a href="javascript:void(0)" class="prev-btn" onClick={(e)=> history.push("/ncd-application-step-2")}><i class="fas fa-arrow-left"></i>Previous Step</a>
        }
        <a class="next-btn" href="javascript:void(0)" onClick={placencd} >Next<i class="fas fa-arrow-right"></i></a>
      </div>
    </footer>
        </>
    )
};

export default Ncdapplication3;