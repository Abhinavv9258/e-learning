import React from 'react';
import * as addActionList from '../redux/actions/addAction';
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
import { Link } from 'react-router-dom';
import { addUser } from '../service/api';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputData, setInputData] = React.useState({ 
        fname:'',
        lname:'',
        email:'',
        username:'',
        password:'',
        phone:'',
        address:'',
        stream:''
    });

    // const handleSubmit = async(e) => {
    //     // e.preventDefault();
    //     // dispatch(addActionList.addData(inputData));
    //     // const data = await axios.post("/Users",inputData);
    //     // console.log(data);
    //     // alert('Data added successfully');
    //     // navigate('/');
    // }

    const handleSubmit = async(e) => {
        e.preventDefault();
        await addUser(inputData);
        alert('Data added successfully');
        // navigate('/');
    }

    return (
        <>
            <div className='container main'>
                <div className="card border-0">
                    <div className="content row no-gutters">
                        <div className="register-image-col col">
                        <img src={login} className="card-img img-fluid" alt="..."/>
                        </div>
                        <div className='form-col col'>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <FormControl className='register-form-title card-title'>
                                        <h5 class="widget-title" style={{"margin-bottom": "20px"}}> Sign up and start learning 
                                            <span style={{"background": "#839FAD none repeat scroll 0 0","display":"block","height":"1.5px","margin-top":"10px","position":"relative","width":"20%"}}></span>
                                            <span style={{"background":"#839FAD none repeat scroll 0 0","display":"block",height:"1.5px","margin-top":"5px","width":"50%"}}></span>
                                        </h5>
                                    </FormControl>
                                    <FormControl className='register-input-label'>
                                        <InputLabel>First Name</InputLabel>
                                        <Input type="string" name="fname" onChange={(e) => setInputData({ ...inputData, fname: e.target.value })}/>
                                    </FormControl>
                                    <FormControl className='register-input-label' >
                                        <InputLabel>Last Name</InputLabel>
                                        <Input type="string" name="lname" onChange={(e) => setInputData({ ...inputData, lname: e.target.value })}/>
                                    </FormControl>
                                    <FormControl className='register-input-label' >
                                        <InputLabel>Email</InputLabel>
                                        <Input type="string" name="email" onChange={(e) => setInputData({ ...inputData, email: e.target.value })}/>
                                    </FormControl>  
                                    <FormControl className='register-input-label' >
                                        <InputLabel>Username</InputLabel>
                                        <Input type="string" name="username" onChange={(e) => setInputData({ ...inputData, username: e.target.value })} />
                                    </FormControl>               
                                    <FormControl className='register-input-label' >
                                        <InputLabel>Phone</InputLabel>
                                        <Input type="number" name="phone" onChange={(e) => setInputData({ ...inputData, phone: e.target.value })} />
                                    </FormControl>
                                    <FormControl className='register-input-label' >
                                        <InputLabel>Address</InputLabel>
                                        <Input type="string" name="address" onChange={(e) => setInputData({ ...inputData, address: e.target.value })}/>
                                    </FormControl>                
                                    <FormControl className='register-input-label' >
                                        <InputLabel>Stream</InputLabel>
                                        <Input type="string" name="stream" onChange={(e) => setInputData({ ...inputData, stream: e.target.value })} />
                                    </FormControl> 
                                    <FormControl className='register-input-label' >
                                        <InputLabel>Password</InputLabel>
                                        <Input type="string" name="password" onChange={(e) => setInputData({ ...inputData, password: e.target.value })} />
                                    </FormControl> 
                                    <FormControl style={{display:"flex","justify-content":"space-evenly",alignItems:"center","flex-direction":"row"}}>
                                        <Button className='register-myBtn' variant="contained" type="submit" value="submit" > SignUp </Button>
                                        {/* <Button className='register-myBtn' variant="contained" type="submit" value="submit" > LogIn </Button> */}
                                    </FormControl>
                                    <h5 class="widget-title" style={{"margin-bottom": "20px"}}> Already have an account? <Link to='/userLoginPage' style={{backgroundColor:"white"}}>SignIn</Link>  </h5>
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

export default RegisterForm;