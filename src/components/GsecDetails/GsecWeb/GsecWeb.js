import { useEffect,useState } from "react"
import TopSection from "./sections/TopSection";
import MiddleSection from "./sections/MiddleSection";
import InDemand from "./sections/InDemand";
import FilterSection from "./sections/FilterSection";
import s from './sections/Sections.module.scss'
import Sort from "./sections/Sort";


const GsecWeb = () => {
    const [filterByYear, setFilterByYear] = useState('');
    const [filterByType, setFilterByType] = useState('');
    
    // fetch all result
    const fetchGsec = () => {
        console.log('adda');
    }
    // fetch all result ends

    // filter all result
    const filterResult = () => {
        console.log('filterByYear',filterByYear);
    }
    // filter all result ends

    useEffect(() => {
        fetchGsec();
		}, [])
    
    useEffect(() => {
        filterResult();
        }, [filterByYear])    

    let filterYrArr = ['1','3','5','10','20','30'];
    let filtertype = ['T-bill (Tresuary bill)','Govt. bonds','SDL-State Development Loan'];

    return (
        <>
        <section className={s.GsecWebWrap}>
            <TopSection />
            <MiddleSection />
            <InDemand />
            <div className={s.mainResults}>
                <h2>Explore Goverment Securities</h2>
                <div className={s.filterWrap}>
                    <FilterSection 
                        filterYear={filterYrArr} 
                        filtertype={filtertype} 
                        setFilterByYear={setFilterByYear} 
                        setFilterByType={setFilterByType} 
                        filterByYear={filterByYear} 
                        filterByType={filterByType} 
                    />
                </div>
                <div className={s.resultsrWrap}>
                    <Sort />
                    <FilterSection />
                </div>
            </div>
        </section>
        </>
    )
}

export default GsecWeb