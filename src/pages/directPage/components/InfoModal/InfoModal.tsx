import {Modal, ModalFuncProps} from 'antd';
import {FC, useEffect, useState} from 'react';
import styles from './InfoModal.module.scss';
import {Row, Col} from 'antd';
import { useAppSelector } from '../../../../hooks/reduxHooks';
import ApiService from '../../../../service/ApiService';


const service = new ApiService()

interface I {

}

const tabs = [
    {value: '1', label: 'Логи'},
    {value: '2', label: 'Отчеты'},
    {value: '3', label: 'Штрафы'}
]



const InfoModal:FC<I & ModalFuncProps> = (props) => {
    const {
        onCancel
    } = props
    const {token} = useAppSelector(s => s.mainReducer)
    const [activeTab, setActiveTab] = useState('1')
    const [page, setPage] = useState(1)
    const [per_page, setPer_page] = useState(5)



    const onClose = () => {
        onCancel && onCancel()
    }


    const getReports = () => {
        if(token) {
            service.getReports(token, {
                page,
                per_page: 5
            }).then(res => {
                console.log(res)
            })
        }
    }

    const getLogs = () => {
        if(token) {
            service.getLogs(token, {
                page,
                per_page: 5
            }).then(res => {
                console.log(res)
            })
        }   
    }

    const getFaults = () => {
        if(token) {
            service.getFaults(token, {
                page,
                per_page: 5
            }).then(res => {
                console.log(res)
            })
        }
    }

    
    useEffect(() => {
        setPage(1)
    }, [activeTab])

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
                    <div className={styles.date}></div>
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
                    <div className={styles.list}></div>
                </Col>
            </Row>
        </Modal>
    )
}

export default InfoModal;