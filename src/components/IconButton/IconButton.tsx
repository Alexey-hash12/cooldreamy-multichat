import { IIconButton, iconButtonVariants } from "./types";
import styles from './IconButton.module.scss';
import { FC } from "react";





const IconButton:FC<IIconButton> = (props) => {
    const {icon, iconSize = 25, isNewAction, variant='simple', isRound} = props

    const switchVar = (variant: iconButtonVariants) => {
        switch(variant) {
            case 'violet':
                return styles.violet
            default: 
                return;
        }
    }

    return (
        <button
            {...props}
            className={`${styles.wrapper} ${switchVar(variant)} ${isRound ? styles.round : ''}`}
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