import styles from './DirectPage.module.scss';
import DirectLayout from './components/DirectLayout/DirectLayout';
import {Row, Col} from 'antd';
import Dialogs from './components/Dialogs/Dialogs';
import Rooms from './components/Rooms/Rooms';
import Direct from './components/Direct/Direct';

const DirectPage = () => {


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