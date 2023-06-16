import DirectUser from "./components/DirectUser/DirectUser";
import styles from './DirectUsers.module.scss';


const DirectUsers = () => {


    return (
        <div className={styles.wrapper}>
            <div className={styles.item}><DirectUser/></div>
        </div>
    )
}

export default DirectUsers;