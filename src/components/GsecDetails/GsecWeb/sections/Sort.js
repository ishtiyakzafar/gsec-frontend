import s from './Sections.module.scss'

const Sort = () => {
    const sortArr = [
        {
            id:1,
            name:'Tenure : low to high'
        },
        {
            id:2,
            name:'Tenure  : high to low'
        },
        {
            id:3,
            name:'Indicative yeild : low to high'
        },
        {
            id:4,
            name:'Indicative yeild : high to low'
        },
    ]

    return (
        <>
            <div>
                <span>Sort By :</span>
                <span>Tenure : low to high
                    <ul>
                        {sortArr?.map((e,litm) => {
                            return ( <li>{e.name}</li> )
                        })}
                    </ul>
                </span>
            </div>
        </>
    )

}

export default Sort;