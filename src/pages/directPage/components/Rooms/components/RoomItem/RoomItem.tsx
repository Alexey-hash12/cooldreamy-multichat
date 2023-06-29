import styles from './RoomItem.module.scss';
import Avatar from '../../../../../../components/Avatar/Avatar';
import { Row, Col } from 'antd';
import {FC} from 'react'
import UserTitle from '../../../../../../components/UserTitle/UserTitle';
import { IUser } from '../../../../../../models/IUser';



const RoomItem:FC<any> = ({
    another_user,
    self,
    is_new
}) => {
    

    return (
        <div className={styles.wrapper}>
            <div className={styles.part}>
                <Avatar
                    image={self?.avatar_url_thumbnail}
                    />
                <div className={styles.body}>
                    <Row gutter={[3,3]}>
                        <Col span={24}>
                            <UserTitle
                                username={self?.name}
                                age={self?.age}
                                />
                        </Col>
                        <Col span={24}>
                            98:32
                        </Col>
                        <Col span={24}>
                            <div className={styles.y}>id 123456</div>
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
                            <div className={styles.x}>(5 | 5)</div>
                        </Col>
                        <Col span={24}>
                            <div className={styles.y}>(9999)</div>
                        </Col>
                        <Col span={24}>
                            <UserTitle
                                username={another_user?.name}
                                age={another_user?.age}
                                />
                        </Col>
                    </Row>
                </div>
                <Avatar
                    image={another_user?.avatar_url_thumbnail}
                    />
            </div>
        </div>
    )
}


export default RoomItem;