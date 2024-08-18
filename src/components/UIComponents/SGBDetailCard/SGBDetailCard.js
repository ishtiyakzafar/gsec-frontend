

import { useEffect } from "react";
import sovereign_gold from "../../../assets/images/sovereign_gold.png"

const SGBDetailCard = (props) => {

    useEffect(() => {
        console.log("SGB");
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
                                        <img src={sovereign_gold} alt="icon" />
                                        <span className="d-block text-center pt-1">SGB</span>
                                    </div>
                                    <div className="ipo_box_main_right">
                                        <div className="title_main">
                                            <h2>Sovereign Gold Bond Scheme 2017 <a href="javascript:void(0)" className="d-block">View Prospects</a></h2>
                                            <span className="arrow_next text-right">
                                                <a href="sovereign_gold_bond_apply_details.html" target="_blank" className="btn primary_btn">Apply Now</a>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <ul className="innner_grid mt-3 mt-md-3">
                                    <li>Price / gms<span className="d-block"><span className="rupee small">`</span>13,000 </span></li>
                                    <li>Min. Investment<span className="d-block"><span className="rupee small">`</span>10,000 </span></li>
                                    <li>Fixed Returns<span className="d-block">2.5%</span></li>
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


export default SGBDetailCard