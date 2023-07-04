import styles from './InfoItem.module.scss';
import {Row, Col} from 'antd';

const InfoItem = () => {

    return (
        <div className={styles.wrapper}>
            <Row gutter={[5,5]}>
                <Col span={12}>
                    
                </Col>
                <Col span={12}></Col>
            </Row>
        </div>
    )
}


export default InfoItem;