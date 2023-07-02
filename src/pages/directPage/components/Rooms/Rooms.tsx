import styles from './Rooms.module.scss';
import {IoChatbubblesOutline} from 'react-icons/io5';
import {HiOutlineMail} from 'react-icons/hi';
import Input from '../../../../components/Input/Input';
import {FaHeadphonesAlt} from 'react-icons/fa';
import {GiRoundStar} from 'react-icons/gi';
import {TbMoneybag} from 'react-icons/tb';
import RoomItem from './components/RoomItem/RoomItem';
import {FC} from 'react'
import { IUser } from '../../../../models/IUser';
import { useState, useEffect } from 'react';
import { useDebounce } from 'usehooks-ts';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import {PulseLoader} from 'react-spinners'


interface I {
    list: any[],
    type?: 'chat' | 'mail',
    total?: number,
    setPage?:(...args: any[]) => any,
    setSearchValue: (...args: any[]) => any,
    searchValue: string,

    filter: 'online' | 'premium' | 'payed' | 'super_payed' | '',
    setFilter: (...args: any[]) => any
}

const Rooms:FC<I> = ({
    list,
    type,
    total,
    setPage,
    setSearchValue,
    searchValue,
    filter,
    setFilter,
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
            <div className={styles.tabs}>
                <button onClick={() => nav('/direct?type=chat')} className={`${styles.tab} ${type === 'chat' ? styles.active : ''}`}>
                    <div className={styles.label}>
                        <div className={styles.icon}><IoChatbubblesOutline/></div>
                        <div className={styles.title}>Чат</div>
                    </div>
                    {/* <div className={styles.count}>45</div> */}
                </button>
                <button onClick={() => nav('/direct?type=mail')} className={`${styles.tab} ${type === 'mail' ? styles.active : ''}`}>
                    <div className={styles.label}>
                        <div className={styles.icon}><HiOutlineMail/></div>
                        <div className={styles.title}>Письма</div>
                    </div>
                    {/* <div className={styles.count}>2</div> */}
                </button>
            </div>
            <div className={styles.search}>
                <Input
                    value={searchValue}
                    onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                    placeholder='...Поиск'
                    />
            </div>
            <div className={styles.action}>
                <div className={styles.part}>
                    <button onClick={() => setFilter('online')} className={`${styles.action_btn} ${styles.aqua}`}><FaHeadphonesAlt/></button>
                    <button onClick={() => setFilter('premium')} className={`${styles.action_btn} ${styles.yellow}`}><GiRoundStar/></button>
                    <button onClick={() => setFilter('payed')} className={`${styles.action_btn} ${styles.green}`}><TbMoneybag/></button>
                </div>
                <div className={styles.part}>
                    <button onClick={() => setFilter('super_payed')} className={`${styles.action_btn} ${styles.blue}`}><TbMoneybag/></button>
                </div>
            </div>
            <div className={styles.list}>
                {
                    list?.map((i,index) => (
                        <div key={i.id} className={styles.item}><RoomItem {...i} type={type}/></div>
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

export default Rooms;