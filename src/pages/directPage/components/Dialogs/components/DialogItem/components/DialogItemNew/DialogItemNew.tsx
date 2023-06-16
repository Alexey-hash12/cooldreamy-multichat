import styles from './DialogItemNew.module.scss';
import {IoChatbubblesOutline} from 'react-icons/io5';

const DialogItemNew = () => {


    return (
        <div className={styles.wrapper}>
            <div className={styles.icon}><IoChatbubblesOutline/></div>
            <button className={styles.btn}>Напишите сообщение</button>
        </div>
    )
}


export default DialogItemNew;