import s from './DetailsScreen.module.scss'
import NoImg from '../../../assets/images/noimg.jpg';
import Detailssingle from './DetailsSingle';
import { useLocation,Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getOpenIssuesList,getIssuesByCodes } from '../../../services/issuesServices';
import icon1 from './assets/icon1.png'
import icon2 from './assets/icon2.png'
import icon3 from './assets/icon3.png'
import icon4 from './assets/icon4.png'
import icon7 from './assets/icon7.png'
import icon8 from './assets/icon8.png'
import GsecIndemand from './GsesIndemand';



const SortOption = () => {
    return (
        <>
            <div className={s.sorting}>
                <span className={s.filterTitle}>
                    Filter <img src={icon7} />
                </span>
                <span>Sort <img src={icon8} /></span>
                <span>Highest Returns</span>
                <span>Lowest Risk</span>
            </div>
        </>
    );
}

const GsecDetails = () => {
    const {issues} = useLocation();
    const [allissueList, setallissueList] = useState([]);
    const [issueList, setissueList] = useState([]);
    const [minInvest, setminInvest] = useState('N/A');
    const [invrReturn, setinvrReturn] = useState('N/A');
    const [allCmsData, setallCmsData] = useState([]);
    const [inDeemandIssue, setinDeemandIssue] = useState([]);

    const fetchAllIssues = async ()=>{

        try {
            let {data} = await getOpenIssuesList('all');
		
            if(data.statusCode === 200)
            {
                let gseclist = data.resultData.filter(function(v, i) {
                    return (v.category.trim() === "GS" || v.category.trim() === "TB" || v.category.trim() === "SD");
                })
                
                setissueList([...gseclist]);
                setallissueList([...gseclist])

                let lowestAmt = gseclist?.sort((a, b) => {
                    return a.minAmount - b.minAmount;
                });
                setminInvest(lowestAmt[0]?.minAmount)

                let highestYeld = gseclist?.sort((a, b) => {
                    return b.indicativeYield - a.indicativeYield
                });
                
                let lastElement = highestYeld.pop();                
                setinvrReturn(highestYeld[0]?.indicativeYield+'% - '+lastElement?.indicativeYield+'%')

                
            }
        } catch (error) {
            console.log('err',error);
        }
        

    }

    const searchIssue = (e) => {
       // console.log('searcj',e)
        var str = new RegExp(e, 'gi');
        var issuelist = allissueList.filter(function(v, i) {            
            return (v.issuecode.match(str) || v.schname.match(str));
        })
        //console.log('issyed',issuelist)
        setissueList(issuelist)
    }

    const extractColumn = async(arr, column)  => {
        
        if(arr.length > 1)
        {
            try {
                let returnArr =  arr.map(x => x[column])        
                let {data:cmsdata} = await getIssuesByCodes(returnArr);
                
                if(cmsdata.statusCode === 200)
                {
                    let indemand = []                    
                    setallCmsData(cmsdata.data);

                    indemand = cmsdata.data.filter(function(v, i) {
                        return (v.in_demand === true);
                    })
                    setinDeemandIssue([...indemand]);
                }               

                //setallIssueCode([...returnArr])
            } catch (error) {
                console.log('cms error:',error);
            }
            
        }
        
    }

    useEffect(() => {
        fetchAllIssues();
    }, []);

    useEffect(() => {
        extractColumn(allissueList,'issuecode');
    }, [allissueList]);

    return (
        <>
        <div className={s.detailshead}>
            <div className={s.topDetails}>
                <h4>Get safe and better returns than FD</h4>
                <h2>Goverment Securities</h2>
                <p>
                    G-sec refer to goverment securities which are safest alternative to Bank FDs, guranteed by the Govt. of India
                </p>
            </div>
            <div className={s.detailsTags}>
                <span><img src={icon1} />Govt. Guarantee</span>
                <span><img src={icon2} />No TDS</span>
                <span><img src={icon3} />Portfolio Diversification</span>
            </div>
        </div>

        <div className={s.investmentDetails}>
            <p>Minimum Investment</p>
            <h2>₹{minInvest && minInvest}</h2>
            <div className={s.tenureReturns}>
                <div>
                    <span>Tenure</span>
                    <p>91 days - 40yrs</p>
                </div>
                <div>
                    <span>Returns</span>
                    <p>upto {invrReturn && invrReturn}</p>
                </div>
            </div>
        </div>

        <div className={s.investCmsDetails}>
            <h2>About Goverment Securities <span className={s.watchvideo}><img src={icon4} />  Watch Video</span></h2>
            <div className={s.govtBlock}>
                <h2>Understand Government <br />Securities (G-secs)</h2>
                <Link to={''} className={s.readNow}>Read Now</Link>
            </div>
        </div>

        <div className={s.gsecIndeemandWrap}>
            <GsecIndemand allissues={allissueList} indemand={inDeemandIssue} />
        </div>

        <div className={s.othersInvestmnet}>
            <div className={s.searchSection}>
                <h2>Explore Goverment securities</h2>
                <input type='text' onChange={(e)=>searchIssue(e.target.value)} placeholder='Search a G-sec by ISIN or issuer name'/>
            </div>            
            
            <SortOption />            

            {issueList?.map((e,litm) => {
                
                let cms = {}
                cms = allCmsData.filter(function(v, i) {
                    return (v.issuecode.trim() === e.issuecode);
                })
                cms = cms.pop()

                return ( <Detailssingle details={e} cmsData={cms?cms:[]} /> )
                //return (<h1>{litm} s</h1>)
            })}
            {issueList.length <1 && <div className={s.noResult}><h2>No Results found</h2></div>}

        </div>
        </>
    );
    
}


export default GsecDetails;