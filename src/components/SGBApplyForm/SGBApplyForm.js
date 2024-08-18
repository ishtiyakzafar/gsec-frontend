

import sovereign_gold from "../../assets/images/sovereign_gold.png"
import check_mark from "../../assets/images/check_mark.svg"
import Header from "../Header/Header";

const SGBApplyForm = (props) => {


    return (
        <>

            <Header />

            <section class="section pb-0">
                <div class="container">
                    <div class="row">
                        <div class="col-12  mb-4 mb-md-5">
                            <div class="card_box h-100 big_card">
                                <div class="ipo_box_main">
                                    <div class="ipo_box_main_left">
                                        <img src={sovereign_gold} alt="icon" />
                                        <span class="d-block text-center pt-1">SGB</span>
                                    </div>
                                    <div class="ipo_box_main_right">
                                        <div class="title_main">
                                            <h2>Sovereign Gold Bond Scheme 2017</h2>
                                        </div>
                                    </div>
                                </div>
                                <ul class="innner_grid mt-3 mt-md-3">
                                    <li>Price / gms<span class="d-block"><span class="rupee small">`</span>13,000 </span></li>
                                    <li>Min. Investment<span class="d-block"><span class="rupee small">`</span>10,000 </span></li>
                                    <li>Fixed Returns<span class="d-block">2.5%</span></li>
                                    <li>Open &amp; Close Date<span class="d-block">1<sup>st</sup> - 3<sup>rd</sup> Aug, 2021</span></li>
                                </ul>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!--card close--> */}


            <section class="section pt-0">
                <div class="container">
                    <div class="row dvcart ">

                        <div class="col-12">
                            <div class="inside_gray_box p-4">
                                <div class="row align-items-center">

                                    <div class="col-12 col-sm-6 col-lg-4 ">
                                        <div class="form-group mb-4 mb-sm-0">
                                            <label class="control-label">Quantity</label>
                                            <input type="text" class="form-control" placeholder="Quantity in Grams" />
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-6 col-lg-4 ">
                                        <div class="form-group mb-0">
                                            <label class="control-label">Amount</label>
                                            <input type="text" class="form-control" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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
                                <a class="btn primary_btn" data-toggle="modal" data-target="#UPISubmitBid">Submit</a>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!--payment section close-->  */}

            <div class="ipo_popup">
                <div class="modal fade" id="UPISubmitBid" role="dialog">
                    <div class="modal-dialog modal-md modal-dialog-centered">

                        {/* <!-- Modal content--> */}
                        <div class="modal-content"  >
                            <div class="modal-header border-0 text-center p-3">
                                <button onClick="window.location.href = 'apply_in_other_category.html';" formtarget="_blank" type="button" class="close" data-dismiss="modal">X</button>
                            </div>
                            <div class="modal-body pt-0">
                                <div class="customer_msg text-center">
                                    <div class="mb-2"> <i class="fa fa-clock-o fa-3x text-green"></i> </div>
                                    <h3 class="mt-2">Application Requested</h3>
                                    <h5 class="text-gray font-weight-normal pb-2 pb-sm-3">Amount to be blocked <span class="rupee">`</span> 1,000</h5>
                                    <p>Thanks for applying! We have received your request. You will get a notification on your registered UPI App to block the funds. Once you approve the mandate, you will get the IPO in your demat account postallotment. Please note your application number:BONDU4065121 for future reference.</p>
                                    <div class="text-center mt-4 mb-3">
                                        <button onClick="window.location.href = 'apply_in_other_category.html';" formtarget="_blank" type="button" class="btn primary_btn" id="CustomerMsg" data-dismiss="modal">Done</button>
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


export default SGBApplyForm