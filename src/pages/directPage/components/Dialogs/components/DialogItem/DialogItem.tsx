import styles from './DialogItem.module.scss';
import Avatar from '../../../../../../components/Avatar/Avatar';
import UserTitle from '../../../../../../components/UserTitle/UserTitle';
import {Row, Col} from 'antd';import {IoChatbubblesOutline} from 'react-icons/io5';
import {FiMail} from 'react-icons/fi';

import DialogItemNew from './components/DialogItemNew/DialogItemNew';
import DialogItemMail from './components/DialogItemMail/DialogItemMail';
import DialogItemChat from './components/DialogItemChat/DialogItemChat';
import chatMessageTypeVariants from '../../../../../../utils/messageVariants';
import LinesEllipsis from 'react-lines-ellipsis'

const DialogItem = (props: any) => {
    const {
        name,
        age,
        id,
        avatar_url_thumbnail,
        online,
    } = props?.other_user
    const {
        last_message,
        type_of_model
    } = props


    const switchChatType = (type?: string) => {
        switch(type) {
            case chatMessageTypeVariants.messageImage:
                return (
                    'Картинка'
                )
            case chatMessageTypeVariants.messageText:
                
                return  (
                    typeof last_message?.chat_messageable?.text === 'string' ? (
                    <LinesEllipsis
                        text={last_message?.chat_messageable?.text}
                        maxLine={2}
                        />
                    ) : null

                )
            case chatMessageTypeVariants.messageWink:
                return (
                    'Подмигивание'
                )
            case chatMessageTypeVariants.messageGift:
                return (
                    'Подарок'
                )
            default:
                return null
        }
    }


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
                    <div className={styles.type}>
                        {
                            type_of_model === 'chat' && (
                                <IoChatbubblesOutline/>
                            )
                        }
                        {
                            type_of_model === 'letter' && (
                                <FiMail/>
                            )
                        }
                    </div>
                    {
                        !last_message ? (
                            <DialogItemNew/>
                            
                        ) : (
                            switchChatType(last_message?.chat_messageable_type)
                        )
                    }
                    
                </div>
            </div>
        </div>
    )
}


export default DialogItem;