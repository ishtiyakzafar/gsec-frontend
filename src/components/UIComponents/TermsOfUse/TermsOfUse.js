

const TermsOfUse = (props) => {
    const { type } = props


    return (
        <>

            <section className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="main_title pb-3">Terms Of Issue</h2>
                            <div className="clearfix"></div>

                            <div className="terms_main_tbl">
                                <table className="terms_flow_table">
                                    <thead>
                                        <tr>
                                            <th className="bg_green top_left_radius_25 ">Series</th>
                                            <th className="bg_green">I</th>
                                            <th className="bg_green">II</th>
                                            <th className="bg_green">III</th>
                                            <th className="bg_green">IV</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th className="bg_gray">Frequency Of Payment</th>
                                            <td className="bg_gray">Annual</td>
                                            <td className="bg_gray">Monthly</td>
                                            <td className="bg_gray">Cumulative</td>
                                            <td className="bg_gray">Monthly</td>
                                        </tr>

                                        <tr>
                                            <th>Minimum Payment</th>
                                            <td>10,000</td>
                                            <td>10,000</td>
                                            <td>10,000</td>
                                            <td>10,000</td>
                                        </tr>
                                        <tr>
                                            <th>Tenor</th>
                                            <td>87 Months</td>
                                            <td>37 Months</td>
                                            <td>87 Months</td>
                                            <td>87 Months</td>
                                        </tr>

                                        <tr>
                                            <th className="border-bottom-0">Effective Yield</th>
                                            <td className="border-bottom-0">10.00%</td>
                                            <td className="border-bottom-0">10.00%</td>
                                            <td className="border-bottom-0">10.00%</td>
                                            <td className="border-bottom-0">10.00%</td>
                                        </tr>




                                    </tbody>
                                </table>
                            </div>
                        </div>


                    </div>
                </div>
            </section>



        </>
    )
}


export default TermsOfUse