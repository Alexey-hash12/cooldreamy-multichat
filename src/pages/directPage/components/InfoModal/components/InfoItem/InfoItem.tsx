import styles from './InfoItem.module.scss';
import {Row, Col} from 'antd';
import moment from 'moment';
import {useEffect} from 'react';
import IconButton from '../../../../../../components/IconButton/IconButton';
import Avatar from '../../../../../../components/Avatar/Avatar';
import {TbTrashX} from 'react-icons/tb'


const InfoItem = (props: any) => {
    const {
        date_time,
        man_id,
        id,
        anket_id,
        operator_id,
        text,
        log,
        reason,

        onDelete
    } = props



    return (
        <div className={styles.wrapper}>
            <Row gutter={[24,24]}>
                <Col span={12}>
                    <div className={styles.main}>
                        <Row align={'middle'} gutter={[3,3]}>
                            <Col span={7}>
                                <div className={styles.tm}>
                                    {date_time}
                                </div>
                            </Col>
                            <Col span={7}>
                                <div className={styles.man}>
                                    <div className={styles.name}>{'Username'}</div>
                                    <div className={styles.id}>{man_id}</div>
                                </div>
                            </Col>
                            <Col span={10}>
                                <div className={styles.anket}>
                                    <Avatar
                                        size={40}
                                        />
                                    <div className={styles.anket_body}>
                                        <div className={styles.name}>{'Username'}</div>
                                        <div className={styles.id}>{anket_id}</div>
                                    </div>
                                    <div className={styles.anket_action}>

                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col span={12}>
                    <div className={styles.action}>
                        <div className={styles.descr}>
                            {text || log || reason}
                        </div>
                        {
                            text && (
                                <div className={styles.btn}>
                                    <IconButton
                                        onClick={() => onDelete && onDelete(id)}
                                        icon={<TbTrashX/>}
                                        variant={'danger'}
                                        />
                                </div>
                            )
                        }
                    </div>
                </Col>
            </Row>
        </div>
    )
}


export default InfoItem;