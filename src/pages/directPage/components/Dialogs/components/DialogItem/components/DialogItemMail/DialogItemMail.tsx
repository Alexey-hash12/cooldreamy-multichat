import styles from './DialogItemMail.module.scss';
import {FiMail} from 'react-icons/fi';

const DialogItemMail = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.icon}><FiMail/></div>
            <div className={styles.text}>
            Is it 4:50 pm there? Future affect y affect you did your first love. Love future future Love future Love future...
            </div>
        </div>
    )
}


export default DialogItemMail;