


import plus from "../../assets/images/plus.svg"
import bid_qty from "../../assets/images/bid_qty.svg"
import upi_mandate_request from "../../assets/images/upi_mandate_request.svg"
import allotement_status from "../../assets/images/allotement_status.svg"
import check_mark from "../../assets/images/check_mark.svg"
import Header from "../Header/Header";

const IPOApplyForm = (props) => {


    return (
        <>

            <Header />

            <section class="section pt-2" >
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <h2 class="main_title pb-1">IPO</h2>
                            <p>Please fill the details below, <a href="https://www.iifl.com/securities/whatsnew/ipo-now-online" target="_blank"> Click here</a> to Know more about online IPO.</p>
                        </div>
                        <div class="col-12 col-md-6 col-lg-8">
                            <div class="card_box big_card mb-4">
                                <ul class="innner_grid mt-3 mt-md-3 upcoming_opportunities_list">
                                    <li>Price Range<span class="d-block"><span class="rupee small">`</span>1,324 - <span class="rupee small">`</span>1,370</span></li>
                                    <li>Min. Investment<span class="d-block"><span class="rupee small">`</span>1,20,000 </span></li>
                                    <li>Lot Size<span class="d-block">20</span></li>
                                    <li>Open &amp; Close Date<span class="d-block">1<sup>st</sup> - 3<sup>rd</sup> Aug, 2021</span></li>
                                </ul>
                                <div class="clearfix"></div>
                            </div>
                            {/* <!-- card close--> */}
                            <div class="card_box big_card dvcart mb-4 mb-md-0">
                                <div id="dvHolder" >
                                    <div id="rowHolder">
                                        <div class="row align-items-center" id="BIDBOX">
                                            <div class="col-12 text-left">
                                                <h2 class="panel-lable text-left text_black text-uppercase">Bid 1</h2>
                                            </div>
                                            <div class="col-6 col-sm-3 col-md-6 col-lg-3">
                                                <div class="form-group col-xs-12 p-0">
                                                    <label class="control-label">No. Of Shares</label>
                                                    <div class="number_count"> <span class="minus">-</span>
                                                        <input type="text" value="1" class="text-center" />
                                                        <span class="plus">+</span> </div>
                                                </div>
                                            </div>
                                            <div class="col-6 col-sm-3 col-md-6 col-lg-3 mt-2 mb_left">
                                                <div class="checkbox_main">
                                                    <label class="font-weight-normal" for="stockCheckbox1">Cutoff - Price</label>
                                                    <input id="stockCheckbox1" type="checkbox" checked />
                                                    <span></span> </div>
                                            </div>
                                            <div class="col-6 col-sm-3 col-md-6 col-lg-3  text-center"> <a href="#" class="bid_prize">Bid Prize</a> </div>
                                            <div class="col-6 col-sm-2 col-md-6 col-lg-2  text-center">
                                                <div class="form-group col-xs-12 p-0">
                                                    <label class="control-label">Amount</label>
                                                    <span class="d-block"><span class="rupee small">`</span>10,000</span> </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12 pt-1 pt-md-3"> <a href="javascript:void(0);" class="btn-plus d-inline-block text-uppercase" id="addHolder">
                                            <img src={plus} alt="plus" class="mr-1" width="12" /> Add Bid</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-4">
                            <div id="StepBox" class="p-3">
                                <h3 class="text-center mt-0 text-capital mb-4">Apply in 3 easy steps</h3>
                                <div class="step_main">
                                    <div class="step_left">
                                        <img src={bid_qty} alt="step" />
                                    </div>
                                    <div class="step_right">
                                        <h2>Step 1</h2>
                                        <p>Enter you bid quantity,price,no.of bids and submit UPI ID</p>
                                    </div>
                                </div>
                                <div class="step_main">
                                    <div class="step_left">
                                        <img src={upi_mandate_request} alt="step" />
                                    </div>
                                    <div class="step_right">
                                        <h2>Step 2</h2>
                                        <p>Accept the UPI mandate request on your UPI APP</p>
                                    </div>
                                </div>
                                <div class="step_main mb-0 border-bottom-0">
                                    <div class="step_left">
                                        <img src={allotement_status} alt="step" />
                                    </div>
                                    <div class="step_right">
                                        <h2>Step 3</h2>
                                        <p>Check your allotement status</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!--step close--> */}


            <section class="section">
                <div class="container">
                    <div class="row dvcart ">
                        <div class="col-12">
                            <h2 class="main_title pb-3">User Details</h2>
                        </div>
                        <div class="col-12">
                            <div class="inside_gray_box p-4">
                                <div class="row">
                                    <div class="col-12 col-sm-6 col-lg-4">
                                        <div class="form-group">
                                            <label>You are investing as <sup>*</sup> </label>
                                            <div class="wrapperslct">
                                                <select>
                                                    <option>Individual</option>
                                                    <option>Share Holder</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-6 col-lg-4">
                                        <div class="form-group p-0">
                                            <label class="control-label">Referrar Code (Optional)</label>
                                            <input type="text" class="form-control" />
                                        </div>
                                    </div>
                                    <div class="clearfix col-sm-12 col-lg-4"></div>
                                    <div class="col-12 col-sm-6 col-lg-4">
                                        <div class="form-group">
                                            <label>Applying For <sup>*</sup> </label>
                                            <div class="wrapperslct">
                                                <select id="Test">
                                                    <option value="Self">Self</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-6 col-lg-4">
                                        <div class="form-group mb-3 mb-md-0">
                                            <label class="control-label">PAN No.</label>
                                            <input type="text" class="form-control" />
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-6 col-lg-4 ">
                                        <div class="form-group">
                                            <label class="control-label">Name</label>
                                            <input type="text" class="form-control" />
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-6 col-lg-4">
                                        <div class="form-group">
                                            <label class="control-label">DP Type</label>
                                            <div class="btn-group radioBtn w-100" data-toggle="buttons">
                                                <label class="btn  form-check-label active" id="NSDL">
                                                    <input class="form-check-input" type="radio" name="options" id="option1" autocomplete="off" checked="" />
                                                    <img src={check_mark} width="10px" class="mr-2 check_mark" alt="check" />NSDL </label>
                                                <label class="btn form-check-label" id="CDSL">
                                                    <input class="form-check-input" type="radio" name="options" id="option2" autocomplete="off" />
                                                    <img src={check_mark} width="10px" class="mr-2 check_mark" alt="check" />CDSL </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-6 col-lg-4 nsdlshow">
                                        <div class="form-group">
                                            <label class="control-label">DP ID</label>
                                            <input type="text" class="form-control" />
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-6 col-lg-4 nsdlshow BeneficiaryHide">
                                        <div class="form-group">
                                            <label class="control-label">Beneficiary/Client ID</label>
                                            <input type="text" class="form-control" />
                                        </div>
                                    </div>
                                    <div class="col-12 mt-3"> <a href="javascript:void(0)" id="clickDemat" style={{ display: "inline" }}>Click here to add holder details in case of joint Demat Account.</a> </div>
                                </div>
                                <div id="dvHolder1" class="mt-2" style={{ display: "none" }}>
                                    <div id="rowHolder1">
                                        <div class="row align-items-center">
                                            <div class="col-12 col-sm-6 col-lg-4">
                                                <div class="form-group mb-3 mb-md-3">
                                                    <label class="control-label">Holder 2 Full Name<sup>*</sup></label>
                                                    <input type="text" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="col-12 col-sm-6 col-lg-4">
                                                <div class="form-group mb-3 mb-md-3">
                                                    <label class="control-label">Holder 2 PAN No. <sup>*</sup></label>
                                                    <input type="text" class="form-control" />
                                                </div>
                                            </div>
                                            <div class="col-sm-4"> <a href="javascript:void(0)" id="hideHolder"> <i class="fa fa-trash-o btnTrash"></i> </a> </div>
                                        </div>
                                    </div>
                                    <div class="mt-3"> <a href="javascript:void(0)" id="addHolderdemat">+ Add another holder</a> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!--User Details close--> */}

            <section class="section">
                <div class="container">
                    <div class="row dvcart ">
                        <div class="col-12">
                            <h2 class="main_title pb-4">Payment Details</h2>
                        </div>
                        <div class="col-12">
                            <div class="inside_gray_box p-4">
                                <div class="row align-items-center">
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label class="control-label">Payment Mode</label>
                                            <div class="btn-group radioBtn w-100" data-toggle="buttons">
                                                <label class="btn  form-check-label active" id="PaymentASBA">
                                                    <input class="form-check-input" type="radio" name="options" id="option11" autocomplete="off" checked="" />
                                                    <img src={check_mark} width="10px" class="mr-2 check_mark" alt="check" />ASBA </label>
                                                <label class="btn form-check-label" id="PaymentUPI">
                                                    <input class="form-check-input" type="radio" name="options" id="option22" autocomplete="off" />
                                                    <img src={check_mark} width="10px" class="mr-2 check_mark" alt="check" />UPI </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-8"></div>
                                    <div class="col-12 col-sm-4 Select radioASBA">
                                        <div class="form-group">
                                            <label>Bank Name </label>
                                            <div class="wrapperslct">
                                                <select>
                                                    <option selected="" disabled="">Select Bank Name</option>
                                                    <option>State Bank</option>
                                                    <option>HDFC Bank</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-4 radioASBA">
                                        <div class="form-group">
                                            <label class="control-label">Bank Account Number</label>
                                            <input type="text" class="form-control" />
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-4 radioASBA">
                                        <div class="form-group">
                                            <label>Bank Location</label>
                                            <div class="wrapperslct">
                                                <select>
                                                    <option selected="" disabled="">Select Location</option>
                                                    <option>Mumbai</option>
                                                    <option>Delhi</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-4 radioUPI" style={{ display: "none" }}>
                                        <div class="form-group">
                                            <label class="control-label">UPI ID</label>
                                            <input type="text" class="form-control" />
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-4 radioUPI" style={{ display: "none" }}>
                                        <div class="form-group">
                                            <label>Select UPI Handler</label>
                                            <div class="wrapperslct">
                                                <select>
                                                    <option selected="" disabled="">Select UPI Handler</option>
                                                    <option>@SBIN</option>
                                                    <option>@HDFC</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div class="col-12">
                                        <a href="#">Click here to add holder details in case of joint Demat Account.</a>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!--Personal Details close--> */}


            <section class="section">
                <div class="container">
                    <div class="row">
                        <div class="col-12 text-center amt_payment">
                            <h2>Amount Payable : <span class="rupee small">`</span> 10,000</h2>
                            <div class="btn_group py-2">
                                <a class="btn gray_btn ">Back</a>
                                <a class="btn gray_btn" data-toggle="modal" data-target="#CancelBid">Cancel</a>
                                <a class="btn primary_btn" id="UPISUBMIT" data-toggle="modal" data-target="#UPISubmitBid" style={{ display: "none" }}>Submit</a>
                                <a class="btn primary_btn" id="ASBASUBMIT" data-toggle="modal" data-target="#ASBASubmitBid">Submit</a>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!--payment section close--> */}



            <div class="ipo_popup">
                <div class="modal fade" id="UPISubmitBid" role="dialog">
                    <div class="modal-dialog modal-md modal-dialog-centered">

                        {/* <!-- Modal content--> */}
                        <div class="modal-content"  >
                            <div class="modal-header border-0 text-center p-3">
                                <button onclick="window.location.href = 'apply_in_other_category.html';" formtarget="_blank" type="button" class="close" data-dismiss="modal">X</button>
                            </div>
                            <div class="modal-body pt-0">
                                <div class="customer_msg text-center">
                                    <div class="mb-2"> <i class="fa fa-clock-o fa-3x text-green"></i> </div>
                                    <h3 class="mt-2">Application Requested</h3>
                                    <h5 class="text-gray font-weight-normal pb-2 pb-sm-3">Amount to be blocked <span class="rupee">`</span> 1,000</h5>
                                    <p>Thanks for applying! We have received your request. You will get a notification on your registered UPI App to block the funds. Once you approve the mandate, you will get the IPO in your demat account postallotment. Please note your application number:BONDU4065121 for future reference.</p>
                                    <div class="text-center mt-4 mb-3">
                                        <button onclick="window.location.href = 'apply_in_other_category.html';" formtarget="_blank" type="button" class="btn primary_btn" id="CustomerMsg" data-dismiss="modal">Done</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="ASBASubmitBid" role="dialog">
                    <div class="modal-dialog modal-md modal-dialog-centered">

                        {/* <!-- Modal content--> */}
                        <div class="modal-content"  >
                            <div class="modal-header border-0 text-center p-3">
                                <button onclick="window.location.href = 'apply_in_other_category.html';" formtarget="_blank" type="button" class="close" data-dismiss="modal">X</button>
                            </div>
                            <div class="modal-body pt-0">
                                <div class="customer_msg text-center">
                                    <div class="mb-2"> <i class="fa fa-clock-o fa-3x text-green"></i> </div>
                                    <h3 class="mt-2">Application Requested</h3>
                                    <h5 class="text-gray font-weight-normal pb-2 pb-sm-3">Amount to be blocked <span class="rupee">`</span> 1,000</h5>
                                    <p class="mt-20">Thank you for applying for Zomato IPO. Your Next Steps :</p>
                                    <ul class="bulletpoints text-left" style={{ listStyle: "none" }}>
                                        <li>Step 1 : Download & print the Application form</li>
                                        <li>Step 2 : Fill the required details & sign</li>
                                        <li>Step 3 : Submit the form at your bank's Capital Market Branch</li>
                                        <li>Step 4 : After form submission, funds will be blocked in your band A/C</li>
                                        <li>Step 5 : After allotment , Zomato shares will be reflected in your Demat A/C, against your DP ID</li>
                                    </ul>
                                    <div class="text-center mt-4 mb-3">
                                        <button onclick="window.location.href = 'apply_in_other_category.html';" formtarget="_blank" type="button" class="btn primary_btn" data-dismiss="modal">Download Application Form</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="CancelBid" role="dialog">
                    <div class="modal-dialog modal-md modal-md modal-dialog-centered">

                        {/* <!-- Modal content--> */}
                        <div class="modal-content"  >
                            <div class="modal-header border-0 text-center p-3">
                                <button type="button" class="close" data-dismiss="modal">X</button>
                            </div>
                            <div class="modal-body pt-0 ">
                                <div id="dvConfirmApp1" class=" m-auto text-center ">
                                    <h3 class="mt-0">Cancel Application</h3>
                                    <div class="tableBonds">
                                        <table class="confirm_application_table w-100 my-3">
                                            <tbody><tr>
                                                <td class="font-weight-normal text-left">Name</td>
                                                <td class="font-weight-bold">IIFL Home Finance Bonds</td>
                                            </tr>
                                                <tr>
                                                    <td class="font-weight-normal text-left">Application No</td>
                                                    <td class="font-weight-bold">12345678</td>
                                                </tr>
                                                <tr>
                                                    <td class="font-weight-normal text-left">Quantity</td>
                                                    <td class="font-weight-bold">110 Unit</td>
                                                </tr>
                                            </tbody></table>
                                    </div>
                                    <button type="button" class="btn primary_btn text-center my-3" data-dismiss="modal">Confirm</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- popup close--> */}

        </>
    )
}


export default IPOApplyForm