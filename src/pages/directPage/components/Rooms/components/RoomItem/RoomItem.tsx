import styles from './RoomItem.module.scss';
import Avatar from '../../../../../../components/Avatar/Avatar';
import { Row, Col } from 'antd';
import UserTitle from '../../../../../../components/UserTitle/UserTitle';

const RoomItem = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.part}>
                <Avatar/>
                <div className={styles.body}>
                    <Row gutter={[3,3]}>
                        <Col span={24}>
                            <UserTitle/>
                        </Col>
                        <Col span={24}>
                            98:32
                        </Col>
                        <Col span={24}>
                            <div className={styles.y}>id 123456</div>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className={styles.badge}>
                <div className={styles.new}>NEW!</div>

            </div>
            <div className={styles.part}>
                <div className={styles.body}>
                    <Row gutter={[3,3]}>
                        <Col span={24}>
                            <div className={styles.x}>(5 | 5)</div>
                        </Col>
                        <Col span={24}>
                            <div className={styles.y}>(9999)</div>
                        </Col>
                        <Col span={24}>
                            <UserTitle/>
                        </Col>
                    </Row>
                </div>
                <Avatar/>
            </div>
        </div>
    )
}


export default RoomItem;