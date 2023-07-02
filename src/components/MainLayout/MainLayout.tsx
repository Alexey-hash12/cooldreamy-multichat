import styles from './MainLayout.module.scss';
import Header from '../Header/Header';
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useState } from 'react';
import ApiService from '../../service/ApiService';

const service = new ApiService()

const MainLayout = ({children}: {children: ReactNode}) => {
    const {pathname} = useLocation()
    const {token} = useAppSelector(s => s.mainReducer)
    // const [pusherConfig, setPusherConfig] = useState<pusherConfigType | null>(null)

    // useEffect(() => {
	// 	if(token) {
	// 		setPusherConfig(
	// 			{
	// 				key: 's3cr3t',
	// 				wsHost: 'api.cooldreamy.com',
	// 				authEndpoint: 'https://api.cooldreamy.com/broadcasting/auth',
	// 				cluster: 'mt1',
	// 				encrypted: true,
	// 				forceTLS: false,
	// 				wsPort: 6001,
	// 				wssPort: 6001,
	// 				disableStats: true,
	// 				enabledTransports: ['ws', 'wss'],
	// 				auth: {
	// 					headers: {
	// 						Authorization: 'Bearer ' + token,
	// 					}
	// 				}
	// 			}
	// 		)
    //         service.getMyProfile(token).then(res => {
    //             console.log(res)
    //         })
	// 	}
	// }, [token])
    

    
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