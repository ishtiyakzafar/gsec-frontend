import React, { Component } from 'react'
import { MDBDataTable } from 'mdbreact'
import Axios from 'axios'
import { Row, Col, Card, CardBody, Label, Button, ButtonDropdown } from 'reactstrap'
import Pagination from 'react-js-pagination'
import Swal from 'sweetalert2'
import { store } from 'react-notifications-component'
import { Link } from 'react-router-dom'
import { getPaginatedIssues, deleteIssue } from 'services/issuesServices'
import { ShowNotification } from 'components/Notifications/Notifications'




class IssuesTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            documentCounts: 0,
            issueData: [],
            isDataReturned: true,
            activePage: 1,
            numOfItems: 10,
            pageNum: 1
        }
    }

    fetchData = (pageNum = 1) => {
        getPaginatedIssues(this.state.numOfItems, pageNum).then(response => {

            if (response.data.statusCode === 200) {


                let rowsData = []
                for (var i = 0; i < response.data.paginatedData.length; i++) {
                    let rowItem = response.data.paginatedData[i]
                    var status = 'Active'
                    if (new Date(rowItem.expiry_date).getTime() <= new Date().getTime()) {
                        status = 'Expired'
                    }
                    rowItem["issuecode"] = rowItem.issuecode ? rowItem.issuecode : "N/A"
                    rowItem["tag"] = rowItem.tag ? rowItem.tag : "N/A"
                    rowItem["expiry_date"] = new Date(rowItem.expiry_date).toString().substr(0, 15)
                    rowItem["status"] = status
                    rowItem["editBtn"] = <Link to={`/admin/issue/${rowItem._id}`} className="btn btn-info py-2 px-3"> &#x270E;</Link>
                    rowItem["deleteBtn"] = <Button onClick={() => this.handleDelete(rowItem._id)} className="btn btn-danger py-2 px-3">x</Button>

                    rowsData.push(rowItem)
                }


                this.setState({
                    issueData: rowsData,
                    documentCounts: response.data.documentCounts,
                    isDataReturned: true
                })
            }

        }).catch(error => {
            console.log(error)
        })
    }

    componentWillMount() {
        this.fetchData()
    }


    handleDelete = (id) => {

        const prevIssues = this.state.issueData;

        Swal.fire({
            title: "Delete Issue?",
            text: "You will not able to recover this data ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes. delete it!",
            cancelButtonText: "Cancel, keep it"
        }).then(result => {
            if (result.value) {

                this.setState({
                    issueData: this.state.issueData.filter(user => user._id !== id)
                })

                deleteIssue(id).then(response => {

                    if(response.data.statusCode === 401){
                        ShowNotification("Failed!", response.data.message, "danger")
                    }

                    if (response.data.statusCode === 200) {
                        ShowNotification("Success!", "Deleted Successfully!", "success")
                    }

                }).catch(error => {
                    this.setState({
                        issueData: prevIssues
                    })
                    ShowNotification("Error!", "Internal Server Error!", "info")
                })

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                ShowNotification("Cancelled!", "Cancelled Successfully", "info")
            }
        })


    }

    handlePageChange = (pageNumber) => {
        this.setState({
            activePage: pageNumber
        });
        this.fetchData(pageNumber)
    }

    render() {

        const columnData = [
            {
                label: 'CMOTS Code',
                field: 'co_code',
                sort: 'asc',
            },
            {
                label: 'ISSUE Code',
                field: 'issuecode',
                sort: 'asc',
            },
            {
                label: 'Type',
                field: 'issue_type',
                sort: 'asc',
            },
            {
                label: 'Tag',
                field: 'tag',
                sort: 'asc',
            },
            {
                label: 'Expiry Date',
                field: 'expiry_date',
                sort: 'asc',
            },            
            {
                label: 'Status',
                field: 'status',
                sort: 'asc',
            },
            {
                label: 'Edit',
                field: 'editBtn',
                sort: 'asc',
            },
            {
                label: 'Delete',
                field: 'deleteBtn',
                sort: 'asc',
            },
        ]




        return (
            this.state.isDataReturned ?
                <div className="content">
                    <Card>
                        <CardBody>
                            <MDBDataTable
                                hover
                                bordered
                                entries={20}
                                paging={false}
                                data={{
                                    columns: columnData,
                                    rows: this.state.issueData
                                }}
                            />
                            <Pagination
                                itemClass="page-item"
                                linkClass="page-link"
                                activePage={this.state.activePage}
                                itemsCountPerPage={this.state.numOfItems}
                                totalItemsCount={this.state.documentCounts}
                                pageRangeDisplayed={5}
                                onChange={(val) => this.handlePageChange(val)}
                            />
                        </CardBody>
                    </Card>
                </div>
                : <></>
        )
    }
}

export default IssuesTable
