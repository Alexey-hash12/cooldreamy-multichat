import styles from './UserTitle.module.scss';
import {FC} from 'react';

interface I {
    username?: string,
    age?: number | string,
    justify?: 'flex-end' | 'flex-start'
}

const UserTitle:FC<I> = ({
    username,
    age,
    justify = 'flex-start'
}) => {


    return (
        <div className={styles.wrapper} style={{justifyContent: justify}}>
            <span className={styles.username}>{username}</span><span className={styles.age}>, {age}</span>
        </div>
    )
}

export default UserTitle;