
import video1 from "../../assets/images/video1.png"
import video2 from "../../assets/images/video2.png"
import video_play_icon from "../../assets/images/video_play_icon.svg"
import PastPerformerCard from "../UIComponents/PastPerformerCard/PastPerformerCard";

import { IPO, NCD, SGB } from "../../helpers/constants"
import UpcomingCard from "../UIComponents/UpcomingCard/UpcomingCard";
import CurrentCard from "../UIComponents/CurrentCard/CurrentCard";
import LoginPopup from "../UIComponents/LoginPopup/LoginPopup";
import Header from "../Header/Header";

const ViewStatus = (props) => {



    return (
        <>

            <Header />

            <section class="section">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h2 class="main_title pb-4">Ongoing Opportunities</h2>
                        </div>
                        <div class="col-12 col-sm-6 mb-4 mb-md-5">
                            <CurrentCard type={IPO} />
                        </div>
                        <div class="col-12 col-sm-6 mb-4 mb-md-5">
                            <CurrentCard type={NCD} />
                        </div>
                        <div class="col-12 col-sm-6 mb-4 mb-md-5">
                            <CurrentCard type={SGB} />
                        </div>
                        <div class="col-12 col-sm-6 mb-4 mb-md-5">
                            <CurrentCard type={IPO} />
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- grid type  close--> */}

            <section className="section" id="PastPerformers">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="main_title pb-3">Past Performers</h2>
                        </div>
                        <div className="col-12 col-sm-6 mb-4 mb-md-5">
                            <PastPerformerCard type={IPO} />
                        </div>
                        <div className="col-12 col-sm-6 mb-4 mb-md-5">
                            <PastPerformerCard type={IPO} />
                        </div>
                        <div className="col-12 col-sm-6 mb-4 mb-md-5">
                            <PastPerformerCard type={SGB} />
                        </div>
                        <div className="col-12 col-sm-6 mb-4 mb-md-5">
                            <PastPerformerCard type={NCD} />
                        </div>
                        <div class="col-12">
                            <h2 class="main_title pb-3 float-left">Upcoming Opportunities </h2>
                            <span class="float-lg-right whats_app_update pb-3 mb-sm-0 d-inline-block">
                                <div class="checkbox_main">
                                    <input id="series3" type="checkbox" />
                                    <label class="font-weight-normal" for="series3">
                                        <span>Do not miss an opportunity, Get updates on <a href="#">WhatsApp</a></span>
                                    </label>
                                    <span>
                                    </span>
                                </div>
                            </span>
                        </div>
                        <div className="col-12 col-sm-6 mb-4 mb-md-5">
                            <UpcomingCard type={IPO} />
                        </div>
                        <div className="col-12 col-sm-6 mb-4 mb-md-5">
                            <UpcomingCard type={SGB} />
                        </div>
                        <div className="col-12 col-sm-6 mb-4 mb-md-5">
                            <UpcomingCard type={SGB} />
                        </div>
                        <div className="col-12 col-sm-6 mb-4 mb-md-5">
                            <UpcomingCard type={IPO} />
                        </div>
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


        </>
    )
}



export default ViewStatus