import styles from './DirectPage.module.scss';
import DirectLayout from './components/DirectLayout/DirectLayout';
import {Row, Col} from 'antd';
import Dialogs from './components/Dialogs/Dialogs';
import Rooms from './components/Rooms/Rooms';
import Direct from './components/Direct/Direct';
import { useAppSelector } from '../../hooks/reduxHooks';
import ApiService from '../../service/ApiService';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IUser } from '../../models/IUser';


const service = new ApiService()

const DirectPage = () => {
    const {token} = useAppSelector(s => s.mainReducer)
    const queryes = useSearchParams()
    const [type, setType] = useState<any>('chat') // chat, mail


    //data
    const [rooms, setRooms] = useState<any[]>([])


    useEffect(() => {
        if(queryes) {
            setType(queryes[0].get('type'))
        }
    }, [queryes])



    useEffect(() => {
        if(token) {
            service.getChats(token).then(res => {
                console.log(res)
            })
        }
    }, [token])


    const getRooms = () => {
        if(token) {
            if(type === 'chat') {
                service.getChats(token).then(res => {
                    setRooms(res?.data)
                })
            }
        }
    }




    useEffect(() => {
        getRooms()
    }, [token, type])

    


    return (
        <div className={styles.wrapper}>
            <DirectLayout>
                <Row gutter={[12,12]}>
                    <Col span={7}>
                        <Dialogs/>
                    </Col>
                    <Col span={10}>
                        <Direct/>
                    </Col>
                    <Col span={7}>
                        <Rooms
                            list={rooms}
                            />
                    </Col>
                </Row>
            </DirectLayout>
        </div>
    )
}

export default DirectPage;