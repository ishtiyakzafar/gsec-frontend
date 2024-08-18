import { useForm } from "react-hook-form";
import cx from "classnames"
import { useState } from "react";
import OTPForm from "../OTPForm/OTPForm";
import { generateRequestCode } from "../../../helpers/generateRequestCode";
import { sendOTP } from "../../../services/userServices";
import { getOSInfo } from "../../../helpers/getOSInfo";


const LoginPopup = (props) => {
    const { type, modalType } = props

    const [loginData, setLoginData] = useState(null)
    const [otpForm, setOtpForm] = useState(false)

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        setLoginData(data)
        let Head = {
            RequestCode: generateRequestCode(data.inputMobile),
            "AppVer": "01",
            "AppName": "01",
            "OsName": getOSInfo()
        }
        let Body = {
            MobileNo: data.inputMobile
        }
        console.log(data, Head)

        sendOTP({Head, Body}).then(result => {
            console.log(result);
        }).catch(error => {
            console.log(error);
        })
        setOtpForm(true)
    };


    return (
        <div className="ipo_popup">
            <div className="modal fade form_otp_main" id="MobileOTPAuthentication" role="dialog">
                <div className="modal-dialog modal-md modal-dialog-centered">

                    {/* <!-- Modal content--> */}
                    <div className="modal-content"  >
                        <div className="modal-header border-0 text-center p-3 pb-0">
                            <button type="button" className="close" data-dismiss="modal">X</button>
                        </div>
                        <div className="modal-body pt-0 pb-5 dvcart">

                            <div id="step-one" className="py-0 px-2 px-md-5" >

                                {!otpForm ?

                                    <form name="customer-form" id="customer-form" role="form" autocomplete="off" onSubmit={handleSubmit(onSubmit)}>
                                        <h2 className="text-center">Mobile OTP Authentication</h2>

                                        <div className="form-group mt-4">
                                        <label for="PanNumber" class="control-label">Enter Pan Number</label>
                                            <input 
                                                type="text" 
                                                autocomplete="off" 
                                                id="PanNumber" 
                                                className={cx("form-control", (errors.PanNumber && "error"))}
                                                name="PanNumber"
                                                value={"BNZAA2318J"}
                                                maxlength="10"
                                                {...register("PanNumber", { required: true, pattern: /[A-Z]{5}[0-9]{4}[A-Z]{1}/ })}
                                            />
                                            {/* <label for="PanNumber" className="form__label">Enter Full Name</label> */}
                                            {errors.PanNumber?.type === 'required'  && <label id="PanNumber-error" class="error" for="PanNumber">Please enter Pan Number</label>}
                                            {errors.PanNumber?.type === 'pattern'  && <label id="PanNumber-error" class="error" for="PanNumber">Please enter a valid PAN Number</label>}
                                        </div>

                                        <div className="form-group">
                                            <label for="emailid" class="control-label">Enter Email ID</label>
                                            <input 
                                                type="text" 
                                                id="emailid" 
                                                className={cx("form-control", (errors.emailid && "error"))}
                                                name="emailid" 
                                                autocomplete="off" 
                                                {...register("emailid", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                                            />
                                            {/* <label for="emailid" className="form__label">Enter Email ID</label> */}
                                            {errors.emailid?.type === 'required'  && <label id="emailid-error" class="error" for="emailid">Please enter Email ID</label>}
                                            {errors.emailid?.type === 'pattern'  && <label id="emailid-error" class="error" for="emailid">Email Address is invalid: Please enter a valid email address.</label>}
                                        </div>
                                        <div className="form-group">
                                            <label for="inputMobile" class="control-label">Enter Mobile Number</label>
                                            <input 
                                                type="tel" 
                                                autocomplete="off" 
                                                maxlength="10" 
                                                id="inputMobile" 
                                                className={cx("form-control", (errors.inputMobile && "error"))}
                                                name="inputMobile" 
                                                {...register("inputMobile", { required: true, pattern: /[0-9]/, minLength: 10, maxLength: 10 })}
                                            />
                                            {/* <label for="inputMobile" className="form__label">Enter Mobile Number</label> */}
                                            {errors.inputMobile?.type === 'required'  && <label id="inputMobile-error" class="error" for="inputMobile">Please enter mobile number</label>}
                                            {errors.inputMobile?.type === 'pattern'  && <label id="inputMobile-error" class="error" for="inputMobile">Only digits are allowed</label>}
                                            {errors.inputMobile?.type === 'minLength'  && <label id="inputMobile-error" class="error" for="inputMobile">Enter 10 digit mobile number</label>}
                                            {errors.inputMobile?.type === 'maxLength'  && <label id="inputMobile-error" class="error" for="inputMobile">Enter 10 digit mobile number</label>}
                                        </div>
                                        <div className="text-center"> 
                                            <button type="submit" id="btnSubmit" className="btn primary_btn mt-4 text-center">SUBMIT</button>
                                        </div>
                                    </form>

                                :

                                    <OTPForm 
                                        loginData={loginData} 
                                        setOtpForm={setOtpForm}
                                    />

                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default LoginPopup