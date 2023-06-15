import { IIconButton } from "./types";
import styles from './IconButton.module.scss';
import { FC } from "react";


const IconButton:FC<IIconButton> = (props) => {
    const {icon, iconSize = 25, isNewAction} = props

    return (
        <button
            {...props}
            className={styles.wrapper}
            style={{height: iconSize, width: iconSize, fontSize: iconSize}}
            >
            {isNewAction && <div className={styles.new}></div>}
            <div className={styles.main}>
                {icon}
            </div>
        </button>
    )
}

export default IconButton;