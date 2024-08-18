import indian_railway from "../../../assets/images/indian_railway.png"
import iifl_ipo_logo from "../../../assets/images/iifl_ipo_logo.svg"
import { formatNumbers } from "../../../helpers/utils"

const UpcomingCard = (props) => {
    const { type, eachIssue } = props


    return (
        <>
            <div className="card_box h-100">
                <div className="ipo_box_main">
                    <div className="ipo_box_main_left">
                        <img src={type === "IPO" ? indian_railway : iifl_ipo_logo} alt="icon" />
                        <span className="d-block text-center pt-1">{type}</span>
                    </div>
                    <div className="ipo_box_main_right pt-2 pt-md-3">
                        <h2>{eachIssue?.lname}</h2>
                        <ul className="innner_grid mt-3 mt-md-4 upcoming_opportunities_list" >
                            <li className="col-6">Date<span className="d-block">14<sup>th</sup> - 16<sup>th</sup> July</span></li>
                            <li className="col-6">Price Range<span className="d-block"><span className="rupee small">`</span>{formatNumbers(eachIssue?.issueprice)} - <span className="rupee small">`</span>{formatNumbers(eachIssue?.issueprice2)}</span> </li>
                            <li className="col-6 mb-0">Min. Investment <span className="d-block"><span className="rupee small">`</span> {eachIssue?.issueprice * eachIssue?.issuesize}</span></li>
                            <li className="col-6 mb-0">Issue Size<span className="d-block">{eachIssue?.issuesize ? eachIssue?.issuesize : "TBA"}</span> </li>
                        </ul>
                    </div>
                </div>
                <div className="clearfix"></div>
            </div>

        </>
    )
}


export default UpcomingCard