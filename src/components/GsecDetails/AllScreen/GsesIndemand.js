import s from './DetailsScreen.module.scss'
import SingleIndemand from './SingleIndemand'

const GsecIndemand = ({allissues,indemand}) => {    
    let issueList = indemand
    let issueArr = []
    issueList.forEach(element => {
        let temparr = {};
        let issuedata = allissues.filter(function(v, i) {
            return (v.issuecode.trim() === element.issuecode);
        })
        temparr=issuedata[0]
        temparr.cmsData = element
        issueArr.push(temparr)
    });

    return (
        <>
            {issueArr.length > 0 &&
                <div className={s.GsecIndemand}> 
                    <h2>G-Sec In Demand</h2>
                    <p>This G-sec has <b>highest returns</b> and <b>tax free gains</b></p>

                    {issueArr?.map((e,litm) => {                        

                        return ( <SingleIndemand details={e} /> )
                    })}

                </div>
            }
        </>
    )
}

export default GsecIndemand;