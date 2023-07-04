import styles from './Skeleton.module.scss';
import {Row, Col} from 'antd';

const Skeleton = () => {


    return (
        <div className={styles.wrapper}>
            <Row gutter={[8,8]}>
                <Col span={24}>
                    <div className={`${styles.item} skeleton`}></div>
                </Col>
                <Col span={24}>
                    <div className={`${styles.item} skeleton`}></div>
                </Col>
                <Col span={24}>
                    <div className={`${styles.item} skeleton`}></div>
                </Col>
                <Col span={24}>
                    <div className={`${styles.item} skeleton`}></div>
                </Col>
                <Col span={24}>
                    <div className={`${styles.item} skeleton`}></div>
                </Col>
                <Col span={24}>
                    <div className={`${styles.item} skeleton`}></div>
                </Col>
                <Col span={24}>
                    <div className={`${styles.item} skeleton`}></div>
                </Col>
            </Row>
        </div>
    )
}

export default Skeleton;