import IconButton from '../IconButton/IconButton';
import styles from './Header.module.scss';
import {IoMdNotificationsOutline} from 'react-icons/io';
import ApiService from '../../service/ApiService';
import { useAppSelector } from '../../hooks/reduxHooks';
import {useEffect, useState} from 'react';
import { LOCAL_STORAGE } from '../../utils/localStorage';
import { main_tokenDelete } from '../../store/slices/mainSlice';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const service = new ApiService()

const Header = () => {
    const nav = useNavigate()
    const dispatch = useAppDispatch()
    const {token} = useAppSelector(s => s.mainReducer)

    const [workTime, setWorkTime] = useState<any>('')
    const [profit, setProfit] = useState<any>(0)

    const [disableStart, setDisableStart] = useState(false)
    const [disableStop, setDisableStop] = useState(false)


    useEffect(() => {
        getData()
    }, [token])

    const getData = () => {
        if(token) {
            service.getWork(token).then(res => {
                console.log(res)
                if(Object.keys(res)?.length === 0) {
                    setWorkTime('00:00')
                    setDisableStart(false)
                    setDisableStop(true)
                } else {
                    const dateFrom = moment(res?.date_from).valueOf()
                    const t = Date.now() - dateFrom
                    setWorkTime(moment(t).format('HH:MM'))
                    setDisableStart(true)
                    setDisableStop(false)
                }
            })
        }
    }

    const logout = () => {
        LOCAL_STORAGE.removeItem('cooldreamy-multichat-token')
        dispatch(main_tokenDelete())
        nav('/auth')
    }


    const onStart = () => {
        if(token) {
            service.workStart(token).then(res => {
                console.log(res)
                getData()
            })
        }
    }

    const onStop = () => {
        if(token) {
            service.workStop(token).then(res => {
                console.log(res)
                getData()
            })
        }
    }
    

    return (
        <div className={styles.wrapper}>
            <div className={styles.in}>
                <div className={styles.tabs}>
                    <button className={`${styles.tabs_btn} ${styles.active}`}></button>
                    <button className={styles.tabs_btn}></button>
                </div>
                <div className={styles.main}>
                    <div className={styles.info}>
                        <div className={styles.info_item}>
                        В работе: <span>{workTime}</span>
                        </div>
                        <div className={styles.info_item}>
                        Заработок: <span>${profit}</span>
                        </div>
                    </div>
                    <div className={styles.action}>
                        <button disabled={disableStop} onClick={onStop} className={styles.btn}>СТОП</button>
                        <button disabled={disableStart} onClick={onStart} className={styles.btn}>СТАРТ</button>
                    </div>
                </div>
                <div className={styles.action}>
                    <div className={styles.action_item}>
                        <IconButton
                            icon={<IoMdNotificationsOutline/>}
                            isNewAction
                            />
                    </div>
                    <div className={styles.action_item}>
                        <button onClick={logout} className={styles.action_btn}>
                            Выход
                        </button>
                    </div>
                </div>  
            </div>
        </div>
    )
}

export default Header;