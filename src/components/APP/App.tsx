import MainLayout from '../MainLayout/MainLayout';
import { Routes, Route } from 'react-router-dom';
import DirectPage from '../../pages/directPage/DirectPage';
import AuthPage from '../../pages/authPage/AuthPage';
import { Provider } from 'react-redux';
import store from '../../store/store';
// import { ToastContainer } from 'react-toastify';
import PrivateRoute from '../../hoc/PrivateRoute';


const App = () => {

    return (
        <Provider store={store}>
            <MainLayout>
                {/* <ToastContainer/> */}
                <Routes>
                    <Route path='/auth' element={<AuthPage/>}/>
                    <Route path='/direct' element={<PrivateRoute><DirectPage/></PrivateRoute>}/>    
                </Routes>            
            </MainLayout>
        </Provider>
        
    )
}

export default App;