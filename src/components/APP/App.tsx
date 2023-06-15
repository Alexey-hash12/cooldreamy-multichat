import MainLayout from '../MainLayout/MainLayout';
import { Routes, Route } from 'react-router-dom';
import DirectPage from '../../pages/directPage/DirectPage';

const App = () => {

    return (
        <MainLayout>
            <Routes>
                <Route path='/' element={<DirectPage/>}/>    
            </Routes>            
        </MainLayout>
    )
}

export default App;