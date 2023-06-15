import styles from './Dialogs.module.scss';
import DialogItem from './components/DialogItem/DialogItem';
import Input from '../../../../components/Input/Input';
import {FiSearch} from 'react-icons/fi';

const Dialogs = () => {


    return (
        <div className={styles.wrapper}>
            <div className={styles.search}>
                <Input
                    placeholder='...Поиск'
                    afterIcon={<FiSearch/>}
                    />
            </div>
            <div className={styles.list}>
                <div className={styles.item}><DialogItem/></div>
                <div className={styles.item}><DialogItem/></div>
            </div>
        </div>
    )
}

export default Dialogs;