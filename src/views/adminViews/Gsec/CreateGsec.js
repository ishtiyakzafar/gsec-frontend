import React from "react";
import "./Gsec.css";
import AddFaq from "./Faq/AddFaq";
import AddAdvantages from "./Advantages/AddAdvantages";
import AddKeyFeature from "./KeyFeature/AddKeyFeature";
import AddHowToInvest from "./HowToInvest/AddHowToInvest";
import AddGsecTypes from "./GsecTypes/AddGsecTypes";
import AddInvestInGsecHeading from "./InvestInGsecHeading/AddInvestInGsecHeading";
import AddInvestInGsecData from "./InvestInGsecData/AddInvestInGsecData";
import AddGsecsFeatureHeading from "./GsecsFeatureHeading/AddGsecsFeatureHeading";
import AddGsecsFeatureTableData from "./GsecsFeatureTableData/AddGsecsFeatureTableData";
import AddGsecsFeatureData from "./GsecsFeatureData/AddGsecsFeatureData";
import AddBondDetail from "./BondDetail/AddBondDetail";
import AddGsecDetail from "./GsecDetail/AddGsecDetail";
import AddTbillDetail from "./TbillDetail/AddTbillDetail";
import AddSdlDetail from "./SdlDetail/AddSdlDetail";
import AddDatedGsecs from "./DatedGsecs/AddDatedGsecs";
import AddTbillType from "./GsecTypes/AddTbillType";
import AddSdlTypes from "./GsecTypes/AddSdlTypes";

const CreateGsec = () => {
    return (
        <div className="createGsec">
            <div className="accordion" id="accordionExample1">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed shadow-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseEleven"
                            aria-expanded="false"
                            aria-controls="collapseEleven"
                        >
                            Add Bond Detail
                        </button>
                    </h2>
                    <div
                        id="collapseEleven"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample1"
                    >
                        <div className="accordion-body">
                            <AddBondDetail />
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed shadow-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwevel"
                            aria-expanded="false"
                            aria-controls="collapseTwevel"
                        >
                            Add Gsec Detail
                        </button>
                    </h2>
                    <div
                        id="collapseTwevel"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample1"
                    >
                        <div className="accordion-body">
                            <AddGsecDetail />
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed shadow-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThirteen"
                            aria-expanded="false"
                            aria-controls="collapseThirteen"
                        >
                            Add T-bill Detail
                        </button>
                    </h2>
                    <div
                        id="collapseThirteen"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample1"
                    >
                        <div className="accordion-body">
                            <AddTbillDetail />
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed shadow-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseFourteen"
                            aria-expanded="false"
                            aria-controls="collapseFourteen"
                        >
                            Add Dated Gsec
                        </button>
                    </h2>
                    <div
                        id="collapseFourteen"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample1"
                    >
                        <div className="accordion-body">
                            <AddDatedGsecs />
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed shadow-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseFifteen"
                            aria-expanded="false"
                            aria-controls="collapseFifteen"
                        >
                            Add SDL Detail
                        </button>
                    </h2>
                    <div
                        id="collapseFifteen"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample1"
                    >
                        <div className="accordion-body">
                            <AddSdlDetail />
                        </div>
                    </div>
                </div>

                <br />

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed shadow-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseEight"
                            aria-expanded="false"
                            aria-controls="collapseEight"
                        >
                            Add Gsecs Feature Heading
                        </button>
                    </h2>
                    <div
                        id="collapseEight"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample1"
                    >
                        <div className="accordion-body">
                            <AddGsecsFeatureHeading />
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed shadow-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseNine"
                            aria-expanded="false"
                            aria-controls="collapseNine"
                        >
                            Add Gsecs Feature TableData
                        </button>
                    </h2>
                    <div
                        id="collapseNine"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample1"
                    >
                        <div className="accordion-body">
                            <AddGsecsFeatureTableData />
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed shadow-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTen"
                            aria-expanded="false"
                            aria-controls="collapseTen"
                        >
                            Add Gsecs Feature Data
                        </button>
                    </h2>
                    <div
                        id="collapseTen"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample1"
                    >
                        <div className="accordion-body">
                            <AddGsecsFeatureData />
                        </div>
                    </div>
                </div>

                <br />

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed shadow-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseSix"
                            aria-expanded="false"
                            aria-controls="collapseSix"
                        >
                            Add Invest In Gsec Heading
                        </button>
                    </h2>
                    <div
                        id="collapseSix"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample1"
                    >
                        <div className="accordion-body">
                            <AddInvestInGsecHeading />
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed shadow-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseSeven"
                            aria-expanded="false"
                            aria-controls="collapseSeven"
                        >
                            Add Invest In Gsec Data
                        </button>
                    </h2>
                    <div
                        id="collapseSeven"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample1"
                    >
                        <div className="accordion-body">
                            <AddInvestInGsecData />
                        </div>
                    </div>
                </div>

                <br />
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed shadow-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                        >
                            Add Key Feature
                        </button>
                    </h2>
                    <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample1"
                    >
                        <div className="accordion-body">
                            <AddKeyFeature />
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed shadow-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                        >
                            Add G-Secs Advantages
                        </button>
                    </h2>
                    <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample1"
                    >
                        <div className="accordion-body">
                            <AddAdvantages />
                        </div>
                    </div>
                </div>
                <br />
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed shadow-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapsesixteen"
                            aria-expanded="false"
                            aria-controls="collapsesixteen"
                        >
                            Add G-Secs Types(T-bill)
                        </button>
                    </h2>
                    <div
                        id="collapsesixteen"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample1"
                    >
                        <div className="accordion-body">
                            <AddTbillType />
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed shadow-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseFive"
                            aria-expanded="false"
                            aria-controls="collapseFive"
                        >
                            Add G-Secs Types(Govt Bond)
                        </button>
                    </h2>
                    <div
                        id="collapseFive"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample1"
                    >
                        <div className="accordion-body">
                            <AddGsecTypes />
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed shadow-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseSeventeen"
                            aria-expanded="false"
                            aria-controls="collapseSeventeen"
                        >
                            Add G-Secs Types(SDL)
                        </button>
                    </h2>
                    <div
                        id="collapseSeventeen"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample1"
                    >
                        <div className="accordion-body">
                            <AddSdlTypes />
                        </div>
                    </div>
                </div>
                <br />
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed shadow-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseFour"
                            aria-expanded="false"
                            aria-controls="collapseFour"
                        >
                            Add How To Invest
                        </button>
                    </h2>
                    <div
                        id="collapseFour"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample1"
                    >
                        <div className="accordion-body">
                            <AddHowToInvest />
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed shadow-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="false"
                            aria-controls="collapseOne"
                        >
                            Add G-Secs Faq
                        </button>
                    </h2>
                    <div
                        id="collapseOne"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample1"
                    >
                        <div className="accordion-body">
                            <AddFaq />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateGsec;
