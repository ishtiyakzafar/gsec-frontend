import { useForm } from "react-hook-form";
import cx from "classnames"
import { generateRequestCode } from "../../../helpers/generateRequestCode";
import { getOSInfo } from "../../../helpers/getOSInfo";
import { useEffect, useRef, useState } from "react";
import { sendOTP, verifyOTP } from "../../../services/userServices";


const OTPForm = (props) => {
    const { type, loginData, setOtpForm } = props

    const intervalRef = useRef(null)

    const [enable, setEnable] = useState(true)  
    const [timer, setTimer] = useState('00:00')
    const [otpFormData, setOTPFormData] = useState(null)

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        setOTPFormData(data)
        let Head = {
            RequestCode: generateRequestCode(loginData.inputMobile),
            "AppVer": "01",
            "AppName": "01",
            "OsName": getOSInfo()
        }
        let Body = {
            MobileNo: loginData.inputMobile,
            OTP: data.inputMobileOTP,
            ReferenceId: 2012,
        }
        console.log(data, Head)

        verifyOTP({Head, Body}).then(result => {
            console.log(result);
        }).catch(error => {
            console.log(error);
        })
        // setOtpForm(true)
    };
    

    // ===================Timer===========================

    function getRemainingTime(endTime) {
        const total = Date.parse(endTime) - Date.parse(new Date())
        const seconds = Math.floor((total/1000)%60)
        const minutes = Math.floor((total/1000/60)%60)

        return {total, seconds, minutes}
    }

    function startTimer(deadline) {
        let {total, seconds, minutes} = getRemainingTime(deadline)
        if(total >= 0){
            setTimer(
                (minutes > 9 ? minutes : "0"+minutes) + ":" + (seconds > 9 ? seconds : "0"+seconds)
            )
        }else{
            clearInterval(intervalRef.current)
            setEnable(true)
        }
        
    }

    function clearTimer(endTime) {
        setTimer('00:10')
        if(intervalRef.current) clearInterval(intervalRef.current)
        const id = setInterval(() => {
            startTimer(endTime)
        }, 1000)
        intervalRef.current = id
    }

    function getDeadlineTime() {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds()+10)
        deadline.setMinutes(deadline.getMinutes()+0)
        return deadline
    }

    // ===================Timer End===========================

    useEffect(() => {
        clearTimer(getDeadlineTime())
        setEnable(false)
        return () => {if(intervalRef.current) clearInterval(intervalRef.current)}
    }, [])

    const handleResendOtp = () => {

        let Head = {
            RequestCode: generateRequestCode(loginData.inputMobile),
            "AppVer": "01",
            "AppName": "01",
            "OsName": getOSInfo()
        }
        let Body = {
            MobileNo: loginData.inputMobile
        }

        sendOTP({Head, Body}).then(result => {
            console.log(result);
            
        }).catch(error => {
            console.log(error);
            setEnable(false)
            clearTimer(getDeadlineTime())
        })      
        
    }

    





    return (
        <form name="formMobileOTP" className="backBtn text-center" id="formMobileOTP" role="form" autocomplete="off" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="h3 verify-otp text-center">Verify OTP</h2>
            <p className="info mt-4">We have sent an OTP to your registered Mobile ******5632
                <a href="javascript:void(0)" className="d-block" id="mobileChange" onClick={() => setOtpForm(false)}>Change</a>
            </p>
            <div className="form-group text-left mt-3">
                <label for="inputMobileOTP" class="control-label">Enter OTP</label>
                <input
                    type="text"
                    autocomplete="off"
                    maxlength="4"
                    id="inputMobileOTP"
                    className={cx("form-control", (errors.inputMobileOTP && "error"))}
                    name="inputMobileOTP"
                    {...register("inputMobileOTP", { required: true, pattern: /[0-9]/, minLength: 4, maxLength: 4 })}
                />
                {/* <label for="inputMobileOTP" className="form__label">Enter OTP</label> */}
                {errors.inputMobileOTP?.type === 'required' && <label id="inputAccount-error" class="error" for="inputAccount">Incorrect OTP</label>}
                {errors.inputMobileOTP?.type === 'minLength' && <label id="inputAccount-error" class="error" for="inputAccount">Enter 4 digit OTP</label>}
                {errors.inputMobileOTP?.type === 'maxLength' && <label id="inputAccount-error" class="error" for="inputAccount">Enter 4 digit OTP</label>}
                {errors.inputMobileOTP?.type === 'pattern' && <label id="inputAccount-error" class="error" for="inputAccount">Only digits are allowed</label>}
            </div>
            <button id="btnSubmitOTP" type="submit" className="btn primary_btn  h-auto mt-3" > Submit OTP </button>
            <span className="timer"> 
                {!enable ?
                    <span className="dvtimer mt-3">Resend OTP <span id="timer" className="OTPtime">{timer} seconds</span></span>
                :
                    <button className="link-btn " id="resend-otp-link" type="button" onClick={() => handleResendOtp()} >Resend OTP</button>
                }
            </span>
        </form>
    )
}


export default OTPForm