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
import { useInView } from 'react-intersection-observer';
import Skeleton from './components/Skeleton/Skeleton';
import { PulseLoader } from 'react-spinners';

const tabs = [
    {value: '2', label: 'Паблик', icon: <BsImages/>},
    {value: '4', label: '18+', icon: <BsImages/>},
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
    const {inView, ref} = useInView()


    const [selfId, setSeldId] = useState<any>()

    const [activeTab, setActiveTab] = useState('2')
    const [selected, setSelected] = useState<any[]>([])
    const [mediaList, setMediaList] = useState<any[]>([])
    const [page, setPage] = useState<number>(1)

    const [loading, setLoading] = useState(false)
    const [loadMore, setLoadMore] = useState(false)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        if(isOpen) {
            if(total !== undefined) {
                mediaList?.length >= total ? setLoadMore(false) : setLoadMore(true)
            }
        }
        
       
    }, [mediaList, total, isOpen])

    useEffect(() => {
        if(isOpen) {
            if(loadMore && inView) {
                setPage && setPage((s: number) => s + 1)
            }
        }
    }, [inView, loadMore, setPage, mediaList, isOpen])


    useEffect(() => {
        if(queryes) {
            setSeldId(queryes[0].get('self_id'))
        }
    }, [queryes])

    useEffect(() => {
        setSelected([])
    }, [type, selfId])

    const closeHandle = () => {
        setLoadMore(false)
        setLoading(false)
        setTotal(0)
        setMediaList([])
        onClose && onClose()
    }

    useEffect(() => {
        if(isOpen) {
            getMedia()
        }
    }, [page, token, selfId, isOpen])

    

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
        if(token && selfId && activeTab) {
            page === 1 && setLoading(true)
            service.getMedia(token, selfId, page, Number(activeTab)).then(res => {
                console.log(res)
                setTotal(res?.total)
                if(page === 1) {
                    setMediaList(res?.data)
                } else {
                    setMediaList(s => [...s, ...res?.data])
                }
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    // useEffect(() => {
    //     closeHandle()
    // }, [selfId])


    useEffect(() => {
        setPage(1)
    }, [selfId, activeTab])
    


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
                    {/* <Avatar
                        
                        /> */}
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
                {
                    loading ? (
                        <Skeleton/>
                    ) : (
                        <Row gutter={[12,12]}>
                            {
                                 activeTab === '1' && (
                                    mediaList?.length > 0 ? (
                                        mediaList?.map((i, index) => (
                                            <Col span={6}>
                                                <div onClick={() => onSelectMedia(i)} className={`${styles.item} ${selected?.find(f => f?.id == i?.id) ? styles.active : ''}`}>
                                                    {selected?.find(f => f?.id == i?.id) && <div className={styles.selected}><BsCheckLg/></div>}
                                                    <img src={i.image_url} />
                                                </div>
                                            </Col>
                                        ))
                                    ) : null
                                )
                            }
                        </Row>
                    )
                }
                {
                    mediaList && mediaList?.length > 0 && (
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


export default Media;