import styles from './DirectUser.module.scss';
import { Row, Col } from 'antd';
import Avatar from '../../../../../../../../components/Avatar/Avatar';
import UserTitle from '../../../../../../../../components/UserTitle/UserTitle';
import TextArea from '../../../../../../../../components/TextArea/TextArea';
import IconButton from '../../../../../../../../components/IconButton/IconButton';
import {LuEdit} from 'react-icons/lu';


const DirectUser = (props: any) => {
    const {
        state,
        country,
        age,
        name,
        credits,
        id,
        avatar_url_thumbnail,
        online,
        onOpenModal
    } = props

    return (
        <div className={styles.wrapper}>
            <Row style={{width: '100%'}} gutter={[25,25]}>
                <Col span={14}>
                    <div className={styles.main}>
                        <Avatar
                            image={avatar_url_thumbnail}
                            isNewAction={online === 1}
                            size={32}
                            />
                        <div className={styles.body}>
                            <div className={styles.part}>
                                <div className={styles.part_item}><UserTitle username={name} age={age}/></div>
                                <div className={styles.part_item}>{country}</div>
                                <div className={styles.part_item}>{state}</div>
                            </div>
                            <div className={styles.part}>
                                <div className={styles.part_item}>id {id}</div>
                                {/* <div className={styles.part_item}>Цель: <span>Знакомства</span></div> */}
                                {/* <div className={styles.part_item}>Фото: <span>5</span></div> */}
                            </div>
                            <div className={styles.part}>
                                <div className={styles.part_item}>Кредиты: <span>{credits}</span></div>
                                {/* <div className={styles.part_item}>Чаты: <span>20</span></div> */}
                                {/* <div className={styles.part_item}>Письма: <span>10</span></div> */}
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={10}>
                    <div className={styles.action}>
                        <TextArea placeholder='Описание...' height={65}/>
                    </div>
                </Col>
            </Row>
            {
                onOpenModal && (
                    <div className={styles.action}>
                        <IconButton
                            onClick={onOpenModal}
                            icon={<LuEdit/>}
                            />
                    </div>
                )
            }
            
        </div>
    )
}

export default DirectUser;