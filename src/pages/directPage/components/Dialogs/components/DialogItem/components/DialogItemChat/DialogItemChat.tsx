import styles from './DialogItemChat.module.scss';
import { IoChatbubblesOutline } from 'react-icons/io5';


const DialogItemChat = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.icon}><IoChatbubblesOutline/></div>
            <div className={styles.text}>
            Is it 4:50 pm there? Future affect y affect you did your first love. Love future future Love future Love future...
            </div>
        </div>
    )
}

export default DialogItemChat