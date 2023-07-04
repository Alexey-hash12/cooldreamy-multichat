import { Avatar } from 'antd';
import styles from './Media.module.scss';
import Button from '../../../../components/Button/Button';
import {BsImages, BsCheckLg} from 'react-icons/bs';
import {FC, useState, useEffect} from 'react';
import {FiPlayCircle} from 'react-icons/fi'
import {RiVoiceprintLine} from 'react-icons/ri';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks/reduxHooks';
import ApiService from '../../../../service/ApiService';
import {Row, Col} from 'antd';


const tabs = [
    {value: '1', label: 'Фото', icon: <BsImages/>},
    {value: '2', label: 'Видео', icon: <FiPlayCircle/>},
    {value: '3', label: 'Аудио', icon: <RiVoiceprintLine/>},
    {value: '4', label: 'Отправленные', icon: <BsCheckLg/>},
]

interface I {
    paddingBottom?: any,
    isOpen?: boolean,
    onClose?: (...args: any[]) => any,
    onSend?: (...args: any[]) => any,
    type?: any
}

const service = new ApiService()


const Media:FC<I> = ({
    paddingBottom,
    isOpen,
    onClose,
    onSend,
    type
}) => {
    const {token} = useAppSelector(s => s.mainReducer)
    const queryes = useSearchParams()

    const [selfId, setSeldId] = useState<any>()

    const [activeTab, setActiveTab] = useState('1')
    const [selected, setSelected] = useState<any[]>([])
    const [mediaList, setMediaList] = useState<any[]>([])
    const [page, setPage] = useState(0)

    

    useEffect(() => {
        if(queryes) {
            setSeldId(queryes[0].get('self_id'))
        }
    }, [queryes])

    useEffect(() => {
        setSelected([])
    }, [type, selfId])



    const onSelectMedia = (item: any) => {
        if(type === 'chat') {
            
            const findIndex = selected?.findIndex(i => i?.id == item?.id) 
            if(findIndex !== -1) {
                setSelected([])
            } else {
                setSelected([item])
            }
        } 
        if(type === 'mail') {
            const findIndex = selected?.findIndex(i => i?.id == item?.id)
            const findItem = selected?.find(i => i?.id == item?.id)
    
            
    
            if(findIndex !== -1) {
                setSelected(s => {
                    const m = [...s]
                    const rm = m.splice(findIndex, 1)
                    return [...m]
                })
            } else {
                setSelected(s => [...s, item])
            }
        }
        
    }

  

    const getMedia = () => {
        if(token && selfId) {
            service.getMedia(token, selfId).then(res => {
                setMediaList(res?.profile_photo?.data)
                // console.log(res?.profile_photo)
            })
        }
    }

    useEffect(() => {
        if(isOpen) {
            getMedia()
        } else {
            setMediaList([])
            setSelected([])
            setActiveTab('1')
            setPage(1)
        }
    }, [selfId, token, isOpen])
    


    return (
        <div className={`${styles.wrapper} ${isOpen ? styles.active : ''}`} style={{paddingBottom}}>
            <div className={styles.top}>
                <div className={styles.head}>
                Media Gallery
                </div>
                <div className={styles.close}>
                    <button onClick={onClose}>Закрыть</button>
                </div>
            </div>
            <div className={styles.info}>
                <div className={styles.user}>
                    <Avatar
                        
                        />
                </div>
                <div className={styles.action}>
                    {/* <div className={styles.action_btn}>
                        <Button
                            text='Отметить как отправленные'
                            />
                    </div> */}
                    <div className={styles.action_btn}>
                        <Button
                            onClick={() => onSend && onSend(selected)}
                            disabled={selected?.length === 0}
                            text={`Отправить ${selected?.length}`}
                            />
                    </div>
                </div>
            </div>
            <div className={styles.tabs}>
                {
                    tabs?.map((i, index) => (
                        <div onClick={() => setActiveTab(i.value)} className={`${styles.tab} ${activeTab === i.value ? styles.active : ''}`} key={index}>
                            <div className={styles.tab_icon}>{i.icon}</div>
                            <div className={styles.tab_label}>{i.label}</div>
                        </div>
                    ))
                }
            </div>
            <div className={styles.body}>
                <Row gutter={[12,12]}>
                    {
                        activeTab === '1' && (
                            mediaList?.length > 0 && mediaList?.map((i, index) => (
                                <Col span={6}>
                                    <div onClick={() => onSelectMedia(i)} className={`${styles.item} ${selected?.find(f => f?.id == i?.id) ? styles.active : ''}`}>
                                        {selected?.find(f => f?.id == i?.id) && <div className={styles.selected}><BsCheckLg/></div>}
                                        <img src={i.image_url} />
                                    </div>
                                </Col>
                            ))
                        )
                    }
                </Row>
                
            </div>
        </div>
    )
}


export default Media;