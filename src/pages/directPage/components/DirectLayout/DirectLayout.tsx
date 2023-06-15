import { ReactNode } from 'react';
import styles from './DirectLayout.module.scss';



const DirectLayout = ({children}: {children?: ReactNode}) => {


    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    )
}


export default DirectLayout;