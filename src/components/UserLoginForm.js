import React from 'react';
import * as addActionList from '../redux/actions/addAction';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import login from '../assets/images/566.jpg'
import {
    FormControl,
    FormGroup,
    InputLabel,
    Input,
    Button,
} from '@material-ui/core';
import '../assets/css/RegisterForm.css'
import 'bootstrap/dist/css/bootstrap.css';
import { userLogin } from '../service/api'

const UserLoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [inputData, setInputData] = React.useState({ 
    //     fname: '',
    //     lname: '',
    //     email:'',
    //     phone:'',
    //     address:'',
    //     details:''
    // });

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     dispatch(addActionList.addData(inputData));
    //     alert('Data added successfully');
    //     navigate('/');
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // await userLogin({username: username, password: password});
        try{
            // console.log(data);
            // await axios.get(`${URL}/login`, { username, password });
            await axios.post(`${URL}/login`, { username, password });
            // if (response.data.success) {
            //     alert(response.data.message);
            // } else {
            //     alert(response.data.message);
            // }
        }catch(error){
            console.log('Error while calling Api', error);
        }
        // navigate('/');
    }

    return (
        <>
            <div className='container main d-flex justify-content-space-between align-items-center'>
                <div className="card border-0">
                    <div className="content row no-gutters d-flex justify-content-center align-items-center">
                        <div className="register-image-col col">
                        <img src={login} style={{width:"50%"}} className="card-img img-fluid" alt="..."/>
                        </div>
                        <div className='form-col col'>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                <FormGroup className='d-flex justify-content-center align-items-center' style={{width:"75%"}}>
                                    <FormControl className='register-form-title card-title'>
                                        <h5 class="widget-title" style={{"margin-bottom": "20px"}}> Sign up and start learning 
                                            <span style={{"background": "#839FAD none repeat scroll 0 0","display":"block","height":"1.5px","margin-top":"10px","position":"relative","width":"20%"}}></span>
                                            <span style={{"background":"#839FAD none repeat scroll 0 0","display":"block",height:"1.5px","margin-top":"5px","width":"50%"}}></span>
                                        </h5>
                                    </FormControl>
                                    <FormControl className='register-input-label'>
                                        <InputLabel>User-Name/Email</InputLabel>
                                        <Input type="string" name="username" onChange={(e) => setUsername(e.target.value)}/>
                                    </FormControl>
                                    <FormControl className='register-input-label' >
                                        <InputLabel>Password</InputLabel>
                                        <Input type="string" name="password" onChange={(e) => setPassword(e.target.value)}/>
                                    </FormControl>
                                    <FormControl style={{display:"flex","justify-content":"space-evenly",alignItems:"center","flex-direction":"row"}}>
                                        <Button className='homepage-btn' type="submit" value="submit" > LogIn </Button>
                                    </FormControl>
                                    <Button className='homepage-btn' type="submit" value="submit" > SignUp </Button>
                                </FormGroup>
                                </form>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </>
    );
};

export default UserLoginForm;