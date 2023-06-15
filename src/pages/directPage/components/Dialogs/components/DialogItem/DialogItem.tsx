import styles from './DialogItem.module.scss';
import Avatar from '../../../../../../components/Avatar/Avatar';

const DialogItem = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.avatar}>
                <Avatar/>
            </div>
            <div className={styles.body}></div>
        </div>
    )
}


export default DialogItem;