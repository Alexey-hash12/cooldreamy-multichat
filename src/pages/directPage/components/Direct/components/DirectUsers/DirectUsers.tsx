import DirectUser from "./components/DirectUser/DirectUser";
import styles from './DirectUsers.module.scss';
import {FC} from 'react';

interface I {
    selfUser?:any,
    otherUser?:any
}

const DirectUsers:FC<I> = ({
    selfUser,
    otherUser
}) => {


    return (
        <div className={styles.wrapper}>
            <div className={styles.item}><DirectUser {...selfUser}/></div>
            <div className={styles.item}><DirectUser {...otherUser}/></div>
        </div>
    )
}

export default DirectUsers;