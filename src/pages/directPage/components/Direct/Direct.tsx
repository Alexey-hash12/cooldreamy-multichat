import styles from './Direct.module.scss';
import DirectUsers from './components/DirectUsers/DirectUsers';


const Direct = () => {

    return (
        <div className={styles.wrapper}>
            <DirectUsers/>
        </div>
    )
}


export default Direct;