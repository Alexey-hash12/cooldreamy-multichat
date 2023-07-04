import styles from './Dialogs.module.scss';
import DialogItem from './components/DialogItem/DialogItem';
import Input from '../../../../components/Input/Input';
import {FiSearch} from 'react-icons/fi';
import {FC, useEffect, useState} from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import {PulseLoader} from 'react-spinners';

interface I {
    list: any[],
    type?: 'chat' | 'mail',
    total?: number,
    setPage?:(...args: any[]) => any,
    setSearchValue: (...args: any[]) => any,
    searchValue: string,
    currentId?:number | string
}


const Dialogs:FC<I> = ({
    list,
    total,
    type,
    setPage,
    searchValue,
    setSearchValue,
    currentId
}) => {
    const {inView, ref} = useInView()
    const nav = useNavigate()


    const [loadMore, setLoadMore] = useState<boolean>(false)
    
    
    useEffect(() => {
        if(total !== undefined) {
            list?.length >= total ? setLoadMore(false) : setLoadMore(true)
        }
       
    }, [list, total])

    useEffect(() => {
        if(loadMore && inView) {
            setPage && setPage((s: number) => s + 1)
        }
    }, [inView, loadMore, setPage, list])


    return (
        <div className={styles.wrapper}>
            <div className={styles.search}>
                <Input
                    placeholder='...Поиск'
                    afterIcon={<FiSearch/>}
                    value={searchValue}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                    />
            </div>
            <div className={styles.list}>
                {
                    list?.map((i,index) => (
                        <div key={index} className={styles.item}><DialogItem {...i} currentId={currentId} type={type}/></div>
                    ))
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
        </div>
    )
}

export default Dialogs;