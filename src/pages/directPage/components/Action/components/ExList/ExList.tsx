import styles from './ExList.module.scss';
import {FC,useState, useEffect} from 'react'
import emojiData from '../../../../../../utils/emojiData';

interface I {
    list?: any[],
    onSendSticker?: (...args: any[]) => any,

    setText?: (...args: any[]) => any
}

const tabs = [
    {label: 'Смайлики', value: '1'},
    {label: 'Стикеры', value: '2'}
]


const ExList:FC<I> = ({
    list,
    onSendSticker,

    setText
}) => {
    const [activeTab, setActiveTab] = useState('1')    

    const onSelect = (item: any) => {
        if(activeTab === '1') {
            setText && setText((s:string) => `${s}${item?.label}`)
        }
        if(activeTab === '2') {
            onSendSticker && onSendSticker(item)
        }
    }


    const switchTabContent = () => {
        switch(activeTab) {
            case '1':
                return (
                    <div className={`${styles.body} custom-scroll-vertical`}>

                    {
                        emojiData?.map((item, index) => (
                            <div onClick={() => onSelect(item)} className={styles.item}  key={item.code}>
                                {item.label}
                            </div>
                        ))
                    }
                    </div>
                )
            case '2':
                return (
                    <div className={`${styles.body} custom-scroll-vertical`}>

                        {
                            list?.map((item, index) => (
                                <div onClick={() => onSelect(item)} className={styles.item}  key={item.id}>
                                    <div className={styles.sticker}>
                                        <img src={item.picture_url} alt="" />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.tabs}>
                {
                    tabs?.map((i, index) => (
                        <div onClick={()=> setActiveTab(i.value)} className={`${styles.tab} ${activeTab === i.value ? styles.active : ''}`}>{i.label}</div>
                    ))
                }
            </div>
            <div className={styles.main}>
                {switchTabContent()}
            </div>
        </div>
    )
}


export default ExList;