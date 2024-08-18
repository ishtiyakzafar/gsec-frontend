import indian_railway from "../../../assets/images/indian_railway.png"
import iifl_ipo_logo from "../../../assets/images/iifl_ipo_logo.svg"
import { calculateGain, formatNumbers, BondCardDateFormatter } from "../../../helpers/utils"

const PastPerformerCard = (props) => {
    const { type, eachIssue } = props


    return (
        <>
            <div className="card_box h-100">
                <div className="ipo_box_main">
                    <div className="ipo_box_main_left">
                        <img src={type === "IPO" ? indian_railway : iifl_ipo_logo } alt="icon" />
                        <span className="d-block text-center pt-1">{type}</span>
                    </div>
                    <div className="ipo_box_main_right pt-2 pt-md-3">
                        <h2>{eachIssue?.co_name}</h2>
                        <div className="btn_group  pt-3"> <a className="btn secondary_btn">Listed at <b> {formatNumbers(eachIssue?.listprice)}</b> for <b>{calculateGain(eachIssue?.listprice, eachIssue?.offerprice)}%</b> gains</a> </div>
                        <ul className="innner_grid mt-3 mt-md-4">
                            {/* <li>Date<span className="d-block">14<sup>th</sup> - 16<sup>th</sup> July</span></li> */}
                            <li>Date{BondCardDateFormatter(eachIssue?.listdate)}</li>
                            <li>Offer Price<span className="d-block"><span className="rupee small">`</span>{formatNumbers(eachIssue?.offerprice)}</span> </li>
                        </ul>
                    </div>
                </div>
                {/* {type === "IPO" ?
                    <span class="recommended">You applied for this</span>
                :
                    <span class="recommended miss_opportunity">You missed this opportunity</span>
                } */}
                <div className="clearfix"></div>
            </div>

        </>
    )
}


export default PastPerformerCard