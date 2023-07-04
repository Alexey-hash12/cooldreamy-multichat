import styles from './MainLayout.module.scss';
import Header from '../Header/Header';
import { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import { useState } from 'react';
import ApiService from '../../service/ApiService';
import { pusherConfigType } from '../../utils/getChannels';
import { main_deleteInbox, main_updateAdminId, main_updateInbox, main_updateNewChatMessage, main_updateNewMailMessage, main_updateSocket } from '../../store/slices/mainSlice';
import getChannels from '../../utils/getChannels';
import socketEvents from '../../utils/socketEvents';


const service = new ApiService()

const MainLayout = ({children}: {children: ReactNode}) => {
    const {pathname} = useLocation()
    const {token, socketChanel, adminId} = useAppSelector(s => s.mainReducer)
	const dispatch = useAppDispatch()
	const [pusherConfig, setPusherConfig] = useState<pusherConfigType | null>(null)


	useEffect(() => {
		token && service.getSelf(token).then(res => {
			if(res) dispatch(main_updateAdminId(res))
		})
	}, [token])


    useEffect(() => {
		if(token) {
			setPusherConfig(
				{
					key: 's3cr3t',
					wsHost: 'newapi.soultri.site',
					authEndpoint: 'https://newapi.soultri.site/broadcasting/auth',
					cluster: 'mt1',
					encrypted: true,
					forceTLS: false,
					wsPort: 6001,
					wssPort: 6001,
					disableStats: true,
					enabledTransports: ['ws', 'wss'],
					auth: {
						headers: {
							Authorization: 'Bearer ' + token,
						}
					}
				}
			)
            // service.getMyProfile(token).then(res => {
            //     console.log(res)
            // })
		}
		console.log(token)
	}, [token])

	useEffect(() => {
		if(pusherConfig && adminId && !socketChanel) {
			const channels = getChannels(pusherConfig).private(`App.User.${adminId}`);
			dispatch(main_updateSocket(channels))
			channels.subscribed(() => {
				// notify('Соединение установлено', 'SUCCESS')
				// notify('Соединение установлено', 'SUCCESS')
			})
		}
	}, [pusherConfig, adminId, socketChanel])

	


	useEffect(() => {
		if(socketChanel) {
			socketChanel?.listen(socketEvents.eventNewChatMessage, (data: any) => {
				dispatch(main_updateNewChatMessage(data))
			})
			socketChanel?.listen(socketEvents.eventNewMailMessage, (data: any) => {
				dispatch(main_updateNewMailMessage(data))
			})
			socketChanel?.listen(socketEvents.eventDeleteInbox, (data: any) => {
				dispatch(main_deleteInbox(data))
			})
			socketChanel?.listen(socketEvents.eventNewInbox, (data: any) => {
				console.log(data)
				dispatch(main_updateInbox(data))
			})
		}
	}, [socketChanel])

    
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