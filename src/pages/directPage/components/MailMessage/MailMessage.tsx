import Avatar from '../../../../components/Avatar/Avatar';
import UserTitle from '../../../../components/UserTitle/UserTitle';
import styles from './MailMessage.module.scss';
import {FC, useEffect, memo} from 'react';
import moment from 'moment';
import FancyboxWrapper from '../../../../components/FancyboxWrapper/FancyboxWrapper';
import LinesEllipsis from 'react-lines-ellipsis';
import chatMessageTypeVariants from '../../../../utils/messageVariants';
import { chatMailTypes } from '../../types';


interface I {

}


const MailMessageComponent:FC<any> = (props) => {
    const {
        sender_user,
        letter_messageable,
        letter_messageable_type,
        id,
        created_at
    } = props
    // useEffect(() => {
    //     console.log(props)
    // }, [props])
    

    const {
        text,
        images
    } = letter_messageable || {}

    const switchMessageType = (type?: chatMailTypes) => {
        switch(type) {
            case chatMessageTypeVariants?.letterText:
                return  (
                    <div className={styles.main}>
                        {
                            text && (
                                <div className={styles.text}>
                                    {/* <LinesEllipsis
                                        maxLine={3}
                                        text={text}
                                        /> */}
                                        {text}
                                </div>
                            )
                        }
                        {
                            images?.length > 0 ? (
                                <FancyboxWrapper>
                                    <div className={styles.media}>
                                        {images?.map((item: any, index: number) => (
                                            item?.image_url && (
                                                <a data-fancybox="gallery" href={item.image_url} className={styles.item} key={index}>
                                                    <img src={item?.thumbnail_url} alt="" />
                                                </a>
                                            ) 
                                        ))}
                                    </div>
                                </FancyboxWrapper>
                            ) : null
                        }
                    </div>
                )
            default:
                return null
    
        }
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.avatar}>
                <Avatar
                    image={sender_user?.user_avatar_url}
                    size={35}
                    isRound
                    />
            </div>
            <div className={styles.body}>
                {/* <span style={{color: 'red'}}>{id}</span> */}
                <div className={styles.top}>
                    <UserTitle
                        username={sender_user?.name}
                        age={sender_user?.age}
                        />
                    <div className={styles.ex}>
                        <span className={styles.tm}>{moment(created_at).format('MMMM Do YYYY, h:mm:ss a')}</span>
                    </div>
                </div>
                {
                    switchMessageType(letter_messageable_type)
                }
                {/* <div className={styles.action}>
                    <button className={styles.open}>Открыть письмо</button>
                </div> */}
            </div>
        </div>
    )
}

const MailMessage = memo(MailMessageComponent)
export default MailMessage;