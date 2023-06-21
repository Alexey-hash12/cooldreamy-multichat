import styles from './Input.module.scss';
import { IInput } from './types';
import { FC } from 'react';

const Input:FC<IInput> = (props) => {
    const {afterIcon, beforeIcon, label} = props

    return (
        <div className={styles.wrapper}>
            {
                label && <div className={styles.label}>{label}</div>
            }
            <div className={styles.main}>
                {beforeIcon && <div className={`${styles.icon} ${styles.beforeIcon}`}>{beforeIcon}</div>}
                <input {...props}/>
                {afterIcon && <div className={`${styles.icon} ${styles.afterIcon}`}>{afterIcon}</div>}
            </div>
            
        </div>
    )
}

export default Input;