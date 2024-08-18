import  './ncd-application-04.css';
import fallbackimg from '../../assets/images/fallback.svg';
import Slider from 'react-custom-slider';
import cx from 'classnames';
import { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { getNCDdetails,getOpenIssuesDetails,getOpenIssuesList,getIssueDetailsFromCmsByCode,getpdfcoordinatencd,getpdfFromCmsByCode,zohoCreateToken,zohoCreateLead } from '../../services/issuesServices';
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

const Ncdapplication4 =() =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const [pdf,setPdf] = useState({});
    const applicationData = useSelector(state => state.applicationData)
    //console.log('apdd',applicationData)
    const fetchform = async() => {
      if(applicationData.paymenttype === 'ASBA')
      {
        let {data} = await getpdfcoordinatencd(applicationData.ncdfulldetails.issuecode,applicationData.clientcode,applicationData.placedncddetails.transcode.split('|')[1])
        console.log('prntdtlls',data)
        if(data.statusCode == 200 && data.isSuccess == true){
          //setDetails(response.data.resultData);
          let sampledt = {};
          sampledt.issuecode = applicationData.ncdfulldetails.issuecode
          sampledt.applicationNo = applicationData.placedncddetails.transcode.split('|')[1]
          sampledt.coOrdinates = data.resultData
          if(applicationData?.ncdhistory)
          {
            sampledt.ismodify = 1
          }
          let finaldetails = await getpdfFromCmsByCode({'sampleRes1':sampledt,'sampleResponse2':{}});
          setPdf(finaldetails);
        }
      }

      // Zoho start
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
            "LeadSubStatusTemp": "Completed", //Fixed 		
            "Appsource":"25"				
          }
        })
      })
      // Zoho End

      // Clevertap start
      console.log('appledt',applicationData);
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
          'Bid Number':applicationData.placedncddetails.transcode.split('|')[1],
          'No. of series':getSeriesNamect(applicationData.ncdfulldetails.ipoSeriesMap,'seriesNumber').join(','),
          'Investment Amount':applicationData.mainslidervalue,
          'Investor category':applicationData.ncdcat,
          'Applying for':applicationData.selfoth,
          'payment type':applicationData.paymenttype,
          'Application number':applicationData.placedncddetails.transcode.split('|')[0]
      } 
      //console.log('IPO_Application Step 4',payload);
      ClevertapReact.event("NCD_Application Step 4",payload)
      // Clevertap End

    }

    useEffect(() => {
      fetchform();
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

    return (
        <>
                    <section id="header">
      <div class="header-left">
      <img onClick={() => history.push("/ncd_details/"+applicationData.ncdfulldetails.issuecode)} src={applicationData.cmsdata?.logo ? `${CMS_URL}${applicationData.cmsdata.logo}` : NoImg} alt="" />
        <div>
        <h1>{applicationData.ncdfulldetails.schemename}</h1>
          <div class="header-heading-subtext">
            {/* <p>4 Days, 06 h: 12m: 34s left to apply</p> */}
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
          <hr class="active" />
          <p class="active">4</p>
        </div>
        <div class="step-names">
          <p>Select Series</p>
          <p>Your Details</p>
          <p>Payment</p>
          <p>Apply</p>
        </div>
      </div>
    </section>
    <section id="container" class="ncdappl4">
      <img src="/Group 15651.svg" alt="" />
      <h1>We have received your application request!</h1>
      <div class="subtext">
       <p><span>Amount to be blocked: </span> ₹{applicationData.totalpaid}</p>
        <p><span>·</span></p>
        <p><span>Application Number: </span>{applicationData.placedncddetails.transcode.split('|')[0]}</p>
      </div>
      <div class="next-steps"> 
        <h2>Your Next Steps?</h2>
        {applicationData.paymenttype == "ASBA" ?
          <>
          <ul>
            <li><span>1</span>Download & print the Application form</li>
            <li><span>2</span>Fill the required details & sign</li>
            <li>
              <span>3</span><span>Submit the form at your bank's Capital Market Branch</span>
            </li>
            <li>
              <span>4</span><span>After form submission, funds will be blocked in your bank A/C</span>
            </li>
            <li>
              <span>5</span><span>After allotment, NCD will be reflected in your account.</span>
            </li>
          </ul>
          </>
        :
        <>
          <ul>
            <li><span>1</span>You will get notification on your registered UPI App</li>
            <li><span>2</span>Approve the mandate in you UPI app</li>
            <li>
              <span>3</span><span>Get the IPO in your demat account post allotment.</span>
            </li>
          </ul>
        </>
      }
      </div>
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
                    return <p><span>Total investment in Series {serisname.join(',')} </span>₹ {applicationData?.ncdhistory?.amountpaid}</p>
                }
                else
                {    
                    if(applicationData?.series)
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
                        return <p><span>Total investment in Series {serisname.join(',')} </span>₹ {finalamount}</p>
                    }
                  }
                })()}
      <div class="buttons">
        {applicationData.paymenttype === 'ASBA' &&
          <a href={pdf?.data?.data?.file} target="_blank" class="download-app">Download Application Form</a>
        }
        {applicationData.paymenttype !== 'ASBA' &&
          <a href="#" onClick={()=> history.push("/ncd_details/"+applicationData.ncdfulldetails.issuecode)} class="download-app">Apply Again</a>
        }
        <a href="#" onClick={()=> history.push("/your_applications")} class="view-app">View Application Status</a>
      </div> 
    </footer>
        </>
    )
};

export default Ncdapplication4;