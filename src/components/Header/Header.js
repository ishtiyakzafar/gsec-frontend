
import { withRouter } from "react-router"
import iifl_logo_wht from "../../assets/images/iifl_logo_wht.svg"

const Header = (props) => {
    const {match} = props


    return (
        <>
            <header class="py-3 mb-3">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-5 col-sm-6">
                            <a href="javascript:void(0)" class="iifl_logo">
                                <img src={iifl_logo_wht} alt="IIFL logo" />
                            </a>
                        </div>
                        {match.path === "/view_status" &&
                            <div class="col-7 col-sm-6 text-right">
                                <span class="header_nav">Already Invested?
                                <a href="apply_in_other_category.html" target="_blank" class="login">View Status</a>
                                </span>
                            </div>
                        }
                    </div>

                </div>
            </header>

        </>
    )
}


export default withRouter(Header)