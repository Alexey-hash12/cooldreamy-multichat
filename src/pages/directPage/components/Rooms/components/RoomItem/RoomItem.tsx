import styles from './RoomItem.module.scss';
import Avatar from '../../../../../../components/Avatar/Avatar';
import { Row, Col } from 'antd';
import {FC} from 'react'
import UserTitle from '../../../../../../components/UserTitle/UserTitle';
import { IUser } from '../../../../../../models/IUser';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import {useState, useEffect, memo} from 'react';


const RoomItemComponent:FC<any> = ({
    self_user,
    other_user,
    is_new,
    id,

    updated_at,
    type,

    max_limit,
    available_limit
}) => {
    const nav = useNavigate()
    const queryes = useSearchParams()

    const [activeId, setActiveId] = useState<any>()


    useEffect(() => {
        if(queryes) {
            setActiveId(queryes[0].get('id'))
        }
    }, [queryes])
    
 
    return (
        <div className={`${styles.wrapper} ${id == activeId ? styles.active : ''}`} onClick={() => nav(`/direct?type=${type}&id=${id}&self_id=${self_user.id}`)}>
            <div className={styles.test}>{id}</div>
            <div className={styles.part}>
                <Avatar
                    isNewAction={self_user?.online === 1}
                    image={self_user?.user_thumbnail_url || self_user?.user_avatar_url}
                    />
                <div className={styles.body}>
                    <Row gutter={[3,3]}>
                        <Col span={24}>
                            <UserTitle
                                username={self_user?.name}
                                age={self_user?.age}
                                />
                        </Col>
                        <Col span={24}>
                            {/* 98:32 */}
                        </Col>
                        <Col span={24}>
                            <div className={styles.y}>id {self_user?.id}</div>
                        </Col>
                    </Row>
                </div>
            </div>
            {
                is_new && (
                    <div className={styles.badge}>
                        <div className={styles.new}>NEW!</div>
                    </div>
                )
            }
            <div className={styles.part}>
                <div className={styles.body}>
                    <Row gutter={[3,3]}>
                        <Col span={24}>
                            <div className={styles.x}>({available_limit} | {max_limit})</div>
                        </Col>
                        {/* <Col span={24}>
                            <div className={styles.y}>(9999)</div>
                        </Col> */}
                        <Col span={24}>
                            <UserTitle
                                username={other_user?.name}
                                age={other_user?.age}
                                />
                        </Col>
                    </Row>
                </div>
                <Avatar
                    isNewAction={other_user?.online === 1}
                    image={other_user?.user_thumbnail_url || other_user?.user_avatar_url}
                    />
            </div>
        </div>
    )
}

const RoomItem = memo(RoomItemComponent)
export default RoomItem;