import { useEffect, useState } from "react"
import { IPO, SGB, NCD } from "../../../helpers/constants"
import { getOpenIssuesList, getUpcomingIssuesList } from "../../../services/issuesServices"
import UpcomingCard from "../UpcomingCard/UpcomingCard"

const UpcomingIssuesComponent = (props) => {
    const { type } = props

    const [issueList, setIssueList] = useState([])
    const [error, setError] = useState(null)

    const fetchIssues = (category) => {
        getUpcomingIssuesList(category).then(response => {

            let result = response?.data
            console.log("forthcoming", result);


            if (result && result.response && result.response.type === "success") {
                if (result.response.data.ForthcomingIssueList && result.response.data.ForthcomingIssueList.recordcount !== 0) {

                    let data = result?.response?.data?.ForthcomingIssueList?.ForthcomingIssue || []
                    let res = []
                    for (let i = 0; i < data.length; i = i + 2) {
                        const chunk = data.slice(i, i + 2)
                        res.push(chunk)
                    }
                    setIssueList(res)
                }
            }
        }).catch(error => {
            console.log(error)
            setError(error)
        })
    }

    useEffect(() => {
        fetchIssues(12) // count or all
    }, [])



    return (
        <>
            <div className="col-12">
                <h2 className="main_title pb-3">Upcoming Opportunities</h2>
            </div>
            <div class="hr_scroll mb-4">
                {issueList.map((chunks, idx) => {
                    return (
                        <div class="hr_inside">
                            {chunks.map((item, i) => {
                                return (
                                    <div className="col-12 pb-4">
                                        <UpcomingCard
                                            type={IPO}
                                            eachIssue={item}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    )

                })}
                {/* <div class="hr_inside">
                    <div className="col-12  pb-4">
                        <UpcomingCard type={SGB} />
                    </div>
                    <div className="col-12  pb-4">
                        <UpcomingCard type={IPO} />
                    </div>
                </div> */}
            </div>

        </>
    )
}


export default UpcomingIssuesComponent