import { useEffect, useState } from "react"
import { IPO, SGB, NCD } from "../../../helpers/constants"
import { getOpenIssuesList, getPastIssuesList } from "../../../services/issuesServices"
import PastPerformerCard from "../PastPerformerCard/PastPerformerCard"

const PastPerformerIssuesComponent = (props) => {
    const { type } = props

    const [issueList, setIssueList] = useState([])
    const [error, setError] = useState(null)

    const fetchIssues = (category) => {
        getPastIssuesList(category).then(response => {

            let result = response?.data


            if (result && result.response && result.response.type === "success") {
                if (result.response.data.NewListingList && result.response.data.NewListingList.recordcount !== 0) {

                    let data = result?.response?.data?.NewListingList?.NewListing || []
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
                <h2 className="main_title pb-3">Past Performers</h2>
            </div>
            <div class="hr_scroll mb-4">
                {issueList.map((chunks, idx) => {
                    return (
                        <div class="hr_inside">
                            {chunks.map((item, i) => {
                                return (
                                    <div className="col-12 pb-4">
                                        <PastPerformerCard 
                                            type={IPO}
                                            eachIssue={item}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    )

                })}
            </div>
            {/* <div class="hr_inside">
                <div className="col-12 pb-4">
                    <PastPerformerCard type={IPO} />
                </div>
                <div className="col-12 pb-4">
                    <PastPerformerCard type={IPO} />
                </div>
            </div> */}

        </>
    )
}


export default PastPerformerIssuesComponent