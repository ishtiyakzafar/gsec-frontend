import s from './Sections.module.scss'
import NoImg from '../../../../assets/images/noimg.jpg';
import GsecIndemand from '../../AllScreen/GsesIndemand';
import picon from '../assets/pico.png'
import ricon from '../assets/ricon.png'

const InDemand = () => {
    let arr = [1,2,3]
    return (
        <>
        <div className={s.InDemandWrap}>
            <div className={s.InDemand}>
                <div className={s.leftSection}>
                    <h2>In demand G-Sec</h2>
                    <div className={s.iconbadge}>
                        <img src={ricon} />
                        Highest returns
                    </div>
                    <div className={s.iconbadge}>
                        <img src={picon} />
                        Tax free gains
                    </div>
                </div>
                <div className={s.RightSection}>
                    <GsecIndemand allissues={[]} indemand={[]} />
                </div>
            </div>
        </div>

        </>
    )
}

export default InDemand