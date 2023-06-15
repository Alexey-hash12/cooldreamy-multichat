import IconButton from '../IconButton/IconButton';
import styles from './Header.module.scss';
import {IoMdNotificationsOutline} from 'react-icons/io';


const Header = () => {


    return (
        <div className={styles.wrapper}>
            <div className={styles.in}>
                <div className={styles.tabs}>
                    <button className={`${styles.tabs_btn} ${styles.active}`}></button>
                    <button className={styles.tabs_btn}></button>
                </div>
                <div className={styles.main}>
                    <div className={styles.info}>
                        <div className={styles.info_item}>
                        В работе: <span>05:35</span>
                        </div>
                        <div className={styles.info_item}>
                        Заработок: <span>$15</span>
                        </div>
                    </div>
                    <div className={styles.action}>
                        <button className={styles.btn}>СТОП</button>
                        <button className={styles.btn}>СТАРТ</button>
                    </div>
                </div>
                <div className={styles.action}>
                    <div className={styles.action_item}>
                        <IconButton
                            icon={<IoMdNotificationsOutline/>}
                            isNewAction
                            />
                    </div>
                    <div className={styles.action_item}>
                        <button className={styles.action_btn}>
                            Выход
                        </button>
                    </div>
                </div>  
            </div>
        </div>
    )
}

export default Header;