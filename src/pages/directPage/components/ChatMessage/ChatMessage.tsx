import styles from './ChatMessage.module.scss';
import {FC, useState, useEffect, useCallback, memo} from 'react';

import {BsCheckAll} from 'react-icons/bs';

import moment from 'moment';
import {FaSmileWink} from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import FancyboxWrapper from '../../../../components/FancyboxWrapper/FancyboxWrapper';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { chatMessageTypes } from '../../types';
import Avatar from '../../../../components/Avatar/Avatar';






const ChatMessageComponent:FC<any> = ({
    id,
    avatar,
    createdAt,
    updatedAt,
    status,
    isSelf,
    type,
    text,
    images,
    sticker,
    gifts,
    index,
    showAvatar,
    senderUser
    
}) => {
    const dispatch = useAppDispatch()
    const {token} = useAppSelector(s => s.mainReducer)
    const {inView, ref} = useInView({
        triggerOnce: true,
    })

    

    // useEffect(() => {
    //     if(status === 'unread' && id && inView && !isSelf) {
    //         if(token) {
    //             service.readMessage({chat_message_id: Number(id)}, token).then(res => {
    //                 console.log(res)
    //             })
    //         }
    //     }
    // }, [status, token, id, inView, isSelf])





    const switchMessageType = (type?: chatMessageTypes) => {
        switch(type) {
            case 'App\\Models\\ChatImageMessage':
                return (
                    <div className={styles.media}>
                        <FancyboxWrapper>
                            <div className={styles.body}>
                                <a data-fancybox="gallery" href={images[0].image} className={styles.item}>
                                    <img src={images[0].thumbnail} alt="" width={100} height={100}/>
                                </a>
                            </div>
                        </FancyboxWrapper>
                        
                        <div className={styles.time}>{moment(updatedAt).format('hh:mm')}</div>
                    </div>
                ) 
            case "App\\Models\\ChatTextMessage":
                return (
                    <div className={styles.bubble}>
                        <div className={styles.text}>
                            <p>
                                {text}
                                {/* {id} <br/>
                                {status} */}
                            </p>
                            
                        </div>
                        <div className={styles.time}>{moment(updatedAt).format('hh:mm')}</div>
                    </div>      
                )
            case "App\\Models\\ChatWinkMessage":
                return (
                    <div className={styles.bubble}>
                        <div className={styles.text}>
                            <FaSmileWink size={50} color='var(--violet)'/>
                        </div>
                    </div>
                )
            case "App\\Models\\ChatGiftMessage":
                return (
                    <div className={styles.media}>
                        <div className={styles.body}>
                            {
                                gifts?.map((item: any,index: number) => (
                                    <div className={styles.item} key={index}>
                                        <img src={item?.picture_url} alt="" width={100} height={100}/>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                   
                )
            case "App\\Models\\ChatStickerMessage":
                return (
                    <div className={styles.media}>
                        <div className={styles.body}>
                            <div className={styles.item}>
                                <img src={sticker?.picture_url} alt="" width={100} height={100}/>
                            </div>
                        </div>
                    </div>
                )
            default:
                return null

        }
    }


    return (
        <div ref={ref} className={`${styles.wrapper} ${isSelf ? styles.right : styles.left}`}>
            {
                isSelf ? (
                    <div className={`${styles.body} ${styles.me}`}>
                        <div 
                            className={styles.message}>
                            {switchMessageType(type)}
                            {
                                status === 'read' ? (
                                    <div className={styles.ex}>
                                        <div className={styles.label}>Просмотрено</div>
                                        <div className={styles.icon}><BsCheckAll/></div>
                                    </div>
                                ) : null
                            }
                        </div>
                        
                        <div className={`${styles.avatar} ${!showAvatar ? styles.hide : ''}`}>
                            <Avatar
                                isRound
                                image={avatar}
                                size={40}
                                />
                        </div>
                    </div>
                ) : (
                    <div className={`${styles.body} ${styles.you}`}>
                        {/* onClick={() => Router.push(`/users/${senderUser?.id}`)} */}
                        <div className={`${styles.avatar} ${!showAvatar ? styles.hide : ''}`}>
                            <Avatar
                                isRound
                                image={avatar}
                                size={40}
                                />
                        </div>
                        <div
                            className={styles.message}>
                            {switchMessageType(type)}
                            {
                                status === 'read' ? (
                                    <div className={styles.ex}>
                                        <div className={styles.label}>Просмотрено</div>
                                        <div className={styles.icon}><BsCheckAll/></div>
                                    </div>
                                ) : null
                            }
                        </div >
                    </div>
                )   
            }
        </div>
    )
}

const ChatMessage = memo(ChatMessageComponent)
export default ChatMessage;