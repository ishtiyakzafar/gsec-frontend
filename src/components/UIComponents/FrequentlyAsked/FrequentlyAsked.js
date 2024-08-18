

import video1 from "../../assets/images/video1.png"
import video2 from "../../assets/images/video2.png"
import video_play_icon from "../../assets/images/video_play_icon.svg"

const FrequentlyAsked = (props) => {


    return (
        <>
            
            <section className="section" id="FrequentlyQuestions">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="main_title pb-3">Frequently Asked Questions</h2>
                        </div>
                        
                        <div className="col-12 col-sm-4 mb-3 mb-sm-0">
                            <div className="video_box">
                                <img src={video1} width="100%" alt="video" />
                                <span className="play_btn">
                                    <a href="javascript:void(0)">
                                        <img src={video_play_icon} width="45px" alt="play" />
                                    </a>
                                </span>
                            </div>
                        </div>
                        <div className="col-12 col-sm-4 mb-3 mb-sm-0">
                            <div className="video_box">
                                <img src={video2} width="100%" alt="video" />
                                <span className="play_btn">
                                    <a href="javascript:void(0)">
                                        <img src={video_play_icon} width="45px" alt="play" />
                                    </a>
                                </span>
                            </div>
                        </div>
                        <div className="col-12 col-sm-4 mb-3 mb-sm-0">
                            <div className="video_box">
                                <img src={video1} width="100%" alt="video" />
                                <span className="play_btn">
                                    <a href="javascript:void(0)">
                                        <img src={video_play_icon} width="45px" alt="play" />
                                    </a>
                                </span>
                            </div>
                        </div>
                        
                        <div className="col-12 mt-3 mt-md-5" id="FAQ">
                            <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item"> <a className="nav-link active" data-toggle="tab" href="#IPO" role="tab">IPO</a> </li>
                                <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#NCD" role="tab">NCD</a> </li>
                                <li className="nav-item"> <a className="nav-link" data-toggle="tab" href="#SGB" role="tab">SGB</a> </li>
                            </ul>
                            {/* <!-- Tab panes --> */}
                            <div className="tab-content mt-3 p-3" id="Faq">
                                <div className="tab-pane active" id="IPO" role="tabpanel">
                                    <div id="accordion">

                                        <div className="accordion-wrapper">
                                            <div className="card-header p-0" id="headingOne">
                                                <h5 className="mb-0"> <span className="btn text-left w-100 collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">What are the merits of investing in IPO? </span> </h5>
                                            </div>
                                            <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                                                <div className="card-body">
                                                    <p>There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="accordion-wrapper">
                                            <div className="card-header p-0" id="headingTwo">
                                                <h5 className="mb-0"> <span className="btn text-left w-100 collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">How do I invest in IPO? </span> </h5>
                                            </div>
                                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                                <div className="card-body">
                                                    <p>There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-wrapper">
                                            <div className="card-header p-0" id="headingThree">
                                                <h5 className="mb-0"> <span className="btn text-left w-100 collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">What documents do I need to invest in IPO? </span> </h5>
                                            </div>
                                            <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                                <div className="card-body">
                                                    <p>There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-wrapper">
                                            <div className="card-header p-0" id="headingFour">
                                                <h5 className="mb-0"> <span className="btn text-left w-100 collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">What is the limit to buy IPO?</span> </h5>
                                            </div>
                                            <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordion">
                                                <div className="card-body">
                                                    <p>There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-wrapper border-bottom-0">
                                            <div className="card-header p-0" id="headingFive">
                                                <h5 className="mb-0"> <span className="btn text-left w-100 collapsed" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">What are the merits of investing in IPO?</span> </h5>
                                            </div>
                                            <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-parent="#accordion">
                                                <div className="card-body">
                                                    <p>There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane" id="NCD" role="tabpanel">
                                    <div id="accordion">
                                        <div className="accordion-wrapper">
                                            <div className="card-header p-0" id="headingOne">
                                                <h5 className="mb-0"> <span className="btn text-left w-100 collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">What are the merits of investing in IPO? </span> </h5>
                                            </div>
                                            <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                                                <div className="card-body">
                                                    <p>There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-wrapper">
                                            <div className="card-header p-0" id="headingTwo">
                                                <h5 className="mb-0"> <span className="btn text-left w-100 collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">How do I invest in IPO? </span> </h5>
                                            </div>
                                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                                <div className="card-body">
                                                    <p>There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-wrapper">
                                            <div className="card-header p-0" id="headingThree">
                                                <h5 className="mb-0"> <span className="btn text-left w-100 collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">What documents do I need to invest in IPO? </span> </h5>
                                            </div>
                                            <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                                <div className="card-body">
                                                    <p>There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-wrapper">
                                            <div className="card-header p-0" id="headingFour">
                                                <h5 className="mb-0"> <span className="btn text-left w-100 collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">What is the limit to buy IPO?</span> </h5>
                                            </div>
                                            <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordion">
                                                <div className="card-body">
                                                    <p>There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-wrapper border-bottom-0">
                                            <div className="card-header p-0" id="headingFive">
                                                <h5 className="mb-0"> <span className="btn text-left w-100 collapsed" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">What are the merits of investing in IPO?</span> </h5>
                                            </div>
                                            <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-parent="#accordion">
                                                <div className="card-body">
                                                    <p>There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane" id="SGB" role="tabpanel">
                                    <div id="accordion">
                                        <div className="accordion-wrapper">
                                            <div className="card-header p-0" id="headingOne">
                                                <h5 className="mb-0"> <span className="btn text-left w-100 collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">What are the merits of investing in IPO? </span> </h5>
                                            </div>
                                            <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                                                <div className="card-body">
                                                    <p>There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-wrapper">
                                            <div className="card-header p-0" id="headingTwo">
                                                <h5 className="mb-0"> <span className="btn text-left w-100 collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">How do I invest in IPO? </span> </h5>
                                            </div>
                                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                                <div className="card-body">
                                                    <p>There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-wrapper">
                                            <div className="card-header p-0" id="headingThree">
                                                <h5 className="mb-0"> <span className="btn text-left w-100 collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">What documents do I need to invest in IPO? </span> </h5>
                                            </div>
                                            <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                                <div className="card-body">
                                                    <p>There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-wrapper">
                                            <div className="card-header p-0" id="headingFour">
                                                <h5 className="mb-0"> <span className="btn text-left w-100 collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">What is the limit to buy IPO?</span> </h5>
                                            </div>
                                            <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordion">
                                                <div className="card-body">
                                                    <p>There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-wrapper border-bottom-0">
                                            <div className="card-header p-0" id="headingFive">
                                                <h5 className="mb-0"> <span className="btn text-left w-100 collapsed" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">What are the merits of investing in IPO?</span> </h5>
                                            </div>
                                            <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-parent="#accordion">
                                                <div className="card-body">
                                                    <p>There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!--Frequently Asked Questions close-->  */}


            {/* <!-- all popup start--> */}
            <div className="ipo_popup">
                <div className="modal fade form_otp_main" id="MobileOTPAuthentication" role="dialog">
                    <div className="modal-dialog modal-md modal-dialog-centered">

                        {/* <!-- Modal content--> */}
                        <div className="modal-content"  >
                            <div className="modal-header border-0 text-center p-3 pb-0">
                                <button type="button" className="close" data-dismiss="modal">X</button>
                            </div>
                            <div className="modal-body pt-0 pb-5">

                                <div id="step-one" className="py-0 px-2 px-md-5" >
                                    <form name="customer-form" id="customer-form" role="form" autocomplete="off" action="#"
                                        novalidate="novalidate">
                                        <h2 className="text-center">Mobile OTP Authentication</h2>

                                        <div className="form__group ">
                                            <input type="text" autocomplete="off" id="inputAccount" className="form__field " name="inputAccount"
                                                placeholder="PAN" />
                                            <label for="inputAccount" className="form__label">Enter Full Name</label>
                                        </div>
                                        <div className="form__group">
                                            <input type="text" id="emailid" className="form__field" name="emailid" placeholder="E-mail" autocomplete="off" />
                                            <label for="emailid" className="form__label">Enter Email ID</label>
                                        </div>
                                        <div className="form__group">
                                            <input type="tel" autocomplete="off" maxlength="10" id="inputMobile" className="form__field "
                                                name="inputMobile" placeholder="Registered Mobile Number" />
                                            <label for="inputMobile" className="form__label">Enter Mobile Number</label>
                                        </div>
                                        <div className="text-center"> <button type="submit" id="btnSubmit" className="btn primary_btn mt-4 text-center">SUBMIT</button></div>
                                    </form>
                                    <form name="formMobileOTP" className="backBtn text-center" id="formMobileOTP" role="form" autocomplete="off" action="view_status.html"
                                        novalidate="novalidate" style={{ display: "none" }}>
                                        <h2 className="h3 verify-otp text-center">Verify OTP</h2>
                                        <p className="info">We have sent an OTP to your registered Mobile ******5632
				                        <a href="javascript:void(0)" className="d-block" id="mobileChange">Change</a></p>
                                        <div className="form__group ">
                                            <input type="text" autocomplete="off" maxlength="4" id="inputMobileOTP" className="form__field "
                                                name="inputMobileOTP" placeholder="OTP" />
                                            <label for="inputMobileOTP" className="form__label">Enter OTP</label>
                                        </div>
                                        <button id="btnSubmitOTP" type="submit" className="btn primary_btn  h-auto mt-3"> Submit OTP </button>
                                        <span className="timer"> <span className="dvtimer mt-3">Resend OTP <span id="timer" className="OTPtime">60</span></span>
                                            <button className="link-btn " id="resend-otp-link" type="button" style={{ display: "none" }}>Resend OTP</button>
                                        </span>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- all popup end-->  */}
        </>
    )
}

export default FrequentlyAsked