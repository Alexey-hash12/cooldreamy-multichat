import styles from './DirectPage.module.scss';
import DirectLayout from './components/DirectLayout/DirectLayout';
import {Row, Col} from 'antd';
import Dialogs from './components/Dialogs/Dialogs';
import Rooms from './components/Rooms/Rooms';
import Direct from './components/Direct/Direct';
import { useAppSelector } from '../../hooks/reduxHooks';
import ApiService from '../../service/ApiService';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IUser } from '../../models/IUser';


const service = new ApiService()

const DirectPage = () => {
    const {token} = useAppSelector(s => s.mainReducer)
    const queryes = useSearchParams()
    const [type, setType] = useState<any>('chat') // chat, mail
    const [id, setId] = useState<any>()
    const [selfUserId, setSelfUserId] = useState<any>()

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
            service.getChats(token, {page: chatsPage, per_page: 5, search: chatsSearch}).then(res => {
                setChatsTotal(res?.total)
                if(chatsPage === 1) {
                    setRooms(res?.data)
                } else {
                    setRooms(s => [...s, ...res?.data])
                }
            })
        }
    }

    const getInbox = () => {
        if(token && inboxPage) {
            service.getInbox(token, {page:inboxPage, per_page: 10, search: inboxSearch}).then(res => {
                console.log(res.data)
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
        getRooms()
    }, [token, type, chatsPage, chatsSearch])

    useEffect(() => {
        getInbox()
    }, [token, type, inboxPage, inboxSearch])

    useEffect(() => {
        getDialog()
    }, [token, type, id, dialogPage])

    


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