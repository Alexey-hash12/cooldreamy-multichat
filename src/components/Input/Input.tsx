import styles from './Input.module.scss';
import { IInput } from './types';
import { FC } from 'react';

const Input:FC<IInput> = (props) => {
    const {afterIcon, beforeIcon} = props

    return (
        <div className={styles.wrapper}>
            {beforeIcon && <div className={`${styles.icon} ${styles.beforeIcon}`}>{beforeIcon}</div>}
            <input {...props}/>
            {afterIcon && <div className={`${styles.icon} ${styles.afterIcon}`}>{afterIcon}</div>}
        </div>
    )
}

export default Input;