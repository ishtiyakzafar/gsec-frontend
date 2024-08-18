
import about_company from "../../../assets/images/about_company.png"
import video_play_icon from "../../../assets/images/video_play_icon.svg"

const AboutCompany = (props) => {
    const {type} = props


    return (
        <>          
            
            <section className="section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12 col-md-6 mb-3 mb-sm-0" >
                            <h3 className="pb-2">About the Company</h3>
                            <p>Indian Railway Finance Corporation (IRFC) is partly owned subsidiary of the Indian Railways. It raises financial resources for expansion and running through capital markets and other borrowing. IRFC raises money through financial bonds and from banks and financial institutions. </p>
                            <p>The company announced its initial public offering on January 18, 2021 and go listed on the National Stock Exchange of India / Bombay Stock Exchange on January 29, 2021.</p>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="video_box video_outer">
                                <img src={about_company} width="100%" alt="video" />
                                <span className="play_btn">
                                    <a href="javascript:void(0)">
                                        <img src={video_play_icon} width="45px" alt="play" />
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}


export default AboutCompany