import styles from './Limits.module.scss';
import {FC} from 'react';
import LimitItem from './components/LimitItem/LimitItem';
import Skeleton from '../Dialogs/components/Skeleton/Skeleton';
import Empty from '../../../../components/Empty/Empty';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { PulseLoader } from 'react-spinners';

interface I {
    list?: any[]
    setPage?: (...args: any[]) => any
    total?: number
    type?: any

    currentId?: any
    // searchValue?: 
    // setSearchValue

    loading?: boolean,
    onCreateChat?: (...args: any[]) => any
}



const Limits:FC<I> = ({
    list,
    setPage,
    total,
    type,
    currentId,
    loading,
    onCreateChat,
}) => {
    const {inView, ref} = useInView()


    const [loadMore, setLoadMore] = useState<boolean>(false)
    
    
    useEffect(() => {
        if(total !== undefined) {
            (list && list?.length >= total) ? setLoadMore(false) : setLoadMore(true)
        }
       
    }, [list, total])

    useEffect(() => {
        if(loadMore && inView) {
            setPage && setPage((s: number) => s + 1)
        }
    }, [inView, loadMore, setPage, list])

    return (
        <div className={styles.wrapper}>
            {
                (list && list?.length > 0) && list?.map((i, index) => (
                    <LimitItem {...i} onCreateChat={onCreateChat}/>
                ))
            }
            {
                loading ? (
                    <Skeleton/>
                ) : (
                    list && list?.length > 0 ? (
                        list?.map((i, index) => (
                            <LimitItem {...i} onCreateChat={onCreateChat}/>
                        ))
                    ) : (
                        <Empty/>
                    )
                )
            }
            {
                list && list?.length > 0 && (
                    loadMore && (
                        <div ref={ref} className={styles.load}>
                            <PulseLoader color='#fff'/> 
                        </div>
                    )
                )
            }
        </div>
    )
}

export default Limits;