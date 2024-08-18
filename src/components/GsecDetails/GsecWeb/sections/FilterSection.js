import s from './Sections.module.scss'
import NoImg from '../../../../assets/images/noimg.jpg';

const FilterSection = ({filterYear,filtertype,setFilterByYear,setFilterByType,filterByYear,filterByType}) => {
    return (
        <>
            <div className={s.FilterSection}>
                <h2>Search</h2>
                <p>Search bond by name or Issuer name</p>
                <input type='text' placeholder='Search a G-sec by ISIN or issuer name' />

                <div className={s.filters}>
                    <h2>Filters</h2>
                    <h3>Tenure</h3>
                    <div className={s.list}>

                    {filterYear?.map((e,litm) => {
                            return (
                                <span onClick={(event)=>{ setFilterByYear(e) }}  className={filterByYear===e ? s.active : ''} >Upto {e} year</span>
                             )                         
                     })}
                       
                    </div>
                </div>

                <div className={s.filters}>                   
                    <h3>G-Sec type</h3>
                    <div className={s.list}>
                        {filtertype?.map((e,litm) => {
                                return (
                                    <span onClick={(event)=>{ setFilterByType(e) }} className={filterByType===e ? s.active : ''} >{e}</span>
                                )                         
                        })}
                    </div>
                </div>

            </div>
        </>
    )
}

export default FilterSection;