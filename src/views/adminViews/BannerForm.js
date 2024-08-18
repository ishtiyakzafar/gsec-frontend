import { ShowNotification } from 'components/Notifications/Notifications';
import React, { Component, useState } from 'react'
import { Control, Errors, LocalForm } from 'react-redux-form'
import { Row, Col, Card, CardBody, Label, Button } from 'reactstrap'
import {createBanner} from "../../services/issuesServices"
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
const validateDate = (val) => new Date(new Date(val).setHours("00", "00" ,"00" ,"00")).getTime() >= new Date(new Date().setHours("00", "00" ,"00" ,"00")).getTime()

const BannerForm = () => {
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
        

        

        const body = {
            name: values?.name.replace(/(<([^>]+)>)/ig, ''),
        }


        const formData = new FormData();
        var fileArray;
        var ext;
        formData.append("body", JSON.stringify(body))
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
                  alert('bannerfile File Type Not allowed');
                  return;
              }
            formData.append("bannerfile", values.bannerfile[0])
        }
        




        createBanner(formData).then(response => {
            if(response.data.statusCode === 400){
                ShowNotification("Already Exists!", response.data.message, "danger")
            }
            if(response.data.statusCode === 200){
                ShowNotification("Success!", "Banner Creation Successful!", "success")
                document.getElementById("reset").click()
                document.getElementById("bannerfile").value = "";
            }

        }).catch(error => {
            ShowNotification("Error!", "Error While Creating Banner!", "info")
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
                                <h6>Banner Details</h6>
                                <hr />
                                <Row className="form-group py-2">
                                    <Col md={6}>
                                        <Label >Name</Label>
                                        <Control.text model=".name" id="name" name="name"
                                            placeholder="Name"
                                            className="form-control"
                                            validators = {{
                                                required
                                            }}
                                        />
                                        <Errors
                                            className="text-danger small"
                                            model=".name"
                                            show = "touched"
                                            messages = {{
                                                required : "This Field is Required",                                                
                                            }}
                                        />
                                    </Col>

                                    <Col md={6}>
                                        <Label >Banner</Label>
                                        <Control.file model=".bannerfile" id="bannerfile" name="bannerfile"
                                            placeholder="Choose File"
                                            accept=".png, .jpg, .jpeg"
                                            className="form-control"
                                            onChange={(e)=>filesizecheck(e)}
                                        />
                                    </Col>


                                </Row>

                                <Row className="form-group">
                                    <Col md={6}>
                                        <Button color="danger" id="reset" block type="reset">Reset</Button>
                                    </Col>
                                    <Col md={6}>
                                        <Button type="submit" outline block color="success">
                                            Create
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

export default BannerForm;
