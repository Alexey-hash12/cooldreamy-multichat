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
import { sortingChatList, sortingDialogList, sortingMailChatList } from '../../utils/sorting';
import { useDebounce } from 'usehooks-ts';
import Media from './components/Media/Media';

const service = new ApiService()

const DirectPage = () => {
    const {token, socketChanel, newChatMessage, newMailMessage, deleteInbox, newInbox} = useAppSelector(s => s.mainReducer)
    const queryes = useSearchParams()
    const [type, setType] = useState<any>() // chat, mail
    const [id, setId] = useState<any>()
    const [selfUserId, setSelfUserId] = useState<any>()

    const [chatBottomPadding, setChatBottomPadding] = useState<number>(70)


    //loading
    const [loadRooms, setLoadRooms] = useState(false)
    const [loadInbox, setLoadInbox] = useState(false)


    //data
    const [rooms, setRooms] = useState<any[]>([])
    const [messages, setMessages] = useState<any[]>([])
    const [inbox, setInbox] = useState<any[]>([])

    const [dialogPage, setDialogPage] = useState(1)
    const [dialogTotal, setDialogTotal] = useState<any>()
    

    const [chatsPage, setChatsPage] = useState(1)
    const [chatsTotal, setChatsTotal] = useState<any>()
    const [chatsFilter, setChatsFilter] = useState<'online' | 'premium' | 'payed' | 'super_payed' | ''>('')

    const [inboxPage, setInboxPage] = useState(1)
    const [inboxTotal, setInboxTotal] = useState<any>()

    const [chatsSearch, setChatsSearch] = useState<string>('')
    const chatSearchDebounced = useDebounce<string>(chatsSearch, 500)

    const [inboxSearch, setInboxSearch] = useState<string>('')
    const inboxSearchValue = useDebounce<string>(inboxSearch, 500)

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
                chatsPage === 1 && setLoadRooms(true)
                service.getChats(token, {page: chatsPage, per_page: 20, search: chatSearchDebounced, filter_type: chatsFilter}).then(res => {
                    console.log(res?.data[0])
                    setChatsTotal(res?.total)
                    
                    if(chatsPage === 1) {
                        setRooms(res?.data)
                    } else {
                        setRooms(s => [...s, ...res?.data])
                    }
                }).finally(() => {
                    setLoadRooms(false)
                })
            }
            if(type === 'mail') {
                chatsPage === 1 && setLoadRooms(true)
                service.getMails(token, {page: chatsPage, per_page: 5, search: chatSearchDebounced, filter_type: chatsFilter}).then(res => {
                    console.log(res?.data[0])
                    setChatsTotal(res?.total)
                    if(chatsPage === 1) {
                        setRooms(res?.data)
                    } else {
                        setRooms(s => [...s, ...res?.data])
                    }
                }).finally(() => {
                    setLoadRooms(false)
                })
            }
            
        }
    }

    const getInbox = () => {
        if(token && inboxPage) {
            inboxPage === 1 && setLoadInbox(true)
            service.getInbox(token, {page:inboxPage, per_page: 10, search: inboxSearchValue}).then(res => {
                
                setInboxTotal(res?.total)
                if(inboxPage === 1) {
                    setInbox(res?.data)
                } else {
                    setInbox(s => [...s, ...res?.data])
                }
            }).finally(() => {
                setLoadInbox(false)
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
    }, [chatSearchDebounced])

    useEffect(() => {
        setInboxPage(1)
    }, [inboxSearchValue])

    useEffect(() => {
        setDialogPage(1)
    }, [type, id])

    

    useEffect(() => {
        getInbox()
    }, [token, inboxPage, inboxSearchValue])

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
                if(id == body?.dialogBody?.id) {
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
                }
                
                // ?? обновление диалогов
                const foundDialog = rooms?.find(s => s?.id == body?.dialogBody?.id) 

                
                
                if(foundDialog) {
                    setRooms(s => {
                        const m = s;
                        const rm = m.splice(m.findIndex(i => i.id == foundDialog?.id), 1, {...body?.dialogBody, max_limit: body?.messageBody?.max_limit, available_limit: body?.messageBody?.available_limit})
                        return sortingDialogList([...m])
                    })
                } else {
                    setRooms(s => {
                        return sortingDialogList([{...body?.dialogBody, max_limit: body?.messageBody?.max_limit, available_limit: body?.messageBody?.available_limit}, ...s])
                    })
                }
            } 

            // // TODO Если выбраны ПИСЬМА
            if(type === 'mail') {
                const foundLetter = messages?.find(s => s?.id == body?.messageBody?.id)
                if(body?.dialogBody?.id == id) {
                    if(foundLetter) {
                        setMessages(s => {
                            const m = s;
                            const rm = m.splice(m.findIndex(i => i.id == foundLetter?.id), 1, body?.messageBody)
                            return sortingMailChatList([...m])
                        })
                    } else {
                        setMessages(s => {
                            return sortingMailChatList([body?.messageBody, ...s])
                        })
                    }
                }
                

                const foundDialog = rooms?.find(s => s?.id == body?.dialogBody?.id) 
                
                console.log(foundDialog)
                if(foundDialog) {
                    setRooms(s => {
                        const m = s;
                        const rm = m.splice(m.findIndex(i => i.id == foundDialog?.id), 1, {...body?.dialogBody, max_limit: body?.messageBody?.max_limit, available_limit: body?.messageBody?.available_limit})
                        return sortingDialogList([...m])
                    })
                } else {
                    setRooms(s => {
                        return sortingDialogList([{...body?.dialogBody, max_limit: body?.messageBody?.max_limit, available_limit: body?.messageBody?.available_limit}, ...s])
                    })
                }
            }
        } else {
            // !! НЕХВАТАЕТ ВХОДНЫХ ДАННЫХ
        }
    }

 

    useEffect(() => {
        if(inbox?.length > 0) {
            if(deleteInbox) {
                
                const foundIndex = inbox.findIndex(i => i.id == deleteInbox?.id && i.type_of_model == deleteInbox?.type)

                
                if(foundIndex !== -1) {
                    setInbox(s => {
                        const m = [...s];
                        const rm = m.splice(foundIndex, 1)
                        return [...m]
                    })
                }
            }
            if(newInbox) {
                const foundItem = inbox.find(i => i.id == newInbox?.chat_list_item?.id && i.type_of_model == newInbox?.chat_list_item?.type_of_model)
                console.log(newInbox)
                const foundIndex = inbox.findIndex(i => i.id == newInbox?.chat_list_item?.id && i.type_of_model == newInbox?.chat_list_item?.type_of_model)
                console.log(foundItem)
                console.log(foundIndex)
                if(foundItem && foundIndex !== -1) {
                    setInbox(s => {
                        const m = [...s];
                        const rm = m.splice(foundIndex, 1, {...newInbox?.chat_list_item, last_message: newInbox?.chat_message,other_user: newInbox?.chat_message?.sender_user, self_user: newInbox?.chat_message?.recepient_user})
                        return [...m]
                    })
                } else {
                    //setInbox(s => [{...newInbox?.chat_list_item, other_user: newInbox?.chat_list_item?.sender_user, self_user: newInbox?.chat_message?.recepient_user}, ...s])
                    setInbox(s => [{...newInbox?.chat_list_item, last_message: newInbox?.chat_message,other_user: newInbox?.chat_message?.sender_user, self_user: newInbox?.chat_message?.recepient_user}, ...s])
                }
            }
        }   
    }, [deleteInbox, newInbox])


    
    useEffect(() => {
        getRooms()
    }, [token, chatsPage])

    useEffect(() => {
        if(chatsPage === 1) {
            getRooms()
        } else {
            setChatsPage(1)
        }
    }, [type, chatSearchDebounced, chatsFilter])
    


    //socket action
    useEffect(() => {
        if(socketChanel) {

            if(type === 'chat') {
                if(newChatMessage) {
                    console.log(newChatMessage)
                    // onUpdateChat && onUpdateChat({
                    //     messageBody: newChatMessage?.chat_list_item?.chat?.last_message, 
                    //     dialogBody: newChatMessage?.chat_list_item?.chat
                    // })
                    onUpdateChat && onUpdateChat({
                        messageBody: newChatMessage?.chat_message, 
                        dialogBody: {...newChatMessage?.chat_list_item, other_user: newChatMessage?.chat_message?.sender_user, self_user: newChatMessage?.chat_message?.recepient_user}
                    })
                    console.log(newChatMessage)
                }
            }
            if(type === 'mail') {
                if(newMailMessage) {
                    // onUpdateChat && onUpdateChat({
                    //     messageBody: newMailMessage?.letter_list_item?.letter?.last_message, 
                    //     dialogBody: newMailMessage?.letter_list_item?.letter
                    // }) 
                    onUpdateChat && onUpdateChat({
                        messageBody: newMailMessage?.letter_message, 
                        dialogBody: {...newMailMessage?.letter_list_item, other_user: newChatMessage?.chat_message?.sender_user, self_user: newChatMessage?.chat_message?.recepient_user}
                    }) 
                }
            }
        }
    }, [newChatMessage, newMailMessage, socketChanel, id, type])

    useEffect(() => {
        if(!id) {
            setself_user(null)
            setother_user(null)
        }
    }, [id])


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
                                setSearchValue={setInboxSearch}

                                loading={loadInbox}
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
                                messages={messages}
                                setChatBottomPadding={setChatBottomPadding}
                                />
                        </div>
                    </Col>
                    <Col span={7}>
                        <div className={`${styles.panel} custom-scroll-vertical`}>
                            <Rooms  
                                getRooms={getRooms}
                                list={rooms}
                                type={type}
                                total={chatsTotal}
                                setPage={setChatsPage}
                            
                                searchValue={chatsSearch}
                                setSearchValue={setChatsSearch}

                                filter={chatsFilter}
                                setFilter={setChatsFilter}
                                
                                loading={loadRooms}
                                />
                        </div>
                    </Col>
                </Row>
            </DirectLayout>
        </div>
    )



    
}

export default DirectPage;