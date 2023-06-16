import styles from './DialogItem.module.scss';
import Avatar from '../../../../../../components/Avatar/Avatar';
import UserTitle from '../../../../../../components/UserTitle/UserTitle';
import {Row, Col} from 'antd';


import DialogItemNew from './components/DialogItemNew/DialogItemNew';
import DialogItemMail from './components/DialogItemMail/DialogItemMail';
import DialogItemChat from './components/DialogItemChat/DialogItemChat';

const DialogItem = () => {

    return (
        <div className={`${styles.wrapper}`}>
            <div className={styles.avatar}>
                <Avatar/>
            </div>
            <div className={styles.body}>
                <div className={styles.top}>
                    <Row align={'middle'} gutter={[5,5]}>
                        <Col span={12}>
                            <UserTitle/>
                        </Col>
                        <Col span={12}>
                            <div className={styles.id}>
                            id 123456
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className={styles.main}>
                    <DialogItemNew/>
                </div>
            </div>
        </div>
    )
}


export default DialogItem;