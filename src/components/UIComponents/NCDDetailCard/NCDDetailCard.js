

import { useEffect } from "react";
import iifl_ipo_logo from "../../../assets/images/iifl_ipo_logo.svg"

const NCDDetailCard = (props) => {

    useEffect(() => {
        console.log("NCD");
    }, [])

    return (
        <>

            <section className="section pb-0">
                <div className="container">
                    <div className="row">
                        <div className="col-12  mb-4 mb-md-5">
                            <div className="card_box h-100 big_card">
                                <div className="ipo_box_main">
                                    <div className="ipo_box_main_left">
                                        <img src={iifl_ipo_logo} alt="icon" />
                                        <span className="d-block text-center pt-1">NCD</span>
                                    </div>
                                    <div className="ipo_box_main_right">
                                        <div className="title_main">
                                            <h2>IIFL Home Finance Bonds <a href="javascript:void(0)" className="d-block">View Prospects</a></h2>
                                            <span className="arrow_next text-right"><a href="home_finance_bond_apply_details.html" target="_blank" className="btn primary_btn">Apply Now</a></span> </div>

                                    </div>
                                </div>

                                <ul className="innner_grid mt-3 mt-md-3">
                                    <li>Rating<span className="d-block">AA+</span></li>
                                    <li>Min. Investment<span className="d-block"><span className="rupee small">`</span>10,000 </span></li>
                                    <li>Fixed Returns<span className="d-block">10%</span></li>
                                    <li>Open &amp; Close Date<span className="d-block">1<sup>st</sup> - 3<sup>rd</sup> Aug, 2021</span></li>

                                </ul>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}


export default NCDDetailCard