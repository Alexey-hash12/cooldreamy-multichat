import styles from './DirectPage.module.scss';
import DirectLayout from './components/DirectLayout/DirectLayout';
import {Row, Col} from 'antd';
import Dialogs from './components/Dialogs/Dialogs';
import Rooms from './components/Rooms/Rooms';
import Direct from './components/Direct/Direct';
import { useAppSelector } from '../../hooks/reduxHooks';
import ApiService from '../../service/ApiService';
import { useEffect } from 'react';



const service = new ApiService()

const DirectPage = () => {
    const {token} = useAppSelector(s => s.mainReducer)


    useEffect(() => {
        if(token) {
            service.getLinkedUsers(token).then(res => {
                console.log(res)
            })
        }
    }, [token])


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
                        <Rooms/>
                    </Col>
                </Row>
            </DirectLayout>
        </div>
    )
}

export default DirectPage;