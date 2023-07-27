import * as React from "react";
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as getDataList from './redux/actions/getAction';
import Index from './pages/App'
import RegisterPage from './pages/RegisterPage'
import UserLoginPage from './pages/UserLoginPage'
import AdminLoginPage from './pages/AdminLoginPage'

const App = () => {
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
//                     <Route path='/' element={ <Index dataRes={state?.apiDataReducer?.response} /> } />
//                   <Route path='/login' element={ <UserLoginPage dataRes={state?.apiDataReducer?.response} /> } />
//                   <Route path='/register' element={ <AdminLoginPage dataRes={state?.apiDataReducer?.response} /> } />
//               </Routes>
//           }
//           <RegisterPage />
//         </BrowserRouter>
//     );

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let result = await fetch(
        'mongodb+srv://abhinavv2180:abhi6BBYM@cluster0.l5gayqw.mongodb.net/users/users', {
            method: "post",
            body: JSON.stringify({ name, email }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.warn(result);
        if (result) {
            alert("Data saved succesfully");
            setEmail("");
            setName("");
        }
    }
      return (
        <>
            <h1>This is React WebApp </h1>
            <form action="">
                <input type="text" placeholder="name"
                value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="email"
                value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit"
                onClick={handleOnSubmit}>submit</button>
            </form>
 
        </>
    );

}

// const App = () => {
//         return (
//         <BrowserRouter>
//               <Routes>
//                     <Route path='/' element={ <Index/> } />
//                     <Route path='/RegisterPage' element={ <RegisterPage/> } />
//                     <Route path='/Index' element={ <Index/> } />
//                     <Route path='/adminLoginPage' element={ <AdminLoginPage/> } />
//                     <Route path='/userLoginPage' element={ <UserLoginPage/> } />
//               </Routes>
//         </BrowserRouter>
//     );
// }

export default App;
