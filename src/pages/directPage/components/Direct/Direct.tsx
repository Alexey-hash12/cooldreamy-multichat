import styles from './Direct.module.scss';
import DirectUsers from './components/DirectUsers/DirectUsers';
import {FC, useEffect, useState, useRef} from 'react';

import ChatMessage from '../ChatMessage/ChatMessage';
import MailMessage from '../MailMessage/MailMessage';
import { useInView } from 'react-intersection-observer';
import { PulseLoader } from 'react-spinners';
import InfoModal from '../InfoModal/InfoModal';

interface I {
    list: any[],
    type?: 'chat' | 'mail',
    setPage?: (...args: any[]) => any,
    total?: number,
    selfUserId?: number | string,

    chatBottomPadding?: number

    selfUser?: any,
    otherUser?:any,
}


const Direct:FC<I> = ({
    list,
    type,
    setPage,
    total,
    selfUserId,

    chatBottomPadding,

    selfUser,
    otherUser,

}) => {
    const {inView, ref} = useInView()
    const [loadMore, setLoadMore] = useState<boolean>(false)
    const [infoModal, setInfoModal] = useState(false)

    const [paddingTop, setPaddingTop] = useState(0)
    const exRef = useRef<HTMLDivElement>(null)
    
    
    useEffect(() => {
        if(total !== undefined) {
            list?.length >= total ? setLoadMore(false) : setLoadMore(true)
        }
       
    }, [list, total])

    useEffect(() => {
        if(loadMore && inView) {
            setPage && setPage((s: number) => s + 1)
        }
    }, [inView, loadMore, setPage, list])
    

    useEffect(() => {
        if(exRef?.current) {
            setPaddingTop(exRef?.current.scrollHeight)
        }
    }, [exRef, otherUser, selfUser])


    if(type === 'chat') {
        return (
            <div className={`${styles.wrapper} ${styles.wrapper_chat}`}>
                
                <div className={styles.users} ref={exRef}>
                    {
                        (selfUser && otherUser) && (
                            <DirectUsers
                                otherUser={otherUser}
                                selfUser={selfUser}
                                />
                        )
                    }
                </div>
                {/* <div className={styles.users_pl}>
                    <DirectUsers/>
                </div> */}
                <div className={`${styles.chat} custom-scroll-vertical`} style={{maxHeight: `calc(100% - ${paddingTop}px)`, paddingBottom: chatBottomPadding, paddingTop}}>
                    
                    {
                        list?.map((item,index) => (
                            <ChatMessage
                                    
                                    id={item.id}
                                    avatar={item?.sender_user?.avatar_url_thumbnail}
                                    status={item?.is_read_by_recepient === 1 ? 'read' : 'unread'}
                                    text={item.chat_messageable?.text}
                                    images={[{image: item.chat_messageable?.image_url, thumbnail: item?.chat_messageable?.thumbnail_url}]}
                                    gifts={item.chat_messageable?.gifts}
                                    sticker={item.chat_messageable?.sticker}
                                    type={item?.chat_messageable_type}
                                    // isSelf={item.sender_user_id === Number(userId)}
                                    isSelf={item.sender_user_id == selfUserId} 
                                    createdAt={item.created_at}
                                    updatedAt={item.updated_at}
                                    index={index}
                                    showAvatar={item.sender_user_id !== list[index - 1]?.sender_user_id}
                                    
                                    senderUser={item?.sender_user}
                                    />
                        ))
                    }
                    
                    {
                        list && list?.length > 0 && (
                            loadMore && (
                                <div ref={ref} className={styles.load}>
                                    <PulseLoader color='#fff'/>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        )
    }

    if(type === 'mail') {
        return (
            <div className={styles.wrapper}>
            
                <div className={styles.users} ref={exRef}>
                    {
                        (selfUser && otherUser) && (
                            <DirectUsers
                                otherUser={otherUser}
                                selfUser={selfUser}
                                />
                        )
                    }
                </div>
                <div className={`${styles.mail} custom-scroll-vertical`} style={{maxHeight: `calc(100% - ${paddingTop}px)`, paddingBottom: chatBottomPadding}}>
                    {
                        list?.map((i, index) => (
                            <MailMessage {...i}/>
                        ))
                    }

                    {
                        list && list?.length > 0 && (
                            loadMore && (
                                <div ref={ref} className={styles.load}>
                                    <PulseLoader color='#fff'/>
                                </div>
                            )
                        )
                    }
                </div>
                
                
            </div>
        )
    }
    
    
    return null 
}


export default Direct;