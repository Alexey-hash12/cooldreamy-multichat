import styles from './RoomItem.module.scss';
import Avatar from '../../../../../../components/Avatar/Avatar';


const RoomItem = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.avatar}><Avatar/></div>
            <div className={styles.body}></div>
            <div className={styles.avatar}><Avatar/></div>
        </div>
    )
}


export default RoomItem;