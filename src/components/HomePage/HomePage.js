

import IIFL_LOGO from "../../assets/images/iifl-logo.svg"
import Opportunity_Banner from "../../assets/images/opportunity_banner.svg"
import * as userAction from "../../store/action/userAction"
import { connect } from "react-redux";
import { useEffect, useState } from "react";

import video1 from "../../assets/images/video1.png"
import video2 from "../../assets/images/video2.png"
import video_play_icon from "../../assets/images/video_play_icon.svg"

import { IPO, NCD, SGB } from "../../helpers/constants"
import LoginPopup from "../UIComponents/LoginPopup/LoginPopup";
import CurrentOpenIssuesComponent from "../UIComponents/CurrentOpenIssuesComponent/CurrentOpenIssuesComponent";
import PastPerformerIssuesComponent from "../UIComponents/PastPerformerIssuesComponent/PastPerformerIssuesComponent";
import UpcomingIssuesComponent from "../UIComponents/UpcomingIssuesComponent/UpcomingIssuesComponent";

const HomePage = (props) => {

    useEffect(() => {
        props.setUser("Sagar")
    }, [])

    const [modalType, setModalType] = useState(null)

    return (
        <>
            <section className="section header_top_with_banner">
                <div className="container"	>
                    <div className="row align-items-center">
                        <div className="col-5 col-sm-6">
                            <a href="javascript:void(0)" className="iifl_logo">
                                <img src={IIFL_LOGO} alt="IIFL logo" />
                            </a>
                        </div>
                        <div className="col-7 col-sm-6 text-right">
                            <span className="header_nav">Already Applied? 
                                <a data-toggle="modal" data-target="#MobileOTPAuthentication" href="javascript:void(0)" className="login" onClick={() => setModalType("login_clk")}>Login</a>
                            </span>
                        </div>
                    </div>
                    <div className="row align-items-center pt-4">
                        <div className="col-12 col-sm-7 banner_content">
                            <h2>Grab Every Best <br />
                                    Opportunity To Make <br />
                                        A Fortune.
                                </h2>
                        </div>
                        <div className="col-12 col-sm-5 text-right banner_right">
                            <img src={Opportunity_Banner} width="100%" alt="banner" />
                        </div>
                    </div>
                </div>
            </section>
            {/* <!--header and banner close--> */}
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="banner_overlap_band p-2 p-md-4 w-100 text-center mb-3 mb-md-0">Explore ongoing &amp; upcoming market opportunities &amp; invests with products like IPOs, Bonds, NCDs, Gold Bonds etc.</div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!--banner band close--> */}

            <CurrentOpenIssuesComponent 
                setModalType={setModalType}
            />
            {/* <!-- grid type  close--> */}

            <section className="section" id="PastPerformers">
                <div className="container">
                    <div className="row">
                        <PastPerformerIssuesComponent />

                        <UpcomingIssuesComponent />
                    </div>
                </div>
            </section>
            {/* <!--Past Performers and Upcoming Opportunities close--> */}

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
            <LoginPopup 
                modalType={modalType}
            />
            {/* <!-- all popup end-->  */}
        </>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (data) => {
            dispatch(userAction.user(data))
        }
    }
}

export default connect(null, mapDispatchToProps)(HomePage)