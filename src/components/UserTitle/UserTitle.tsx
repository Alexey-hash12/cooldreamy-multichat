import styles from './UserTitle.module.scss';



const UserTitle = () => {


    return (
        <div className={styles.wrapper}>
            <span className={styles.age}>UserName</span><span className={styles.age}>, 37</span>
        </div>
    )
}

export default UserTitle;