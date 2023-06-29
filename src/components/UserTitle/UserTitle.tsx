import styles from './UserTitle.module.scss';
import {FC} from 'react';

interface I {
    username?: string,
    age?: number | string
}

const UserTitle:FC<I> = ({
    username,
    age
}) => {


    return (
        <div className={styles.wrapper}>
            <span className={styles.age}>{username}</span><span className={styles.age}>, {age}</span>
        </div>
    )
}

export default UserTitle;