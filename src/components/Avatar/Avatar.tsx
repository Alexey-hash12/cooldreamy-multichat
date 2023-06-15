import styles from './Avatar.module.scss';
import {FC} from 'react';
import { IAvatar } from './types';


const Avatar:FC<IAvatar> = ({
    size = 60,
    isNewAction = true,
    isRound
}) => {


    return (
        <div 
            style={{width: size, height: size}}
            className={`${styles.wrapper} ${isNewAction ? styles.new : ''} ${isRound ? styles.round : ''}`}>
            <div className={styles.avatar}></div>
        </div>
    )
}


export default Avatar;