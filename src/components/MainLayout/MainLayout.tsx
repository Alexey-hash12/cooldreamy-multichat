import styles from './MainLayout.module.scss';
import Header from '../Header/Header';
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


const MainLayout = ({children}: {children: ReactNode}) => {
    const {pathname} = useLocation()
    
    

    return (
        <div className={styles.wrapper}>
            {
                pathname !== '/auth' && <Header/> 
            }
            
            <div className={styles.main}>
                {children}
            </div>
        </div>
    )
}

export default MainLayout;