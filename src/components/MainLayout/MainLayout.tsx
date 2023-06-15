import styles from './MainLayout.module.scss';
import Header from '../Header/Header';
import { ReactNode } from 'react';

const MainLayout = ({children}: {children: ReactNode}) => {

    return (
        <div className={styles.wrapper}>
            <Header/>
            <div className={styles.main}>
                {children}
            </div>
        </div>
    )
}

export default MainLayout;