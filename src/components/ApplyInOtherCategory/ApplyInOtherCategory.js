
import iifl_ipo_logo from "../../assets/images/iifl_ipo_logo.svg"
import sovereign_gold from "../../assets/images/sovereign_gold.png"
import zomato from "../../assets/images/zomato.png"
import edit from "../../assets/images/edit.svg"
import cut_delete from "../../assets/images/cut_delete.svg"
import download from "../../assets/images/download.svg"
import PastPerformerCard from "../UIComponents/PastPerformerCard/PastPerformerCard";

import { IPO, NCD, SGB } from "../../helpers/constants"
import UpcomingCard from "../UIComponents/UpcomingCard/UpcomingCard";
import CurrentCard from "../UIComponents/CurrentCard/CurrentCard";
import LoginPopup from "../UIComponents/LoginPopup/LoginPopup";
import Header from "../Header/Header";
import "../../assets/css/timeline.css"

import HorizontalTimeline from "react-horizontal-timeline"
import { useState } from "react"

const ApplyInOtherCategory = (props) => {




    return (
        <>

            <Header />

            <section className="section pb-0" id="OtherCategory">
                <div className="container">
                    <div className="row other_category_box pb-4 pb-sm-5 mb-2 mb-sm-4">
                        <div className="col-12  mb-4 mb-md-4">
                            <div className="card_box big_card p-0 border-0">
                                <div className="ipo_box_main">
                                    <div className="ipo_box_main_left">
                                        <img src={zomato} alt="icon" />
                                        <span className="d-block text-center pt-1">IPO</span>
                                    </div>
                                    <div className="ipo_box_main_right">
                                        <div className="title_main">
                                            <h2>Zomato<a href="#" className="d-inline-block ml-3 green_btn">Applied</a> </h2>
                                            <div className="dateprize_othercat">14th - 16th July 2021
                                                <div className="prz d-inline-block">
                                                    <span className="rupee small">`</span>1,324 - <span className="rupee small">`</span> 1,324</div>
                                            </div>
                                            <span className="arrow_next text-right"> <a className="btn primary_btn" href="/ipo_apply" target="_blank">Apply in other category</a>
                                                <p className="text-right mb-0 pt-2 small">You can apply only if you are an existing shareholder</p>
                                            </span> </div>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="inside_gray_box">
                                <div className="terms_main_tbl">
                                    <table className="terms_flow_table other_category border-0">
                                        <thead>
                                            <tr>
                                                <th className="bg_green top_left_radius_25 ">Payment Mode</th>
                                                <th className="bg_green">Application No.</th>
                                                <th className="bg_green">Category</th>
                                                <th className="bg_green">Total Amount</th>
                                                <th className="bg_green text-left">Status</th>
                                                <th className="bg_green text-left">Next Steps</th>
                                                <th className="bg_green"></th>
                                                <th className="bg_green"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="btnDelete" data-id="1">
                                                <th>UPI</th>
                                                <td>0098765456</td>
                                                <td>Individual</td>
                                                <td><span className="rupee small">`</span> 12,345.80</td>
                                                <td className="text-left">Accepted by Investor</td>
                                                <td className="text-left">Block request accepted by client payment successful</td>
                                                <td>
                                                    <a href="/ipo_apply" target="_blank">
                                                        <img src={edit} width="12px" alt="edit" />
                                                    </a>
                                                </td>
                                                <td>
                                                    <a href="#" className="btnDelete">
                                                        <img src={cut_delete} width="12px" alt="edit" />
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr className="btnDelete" data-id="2">
                                                <th className="border-bottom-0">ASBA</th>
                                                <td className="border-bottom-0">0098765456</td>
                                                <td className="border-bottom-0">Shareholder</td>
                                                <td className="border-bottom-0"><span className="rupee small">`</span> 2,000,078</td>
                                                <td className="text-left border-bottom-0">Form <a href="#">
                                                    <img src={download} width="10px" alt="edit" className="ml-1" />
                                                </a>
                                                </td>
                                                <td className="text-left border-bottom-0">Block request accepted by client payment successful</td>
                                                <td className="border-bottom-0">
                                                    <a href="/ipo_apply" target="_blank">
                                                        <img src={edit} width="12px" alt="edit" />
                                                    </a>
                                                </td>
                                                <td className="border-bottom-0"><a href="#" className="btnDelete">
                                                    <img src={cut_delete} width="12px" alt="edit" />
                                                </a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                
                                <section className="cd-horizontal-timeline pb-4 pt-2 loaded">
                                    <div className="timeline">
                                        <div className="events-wrapper">
                                            <p className="allotment_finalisation text-left mb-0 pt-1"><a href="#">Check Allotment</a></p>
                                            <div className="events" style={{width: "1040px", transform: "translateX(0px)"}} >
                                                <ol>
                                                    <li><a href="#0" data-date="01/01/2005" className="selected" style={{left: "130px"}} >Offer staart <span>2020-09-29</span></a></li>
                                                    <li><a href="#0" data-date="01/01/2007" style={{left: "260px"}}>Offer end <span>2020-10-01</span></a></li>
                                                    <li> <a href="#0" data-date="01/01/2011" style={{left: "390px"}}>Allotment finalisation <span>2021-03-22</span></a></li>
                                                    <li><a href="#0" data-date="01/01/2012" style={{left: "520px"}}>Refund initiation <span>2020-10-08</span></a></li>
                                                    <li><a href="#0" data-date="01/01/2013" style={{left: "650px"}}>Demat transfer <span>2020-10-09</span></a></li>
                                                    <li><a href="#0" data-date="01/01/2014" style={{left: "780px"}}>Listing <span>2020-10-12</span></a></li>
                                                    <li><a href="#0" data-date="01/01/2015" style={{left: "910px"}}>Mandate end <span>2020-10-18</span></a></li>
                                                </ol>
                                                <span className="filling-line" aria-hidden="true" style={{transform: "scaleX(0.155747)"}}></span> </div>
                                            {/* <!-- .events -->  */}
                                        </div>
                                        {/* <!-- .events-wrapper --> */}
                                        <ul className="cd-timeline-navigation">
                                            <li><a href="#0" className="prev inactive">Prev</a></li>
                                            <li><a href="#0" className="next">Next</a></li>
                                        </ul>
                                        {/* <!-- .cd-timeline-navigation -->  */}
                                    </div>
                                    {/* <!-- .timeline -->  */}
                                </section>

                            </div>
                        </div>
                    </div>
                    {/* <!--zomoto close--> */}


                    <div className="row other_category_box pb-4 pb-sm-5 mb-2 mb-sm-4">
                        <div className="col-12  mb-4 mb-md-4">
                            <div className="card_box big_card p-0 border-0">
                                <div className="ipo_box_main">
                                    <div className="ipo_box_main_left">
                                        <img src={iifl_ipo_logo} alt="icon" />
                                        <span className="d-block text-center pt-1">NCD</span>
                                    </div>
                                    <div className="ipo_box_main_right">
                                        <div className="title_main">
                                            <h2>IIFL Gold Bonds<a href="#" className="d-inline-block ml-3 green_btn">Applied</a> </h2>
                                            <div className="dateprize_othercat">14th - 16th July 2021
                                                <div className="prz d-inline-block">Min. Investment: <span className="rupee small">`</span>1,324 - <span className="rupee small">`</span> 1,324</div>
                                                <div className="prz d-inline-block">Fixed 10% Return</div>
                                            </div>
                                            <span className="arrow_next text-right"> <a className="btn primary_btn" href="/ncd_apply" target="_blank">Apply More</a> </span> </div>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="inside_gray_box">
                                <div className="terms_main_tbl">
                                    <table className="terms_flow_table other_category border-0">
                                        <thead>
                                            <tr>
                                                <th className="bg_green top_left_radius_25 ">Payment Mode</th>
                                                <th className="bg_green">Application No.</th>
                                                <th className="bg_green">Acknowledgement No.</th>
                                                <th className="bg_green">Total Amount</th>
                                                <th className="bg_green text-left">Acknowledgement No.</th>
                                                <th className="bg_green text-left">Status</th>
                                                <th className="bg_green"></th>
                                                <th className="bg_green"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="btnDelete" data-id="4">
                                                <th>UPI</th>
                                                <td>0098765456</td>
                                                <td>Series 1, 4</td>
                                                <td><span className="rupee small">`</span> 12345.80</td>
                                                <td className="text-left">34512689</td>
                                                <td className="text-left">Accepted by Investor</td>
                                                <td>
                                                    <a href="/ncd_apply" target="_blank">
                                                        <img src={edit} width="12px" alt="edit" />
                                                    </a>
                                                </td>
                                                <td><a href="#" className="btnDelete">
                                                    <img src={cut_delete} width="12px" alt="edit" />
                                                </a>
                                                </td>
                                            </tr>
                                            <tr className="btnDelete" data-id="5">
                                                <th className="border-bottom-0 lf_bt_bradius">ASBA</th>
                                                <td className="border-bottom-0">0098765456</td>
                                                <td className="border-bottom-0">Series 1, 4</td>
                                                <td className="border-bottom-0"><span className="rupee small">`</span> 12345.80</td>
                                                <td className="text-left border-bottom-0">34512689 </td>
                                                <td className="text-left border-bottom-0">Form <a href="#">
                                                    <img src={download} width="10px" alt="edit" className="ml-1" />

                                                </a>
                                                </td>
                                                <td className="border-bottom-0">
                                                    <a href="/ncd_apply" target="_blank">
                                                        <img src={edit} width="12px" alt="edit" />

                                                    </a>
                                                </td>
                                                <td className="border-bottom-0"><a href="#" className="btnDelete">
                                                    <img src={cut_delete} width="12px" alt="edit" />

                                                </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* <!--IIFl Gold close--> */}
                    <div className="row other_category_box pb-5 border-bottom-0">
                        <div className="col-12  mb-4 mb-md-4">
                            <div className="card_box big_card p-0 border-0">
                                <div className="ipo_box_main">
                                    <div className="ipo_box_main_left">
                                        <img src={sovereign_gold} alt="icon" />
                                        <span className="d-block text-center pt-1">SGB</span>
                                    </div>
                                    <div className="ipo_box_main_right">
                                        <div className="title_main">
                                            <h2>Sovereign Gold Bond Scheme 2017<a href="#" className="d-inline-block ml-3 green_btn">Applied</a> </h2>
                                            <div className="dateprize_othercat">14th - 16th July 2021
                  <div className="prz d-inline-block">Min. Investment: <span className="rupee small">`</span>1,324 - <span className="rupee small">`</span> 1,324</div>
                                                <div className="prz d-inline-block">Fixed 10% Return</div>
                                            </div>
                                            <span className="arrow_next text-right"> <a className="btn primary_btn" href="/sgb_apply" target="_blank">Apply More</a> </span> </div>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="inside_gray_box">
                                <div className="terms_main_tbl">
                                    <table className="terms_flow_table other_category border-0">
                                        <thead>
                                            <tr>
                                                <th className="bg_green top_left_radius_25 ">Application No.</th>
                                                <th className="bg_green">Application Date</th>
                                                <th className="bg_green">Quantity</th>
                                                <th className="bg_green">Total Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>0098765456</th>
                                                <td>22/08/2021</td>
                                                <td>400.02 grams</td>
                                                <td><span className="rupee small">`</span> 30,098.09</td>
                                            </tr>
                                            <tr>
                                                <th className="border-bottom-0 lf_bt_bradius">0098765456</th>
                                                <td className="border-bottom-0">22/08/2021</td>
                                                <td className="border-bottom-0">20.065 grams</td>
                                                <td className="border-bottom-0"><span className="rupee small">`</span> 12,986.00</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <div className="ipo_popup">
                <div className="modal fade" id="RemoveTR" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-md modal-md modal-dialog-centered">

                        {/* <!-- Modal content--> */}
                        <div className="modal-content"  >
                            {/* <!-- <div className="modal-header border-0 text-center p-3">
                                <button  type="button" className="close" data-dismiss="modal">X</button>
                                </div>--> */}
                            <div className="modal-body pt-5">
                                <div id="dvConfirmApp1" className=" m-auto text-center ">
                                    <p style={{ fontSize: "1rem", lineHeight: "22px" }} >Are you sure you want to delete?</p>
                                    <button type="button" className="btn gray_btn text-center my-3 delete mr-2" data-dismiss="modal">Cancle</button>
                                    <button type="button" className="btn primary_btn text-center my-3 Yes_btn ml-2" data-dismiss="modal" id="btnDelteYes">OK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- popup close-->  */}
            </div>
        </>
    )
}



export default ApplyInOtherCategory