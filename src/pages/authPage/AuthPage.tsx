import styles from './AuthPage.module.scss';
import Input from '../../components/Input/Input';
import { Row, Col } from 'antd';
import Button from '../../components/Button/Button';
import { useState } from 'react';
import ApiService from '../../service/ApiService';
import { LOCAL_STORAGE } from '../../utils/localStorage';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { main_tokenUpdate } from '../../store/slices/mainSlice';
import { useNavigate } from 'react-router-dom';
const service = new ApiService()


const AuthPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const onLogin = () => {
        if(email && password) {
            service.login({
                email,
                password
            }).then(res => {
                console.log(res)
                if(res?.token) {
                    dispatch(main_tokenUpdate(res?.token))
                    navigate('/')
                } else {
                    alert('ERROR!')
                }
            })
        }
    }


    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.form}>
                    <Row gutter={[25,25]}>
                        <Col span={24}>
                            <div className={styles.title}>Авторизация</div>
                        </Col>
                        <Col span={24}>
                            <Input
                                label='E-mail'
                                placeholder='E-mail'
                                value={email}
                                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                />
                        </Col>
                        <Col span={24}>
                            <Input
                                label='Пароль'
                                placeholder='Пароль'
                                type='password'
                                value={password}
                                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                />
                        </Col>
                        <Col span={24}>
                            <div className={styles.action}>
                                <Button
                                    onClick={onLogin}
                                    text='Войти'
                                    />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}


export default AuthPage;