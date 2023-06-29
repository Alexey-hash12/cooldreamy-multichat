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

interface I {
    list: any[]
}

const Rooms:FC<I> = ({
    list
}) => {


    return (
        <div className={styles.wrapper}>
            <div className={styles.tabs}>
                <button className={`${styles.tab} ${styles.active}`}>
                    <div className={styles.label}>
                        <div className={styles.icon}><IoChatbubblesOutline/></div>
                        <div className={styles.title}>Чат</div>
                    </div>
                    <div className={styles.count}>45</div>
                </button>
                <button className={styles.tab}>
                    <div className={styles.label}>
                        <div className={styles.icon}><HiOutlineMail/></div>
                        <div className={styles.title}>Письма</div>
                    </div>
                    <div className={styles.count}>2</div>
                </button>
            </div>
            <div className={styles.search}>
                <Input
                    placeholder='...Поиск'
                    />
            </div>
            <div className={styles.action}>
                <div className={styles.part}>
                    <button className={`${styles.action_btn} ${styles.aqua}`}><FaHeadphonesAlt/></button>
                    <button className={`${styles.action_btn} ${styles.yellow}`}><GiRoundStar/></button>
                    <button className={`${styles.action_btn} ${styles.green}`}><TbMoneybag/></button>
                </div>
                <div className={styles.part}>
                    <button className={`${styles.action_btn} ${styles.blue}`}><TbMoneybag/></button>
                </div>
            </div>
            <div className={styles.list}>
                {
                    list?.map((i,index) => (
                        <div key={i.id} className={styles.item}><RoomItem {...i}/></div>
                    ))
                }
            </div>
        </div>
    )
}

export default Rooms;