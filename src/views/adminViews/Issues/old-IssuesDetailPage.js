import Axios from 'axios';
import { ShowNotification } from 'components/Notifications/Notifications';
import { Error_Notification } from 'components/Notifications/Notifications';
import React, { Component, useEffect, useState } from 'react'
import { store } from 'react-notifications-component';
import { Control, Errors, LocalForm } from 'react-redux-form'
import { Row, Col, Card, CardBody, Label, Button } from 'reactstrap'
import { API_BASE_URL } from 'services/axios_client';
import Swal from 'sweetalert2';
import { createIssue, deleteIssue, getIssueById, updateIssue } from "../../../services/issuesServices"
import {CKEditor} from "ckeditor4-react"


const required = (val) => val && val.length;
const lengthSmall = (val) => val && val.length<30;
//const validateDate = (val) => new Date(new Date(val).setHours("00", "00" ,"00" ,"00")).getTime() >= new Date(new Date().setHours("00", "00" ,"00" ,"00")).getTime()
const validateDate = (val) => {
    
     if(new Date(new Date(val)).getTime() <= new Date(new Date()).getTime())
     {
         return false
     }
     else
     {
         return true
     }
 }

const IssuesDetailPage = (props) => {
    const [considerations,setConsiderations]=useState("")
    const [id, setId] = useState(props.match.params.id)
    const [issueData, setIssueData] = useState(null)
    const [tagColor, setTagColor] = useState(false)
    const [badgeColor, setBadgeColor] = useState(false)
    const [upcomingIssue, setupcomingIssue] = useState(0)
    const [highlightedBadgeColor, setHighlightedBadgeColor] = useState(false)
    const [deleteReport, setdeleteReport] = useState(0)
    const [deleteApplifrom, setdeleteApplifrom] = useState(0)
    const [deleteOtimage, setdeleteOtimage] = useState(0)
    const [deleteBanner, setdeleteBanner] = useState(0)


    const handleSubmit = (values) => {
        let data = { ...values }

        // =============== to delete the properties
        if (data?.tag?.length <= 0) delete data.tag_color
        if (data?.badge?.length <= 0) delete data.badge_color
        if (data?.highlighted_badge?.length <= 0) {
            delete data.badge_color_left
            delete data.badge_color_right
        }
        // =============== to delete the properties
        

        const body = {
            co_code: values?.co_code.replace(/(<([^>]+)>)/ig, ''),
            issuecode: values?.issuecode.replace(/(<([^>]+)>)/ig, ''),
            issue_name: values?.issue_name.replace(/(<([^>]+)>)/ig, ''),
            issue_type: values?.issue_type.replace(/(<([^>]+)>)/ig, '') || "IPO",
            tag: values?.tag ? values?.tag.replace(/(<([^>]+)>)/ig, '') : null,
            tag_color: values?.tag ? values.tag_color : null,
            bottom_tag: values?.bottom_tag ? values?.bottom_tag.replace(/(<([^>]+)>)/ig, '') : null,
            badge: values?.badge ? values?.badge.replace(/(<([^>]+)>)/ig, '') : null,
            badge_color: values?.badge ? values?.badge_color : null,
            highlighted_badge: values?.highlighted_badge ? values?.highlighted_badge : null,
            badge_color_left: values?.highlighted_badge ? values?.badge_color_left : null,
            badge_color_right: values?.highlighted_badge ? values?.badge_color_right : null,
            card_type: values?.card_type || 0,
            card_color_left: values?.card_color_left,
            card_color_right: values?.card_color_right,
            video_link: values?.video_link && values?.video_link.replace(/(<([^>]+)>)/ig, ''),
            //expiry_date: (new Date(values?.expiry_date)).toISOString(),
            expiry_date: new Date(values?.expiry_date).toUTCString(),
            expected_listing_gains: values?.expected_listing_gains && values?.expected_listing_gains.replace(/(<([^>]+)>)/ig, ''),
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
            invest_within:values?.invest_within,
            invest_minimum_amount:values?.invest_minimum_amount && values?.invest_minimum_amount.replace(/(<([^>]+)>)/ig, ''),
            invest_minimum_shares:values?.invest_minimum_shares && values?.invest_minimum_shares.replace(/(<([^>]+)>)/ig, ''),
            upper_tag_logo:values?.upper_tag_logo,
            know_more:values?.know_more && values?.know_more.replace(/(<([^>]+)>)/ig, ''),
            apply_button_text:values?.apply_button_text && values?.apply_button_text.replace(/(<([^>]+)>)/ig, ''),
            deleteReport:deleteReport,
            deleteApplifrom:deleteApplifrom,
            deleteOtimage:deleteOtimage,
            deleteBanner:deleteBanner
        }


        const formData = new FormData();
        formData.append("body", JSON.stringify(body))
        if (values?.logo && values?.logo?.length > 0) {
            formData.append("logo", values.logo[0])
        }
        if (values?.report_file && values?.report_file?.length > 0) {
            formData.append("report_file", values.report_file[0])
        }
        
        if (values?.apply_file && values?.apply_file?.length > 0) {
            formData.append("apply_file", values.apply_file[0])
        }

        if (values?.consideration_image && values?.consideration_image?.length > 0) {
            formData.append("consideration_image", values.consideration_image[0])
        }

        if (values?.bannerfile && values?.bannerfile?.length > 0) {
            formData.append("bannerfile", values.bannerfile[0])
        }
        // return


        Swal.fire({
            title: 'Update Profile?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, update it!',
            cancelButtonText: 'Cancel, keep it'
        }).then((result) => {
            if (result.value) {

                updateIssue(id, formData).then(response => {
                    if (response.data.statusCode === 400) {
                        ShowNotification("Already Exists!", response.data.message, "danger")

                    }
                    if (response.data.statusCode === 200) {
                        ShowNotification("Success!", "Issue Creation Successful!", "success")
                        setIssueData(response.data.result)
                    }

                }).catch(error => {
                    ShowNotification("Error!", "Error While Creating Issue!", "info")
                })

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                ShowNotification("Cancelled!", "Cancelled Succesfully!", "info")
            }
        })



    }

    const fetchIssueData = (id) => {
        getIssueById(id).then(response => {
            if (response.data && response.data.statusCode === 200) {
                setIssueData(response.data.result)
                setConsiderations(response.data.result.other_considerations)
                if (response.data.result.tag) setTagColor(true)
                if (response.data.result.badge) setBadgeColor(true)
                if (response.data.result.highlighted_badge) setHighlightedBadgeColor(true)
                setupcomingIssue(response.data.result.upcoming_issue)                    
            } else {
                ShowNotification("Error!", "Error while fetching data", "info")
            }
        })
    }

    const filesizecheck = (e) => {
       
        const file = e.target.files[0];
        
        if (file.size > 2e6) {
            Swal.fire({
                title: "Too Big",
                text: "Please upload a file smaller than 2 MB",
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "Okay",
                cancelButtonText: "Cancel, keep it"
            })
            e.target.value = null;
            return false;
        }
    }

    useEffect(() => {
        fetchIssueData(props.match.params.id)
    }, [])

    const handleDelete = (id) => {


        Swal.fire({
            title: "Delete Issue?",
            text: "You will not able to recover this data ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes. delete it!",
            cancelButtonText: "Cancel, keep it"
        }).then(result => {
            if (result.value) {


                deleteIssue(id).then(response => {

                    if (response.data.statusCode === 401) {
                        ShowNotification("Failed!", response.data.message, "danger")
                    }

                    if (response.data.statusCode === 200) {
                        ShowNotification("Success!", "Deleted Successfully!", "success")
                        props.history.replace("/admin/issues");
                    }

                }).catch(error => {
                    ShowNotification("Error!", "Internal Server Error!", "info")
                })

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                ShowNotification("Cancelled!", "Cancelled Successfully", "info")
            }
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
                            {issueData &&

                                <LocalForm
                                    onSubmit={(values) => handleSubmit(values)}
                                >
                                    <h6>Issue Details</h6>
                                    <hr />
                                    <Row className="form-group py-2">
                                        <Col md={4}>
                                            <Label >CMOTS Code</Label>
                                            <Control.text model=".co_code" id="co_code" name="co_code"
                                                defaultValue={issueData?.co_code}
                                                placeholder="CMOTS Code"
                                                className="form-control"
                                                validators={{
                                                    required
                                                }}
                                            />
                                            <Errors
                                                className="text-danger small"
                                                model=".co_code"
                                                show="touched"
                                                messages={{
                                                    required: "This Field is Required"
                                                }}
                                            />
                                        </Col>

                                        <Col md={4}>
                                        <Label >Issue Name</Label>
                                        <Control.text model=".issue_name" id="issue_name" name="issue_name"
                                            defaultValue={issueData?.issue_name}
                                            placeholder="IPO Name"
                                            className="form-control"
                                            validators = {{
                                                required
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
                                                defaultValue={issueData?.issuecode}
                                                placeholder="Issue Code"
                                                className="form-control"
                                            />
                                        </Col>

                                        <Col md={4}>
                                            <Label >Logo</Label> {issueData?.logo && <a className="small font-weight-bold" href={`${API_BASE_URL}${issueData?.logo}`} target="_blank">View Logo</a>}
                                            <Control.file model=".logo" id="logo" name="logo"
                                                placeholder="Choose File"
                                                accept=".png, .jpg, .jpeg"
                                                className="form-control"
                                                onChange={(e)=>filesizecheck(e)}
                                            // required
                                            />
                                        </Col>


                                    </Row>

                                    <Row className="form-group py-2">
                                        <Col md={4}>
                                            <Label >Issue Type</Label>
                                            <Control.select model=".issue_type" id="issue_type" name="issue_type"
                                                className="form-control"
                                                defaultValue={issueData?.issue_type}
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
                                                defaultValue={issueData?.upcoming_issue}
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
                                            
                                            {/* {new Date(issueData?.expiry_date).toISOString().substr(0,19)} */}
                                            {/* {String(new Date(issueData?.expiry_date).toUTCString())} */}
                                            {/* {String(new Date())}
                                             */}
                                            <Control.text model=".expiry_date" id="expiry_date" name="expiry_date"
                                                type="datetime-local"
                                                className="form-control"
                                                defaultValue={issueData?.expiry_date ? new Date(new Date(issueData?.expiry_date).toString().split('GMT')[0]+' UTC').toISOString().split('.')[0] : null}
                                                validators={{
                                                    validateDate
                                                }}
                                            />
                                            <Errors
                                                className="text-danger small"
                                                model=".expiry_date"
                                                show="touched"
                                                messages={{
                                                    validateDate : "Please select valid date",
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
                                                defaultValue={issueData?.tag}
                                                onChange={(e) => {
                                                    if (e.target.value) {
                                                        setTagColor(true)
                                                    } else {
                                                        setTagColor(false)
                                                    }
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
                                                    defaultValue={issueData?.tag_color || "#0ad533"}
                                                />
                                            </Col>
                                        }

                                        <Col md={4}>
                                            <Label >Bottom Tag</Label>
                                            <Control.text model=".bottom_tag" id="bottom_tag" name="bottom_tag"
                                                placeholder="Bottom Tag"
                                                className="form-control"
                                                defaultValue={issueData?.bottom_tag}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group py-2">


                                        <Col md={4}>
                                            <Label >Badge</Label>
                                            <Control.text model=".badge" id="badge" name="badge"
                                                placeholder="Badge"
                                                className="form-control"
                                                defaultValue={issueData?.badge}
                                                onChange={(e) => {
                                                    if (e.target.value) {
                                                        setBadgeColor(true)
                                                    } else {
                                                        setBadgeColor(false)
                                                    }
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
                                                    defaultValue={issueData?.badge_color || "#00be79"}
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
                                                defaultValue={issueData?.highlighted_badge}
                                                onChange={(e) => {
                                                    if (e.target.value) {
                                                        setHighlightedBadgeColor(true)
                                                    } else {
                                                        setHighlightedBadgeColor(false)
                                                    }
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
                                                        defaultValue={issueData?.badge_color_left || "#21f3f3"}
                                                    />
                                                </Col>
                                                <Col md={4}>
                                                    <Label >Badge Color Right</Label>
                                                    <Control.text model=".badge_color_right" id="badge_color_right" name="badge_color_right"
                                                        type="color"
                                                        placeholder="Tag Color"
                                                        className="form-control"
                                                        defaultValue={issueData?.badge_color_right || "#214cf3"}
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
                                                defaultValue={issueData?.card_color_left || "#21f3f3"}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Label >Card Color Right</Label>
                                            <Control.text model=".card_color_right" id="card_color_right" name="card_color_right"
                                                type="color"
                                                placeholder="Tag Color"
                                                className="form-control"
                                                defaultValue={issueData?.card_color_right || "#214cf3"}
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
                                                defaultValue={issueData?.expected_listing_gains}
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
                                                defaultValue={issueData?.expected_listing_gains}
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
                                                defaultValue={issueData?.promoters_holdings_before}
                                            />
                                        </Col>

                                        <Col md={2}>
                                            <Label >Promoter's Holdings</Label>
                                            <Control.text model=".promoters_holdings_after" id="promoters_holdings_after" name="promoters_holdings_after"
                                                placeholder="After"
                                                className="form-control"
                                                defaultValue={issueData?.promoters_holdings_after}
                                            />
                                        </Col> */}
                                    </Row>
                                    {/* <Row className="form-group py-2">
                                        <Col md={4}>
                                            <Label >IIFL Insight</Label>
                                            <Control.text model=".iifl_insight" id="iifl_insight" name="iifl_insight"
                                                placeholder="IIFL Insight"
                                                className="form-control"
                                                disabled={true}
                                            />
                                        </Col>

                                        <Col md={2}>
                                            <Label >Company Health</Label>
                                            <Control.text model=".company_health_before_type" id="company_health_before_type" name="company_health_before_type"
                                                placeholder="Before Type"
                                                className="form-control"
                                                defaultValue={issueData?.company_health_before_type}
                                            />
                                        </Col>

                                        <Col md={2}>
                                            <Label >Company Health</Label>
                                            <Control.text model=".company_health_after_type" id="company_health_after_type" name="company_health_after_type"
                                                placeholder="After Type"
                                                className="form-control"
                                                defaultValue={issueData?.company_health_after_type}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group py-2">
                                        <Col md={2}>
                                            <Label >Company Health</Label>
                                            <Control.text model=".company_health_before_year" id="company_health_before_year" name="company_health_before_year"
                                                placeholder="Before Year"
                                                className="form-control"
                                                defaultValue={issueData?.company_health_before_year}
                                            />
                                        </Col>

                                        <Col md={2}>
                                            <Label >Company Health</Label>
                                            <Control.text model=".company_health_after_year" id="company_health_after_year" name="company_health_after_year"
                                                placeholder="After Year"
                                                className="form-control"
                                                defaultValue={issueData?.company_health_after_year}
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
                                              initData={issueData?.other_considerations}
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
                                                defaultValue={issueData?.parent_organisation}
                                            />
                                        </Col>
                                        <Col md={4}>
                                            <Label >Founded</Label>
                                            <Control.text model=".founded" id="founded" name="founded"
                                                placeholder="Founded"
                                                className="form-control"
                                                defaultValue={issueData?.founded}
                                            />
                                        </Col>
                                        <Col md={4}>
                                            <Label >Managing Director</Label>
                                            <Control.text model=".managing_director" id="managing_director" name="managing_director"
                                                placeholder="Managing Director"
                                                className="form-control"
                                                defaultValue={issueData?.managing_director}
                                            />
                                        </Col>
                                    </Row> */}
                                    <Row className="form-group py-2">
                                        <Col md={4} className="py-2">
                                            <Label>Report File</Label> 
                                            {issueData?.report_file && 
                                                <>
                                                {deleteReport===0 ?
                                                    <>
                                                      <a className="small font-weight-bold" href={`${API_BASE_URL}${issueData?.report_file}`} target="_blank">View File</a>
                                                      <button href='javascript:void(0)' className="small font-weight-bold btn-xs btn-danger pull-right" onClick={(e) => setdeleteReport(1)}>Remove </button>
                                                    </>
                                                    :
                                                    <>
                                                    <button className="small font-weight-bold btn-xs btn-success pull-right" onClick={(e) => setdeleteReport(0)}>Undo Delete</button>
                                                    </>
                                                }
                                                </>
                                            }
                                            <Control.file model=".report_file" id="report_file" name="report_file"
                                                placeholder="Choose File"
                                                className="form-control"
                                                accept=".pdf"
                                                onChange={(e)=>{filesizecheck(e)
                                                    setdeleteReport(0)}}
                                            />

                                        </Col>

                                        <Col md={4} className="py-2">
                                            <Label>Application Form</Label> 
                                            {issueData?.apply_file && 
                                                <>
                                                {deleteApplifrom===0 ?
                                                    <>
                                                        <a className="small font-weight-bold" href={`${API_BASE_URL}${issueData?.apply_file}`} target="_blank">View File</a>
                                                        <button href='javascript:void(0)' className="small font-weight-bold btn-xs btn-danger pull-right" onClick={(e) => setdeleteApplifrom(1)}>Remove </button>
                                                    </>
                                                    :
                                                    <>
                                                    <button className="small font-weight-bold btn-xs btn-success pull-right" onClick={(e) => setdeleteApplifrom(0)}>Undo Delete</button>
                                                    </>
                                                }
                                            </>
                                            }
                                            <Control.file model=".apply_file" id="apply_file" name="apply_file"
                                                placeholder="Choose File"
                                                className="form-control"
                                                accept=".pdf"
                                                onChange={(e)=>{filesizecheck(e)
                                                    setdeleteApplifrom(0)}}
                                            />

                                        </Col>

                                        <Col md={4} className="py-2">
                                            <Label >Video Link</Label>
                                            <Control.text model=".video_link" id="video_link" name="video_link"
                                                placeholder="Video Link"
                                                className="form-control"
                                                defaultValue={issueData?.video_link}
                                            />
                                        </Col>
                                        <Col md={4} className="py-2">
                                            <Label >Consideration Image</Label> 
                                            {issueData?.consideration_image && 
                                            <>
                                                {deleteOtimage===0 ?
                                                    <>
                                                        <a className="small font-weight-bold" href={`${API_BASE_URL}${issueData?.consideration_image}`} target="_blank">View Image</a>
                                                        <button href='javascript:void(0)' className="small font-weight-bold btn-xs btn-danger pull-right" onClick={(e) => setdeleteOtimage(1)}>Remove </button>
                                                    </>
                                                    :
                                                    <>
                                                        <button className="small font-weight-bold btn-xs btn-success pull-right" onClick={(e) => setdeleteOtimage(0)}>Undo Delete</button>
                                                    </>
                                                }
                                            </>
                                            }
                                            <Control.file model=".consideration_image" id="consideration_image" name="consideration_image"
                                                placeholder="Consideration Image"
                                                className="form-control"
                                                accept=".png, .jpg, .jpeg"
                                                onChange={(e)=>{filesizecheck(e)
                                                    setdeleteOtimage(0)}}
                                            />
                                        </Col>

                                        <Col md={4} className="py-2">
                                            <Label >Banner Image</Label> 
                                            {issueData?.bannerfile && 
                                                    <>
                                                    {deleteBanner===0 ?
                                                        <>
                                                            <a className="small font-weight-bold" href={`${API_BASE_URL}${issueData?.bannerfile}`} target="_blank">View Image</a>
                                                            <button href='javascript:void(0)' className="small font-weight-bold btn-xs btn-danger pull-right" onClick={(e) => setdeleteBanner(1)}>Remove </button>
                                                        </>
                                                        :
                                                        <>
                                                            <button className="small font-weight-bold btn-xs btn-success pull-right" onClick={(e) => setdeleteBanner(0)}>Undo Delete</button>
                                                        </>
                                                    }
                                                </>                                                
                                            }
                                            <Control.file model=".bannerfile" id="bannerfile" name="bannerfile"
                                                placeholder="Banner Image"
                                                className="form-control"
                                                accept=".png, .jpg, .jpeg"
                                                onChange={(e)=>{filesizecheck(e)
                                                                setdeleteBanner(0)}}
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
                                            defaultValue={issueData?.card_type}
                                        >
                                            <option value={0}>Small</option>
                                            <option value={1}>Big</option>
                                        </Control.select>

                                    </Col>
                                    <Col md={4}>
                                        <Label >In-Demand</Label>
                                        <Control.select model=".in_demand" id="in_demand" name="in_demand"
                                            className="form-control"
                                            defaultValue={issueData?.in_demand}
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
                                            defaultValue={issueData?.subscriptions}
                                        />
                                    </Col>
                                </Row>

                                <Row className="form-group py-2">
                                    <Col md={4}>
                                        <Label >Invest Before</Label>
                                        <Control.text model=".invest_within" id="invest_within" name="invest_within"
                                            placeholder="Invest timing"
                                            className="form-control"
                                            defaultValue={issueData?.invest_within}
                                        />
                                    </Col>

                                    <Col md={4}>
                                        <Label >Minimum Invest Amount</Label>
                                        <Control.text model=".invest_minimum_amount" id="invest_minimum_amount" name="invest_minimum_amount"
                                            placeholder="Minimum Invest Amount"
                                            className="form-control"
                                            defaultValue={issueData?.invest_minimum_amount}
                                        />
                                    </Col>

                                    <Col md={4}>
                                        <Label >Minimum Invest Shares</Label>
                                        <Control.text model=".invest_minimum_shares" id="invest_minimum_shares" name="invest_minimum_shares"
                                            placeholder="Minimum Invest Shares"
                                            className="form-control"
                                            defaultValue={issueData?.invest_minimum_shares}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group py-2">
                                    <Col md={4}>
                                        <Label >Upper Tag Icon</Label>
                                        <Control.select model=".upper_tag_logo" id="upper_tag_logo" name="upper_tag_logo"
                                            className="form-control"
                                            defaultValue={issueData?.upper_tag_logo}
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
                                            defaultValue={issueData?.know_more}
                                        />
                                    </Col> */}

                                    {/* <Col md={4}>
                                        <Label >Apply Now Button Text</Label>
                                        <Control.text model=".apply_button_text" id="apply_button_text" name="apply_button_text"
                                            placeholder="Apply Now Button Text"
                                            className="form-control"
                                            defaultValue={issueData?.apply_button_text}
                                        />
                                    </Col> */}
                                </Row>
                                <hr />

                                    <Row className="form-group">
                                        <Col md={6}>
                                            <Button color="danger" id="reset" block onClick={() => handleDelete(id)} disabled={false}>Delete Issue</Button>
                                        </Col>
                                        <Col md={6}>
                                            <Button type="submit" outline block color="success">
                                                Update Issue
                                            </Button>
                                        </Col>
                                    </Row>

                                </LocalForm>

                            }
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default IssuesDetailPage;
