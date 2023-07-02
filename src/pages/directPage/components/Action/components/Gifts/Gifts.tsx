import styles from './Gifts.module.scss';
import {FC} from 'react';

interface I {
    list?: any[],
    onSendGift?: (...args: any[]) => any
}

const Gifts:FC<I> = ({
    list,
    onSendGift
}) => {

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.body} custom-scroll-vertical`}>
                {
                    list?.map((i, index) => (
                        <div onClick={() => onSendGift && onSendGift(i)} className={styles.item}>
                            <div className={styles.img}>
                                <img src={i?.picture_url} alt="" />
                            </div>
                            <div className={styles.descr}>
                                <div className={styles.name}>{i?.name}</div>
                                {/* <div className={styles.price}>{i?.credits}</div> */}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}


export default Gifts;