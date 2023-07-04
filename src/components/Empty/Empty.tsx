import styles from './Empty.module.scss';
import {FC} from 'react';
import {HiOutlineChatBubbleLeftRight} from 'react-icons/hi2'


interface I {
    label?: string,
    icon?: React.ReactNode
}

const Empty:FC<I> = ({
    label = 'Пусто',
    icon = <HiOutlineChatBubbleLeftRight/>
}) => {


    return (
        <div className={styles.wrapper}>
            <div className={styles.icon}>
                {icon}
            </div>
            <div className={styles.label}>{label}</div>
        </div>
    )
}

export default Empty