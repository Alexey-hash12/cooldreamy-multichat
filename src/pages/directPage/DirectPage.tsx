import styles from './DirectPage.module.scss';
import DirectLayout from './components/DirectLayout/DirectLayout';
import {Row, Col, message} from 'antd';
import Dialogs from './components/Dialogs/Dialogs';
import Rooms from './components/Rooms/Rooms';
import Direct from './components/Direct/Direct';
import { useAppSelector } from '../../hooks/reduxHooks';
import ApiService from '../../service/ApiService';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IUser } from '../../models/IUser';
import Action from './components/Action/Action';
import { sortingChatList, sortingDialogList } from '../../utils/sorting';


const service = new ApiService()

const DirectPage = () => {
    const {token, socketChanel, newMessage} = useAppSelector(s => s.mainReducer)
    const queryes = useSearchParams()
    const [type, setType] = useState<any>('chat') // chat, mail
    const [id, setId] = useState<any>()
    const [selfUserId, setSelfUserId] = useState<any>()

    const [chatBottomPadding, setChatBottomPadding] = useState<number>(70)

    //data
    const [rooms, setRooms] = useState<any[]>([])
    const [messages, setMessages] = useState<any[]>([])
    const [inbox, setInbox] = useState<any[]>([])

    const [dialogPage, setDialogPage] = useState(1)
    const [dialogTotal, setDialogTotal] = useState<any>()

    const [chatsPage, setChatsPage] = useState(1)
    const [chatsTotal, setChatsTotal] = useState<any>()

    const [inboxPage, setInboxPage] = useState(1)
    const [inboxTotal, setInboxTotal] = useState<any>()

    const [chatsSearch, setChatsSearch] = useState<string>('')
    const [inboxSearch, setInboxSearch] = useState<string>('')

    const [other_user, setother_user] = useState<any>()
    const [self_user, setself_user] = useState<any>()


    useEffect(() => {
        if(queryes) {
            setType(queryes[0].get('type'))
            setId(queryes[0].get('id'))
            setSelfUserId(queryes[0].get('self_id'))
        }
    }, [queryes])



    const getRooms = () => {
        if(token && chatsPage) {
            if(type === 'chat') {
                service.getChats(token, {page: chatsPage, per_page: 5, search: chatsSearch}).then(res => {
                    setChatsTotal(res?.total)
                    if(chatsPage === 1) {
                        setRooms(res?.data)
                    } else {
                        setRooms(s => [...s, ...res?.data])
                    }
                })
            }
            if(type === 'mail') {
                service.getMails(token, {page: chatsPage, per_page: 5, search: chatsSearch}).then(res => {
                    setChatsTotal(res?.total)
                    console.log(res)
                    if(chatsPage === 1) {
                        setRooms(res?.data)
                    } else {
                        setRooms(s => [...s, ...res?.data])
                    }
                })
            }
            
        }
    }

    const getInbox = () => {
        if(token && inboxPage) {
            service.getInbox(token, {page:inboxPage, per_page: 10, search: inboxSearch}).then(res => {
                setInboxTotal(res?.total)
                if(inboxPage === 1) {
                    setInbox(res?.data)
                } else {
                    setInbox(s => [...s, ...res?.data])
                }
            })
        }
    }


    const getDialog = () => {
        if(token && id && dialogPage) {
            if(type === 'chat') {
                service.getChatDialog(token, {
                    id,
                    page: dialogPage,
                    per_page: 10
                }).then(res => {
                    setother_user(res.other_user)
                    setself_user(res.self_user)
                    setDialogTotal(res?.chat_messages?.total)
                    if(dialogPage === 1) {
                        setMessages(res?.chat_messages?.data)
                    } else {
                        setMessages(s => [...s, ...res?.chat_messages?.data])
                    }
                })
            } 
            if(type === 'mail') {
                service.getMailDialog(token, {
                    id,
                    page: dialogPage,
                    per_page: 10
                }).then(res => {
                    setother_user(res.other_user)
                    setself_user(res.self_user)
                    console.log(res)
                    setDialogTotal(res?.letter_messages?.total)
                    if(dialogPage === 1) {
                        setMessages(res?.letter_messages?.data)
                    } else {
                        setMessages(s => [...s, ...res?.letter_messages?.data])
                    }
                })
            }
        } else {
            setMessages([])
            setDialogTotal(undefined)
        }
    }

    
    useEffect(() => {
        setChatsPage(1)
    }, [chatsSearch])

    useEffect(() => {
        setInboxPage(1)
    }, [inboxSearch])

    useEffect(() => {
        setDialogPage(1)
    }, [type, id])

    useEffect(() => {
        setChatsPage(1)
    }, [type])

    useEffect(() => {
        getRooms()
    }, [token, type, chatsPage, chatsSearch])

    useEffect(() => {
        getInbox()
    }, [token, type, inboxPage, inboxSearch])

    useEffect(() => {
        getDialog()
    }, [token, type, id, dialogPage])

    
    const onUpdateChat = (body: {
        messageBody?: any,
        dialogBody?:any
    }) => {
        // ?? В САМОМ ЧАТЕ
        if(body?.dialogBody && body?.messageBody) {

            // TODO Если выбран ЧАТ
            if(type === 'chat') {
                // ?? обновление чата
                const foundMessage = messages?.find(s =>  s?.id == body?.messageBody?.id)
                if(foundMessage) {
                    setMessages(s => {
                        const m = s;
                        const rm = m.splice(m.findIndex(i => i.id == foundMessage?.id), 1, body?.messageBody)
                        return sortingChatList([...m])
                    })   
                } else {
                    setMessages(s => {
                        return sortingChatList([body?.messageBody, ...s])
                    })
                }
                // ?? обновление диалогов
                // const foundDialog = rooms?.find(s => s?.id == body?.dialogBody?.id) 
                // if(foundDialog) {
                //     setRooms(s => {
                //         const m = s;
                //         const rm = m.splice(m.findIndex(i => i.id == foundDialog?.id), 1, body?.dialogBody)
                //         return sortingDialogList([...m])
                //     })
                // } else {
                //     setRooms(s => {
                //         return sortingDialogList([body?.dialogBody, ...s])
                //     })
                // }
            } 

            // // TODO Если выбраны ПИСЬМА
            // if(chatType === 'mail') {
            //     const foundLetter = chatList?.find(s => s?.id == body?.messageBody?.id)
            //     if(foundLetter) {
            //         setChatList(s => {
            //             const m = s;
            //             const rm = m.splice(m.findIndex(i => i.id == foundLetter?.id), 1, body?.messageBody)
            //             return sortingMailChatList([...m])
            //         })
            //     } else {
            //         setChatList(s => {
            //             return sortingMailChatList([body?.messageBody, ...s])
            //         })
            //     }

            //     const foundDialog = dialogsList?.find(s => s?.id == body?.dialogBody?.id) 
            //     if(foundDialog) {
            //         setDialogsList(s => {
            //             const m = s;
            //             const rm = m.splice(m.findIndex(i => i.id == foundDialog?.id), 1, body?.dialogBody)
            //             return sortingDialogList([...m])
            //         })
            //     } else {
            //         setDialogsList(s => {
            //             return sortingDialogList([body?.dialogBody, ...s])
            //         })
            //     }
            // }
        } else {
            // !! НЕХВАТАЕТ ВХОДНЫХ ДАННЫХ
        }
    }



    //socket action
    useEffect(() => {
        if(socketChanel) {
            if(type === 'chat') {
                if(newMessage) {
                    console.log(newMessage)
                }
            }
            if(type === 'mail') {
                
            }
        }
    }, [newMessage, socketChanel, id, type])


    return (
        <div className={styles.wrapper}>
            <DirectLayout>
                <Row gutter={[12,12]}>
                    <Col span={7}>
                        <div className={`${styles.panel} custom-scroll-vertical`}>
                            <Dialogs
                                list={inbox}
                                setPage={setInboxPage}
                                total={inboxTotal}
                                type={type}

                                currentId={id}
                                searchValue={inboxSearch}
                                setSearchValue={(setInboxSearch)}
                                />
                        </div>
                    </Col>
                    <Col span={10}>
                        <div className={styles.panel}>
                            <Direct
                                type={type}
                                list={messages}
                                total={dialogTotal}
                                setPage={setDialogPage}
                                selfUserId={selfUserId}

                                selfUser={self_user}
                                otherUser={other_user}
                                chatBottomPadding={chatBottomPadding}
                                />
                            <Action
                                onUpdateChat={onUpdateChat}
                                id={id}
                                type={type}
                                setChatBottomPadding={setChatBottomPadding}
                                />
                        </div>
                    </Col>
                    <Col span={7}>
                        <div className={`${styles.panel} custom-scroll-vertical`}>
                            <Rooms
                                list={rooms}
                                type={type}
                                total={chatsTotal}
                                setPage={setChatsPage}
                            
                                searchValue={chatsSearch}
                                setSearchValue={setChatsSearch}
                                />
                        </div>
                    </Col>
                </Row>
            </DirectLayout>
        </div>
    )
}

export default DirectPage;