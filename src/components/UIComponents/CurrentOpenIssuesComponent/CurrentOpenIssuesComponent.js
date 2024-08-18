import { useEffect, useState } from "react"
import { getOpenIssuesList } from "../../../services/issuesServices"
import CurrentCard from "../CurrentCard/CurrentCard"

const CurrentOpenIssuesComponent = (props) => {
    const { type } = props

    const [openIssueList, setOpenIssueList] = useState([])
    const [error, setError] = useState(null)

    const fetchIssues = (category) => {
        getOpenIssuesList(category).then(result => {
            if(result && result.data && result.data.isSuccess && result.data.statusCode === 200){
                setOpenIssueList(result.data.resultData)
            }
        }).catch(error => {
            console.log(error)
            setError(error)
        })
    }

    useEffect(() => {
        fetchIssues("IPO")
    }, [])


    return (
        <>
            <section className="section">
                <div className="container">
                    <div className="row">
                        {openIssueList.length > 0 && openIssueList?.map((eachIssue, idx) => {
                            return (
                                <div className="col-12 col-sm-6 mb-4 mb-md-5" key={idx}>
                                    <CurrentCard 
                                        type={eachIssue.category} 
                                        eachIssue={eachIssue}
                                        setModalType={props.setModalType}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

        </>
    )
}


export default CurrentOpenIssuesComponent