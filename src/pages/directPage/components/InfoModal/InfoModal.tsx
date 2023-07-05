import {Modal, ModalFuncProps} from 'antd';
import {FC, useEffect, useState} from 'react';
import styles from './InfoModal.module.scss';
import {Row, Col} from 'antd';
import { useAppSelector } from '../../../../hooks/reduxHooks';
import ApiService from '../../../../service/ApiService';
import InfoItem from './components/InfoItem/InfoItem';
import { DatePicker } from 'antd';
import moment from 'moment';
import dayjs from 'dayjs';
import { useInView } from 'react-intersection-observer';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import { PulseLoader } from 'react-spinners';

const service = new ApiService()



const tabs = [
    {value: '1', label: 'Логи'},
    {value: '2', label: 'Отчеты'},
    {value: '3', label: 'Штрафы'}
]





const InfoModal:FC<ModalFuncProps> = (props) => {
    const {
        onCancel
    } = props
    const {token} = useAppSelector(s => s.mainReducer)

    const {inView, ref} = useInView()
    const [loadMore, setLoadMore] = useState(false)
    
    const [activeTab, setActiveTab] = useState('1')
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)

    const [list, setList] = useState<any[]>([])
    const [date, setDate] = useState<any>(dayjs())


    const onClose = () => {
        onCancel && onCancel()
    }

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


    const getReports = () => {
        if(token) {
            service.getReports(token, {
                page,
                per_page: 5,
                date: date ? moment(date).format('Y-m-d') : ''
            }).then(res => {
                console.log(res)
                setTotal(res?.total)
                if(page === 1) {
                    setList(res?.data)
                } else {
                    setList(s => [...s, res?.data])
                }
            })
        }
    }


    const getLogs = () => {
        if(token) {
            service.getLogs(token, {
                page,
                per_page: 5,
                date: date ? moment(date).format('Y-m-d') : ''
            }).then(res => {
                console.log(res)
                setTotal(res?.total)
                if(page === 1) {
                    setList(res?.data)
                } else {
                    setList(s => [...s, res?.data])
                }
            })
        }   
    }

    const getFaults = () => {
        if(token) {
            service.getFaults(token, {
                page,
                per_page: 5,
                date: date ? moment(date).format('Y-m-d') : ''
                
            }).then(res => {
                console.log(res)
                setTotal(res?.total)
                if(page === 1) {
                    setList(res?.data)
                } else {
                    setList(s => [...s, res?.data])
                }
            })
        }
    }

    const onDeleteReport = (id: any) => {
        if(token) {
            service.deleteReport(token, id).then(res => {
                console.log(res)
                if(res?.message === 'success') {
                    if(activeTab === '2') {
                        const findIndex = list?.find(i => i.id == id)
                        if(findIndex !== -1) {
                            setList(s => {
                                const m = [...s]
                                const rm = m.splice(findIndex, 1)
                                return [...m]
                            })
                        }
                    }
                } else {
                    alert("Произошла ошибка")
                }
            })
        }
    }
    
    useEffect(() => {
        if(page === 1) {
            if(activeTab === '1') {
                getLogs()
            }   
            if(activeTab === '2') {
                getReports()
            } 
            if(activeTab === '3') {
                getFaults()
            }
        } else {
            setPage(1)
        }
    }, [activeTab, date])



    useEffect(() => {
        if(activeTab === '1') {
            getLogs()
        }   
        if(activeTab === '2') {
            getReports()
        } 
        if(activeTab === '3') {
            getFaults()
        }
    }, [token, page, activeTab])

    return (
        <Modal
            {...props}
            width={950}
            footer={false}
            onCancel={onClose}
            className={`${styles.wrapper} modal`}
            >
            <Row gutter={[12,12]}>
                <Col span={24}>
                    <div className={styles.date}>
                        <DatePicker
                            value={date}
                            onChange={setDate}
                            suffixIcon={null}
                            clearIcon={<AiOutlineCloseCircle/>}
                            placement={'bottomRight'}
                            popupStyle={{left: 'calc(50% - 144px)'}}
                            popupClassName='date-popup'
                            showToday={false}
                            />
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.tabs}>
                        {
                            tabs?.map((i, index) => (
                                <button onClick={() => setActiveTab(i.value)} className={`${styles.tab} ${activeTab === i.value ? styles.active : ''}`}>{i.label}</button>
                            ))
                        }
                    </div>
                </Col>
                <Col span={24}>
                    <div className={styles.list}>
                        {
                            list?.map((i, index) => (
                                <div key={index} className={styles.item}>
                                    <InfoItem {...i} onDelete={onDeleteReport}/>
                                </div>
                            ))
                        }
                    </div>
                    {
                    list && list?.length > 0 && (
                        loadMore && (
                            <div ref={ref} className={styles.load}>
                                <PulseLoader color='#fff'/>
                            </div>
                        )
                    )
                }
                </Col>
            </Row>
        </Modal>
    )
}

export default InfoModal;