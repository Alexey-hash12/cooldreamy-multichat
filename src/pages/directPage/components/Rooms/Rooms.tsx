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
import Skeleton from './components/Skeleton/Skeleton';
import Empty from '../../../../components/Empty/Empty';

interface I {
    list: any[],
    type?: 'chat' | 'mail',
    total?: number,
    setPage?:(...args: any[]) => any,
    setSearchValue: (...args: any[]) => any,
    searchValue: string,

    filter: 'online' | 'premium' | 'payed' | 'super_payed' | '',
    setFilter: (...args: any[]) => any,

    loading?: boolean,


    getRooms?: (body: {
        argFilter?: any,
        argPage?: any,
        argSearch?: any,
    }) => any
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

    loading,
    getRooms
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


    const onSelectFilter = (value: any) => {
        if(value === filter) {
            setFilter('')
        } else {
            setFilter(value)
        }
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.tabs}>
                <button 
                    onClick={() => {
                        nav('/direct?type=chat')
                        
                    }}  
                    className={`${styles.tab} ${type === 'chat' ? styles.active : ''}`}>
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
                    <button onClick={() => onSelectFilter('online')} className={`${styles.action_btn} ${styles.aqua} ${filter === 'online' ? styles.active :''}`}><FaHeadphonesAlt/></button>
                    <button onClick={() => onSelectFilter('premium')} className={`${styles.action_btn} ${styles.yellow} ${filter === 'premium' ? styles.active : ''}`}><GiRoundStar/></button>
                    <button onClick={() => onSelectFilter('payed')} className={`${styles.action_btn} ${styles.green} ${filter === 'payed' ? styles.active : ''}`}><TbMoneybag/></button>
                </div>
                <div className={styles.part}>
                    <button onClick={() => onSelectFilter('super_payed')} className={`${styles.action_btn} ${styles.blue} ${filter === 'super_payed' ? styles.active : ''}`}><TbMoneybag/></button>
                </div>
            </div>
            <div className={styles.list}>
                {
                    loading ? (
                        <Skeleton/>
                    ) : (
                        list?.length > 0 ? (
                                list?.map((i,index) => (
                                    <RoomItem {...i} type={type}/>
                                ))
                            
                        ) : <Empty/>
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
        </div>
    )
}

export default Rooms;