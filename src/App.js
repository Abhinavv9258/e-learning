import * as React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as getDataList from './redux/actions/getAction';
import Index from './pages/Index'
import RegisterPage from './pages/RegisterPage'
import UserLoginPage from './pages/UserLoginPage'
import AdminLoginPage from './pages/AdminLoginPage'

// const App = () => {
//     const dispatch = useDispatch();
//     let state = useSelector((state) => state);
//     // let state = useSelector((state) => state.apiAddDataReducer.response);
//     React.useEffect(() => {
//         dispatch(getDataList.getData());
//     }, [dispatch]);
//     return (
//         <BrowserRouter>
//           {
//               state?.apiDataReducer?.isSuccess &&
//               <Routes>
//                     <Route path='/' element={ <Appjs dataRes={state?.apiDataReducer?.response} /> } />
//                   <Route path='/login' element={ <LoginPage dataRes={state?.apiDataReducer?.response} /> } />
//                   <Route path='/register' element={ <RegisterPage dataRes={state?.apiDataReducer?.response} /> } />
//               </Routes>
//           }
//           <RegisterPage />
//         </BrowserRouter>
//     );
// }

const App = () => {
        return (
        <BrowserRouter>
              <Routes>
                    <Route path='/' element={ <Index/> } />
                    <Route path='/RegisterPage' element={ <RegisterPage/> } />
                    <Route path='/Index' element={ <Index/> } />
                    <Route path='/adminLoginPage' element={ <AdminLoginPage/> } />
                    <Route path='/userLoginPage' element={ <UserLoginPage/> } />
              </Routes>
        </BrowserRouter>
    );
}

export default App;
