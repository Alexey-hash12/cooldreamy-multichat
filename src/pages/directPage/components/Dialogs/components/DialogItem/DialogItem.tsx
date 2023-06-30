import styles from './DialogItem.module.scss';
import Avatar from '../../../../../../components/Avatar/Avatar';
import UserTitle from '../../../../../../components/UserTitle/UserTitle';
import {Row, Col} from 'antd';


import DialogItemNew from './components/DialogItemNew/DialogItemNew';
import DialogItemMail from './components/DialogItemMail/DialogItemMail';
import DialogItemChat from './components/DialogItemChat/DialogItemChat';



const DialogItem = (props: any) => {
    const {
        name,
        age,
        id,
        avatar_url_thumbnail,
        online
    } = props?.other_user
    const {
        last_message
    } = props

    return (
        <div className={`${styles.wrapper}`}>
            <div className={styles.avatar}>
                <Avatar
                    image={avatar_url_thumbnail}
                    isNewAction={online === 1}
                    />
            </div>
            <div className={styles.body}>
                <div className={styles.top}>
                    <Row align={'middle'} gutter={[5,5]}>
                        <Col span={12}>
                            <UserTitle
                                username={name}
                                age={age}
                                />
                        </Col>
                        <Col span={12}>
                            <div className={styles.id}>
                            id {id}
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className={styles.main}>
                    {
                        !last_message ? (
                            // <DialogItemNew/>
                            null
                        ) : (
                            null
                        )
                    }
                    
                </div>
            </div>
        </div>
    )
}


export default DialogItem;