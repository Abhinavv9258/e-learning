import * as React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index'
import RegisterPage from './pages/RegisterPage'
import UserLoginPage from './pages/UserLoginPage'
// import AdminLoginPage from './pages/AdminLoginPage'
// import AdminDashboard from './pages/AdminDashboard'
import Homepage from './pages/Homepage';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling


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
export const URL = process.env.REACT_APP_SERVER_URL;

const App = () => {
        return (
        <BrowserRouter>
            <ToastContainer />
              <Routes>
                    <Route path='/' element={ <Homepage/> } />
                    <Route path='/RegisterPage' element={ <RegisterPage/> } />
                    <Route path='/Homepage' element={ <Homepage/> } />
                    {/* <Route path='/AdminDashboard' element={ <AdminDashboard/> } /> */}
                    <Route path='/Index' element={ <Index/> } />
                    {/* <Route path='/adminLoginPage' element={ <AdminLoginPage/> } /> */}
                    <Route path='/userLoginPage' element={ <UserLoginPage/> } />
              </Routes>
        </BrowserRouter>
    );
}

export default App;
