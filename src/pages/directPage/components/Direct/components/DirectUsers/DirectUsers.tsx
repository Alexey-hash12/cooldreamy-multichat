import DirectUser from "./components/DirectUser/DirectUser";
import styles from './DirectUsers.module.scss';
import {FC, useState} from 'react';
import InfoModal from "../../../InfoModal/InfoModal";

interface I {
    selfUser?:any,
    otherUser?:any
}

const DirectUsers:FC<I> = ({
    selfUser,
    otherUser
}) => {
    const [infoModal, setInfoModal] = useState(false)

    const onOpenInfoModal = () => {
        setInfoModal(true)
    }
    const onCloseInfoModal = () => {
        setInfoModal(false)
    }

    return (
        <div className={styles.wrapper}>
            <InfoModal
                open={infoModal}
                onCancel={onCloseInfoModal}
                />
            <div className={styles.item}><DirectUser {...otherUser} onOpenModal={onOpenInfoModal}/></div>
            <div className={styles.item}><DirectUser {...selfUser}/></div>
        </div>
    )
}

export default DirectUsers;