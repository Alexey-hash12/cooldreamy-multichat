import styles from './LimitItem.module.scss';
import Avatar from '../../../../../../components/Avatar/Avatar';
import { Row, Col } from 'antd';
import {FC} from 'react'
import UserTitle from '../../../../../../components/UserTitle/UserTitle';
import { IUser } from '../../../../../../models/IUser';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import {useState, useEffect, memo} from 'react';
import Button from '../../../../../../components/Button/Button';
import IconButton from '../../../../../../components/IconButton/IconButton';
import { BsPencil } from 'react-icons/bs';



const LimitItemComponent:FC<any> = ({
    chat_id,
    created_at,
    girl,
    girl_id,
    id,
    limits,
    man,
    man_id,
    onCreateChat
}) => {
    const nav = useNavigate()
    //const queryes = useSearchParams()

    const [activeId, setActiveId] = useState<any>()


    // useEffect(() => {
    //     if(queryes) {
    //         setActiveId(queryes[0].get('id'))
    //     }
    // }, [queryes])
    
 
    return (
        <div 
            className={`${styles.wrapper} ${id == activeId ? styles.active : ''}`} 
            //onClick={() => nav(`/direct?type=${type}&id=${id}&self_id=${man.id}`)}
            onClick={() => {
                onCreateChat && onCreateChat({
                    anket_id: girl_id,
                    man_id: man_id,
                    operator_chat_limit_id: id
                })
            }}
            >
            <div className={styles.test}>{id}</div>
            <div className={styles.part}>
                <Avatar
                    isNewAction={man?.online === 1}
                    image={man?.user_thumbnail_url || man?.user_avatar_url}
                    />
                <div className={styles.body}>
                    <Row gutter={[3,3]}>
                        <Col span={24}>
                            <UserTitle
                                username={man?.name}
                                age={man?.age}
                                />
                        </Col>
                        <Col span={24}>
                            {/* 98:32 */}
                        </Col>
                        <Col span={24}>
                            <div className={styles.y}>id {man?.id}</div>
                        </Col>
                    </Row>
                </div>
            </div>
            
            <div className={styles.badge}>
                {/* <Button text='Написать'/> */}
                <IconButton
                    isRound
                    iconSize={50}
                    icon={<BsPencil size={20}/>}
                    variant={'violet'}
                    />
            </div>

            <div className={styles.part}>
                <div className={styles.body}>
                    <Row gutter={[3,3]}>
                        {/* <Col span={24}>
                            <div className={styles.x}>({available_limit} | {max_limit})</div>
                        </Col> */}
                        {/* <Col span={24}>
                            <div className={styles.y}>(9999)</div>
                        </Col> */}
                        <Col span={24}>
                            <UserTitle
                                justify={'flex-end'}
                                username={girl?.name}
                                age={girl?.age}
                                />
                        </Col>
                    </Row>
                </div>
                <Avatar
                    isNewAction={girl?.online === 1}
                    image={girl?.user_thumbnail_url || girl?.user_avatar_url}
                    />
            </div>
        </div>
    )
}

const LimitItem = memo(LimitItemComponent)
export default LimitItem;