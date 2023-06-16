import styles from './DirectUser.module.scss';
import { Row, Col } from 'antd';
import Avatar from '../../../../../../../../components/Avatar/Avatar';
import UserTitle from '../../../../../../../../components/UserTitle/UserTitle';
import TextArea from '../../../../../../../../components/TextArea/TextArea';

const DirectUser = () => {
    return (
        <div className={styles.wrapper}>
            <Row gutter={[25,25]}>
                <Col span={14}>
                    <div className={styles.main}>
                        <Avatar
                            size={32}
                            />
                        <div className={styles.body}>
                            <div className={styles.part}>
                                <div className={styles.part_item}><UserTitle/></div>
                                <div className={styles.part_item}>USA</div>
                                <div className={styles.part_item}>New York</div>
                            </div>
                            <div className={styles.part}>
                                <div className={styles.part_item}>id 123456</div>
                                <div className={styles.part_item}>Цель: <span>Знакомства</span></div>
                                <div className={styles.part_item}>Фото: <span>5</span></div>
                            </div>
                            <div className={styles.part}>
                                <div className={styles.part_item}>Кредиты: <span>9999</span></div>
                                <div className={styles.part_item}>Чаты: <span>20</span></div>
                                <div className={styles.part_item}>Письма: <span>10</span></div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={10}>
                    <div className={styles.action}>
                        <TextArea placeholder='Описание...' height={65}/>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default DirectUser;