import React from "react";
import FaqList from "./Faq/FaqList";
import AdvantagesList from "./Advantages/AdvantagesList";
import KeyFeatureList from "./KeyFeature/KeyFeatureList";
import HowToInvestList from "./HowToInvest/HowToInvestList";
import GsecTypesList from "./GsecTypes/GsecTypesList";
import InvestInGsecHeadingList from "./InvestInGsecHeading/InvestInGsecHeadingList";
import InvestInGsecDataList from "./InvestInGsecData/InvestInGsecDataList";
import GsecsFeatureHeadingList from "./GsecsFeatureHeading/GsecsFeatureHeadingList";
import GsecsFeatureTableDataList from "./GsecsFeatureTableData/GsecsFeatureTableDataList";
import GsecsFeatureDataList from "./GsecsFeatureData/GsecsFeatureDataList";
import BondDetailList from "./BondDetail/BondDetailList";
import GsecDetailList from "./GsecDetail/GsecDetailList";
import TbillDetailList from "./TbillDetail/TbillDetailList";
import DatedGsecsList from "./DatedGsecs/DatedGsecsList";
import SdlDetailList from "./SdlDetail/SdlDetailList";
import TbillTypeList from "./GsecTypes/TbillTypeList";
import SdlTypeList from "./GsecTypes/SdlTypeList";

const Gsec = () => {
    return (
        <div className="createGsec">
            <div className="accordion" id="accordionExample2">
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
                            Bond Detail
                        </button>
                    </h2>
                    <div
                        id="collapseEleven"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample2"
                    >
                        <div className="accordion-body">
                            <BondDetailList />
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button
                            className="accordion-button collapsed shadow-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapsetwelev"
                            aria-expanded="false"
                            aria-controls="collapsetwelev"
                        >
                            Gsec Detail
                        </button>
                    </h2>
                    <div
                        id="collapsetwelev"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample2"
                    >
                        <div className="accordion-body">
                            <GsecDetailList />
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
                            T-bill Detail
                        </button>
                    </h2>
                    <div
                        id="collapseThirteen"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample2"
                    >
                        <div className="accordion-body">
                            <TbillDetailList />
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
                            Dated Gsecs
                        </button>
                    </h2>
                    <div
                        id="collapseFourteen"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample2"
                    >
                        <div className="accordion-body">
                            <DatedGsecsList />
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
                            SDL Detail
                        </button>
                    </h2>
                    <div
                        id="collapseFifteen"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample2"
                    >
                        <div className="accordion-body">
                            <SdlDetailList />
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
                            Gsecs Feature Heading
                        </button>
                    </h2>
                    <div
                        id="collapseEight"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample2"
                    >
                        <div className="accordion-body">
                            <GsecsFeatureHeadingList />
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
                            Gsecs Feature TableData
                        </button>
                    </h2>
                    <div
                        id="collapseNine"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample2"
                    >
                        <div className="accordion-body">
                            <GsecsFeatureTableDataList />
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
                            Gsecs Feature Data
                        </button>
                    </h2>
                    <div
                        id="collapseTen"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample2"
                    >
                        <div className="accordion-body">
                            <GsecsFeatureDataList />
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
                            Invest In Gsec Heading
                        </button>
                    </h2>
                    <div
                        id="collapseSix"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample2"
                    >
                        <div className="accordion-body">
                            <InvestInGsecHeadingList />
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
                            Invest In Gsec Data
                        </button>
                    </h2>
                    <div
                        id="collapseSeven"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample2"
                    >
                        <div className="accordion-body">
                            <InvestInGsecDataList />
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
                            G-Secs Key Features
                        </button>
                    </h2>
                    <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample2"
                    >
                        <div className="accordion-body">
                            <KeyFeatureList />
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
                            G-Secs Advantages
                        </button>
                    </h2>
                    <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample2"
                    >
                        <div className="accordion-body">
                            <AdvantagesList />
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
                            data-bs-target="#collapseSixteen"
                            aria-expanded="false"
                            aria-controls="collapseSixteen"
                        >
                            G-Secs Types(T-bill)
                        </button>
                    </h2>
                    <div
                        id="collapseSixteen"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample2"
                    >
                        <div className="accordion-body">
                            <TbillTypeList />
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
                            G-Secs Types(Govt Bond)
                        </button>
                    </h2>
                    <div
                        id="collapseFive"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample2"
                    >
                        <div className="accordion-body">
                            <GsecTypesList />
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
                            G-Secs Types(SDL)
                        </button>
                    </h2>
                    <div
                        id="collapseSeventeen"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample2"
                    >
                        <div className="accordion-body">
                            <SdlTypeList />
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
                            How To Invest
                        </button>
                    </h2>
                    <div
                        id="collapseFour"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample2"
                    >
                        <div className="accordion-body">
                            <HowToInvestList />
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
                            G-Secs Faq
                        </button>
                    </h2>
                    <div
                        id="collapseOne"
                        className="accordion-collapse collapse"
                        data-bs-parent="#accordionExample2"
                    >
                        <div className="accordion-body">
                            <FaqList />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gsec;
