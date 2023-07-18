import styles from './Skeleton.module.scss';
import {Row, Col} from 'antd';



const Skeleton = () => {


    return (
        <div className={styles.wrapper}>
            <Row gutter={[12,12]}>
                <Col span={6}>
                    <div className={styles.item}></div>
                </Col>
                <Col span={6}>
                    <div className={styles.item}></div>
                </Col>
                <Col span={6}>
                    <div className={styles.item}></div>
                </Col>
                <Col span={6}>
                    <div className={styles.item}></div>
                </Col>
                <Col span={6}>
                    <div className={styles.item}></div>
                </Col>
                <Col span={6}>
                    <div className={styles.item}></div>
                </Col>
                <Col span={6}>
                    <div className={styles.item}></div>
                </Col>
                <Col span={6}>
                    <div className={styles.item}></div>
                </Col>
            </Row>
        </div>
    )
}


export default Skeleton;