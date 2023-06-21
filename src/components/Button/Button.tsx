import styles from './Button.module.scss';
import { IButton, buttonVariants } from './types';
import {FC} from 'react';


const switchVariants = (variant: buttonVariants) => {
    switch(variant) {
        case 'default':
            return styles.default
        default:
            return styles.default
    }
}


const Button:FC<IButton> = (props) => {

    const {variant = 'default', text, type='button'} = props;

    return (
        <button 
            className={`${styles.wrapper} ${switchVariants(variant)}`}
            {...props}
            type={type}
            >
            <div className={styles.text}>{text}</div>
        </button>
    )

}

export default Button;