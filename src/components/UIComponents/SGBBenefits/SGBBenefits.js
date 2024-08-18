

import capital_appreciation from "../../../assets/images/capital_appreciation.svg"
import capital_gains_tax from "../../../assets/images/capital_gains_tax.svg"
import storage_risk_elimination from "../../../assets/images/storage_risk_elimination.svg"
import gold_bonds from "../../../assets/images/gold_bonds.svg"

const SGBBenefits = (props) => {
    const {type} = props

    return (
        <>
           
            
            <section className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="main_title pb-4">Benefits Of SGB</h2>
                        </div>

                        <div className="col-6 col-sm-6 col-md-3 mb-4 mb-md-0 benefits_grid text-center">
                            <img src={capital_appreciation} alt="capital appreciation" />
                            <span className="d-block pt-3">Additional interest of 2.5% per annum with capital appreciation</span>
                        </div>


                        <div className="col-6 col-sm-6 col-md-3 mb-4 mb-md-0 benefits_grid text-center">
                            <img src={capital_gains_tax} alt="capital appreciation" />
                            <span className="d-block pt-3">Exemption from capital <br className="d-none d-sm-inline-block" /> gains tax</span>
                        </div>


                        <div className="col-6 col-sm-6 col-md-3 mb-4 mb-md-0 benefits_grid text-center">
                            <img src={storage_risk_elimination} alt="capital appreciation" />
                            <span className="d-block pt-3">Storage <br className="d-none d-sm-inline-block" /> risk elimination</span>
                        </div>


                        <div className="col-6 col-sm-6 col-md-3 mb-4 mb-md-0 benefits_grid text-center">
                            <img src={gold_bonds} alt="capital appreciation" />
                            <span className="d-block pt-3">Govt. Backed gold <br className="d-none d-sm-inline-block" /> bonds</span>
                        </div>

                    </div>
                </div>
            </section>


        </>
    )
}


export default SGBBenefits