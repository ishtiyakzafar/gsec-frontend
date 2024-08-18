

import IIFL_LOGO from "../../assets/images/iifl-logo.svg"
import Opportunity_Banner from "../../assets/images/opportunity_banner.svg"
import RightArrow from "../../assets/svg/RightArrow";
import * as userAction from "../../store/action/userAction"
import { connect } from "react-redux";
import { useEffect } from "react";

import indian_railway from "../../assets/images/indian_railway.png"
import zomato from "../../assets/images/zomato.png"
import sovereign_gold from "../../assets/images/sovereign_gold.png"
import about_company from "../../assets/images/about_company.png"
import Meter_Equal_Distribution_small from "../../assets/images/Meter_Equal_Distribution_small.png"
import iifl_logo_wht from "../../assets/images/iifl_logo_wht.svg"
import video_play_icon from "../../assets/images/video_play_icon.svg"
import capital_appreciation from "../../assets/images/capital_appreciation.svg"
import capital_gains_tax from "../../assets/images/capital_gains_tax.svg"
import storage_risk_elimination from "../../assets/images/storage_risk_elimination.svg"
import gold_bonds from "../../assets/images/gold_bonds.svg"
import Header from "../Header/Header";
import IPODetailCard from "../UIComponents/IPODetailCard/IPODetailCard";
import NCDDetailCard from "../UIComponents/NCDDetailCard/NCDDetailCard";
import SGBDetailCard from "../UIComponents/SGBDetailCard/SGBDetailCard";
import { IPO, NCD, SGB } from "../../helpers/constants";
import ScoreMeter from "../UIComponents/ScoreMeter/ScoreMeter";
import AboutCompany from "../UIComponents/AboutCompany/AboutCompany";
import SGBBenefits from "../UIComponents/SGBBenefits/SGBBenefits";
import StrengthWeekness from "../UIComponents/StrengthWeekness/StrengthWeekness";
import TermsOfUse from "../UIComponents/TermsOfUse/TermsOfUse";

const CardDetails = (props) => {
    const { type } = props


    return (
        <>

            <Header />
            {/* <!--header close--> */}

            {type === IPO &&
                <>
                    <IPODetailCard />
                    <ScoreMeter />
                    <AboutCompany />
                    <StrengthWeekness />
                </>
            }  

            {type === NCD &&
                <>
                    <NCDDetailCard />
                    <AboutCompany />
                    <TermsOfUse />
                </>
            }

            {type === SGB &&
                <>
                    <SGBDetailCard />
                    <AboutCompany />
                    <SGBBenefits />
                </>
            }

            <section className="section" id="FrequentlyQuestions">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="main_title pb-3">Frequently Asked Questions</h2>
                        </div>
                        <div className="col-12">
                            <div className="accordion_main_box" id="Faq">
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
                                    <div className="accordion-wrapper">
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
            </section>


        </>
    )
}


export default CardDetails