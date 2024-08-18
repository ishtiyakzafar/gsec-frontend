import indian_railway from "../../../assets/images/indian_railway.png"
import next_arrow from "../../../assets/images/next_arrow.svg"
import { IPO, SGB } from "../../../helpers/constants"
import { dateToDaysFormatter, formatNumbers } from "../../../helpers/utils"

const CurrentCard = (props) => {
    const { type, eachIssue, setModalType } = props


    return (
        <>
            <div className="card_box h-100">
                <div className="ipo_box_main">
                    <div className="ipo_box_main_left">
                        <img src={indian_railway} alt="icon" />
                        <span className="d-block text-center pt-1">{type}</span>
                    </div>
                    <div className="ipo_box_main_right pt-2 pt-md-3">
                        <div className="title_main">
                            <h2>{eachIssue?.schname}</h2>
                            <span className="arrow_next text-right">
                                <a href={type === IPO ? "/ipo_card_details" : (type === SGB ? "/sovereign_gold_bond_card_details" : "/home_finance_bond_card_details")} target="_blank">
                                <img src={next_arrow} width="12px" alt="arrow" /></a>
                            </span>
                        </div>
                        <ul className="innner_grid mt-3 mt-md-4">
                            <li>Date<span className="d-block">{ dateToDaysFormatter(eachIssue?.opndt, eachIssue?.clsdt)}</span></li>
                            <li>Price Range<span className="d-block"><span className="rupee small">`</span>{formatNumbers(eachIssue?.lowprice)} - <span className="rupee small">`</span>{formatNumbers(eachIssue?.highprice)}</span></li>
                            <li>Min. Investment<span className="d-block"><span className="rupee small">`</span>{formatNumbers(eachIssue?.lowprice * eachIssue?.lotsize)}</span></li>
                        </ul>
                    </div>
                </div>
                <div className="btn_group  pt-3 pt-md-4"> <a className="btn secondary_btn float-left">IPO was subscribed 7.45 times</a> 
                    {false ?  // if login
                        <a href={type === IPO ? "/ipo_apply" : (type === SGB ? "/sgb_apply" : "/ncd_apply")} target="_blank" className="btn primary_btn float-right">Apply Now</a>
                    :
                        <a data-toggle="modal" data-target="#MobileOTPAuthentication" href="javascript:void(0)" className="btn primary_btn float-right" onClick={() => setModalType("apply_clk")}>Apply Now</a>                    
                    }
                    
                    <div className="clearfix"></div>
                </div>
                {type == "IPO" && <span className="recommended">IIFL Recommended</span>}
                <div className="clearfix"></div>
            </div>

        </>
    )
}


export default CurrentCard