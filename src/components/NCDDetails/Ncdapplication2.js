import  './ncd-application-02.css';
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
import { applicationData as setApplicationData } from '../../store/action/applicationData';
import SweetAlert from 'react-bootstrap-sweetalert';
import DeleteImg from '../../assets/images/ApplicationProcess/delete_black_24dp (1).svg';
import AddImg from '../../assets/images/ApplicationProcess/add_circle_outline_black_24dp.svg';


const DematUi = ({dematDetails,removeDmat,changedemaatname,changedemaatpan,setalert}) => {
	
    const validatePan = (value,i) => {

        if(! /[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value.toUpperCase())){
				
            setalert(`Holder ${2+i} Pan no. must be valid.`)
            changedemaatpan('',i)
            return false;
        }
    }


	return (
		<div className={"dematrepeat"}>
		{dematDetails.map((el, i) =>    
						
				<div className={"singledemat"} key={i}>
					<div className={"inputs"}>
						<div>
							<span>Full name (Holder {2+i})</span>
							<input
								type="text"
								placeholder="Full name"
								value={el.fullName}
								onChange={(e) => changedemaatname(e.target.value,i)}
							/>
						</div>

						<div>
							<span>PAN No. (Holder {2+i})</span>
							<input
								type="text"
								placeholder="PAN No." 
								value={el.pan}
								onChange={(e) => changedemaatpan(e.target.value,i)}
                                onBlur={(e) => validatePan(e.target.value,i)}
								//onChange={(e) => fullName.setState(e.target.value)}
							/>
						</div>
						<button className={"removeDmat"}  onClick={() =>removeDmat(i)} >
							<img src={DeleteImg} alt="Delete" />
						</button>
					</div>
				</div>
		       
	)
	}
	 </div> 
	)
	// return (
		
		
	// )
}



const Ncdapplication2 =() =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const applicationData = useSelector(state => state.applicationData)
    const user = useSelector((state) => state.loggedIn.user);
    const [cat,setCat] = useState('IND|RET')
    const [typeapply,settypeapply] = useState('Self')
    const [dematype,setdematype] = useState('NSDL')
    const [mobileno,setmobileno] = useState(user.mobileNo || '')
    const [useremail,setuseremail] = useState(user.email || '')
    const [ alert,setalert ] = useState('');
    const [userpan,setuserpan] = useState(() => {
        if(user.clientType === "NONIIFLCLIENT")
        {
            return user.panNo
        }
        else
        {
            return user.clientcode
        }
    })
    const [username,setusername] = useState(user.firstName || '')
    const [userdpid,setuserdpid] = useState(user.dpid || '')
    const [userbeneficiaryID,setuserbeneficiaryID] = useState(user.beneficiaryID || '')
    const [counter,setCounter] = useState('')
    const [ dematDetails, setDematDetails ] = useState(applicationData?.dematDetailsapp || []);
    const [ loading, setLoading ] = useState(true);
    //console.log('apdd',applicationData)
    //console.log('ussr',user)
    const nextstepgo = () => {

       


        if(applicationData?.ncdhistory)
        {
            if((user.clientType === 'NONIIFLCLIENT' || typeapply !=='Self')){
                if(dematype === 'NSDL')
                {
                    if(userdpid.length != 8)
                    {
                        alert("DP ID invalid")
                        return false;	
                    }
                    if (userdpid.startsWith("IN") == false) {					
                        alert('Please enter valid NSDL DP ID');
                        return false
                    }
                }
            }
            dispatch(
                setApplicationData({
                    ...applicationData,
                    ncdcat:cat,
                    clientcode:userpan,
                })
            );
        }
        else{

            if(cat === '')
            {
                setalert('Please select category');
                return false
            }

            // validation part for noniiflclient or other client start
            if(user?.clientType === 'NONIIFLCLIENT' || typeapply != 'Self'){

                if(username.replace(" ", "").length == 0){
                    setalert('Enter Full name');
                    return false;
                }

                if(! /^[a-zA-Z ]*$/.test(username)) {
                    setalert("Name is not valid,Please enter your full name, Eg: John Doe")
                            return false;
                 }

                 if(! /^\d{10}$/.test(mobileno)){					
					setalert("Mobile number must be ten digits.")
						return false;					
				}
                if(! /[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(userpan.toUpperCase())){
				
					setalert("Pan no. must be valid.")
					return false;
				}
                if(! /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(useremail)){
				
					setalert("E-mail must be valid.")
					return false;
				}
                if(dematype != 'CDSL')
                {
                    if(userdpid.length != 8)
                    {
                        setalert("DP ID invalid")
                        return false;	
                    }
                    if (userdpid.startsWith("IN") == false) {					
                        setalert('Please enter valid NSDL DP ID');
                        return false;
                    }
                    if (isNaN(userdpid.substring(2, 8))) {
                        setalert('Please enter valid NSDL DP ID');
                        return false;
                    }
                    if(userbeneficiaryID.length != 8 )
                    {
                        setalert("Invalid Beneficiary.")
                        return false;
                    }
                }
                else
                {
                    if(userbeneficiaryID.length != 16 )
                    {
                        setalert("Invalid Beneficiary.")
                        return false;
                    }
                }
                

            }
            // validation part for noniiflclient or other client end

            dispatch(
                setApplicationData({
                    ...applicationData,
                    ncdcat:cat,
                    clientcode:userpan,
                    mobileNo:mobileno,
                    email:useremail,
                    panNo:userpan,
                    fstname:username?.split(" ")[0],
                    midname:username?.split(" ").length > 2 ? username?.split(" ")[1] : '',
                    lstname:username?.split(" ").length > 1 ? username?.split(" ")[username?.split(" ").length - 1]: '',
                    applyfr:dematype,
                    dpid:userdpid,
                    beneficiaryID:userbeneficiaryID,
                    selfoth:typeapply,
                    dematDetailsapp:dematDetails,
                })
            );
        }

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
            'Applying for':typeapply,
            'Investment Amount':applicationData.mainslidervalue,
            'Investor category': cat,
        } 
        //console.log('NCD_Application Step 2',payload);
        ClevertapReact.event("NCD_Application Step 2",payload)
        // Clevertap End
        setLoading(true);
        setTimeout(function(){ 
            history.push("/ncd-application-step-3")
        }, 800);
        
    }

    const counterstart = () => {
        setInterval(() => {
            setCounter(dateFormatter(new Date(applicationData.ncdfulldetails.enddate).getTime()));
        }, 1000);
        setLoading(false);        
    }

    const hidesweeetalert = () => {
        setalert('')
      }
    
      const redirectsalert = (path="/") => {
        history.push(path)
      }
    
    const setForOther = () => {
        setusername('');
        setuserpan('');
        setuseremail('');
        setmobileno('');
        setCat('IND|RET');
    }
    const setForSelf = () => {
        setusername(user.firstName+user.middleName+user.surName);
        setuserpan(user.panNo);
        setuseremail(user.email);
        setmobileno(user.mobileNo);
        setCat('IND|RET');
    }
    // Demat section functions start
    const removeDmat = async(i) => {
		let values = dematDetails;
		values.splice(i,1);
		
		setDematDetails([...values]); 
	}

	const changedemaatname =(val,i) => {		
		let values = dematDetails;
		values[i].fullName = val;
		setDematDetails([...values]);
	}

    const changedemaatpan =(val,i) => {		
		let values = dematDetails;
		values[i].pan = val.toUpperCase();
		setDematDetails([...values]);
		//console.log('vugaa=>',values)
	}

    const addDmat = () => {
		let dematadd = dematDetails
		console.log(dematadd)
		dematadd.push({fullName: "", pan: "" });
		setDematDetails([...dematadd]);
	}

    // Demat section functions ends

    useEffect(() => {
        counterstart()           
    }, []);
    return (
        <>

        {loading == true && 
            <div className="loading_screen">
                <img src={LoaderImg} alt="loading..." />
                <p>Please wait while fetching..</p>
            </div>
        }

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
                        <hr class="active"  />
                        <p class="active">2</p>
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
                <section id="container" class="ncdcontainer2">
                <h1>About your application</h1>


                <div class="fields">
                    <div>
                        <p>Who are you applying for? </p>
                        <div class="type" onClick="chooseOption()">                        
                            <div class="switch" style={typeapply==="Self" ? {transform:'translate(0%, 0px)'} : {transform:'translate(100%, 0px)'}}>{typeapply}</div>
                            <span onClick={() => {settypeapply('Self')
                                                        setForSelf()
                                                        }}>Self</span>
                            <span onClick={() => {settypeapply('Other') 
                                                    setForOther()}} >Other</span>
                        </div>
                    </div>
                    <div>
                        <p>Investing as</p>
                        <div class="invest-as">
                        <select value={cat} onChange={(e) => setCat(e.target.value)}>
                                <option value="">Choose Category</option>
                                {applicationData.ncdfulldetails.categoryList.map((e,i) => {
                                    return (
                                        <option value={`${e.categoryCode}|${e.categoryType.slice(0, 3)}`}>{e.categoryName}</option>
                                        )
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                {(user.clientType === 'NONIIFLCLIENT' || typeapply !=='Self') &&
                    <>
                        <div class="fields">
                            <h2>Applicant's Details</h2>
                           
                                <div class="single_input">
                                    <label>Full Name</label>
                                    <input type='text' value={username} onChange={(e) => setusername(e.target.value)} placeholder='Enter Full Name (as per PAN)' />
                                </div>

                                <div class="single_input">
                                    <label>Mobile Number</label>
                                    <input type='number' value={mobileno} onChange={(e) => setmobileno(e.target.value)} readOnly={typeapply === 'Self' ? true : false} placeholder='Enter Mobile Number' />
                                </div>
                                <div class="single_input">
                                    <label>Email ID</label>
                                    <input type='text' value={useremail} onChange={(e) => setuseremail(e.target.value)} readOnly={typeapply === 'Self' ? true : false} placeholder='Email ID' />
                                </div>
                                <div class="single_input">
                                    <label>PAN No.</label>
                                    <input type='text'  value={userpan} onChange={(e) => setuserpan(e.target.value)} readOnly={typeapply === 'Self' ? true : false}  placeholder='PAN No.' />
                                </div>
                         
                        </div>

                        <div class="fields">
                            <h2>Demat Account details</h2>
                            
                                <div class="single_input">
                                    <p>Who are you applying for? </p>
                                    <div class="type" onClick="chooseOption()">                        
                                        <div class="switch" style={dematype==="NSDL" ? {transform:'translate(0%, 0px)'} : {transform:'translate(100%, 0px)'}}>{dematype}</div>
                                        <span onClick={() => setdematype('NSDL')}>NSDL</span>
                                        <span onClick={() => setdematype('CDSL')}>CDSL</span>
                                    </div>                                    
                                </div>
                                {dematype === 'NSDL' &&
                                    <div class="single_input">
                                        <label>DP ID</label>
                                        <input type='text' value={userdpid} onChange={(e) => setuserdpid(e.target.value.toUpperCase())} placeholder='Enter DP ID' />
                                    </div>
                                }
                                <div class="single_input">
                                    <label>Beneficiary ID</label>
                                    <input type='text' value={userbeneficiaryID} onChange={(e)=>setuserbeneficiaryID(e.target.value)} placeholder='Enter Beneficiary ID' />
                                </div>
                            
                        </div>
                        
                        {/* Add demat section start */}
                        {Object.keys(user).length > 0 && user?.clientType === 'NONIIFLCLIENT' && typeapply==='Self' &&
                            <>
                                <DematUi
                                    dematDetails={dematDetails}
                                    removeDmat={removeDmat}
                                    changedemaatname={changedemaatname}
                                    changedemaatpan={changedemaatpan}
                                    setalert={setalert}
                                />
                            
                            {dematDetails.length<2  && typeapply==='Self' &&
                                        <>
                                <button className={"addHolder" + " hover-animate"} onClick={addDmat}>
                                        <img src={AddImg} alt="Add Holder" />
                                        <span>{dematDetails.length>0?'Add another holder':'Add holder details for Joint Demat Account'} </span>                                        
                                </button>
                                </>
                            }

<a href='https://iserve.indiainfoline.com/common/openaccount' target="_blank" className='addHolder hover-animate'><img src={AddImg} alt="Demat link" /> Don't have a demmat account? Click here to apply</a>
                                    
                            </>
                        }
                        {/* Add demat section ends */}


                    </>
                }
                {/* <h2><img src="images/add_circle_outline_black_24dp.3a065f75.svg" alt="" />Add holder details for Joint Demat Account</h2> */}
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
                    <a href="javascript:void(0)" class="prev-btn" onClick={(e)=> history.push("/ncd-application-step-1")}><i class="fas fa-arrow-left"></i>Previous Step</a>
                    <a class="next-btn" href='javascript:void(0)' onClick={(e)=> nextstepgo()} >Next<i class="fas fa-arrow-right"></i></a>
                </div>
                </footer>
        </>
    )
};

export default Ncdapplication2;