import { ShowNotification } from 'components/Notifications/Notifications';
import React, { Component, useState } from 'react'
import { Control, Errors, LocalForm } from 'react-redux-form'
import { Row, Col, Card, CardBody, Label, Button } from 'reactstrap'
import {createIssue} from "../../../services/issuesServices"
import {CKEditor} from "ckeditor4-react"
import Swal from 'sweetalert2';


const required = (val) => val && val.length;
const lengthSmall = (val) => {
    if(val)
        if(val.length<30)
            return true
        else
            return false
    return true
}
const lengthBig = (val) => {
    if(val)
        if(val.length<2000)
            return true;
        else
            return false;
    return true;
}
const validateDate = (val) => {   
   // new Date(new Date(val).setHours("00", "00" ,"00" ,"00")).getTime() >= new Date(new Date().setHours("00", "00" ,"00" ,"00")).getTime()
    if(new Date(new Date(val)).getTime() <= new Date(new Date()).getTime())
    {
        return false
    }
    else
    {
        return true
    }
}

const IssuesForm = () => {
    const [considerations,setConsiderations]=useState("")
    const [tagColor, setTagColor] = useState(false)
    const [upcomingIssue, setupcomingIssue] = useState(0)
    const [badgeColor, setBadgeColor] = useState(false)
    const [highlightedBadgeColor, setHighlightedBadgeColor] = useState(false)


    // Check file size for images
    const filesizecheck = (e) => {
       
        const file = e.target.files[0];
        
        if (file.size > 2e6) {
            Swal.fire({
                title: "Too Big",
                text: "Please upload a file smaller than 1 MB",
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "Okay",
                cancelButtonText: "Cancel, keep it"
            })
            e.target.value = null;
            return false;
        }
    }
    // End Check file size for images

    const handleSubmit = (values) => {
        let data = {...values}
        
        // =============== to delete the properties
        if(data?.tag?.length <= 0) delete data.tag_color
        if(data?.badge?.length <= 0) delete data.badge_color
        if(data?.highlighted_badge?.length <= 0) {
            delete data.badge_color_left
            delete data.badge_color_right
        }
        // =============== to delete the properties

        

        const body = {
            co_code: values?.co_code.replace(/(<([^>]+)>)/ig, ''),
            issuecode: values?.issuecode.replace(/(<([^>]+)>)/ig, ''),
            issue_name: values?.issue_name.replace(/(<([^>]+)>)/ig, ''),
            issue_type: values?.issue_type || "IPO",
            tag: values?.tag ? values?.tag.replace(/(<([^>]+)>)/ig, '') : null,
            tag_color: values?.tag ? values.tag_color : null,
            bottom_tag: values?.bottom_tag ? values?.bottom_tag.replace(/(<([^>]+)>)/ig, '') : null,
            badge: values?.badge ? values?.badge : null,
            badge_color: values?.badge ? values?.badge_color : null,
            highlighted_badge: values?.highlighted_badge ? values?.highlighted_badge : null,
            badge_color_left: values?.highlighted_badge ? values?.badge_color_left : null,
            badge_color_right: values?.highlighted_badge ? values?.badge_color_right : null,
            card_type: values?.card_type || 0,
            card_color_left: values?.card_color_left,
            card_color_right: values?.card_color_right,
            video_link: values?.video_link && values?.video_link.replace(/(<([^>]+)>)/ig, ''),
            //expiry_date: values?.expiry_date,
            expiry_date: new Date(values?.expiry_date).toUTCString(),
            expected_listing_gains: values?.expected_listing_gains && values?.expected_listing_gains.replace(/(<([^>]+)>)/ig, ''),
            //iifl_insight: values?.iifl_insight,
            promoters_holdings_after: values?.promoters_holdings_after && values?.promoters_holdings_after.replace(/(<([^>]+)>)/ig, ''),
            promoters_holdings_before: values?.promoters_holdings_before && values?.promoters_holdings_before.replace(/(<([^>]+)>)/ig, ''),
            company_health_after_type: values?.company_health_after_type && values?.company_health_after_type.replace(/(<([^>]+)>)/ig, ''),
            company_health_before_type: values?.company_health_before_type && values?.company_health_before_type.replace(/(<([^>]+)>)/ig, ''),
            company_health_after_year: values?.company_health_after_year && values?.company_health_after_year.replace(/(<([^>]+)>)/ig, ''),
            company_health_before_year: values?.company_health_before_year && values?.company_health_before_year.replace(/(<([^>]+)>)/ig, ''),
            other_considerations: considerations,
            parent_organisation: values?.parent_organisation && values?.parent_organisation.replace(/(<([^>]+)>)/ig, ''),
            founded: values?.founded && values?.founded.replace(/(<([^>]+)>)/ig, ''),
            managing_director: values?.managing_director && values?.managing_director.replace(/(<([^>]+)>)/ig, ''),
            in_demand: values?.in_demand,
            subscriptions: values?.subscriptions && values?.subscriptions.replace(/(<([^>]+)>)/ig, ''),
            invest_within:values?.invest_within && values?.invest_within.replace(/(<([^>]+)>)/ig, ''),
            invest_minimum_amount:values?.invest_minimum_amount && values?.invest_minimum_amount.replace(/(<([^>]+)>)/ig, ''),
            invest_minimum_shares:values?.invest_minimum_shares && values?.invest_minimum_shares.replace(/(<([^>]+)>)/ig, ''),
            upper_tag_logo:values?.upper_tag_logo,
            know_more:values?.know_more && values?.know_more.replace(/(<([^>]+)>)/ig, ''),
            apply_button_text:values?.apply_button_text && values?.apply_button_text.replace(/(<([^>]+)>)/ig, ''),
            upcoming_issue: values?.upcoming_issue
        }


        const formData = new FormData();
        var fileArray;
        var ext;
        formData.append("body", JSON.stringify(body))
        if(values?.logo && values?.logo?.length > 0){
            fileArray=values.logo[0].name.split(".");
            ext=fileArray[fileArray.length-1];
            switch (ext) {
                case 'jpg':
                case 'bmp':
                case 'png':
                case 'tif':
                  break;
                default:
                  alert('Logo File Type Not allowed');
                  return;
              }
            formData.append("logo", values.logo[0])
        }
        if(values?.report_file && values?.report_file?.length > 0){
            fileArray=values.report_file[0].name.split(".");
            ext=fileArray[fileArray.length-1];
            switch (ext) {
                case 'pdf':
                  break;
                default:
                  alert('Report File Type Not allowed');
                  return;
              }
            formData.append("report_file", values.report_file[0])
        }

        if(values?.apply_file && values?.apply_file?.length > 0){
            fileArray=values.apply_file[0].name.split(".");
            ext=fileArray[fileArray.length-1];
            switch (ext) {
                case 'pdf':
                  break;
                default:
                  alert('Report File Type Not allowed');
                  return;
              }
            formData.append("apply_file", values.apply_file[0])
        }
        if(values?.consideration_image && values?.consideration_image?.length > 0){
            fileArray=values.consideration_image[0].name.split(".");
            ext=fileArray[fileArray.length-1];
            switch (ext) {
                case 'jpg':
                case 'bmp':
                case 'png':
                case 'tif':
                  break;
                default:
                  alert('Consideration Image Type Not allowed');
                  return;
              }
            formData.append("consideration_image", values.consideration_image[0])
        }
        if(values?.bannerfile && values?.bannerfile?.length > 0){
            fileArray=values.bannerfile[0].name.split(".");
            ext=fileArray[fileArray.length-1];
            switch (ext) {
                case 'jpg':
                case 'bmp':
                case 'png':
                case 'tif':
                  break;
                default:
                  alert('Consideration Image Type Not allowed');
                  return;
              }
            formData.append("bannerfile", values.bannerfile[0])
        }




        createIssue(formData).then(response => {
            if(response.data.statusCode === 400){
                ShowNotification("Already Exists!", response.data.message, "danger")
            }
            if(response.data.statusCode === 200){
                ShowNotification("Success!", "Issue Creation Successful!", "success")
                document.getElementById("reset").click()
                document.getElementById("logo").value = "";
                document.getElementById("report_file").value = "";
                document.getElementById("apply_file").value = "";
                document.getElementById("consideration_image").value = "";
                document.getElementById("bannerfile").value = "";
            }

        }).catch(error => {
            ShowNotification("Error!", "Error While Creating Issue!", "info")
        })
    }

    function logEvent(e) {
      // console.log("104",e.editor.getData());
      setConsiderations(e.editor.getData());
    }



    return (
        <div className="content">
            <Row>
                <Col md={12}>
                    <Card>
                        <CardBody>

                            <LocalForm
                                onSubmit={(values) => handleSubmit(values)}
                            >
                                <h6>Issue Details</h6>
                                <hr />
                                <Row className="form-group py-2">
                                    <Col md={4}>
                                        <Label >CMOTS Code</Label>
                                        <Control.text model=".co_code" id="co_code" name="co_code"
                                            placeholder="CMOTS Code"
                                            className="form-control"
                                            validators = {{
                                                required,lengthSmall
                                            }}
                                        />
                                        <Errors
                                            className="text-danger small"
                                            model=".co_code"
                                            show = "touched"
                                            messages = {{
                                                required : "This Field is Required",
                                                lengthSmall : "Field Length should be less than 30"
                                            }}
                                        />
                                    </Col>

                                    <Col md={4}>
                                        <Label >Issue Name</Label>
                                        <Control.text model=".issue_name" id="issue_name" name="issue_name"
                                            placeholder="IPO Name"
                                            className="form-control"
                                            validators = {{
                                                required,
                                            }}
                                        />
                                        <Errors
                                            className="text-danger small"
                                            model=".issue_name"
                                            show = "touched"
                                            messages = {{
                                                required : "This Field is Required",                                               
                                            }}
                                        />
                                    </Col>




                                    <Col md={4}>
                                        <Label >Issue Code</Label>
                                        <Control.text model=".issuecode" id="issuecode" name="issuecode"
                                            placeholder="Issue Code"
                                            className="form-control"
                                            validators ={{
                                                lengthSmall
                                            }}
                                        />
                                        <Errors
                                            className="text-danger small"
                                            model=".issuecode"
                                            show = "touched"
                                            messages = {{
                                                lengthSmall : "Field Length should be less than 30"
                                            }}
                                        />
                                    </Col>


                                    <Col md={4}>
                                        <Label >Logo</Label>
                                        <Control.file model=".logo" id="logo" name="logo"
                                            placeholder="Choose File"
                                            accept=".png, .jpg, .jpeg"
                                            className="form-control"
                                            onChange={(e)=>filesizecheck(e)}
                                        />
                                    </Col>


                                </Row>
                                <Row className="form-group py-2">
                                    <Col md={4}>
                                        <Label >Issue Type</Label>
                                        <Control.select model=".issue_type" id="issue_type" name="issue_type"
                                            className="form-control"
                                            defaultValue={"IPO"}
                                        >
                                            <option value={"IPO"}>IPO</option>
                                            <option value={"SGB"}>SGB</option>
                                            <option value={"NCD"}>NCD</option>
                                        </Control.select>

                                    </Col>

                                    <Col md={4}>
                                        <Label >Upcoming Issue</Label>
                                        <Control.select model=".upcoming_issue" id="upcoming_issue" name="upcoming_issue"
                                            className="form-control"
                                            defaultValue={0}

                                            onChange={(e) => {                                            	
                                            	setupcomingIssue(e.target.value)
                                            }}
                                        >
                                            <option value={0}>No</option>
                                            <option value={1}>Yes</option>
                                        </Control.select>

                                    </Col>

                                    <Col md={4}>
                                        <Label >{upcomingIssue == 1 ? 'Upcoming Date' : 'Expiry Date'}</Label>
                                        <Control.text model=".expiry_date" id="expiry_date" name="expiry_date"
                                            type="datetime-local"
                                            className="form-control"
                                            validators = {{
                                                validateDate
                                            }}
                                        />
                                        <Errors
                                            className="text-danger small"
                                            model=".expiry_date"
                                            show = "touched"
                                            messages = {{
                                                validateDate : "Please select a valid date",
                                            }}
                                        />

                                    </Col>


                                </Row>


                                <hr />
                                <h6>Tag Details</h6>
                                <hr />
                                <Row className="form-group py-2">

                                    <Col md={4}>
                                        <Label >Tag</Label>
                                        <Control.text model=".tag" id="tag" name="tag"
                                            placeholder="Tag"
                                            className="form-control"
                                            onChange={(e) => {
                                                if(e.target.value){
                                                    setTagColor(true)
                                                }else{
                                                    setTagColor(false)
                                                }
                                            }}
                                            validators ={{
                                                lengthSmall
                                            }}
                                        />
                                         <Errors
                                            className="text-danger small"
                                            model=".tag"
                                            show = "touched"
                                            messages = {{
                                                lengthSmall : "Field Length should be less than 30"
                                            }}
                                        />
                                    </Col>
                                    {tagColor &&
                                        <Col md={4}>
                                            <Label >Tag Color</Label>
                                            <Control.text model=".tag_color" id="tag_color" name="tag_color"
                                                type="color"
                                                placeholder="Tag Color"
                                                className="form-control"
                                                defaultValue="#0ad533"
                                            />
                                        </Col>
                                    }

                                    <Col md={4}>
                                        <Label >Bottom Tag</Label>
                                        <Control.text model=".bottom_tag" id="bottom_tag" name="bottom_tag"
                                            placeholder="Bottom Tag"
                                            className="form-control"
                                            validators ={{
                                                lengthSmall
                                            }}
                                        />
                                        <Errors
                                            className="text-danger small"
                                            model=".bottom_tag"
                                            show = "touched"
                                            messages = {{
                                                lengthSmall : "Field Length should be less than 30"
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group py-2">


                                    <Col md={4}>
                                        <Label >Badge</Label>
                                        <Control.text model=".badge" id="badge" name="badge"
                                            placeholder="Badge"
                                            className="form-control"
                                            onChange={(e) => {
                                                if(e.target.value){
                                                    setBadgeColor(true)
                                                }else{
                                                    setBadgeColor(false)
                                                }
                                            }}
                                            validators ={{
                                                lengthSmall
                                            }}
                                        />
                                        <Errors
                                            className="text-danger small"
                                            model=".badge"
                                            show = "touched"
                                            messages = {{
                                                lengthSmall : "Field Length should be less than 30"
                                            }}
                                        />
                                    </Col>

                                    {badgeColor &&
                                        <Col md={4}>
                                            <Label >Badge Color</Label>
                                            <Control.text model=".badge_color" id="badge_color" name="badge_color"
                                                type="color"
                                                placeholder="Badge Color"
                                                className="form-control"
                                                defaultValue="#00be79"
                                            />
                                        </Col>
                                    }

                                </Row>

                                <Row className="form-group py-2">
                                    <Col md={4}>
                                        <Label >Highlighted Badge</Label>
                                        <Control.text model=".highlighted_badge" id="highlighted_badge" name="highlighted_badge"
                                            className="form-control"
                                            placeholder="Highlighted Badge"
                                            onChange={(e) => {
                                                if(e.target.value){
                                                    setHighlightedBadgeColor(true)
                                                }else{
                                                    setHighlightedBadgeColor(false)
                                                }
                                            }}
                                            validators ={{
                                                lengthSmall
                                            }}
                                        />
                                         <Errors
                                            className="text-danger small"
                                            model=".highlighted_badge"
                                            show = "touched"
                                            messages = {{
                                                lengthSmall : "Field Length should be less than 30"
                                            }}
                                        />

                                    </Col>

                                    {highlightedBadgeColor &&
                                        <>
                                            <Col md={4}>
                                                <Label >Badge Color Left</Label>
                                                <Control.text model=".badge_color_left" id="badge_color_left" name="badge_color_left"
                                                    type="color"
                                                    placeholder="Tag Color"
                                                    className="form-control"
                                                    defaultValue="#21f3f3"
                                                />
                                            </Col>
                                            <Col md={4}>
                                                <Label >Badge Color Right</Label>
                                                <Control.text model=".badge_color_right" id="badge_color_right" name="badge_color_right"
                                                    type="color"
                                                    placeholder="Tag Color"
                                                    className="form-control"
                                                    defaultValue="#214cf3"
                                                />
                                            </Col>
                                        </>
                                    }

                                </Row>

                                {/* <hr />
                                <h6>Card Details</h6>
                                <hr />
                                <Row className="form-group py-2">
                                    <Col md={6}>
                                        <Label >Card Color Left</Label>
                                        <Control.text model=".card_color_left" id="card_color_left" name="card_color_left"
                                            type="color"
                                            placeholder="Tag Color"
                                            className="form-control"
                                            defaultValue="#21f3f3"
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <Label >Card Color Right</Label>
                                        <Control.text model=".card_color_right" id="card_color_right" name="card_color_right"
                                            type="color"
                                            placeholder="Tag Color"
                                            className="form-control"
                                            defaultValue="#214cf3"
                                        />
                                    </Col>

                                </Row> */}


                                <hr />
                                <h6>Other Details</h6>
                                <hr />
                                <Row className="form-group py-2">
                                    <Col md={4}>
                                        <Label >Subscriptions</Label>
                                        <Control.text model=".subscriptions" id="subscriptions" name="subscriptions"
                                            placeholder="Subscriptions"
                                            className="form-control"
                                            disabled={true}
                                        />
                                    </Col>

                                    <Col md={4}>
                                        {/*<Label >Expected Listing Gains</Label>
                                        <Control.select model=".expected_listing_gains" id="expected_listing_gains" name="expected_listing_gains"
                                            className="form-control"
                                            defaultValue={0}
                                        >
                                            <option value={0}>Sky High</option>
                                            <option value={1}>High</option>
                                            <option value={2}>Moderate</option>
                                            <option value={3}>Low</option>
                                            <option value={4}>Very Low</option>
                                        </Control.select>*/}
                                        <Label >IIFL Insight</Label>
                                        <Control.select model=".expected_listing_gains" id="expected_listing_gains" name="expected_listing_gains"
                                            className="form-control"
                                            defaultValue={0}
                                        >
                                            <option value={0}>Not Sure</option>
                                            <option value={1}>Don't Miss</option>
                                            <option value={2}>Go for it!</option>
                                        </Control.select>

                                    </Col>
                                    

                                    {/* <Col md={2}>
                                        <Label >Promoter's Holdings</Label>
                                        <Control.text model=".promoters_holdings_before" id="promoters_holdings_before" name="promoters_holdings_before"
                                            placeholder="Before"
                                            className="form-control"
                                            validators ={{
                                                lengthSmall
                                            }}
                                        />
                                         <Errors
                                            className="text-danger small"
                                            model=".promoters_holdings_before"
                                            show = "touched"
                                            messages = {{
                                                lengthSmall : "Field Length should be less than 30"
                                            }}
                                        />
                                    </Col>

                                    <Col md={2}>
                                        <Label >Promoter's Holdings</Label>
                                        <Control.text model=".promoters_holdings_after" id="promoters_holdings_after" name="promoters_holdings_after"
                                            placeholder="After"
                                            className="form-control"
                                            validators ={{
                                                lengthSmall
                                            }}
                                        />
                                         <Errors
                                            className="text-danger small"
                                            model=".promoters_holdings_after"
                                            show = "touched"
                                            messages = {{
                                                lengthSmall : "Field Length should be less than 30"
                                            }}
                                        />
                                    </Col> */}
                                </Row>
                                {/* <Row className="form-group py-2">
                                    <Col md={2}>
                                        <Label >Company Health</Label>
                                        <Control.text model=".company_health_before_type" id="company_health_before_type" name="company_health_before_type"
                                            placeholder="Before Type"
                                            className="form-control"
                                            validators ={{
                                                lengthSmall
                                            }}
                                        />
                                         <Errors
                                            className="text-danger small"
                                            model=".company_health_before_type"
                                            show = "touched"
                                            messages = {{
                                                lengthSmall : "Field Length should be less than 30"
                                            }}
                                        />
                                    </Col>

                                    <Col md={2}>
                                        <Label >Company Health</Label>
                                        <Control.text model=".company_health_after_type" id="company_health_after_type" name="company_health_after_type"
                                            placeholder="After Type"
                                            className="form-control"
                                            validators ={{
                                                lengthSmall
                                            }}
                                        />
                                         <Errors
                                            className="text-danger small"
                                            model=".company_health_after_type"
                                            show = "touched"
                                            messages = {{
                                                lengthSmall : "Field Length should be less than 30"
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group py-2">
                                    <Col md={2}>
                                        <Label >Company Health</Label>
                                        <Control.text model=".company_health_before_year" id="company_health_before_year" name="company_health_before_year"
                                            placeholder="Before Year"
                                            className="form-control"
                                            validators ={{
                                                lengthSmall
                                            }}
                                        />
                                         <Errors
                                            className="text-danger small"
                                            model=".company_health_before_year"
                                            show = "touched"
                                            messages = {{
                                                lengthSmall : "Field Length should be less than 30"
                                            }}
                                        />
                                    </Col>

                                    <Col md={2}>
                                        <Label >Company Health</Label>
                                        <Control.text model=".company_health_after_year" id="company_health_after_year" name="company_health_after_year"
                                            placeholder="After Year"
                                            className="form-control"
                                            validators ={{
                                                lengthSmall
                                            }}
                                        />
                                         <Errors
                                            className="text-danger small"
                                            model=".company_health_after_year"
                                            show = "touched"
                                            messages = {{
                                                lengthSmall : "Field Length should be less than 30"
                                            }}
                                        />
                                    </Col>
                                </Row> */}
                                <Row className="form-group py-2">
                                    <Col>
                                        <Label >Other Considerations</Label>
                                        {/*<Control.textarea model=".other_considerations" id="other_considerations" name="other_considerations"
                                            placeholder="Other Considerations"
                                            className="form-control"
                                        />*/}
                                        <CKEditor
                                  				onChange={logEvent}
                                  			/>
                                    </Col>
                                </Row>
                                {/* <Row className="form-group py-2">
                                    <Col md={4}>
                                        <Label >Parent Organisation</Label>
                                        <Control.text model=".parent_organisation" id="parent_organisation" name="parent_organisation"
                                            placeholder="Parent Organisation"
                                            className="form-control"
                                            validators ={{
                                                lengthBig
                                            }}
                                        />
                                        <Errors
                                            className="text-danger small"
                                            model=".parent_organisation"
                                            show = "touched"
                                            messages = {{
                                                lengthBig : "Field Length should be less than 2000"
                                            }}
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Label >Founded</Label>
                                        <Control.text model=".founded" id="founded" name="founded"
                                            placeholder="Founded"
                                            className="form-control"
                                            validators ={{
                                                lengthBig
                                            }}
                                        />
                                        <Errors
                                            className="text-danger small"
                                            model=".founded"
                                            show = "touched"
                                            messages = {{
                                                lengthBig : "Field Length should be less than 2000"
                                            }}
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Label >Managing Director</Label>
                                        <Control.text model=".managing_director" id="managing_director" name="managing_director"
                                            placeholder="Managing Director"
                                            className="form-control"
                                            validators ={{
                                                lengthBig
                                            }}
                                        />
                                        <Errors
                                            className="text-danger small"
                                            model=".managing_director"
                                            show = "touched"
                                            messages = {{
                                                lengthBig : "Field Length should be less than 2000"
                                            }}
                                        />
                                    </Col>
                                </Row> */}
                                <Row className="form-group py-2">
                                    <Col md={4}>
                                        <Label >Report File</Label>
                                        <Control.file model=".report_file" id="report_file" name="report_file"
                                            placeholder="Choose File"
                                            className="form-control"
                                            accept=".pdf"
                                            onChange={(e)=>filesizecheck(e)}
                                        />
                                    </Col>

                                    <Col md={4}>
                                            <Label>Application Form</Label> 
                                            <Control.file model=".apply_file" id="apply_file" name="apply_file"
                                                placeholder="Choose File"
                                                className="form-control"
                                                accept=".pdf"
                                                onChange={(e)=>filesizecheck(e)}
                                            />
                                        </Col>

                                    <Col md={4}>
                                        <Label >Video Link</Label>
                                        <Control.text model=".video_link" id="video_link" name="video_link"
                                            placeholder="Video Link"
                                            className="form-control"
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Label >Consideration Image</Label>
                                        <Control.file model=".consideration_image" id="consideration_image" name="consideration_image"
                                            placeholder="Consideration Image"
                                            className="form-control"
                                            accept=".png, .jpg, .jpeg"
                                            onChange={(e)=>filesizecheck(e)}
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <Label >Banner Image</Label>
                                        <Control.file model=".bannerfile" id="bannerfile" name="bannerfile"
                                            placeholder="Banner Image"
                                            className="form-control"
                                            accept=".png, .jpg, .jpeg"
                                            onChange={(e)=>filesizecheck(e)}
                                        />
                                    </Col>

                                    <hr />

                                </Row>

                                <h6>In-Demand</h6>
                                <hr />
                                <Row className="form-group py-2">
                                    <Col md={4}>
                                        <Label >Card Type</Label>
                                        <Control.select model=".card_type" id="card_type" name="card_type"
                                            className="form-control"
                                            defaultValue={0}
                                        >
                                            <option value={0}>Small</option>
                                            <option value={1}>Big</option>
                                        </Control.select>

                                    </Col>
                                    <Col md={4}>
                                        <Label >In-Demand</Label>
                                        <Control.select model=".in_demand" id="in_demand" name="in_demand"
                                            className="form-control"
                                            defaultValue={false}
                                        >
                                            <option value={false}>No</option>
                                            <option value={true}>Yes</option>
                                        </Control.select>
                                    </Col>
                                    <Col md={4}>
                                        <Label >Subscription Info</Label>
                                        <Control.text model=".subscriptions" id="subscriptions" name="subscriptions"
                                            placeholder="Subscription Info"
                                            className="form-control"
                                            validators ={{
                                                lengthBig
                                            }}
                                        />
                                        <Errors
                                            className="text-danger small"
                                            model=".subscriptions"
                                            show = "touched"
                                            messages = {{
                                                lengthBig : "Field Length should be less than 2000"
                                            }}
                                        />
                                    </Col>
                                </Row>

                                <Row className="form-group py-2">
                                    <Col md={4}>
                                        <Label >Invest Before</Label>
                                        <Control.text model=".invest_within" id="invest_within" name="invest_within"
                                            type="date"
                                            placeholder="Invest Before"
                                            className="form-control"
                                        />
                                    </Col>

                                    <Col md={4}>
                                        <Label >Minimum Invest Amount</Label>
                                        <Control.text model=".invest_minimum_amount" id="invest_minimum_amount" name="invest_minimum_amount"
                                            placeholder="Minimum Invest Amount"
                                            className="form-control"
                                            validators ={{
                                                lengthSmall
                                            }}
                                        />
                                        <Errors
                                            className="text-danger small"
                                            model=".invest_minimum_amount"
                                            show = "touched"
                                            messages = {{
                                                lengthSmall : "Field Length should be less than 30"
                                            }}
                                        />
                                    </Col>

                                    <Col md={4}>
                                        <Label >Minimum Invest Shares</Label>
                                        <Control.text model=".invest_minimum_shares" id="invest_minimum_shares" name="invest_minimum_shares"
                                            placeholder="Minimum Invest Shares"
                                            className="form-control"
                                            validators ={{
                                                lengthSmall
                                            }}
                                        />
                                        <Errors
                                            className="text-danger small"
                                            model=".invest_minimum_shares"
                                            show = "touched"
                                            messages = {{
                                                lengthSmall : "Field Length should be less than 30"
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group py-2">
                                    <Col md={4}>
                                        <Label >Upper Tag Icon</Label>
                                        <Control.select model=".upper_tag_logo" id="upper_tag_logo" name="upper_tag_logo"
                                            className="form-control"
                                            defaultValue={'none'}
                                        >
                                            <option value={'none'}>None</option>
                                            <option value={'fire'}>On fire!</option>
                                            <option value={'percentage'}>Tax benefits</option>
                                            <option value={'rupees'}>Fixed Returns</option>
                                            <option value={'discount'}>On Discount</option>
                                        </Control.select>

                                    </Col>

                                    {/* <Col md={4}>
                                        <Label >Know More</Label>
                                        <Control.text model=".know_more" id="know_more" name="know_more"
                                            placeholder="Know More Link"
                                            className="form-control"
                                            validators ={{
                                                lengthBig
                                            }}
                                        />
                                        <Errors
                                            className="text-danger small"
                                            model=".know_more"
                                            show = "touched"
                                            messages = {{
                                                lengthBig : "Field Length should be less than 2000"
                                            }}
                                        />
                                    </Col> */}

                                    {/*<Col md={4}>
                                        <Label >Apply Now</Label>
                                        <Control.text model=".apply_button_text" id="apply_button_text" name="apply_button_text"
                                            placeholder="Apply Now Button Text"
                                            className="form-control"
                                        />
                                    </Col>*/}
                                </Row>
                                <hr />

                                <Row className="form-group">
                                    <Col md={6}>
                                        <Button color="danger" id="reset" block type="reset">Reset</Button>
                                    </Col>
                                    <Col md={6}>
                                        <Button type="submit" outline block color="success">
                                            Register
                                        </Button>
                                    </Col>
                                </Row>

                            </LocalForm>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default IssuesForm;
