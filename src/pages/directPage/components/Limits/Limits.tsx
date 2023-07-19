import styles from './Limits.module.scss';
import {FC} from 'react';
import LimitItem from './components/LimitItem/LimitItem';

interface I {
    list?: any[]
    setPage?: (...args: any[]) => any
    total?: number
    type?: any

    currentId?: any
    // searchValue?: 
    // setSearchValue

    loading?: boolean
}



const Limits:FC<I> = ({
    list,
    setPage,
    total,
    type,
    currentId,
    loading
}) => {

    return (
        <div className={styles.wrapper}>
            {
                (list && list?.length > 0) && list?.map((i, index) => (
                    <LimitItem {...i}/>
                ))
            }
        </div>
    )
}

export default Limits;