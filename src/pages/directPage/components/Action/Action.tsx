import styles from './Action.module.scss';
import Button from '../../../../components/Button/Button';
import TextareaAutosize from 'react-textarea-autosize';
import { useState, FC, useEffect } from 'react';
import IconButton from '../../../../components/IconButton/IconButton';
import {AiOutlineSmile, AiOutlineGift, AiOutlineCamera} from 'react-icons/ai';
import { useAppSelector } from '../../../../hooks/reduxHooks';
import ApiService from '../../../../service/ApiService';
import { Dropdown } from 'antd';
import ExList from './components/ExList/ExList';
import Gifts from './components/Gifts/Gifts';
const service = new ApiService()

interface I {
    setChatBottomPadding: (...args: any[]) => any,

    type?: 'chat' | 'mail',
    id?: number | string,

    onUpdateChat?: (...args: any[]) => any
}

const Action:FC<I> = ({
    setChatBottomPadding,
    type,
    id,
    onUpdateChat
}) => {
    const [load, setLoad] = useState(false)
    const {token} = useAppSelector(s => s.mainReducer)

    //data
    const [stickers, setStickers] = useState<any[]>([])
    const [gifts, setGifts] = useState<any[]>([])

    //values
    const [text, setText] = useState('')
    const [sticker, setSticker] = useState()

    

    const onTextHeightChange = (e: any) => {
        setChatBottomPadding(e + 24 + 10) //24 - padding over action block
    }


    const getStickers = () => {
        if(token) {
            service.getStickers(token).then(res => {
                console.log(res)
                setStickers(res)
            })
        }
    }

    const getGifts = () => {
        if(token) {
            service.getGifts(token).then(res => {
                console.log(res)
                setGifts(res)
            })
        }
    }

    useEffect(() => {
        getStickers()
        getGifts()
    },[token])





    const onSendMessage = () => {
        if(token) {
            if(type === 'chat') {
                if(text && id) {
                    service.sendChatMessage(token, id, {text}).then(res => {
                        console.log(res)
                        if(res?.id) {
                            onUpdateChat && onUpdateChat({messageBody: res?.last_message, dialogBody: res})
                        }
                    }).finally(() => {
                        setText('')
                    })
                }
            }
            if(type === 'mail') {

            }
        }
    }

    const onSendSticker = (sticker: any) => {
        if(token && id) {
            if(type === 'chat') {
                service.sendChatSticker(token, id, {sticker_id: sticker?.id}).then(res => {
                    console.log(res)
                    if(res?.id) {
                        onUpdateChat && onUpdateChat({messageBody: res?.last_message, dialogBody: res})
                    }
                })
            }
        }
    }

    const onGiftOpen = () => {

    }

    const onSendGift = (gift: any) => {
        if(token && id) {
            if(type === 'chat') {
                service.sendChatGift(token, id, {gift_id: gift?.id}).then(res => {
                    console.log(res)
                    if(res?.id) {
                        onUpdateChat && onUpdateChat({messageBody: res?.last_message, dialogBody: res})
                    }
                })
            }
        }
    }

    const onSelectMedia = () => {

    }

    const onSendMedia = () => {

    }




    return (
        <div className={styles.wrapper}>
            <div className={styles.in}>
                <div className={styles.main}>
                    <div className={styles.input}>
                        <TextareaAutosize
                            className='custom-scroll-vertical'
                            maxLength={300}
                            value={text}
                            maxRows={8}
                            onChange={e => setText(e.target.value)}
                            onHeightChange={onTextHeightChange}
                            placeholder='Type something...'
                            />
                    </div>
                    <div className={styles.ex}>
                        
                        <div className={styles.ex_item}>
                            <Dropdown
                                trigger={['click']}
                                placement={'topCenter'}
                                overlay={
                                    <ExList
                                        list={stickers}
                                        onSendSticker={onSendSticker}
                                        setText={setText}
                                        />
                                }
                                >
                                <IconButton
                                    icon={<AiOutlineSmile size={20}/>}
                                    isRound
                                    variant={'violet'}
                                    />
                            </Dropdown>
                        </div>
                        <div className={styles.ex_item}>
                            <Dropdown
                                trigger={['click']}
                                placement={'topCenter'}
                                overlay={
                                    <Gifts
                                        onSendGift={onSendGift}
                                        list={gifts}
                                        />
                                }
                                
                                >
                                <IconButton
                                    icon={<AiOutlineGift size={20}/>}
                                    isRound
                                    variant={'violet'}
                                    />
                            </Dropdown>
                            
                        </div>
                        <div className={styles.ex_item}>
                            <IconButton
                                icon={<AiOutlineCamera size={20}/>}
                                isRound
                                variant={'violet'}
                                />
                        </div>
                    </div>
                </div>
                <div className={styles.send}>
                    <Button
                        text='Отправить'
                        disabled={!text}
                        onClick={onSendMessage}
                        />
                </div>
            </div>
        </div>
    )
}

export default Action;