import styles from './LimitItem.module.scss';
import {memo, FC} from 'react';


const LimitItemComponent:FC<any> = ({

}) => {

    return (
        <div className={styles.wrapper}>
            
        </div>
    )
}


const LimitItem = memo(LimitItemComponent)

export default LimitItem;