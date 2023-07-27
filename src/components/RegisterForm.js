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


const RegisterForm = () => {

    // const navigate = useNavigate();
    // const [userData, setUserData] = React.useState({name:'' ,email:'' })
    // const [adminData, setAdminData] = React.useState({name:'' ,email:'',username:'',password:''})
    // const dispatch = useDispatch();

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     dispatch(addActionList.addData(userData));
    //     alert('Data added successfully');
    //     navigate('/');
    // }

    // const [fname, setfName] = React.useState('');
    // const [lname, setlName] = React.useState('');
    // const [email, setEmail] = React.useState('');
    // const [phone, setPhone] = React.useState('');
    // const [address, setAddress] = React.useState('');
    // const [details, setDetails] = React.useState('');
    // const [fullname, setFullName] = React.useState([]);

    // const save = (fullnameObject) => {
    //     let tempList = fullname;
    //     tempList.push(fullnameObject);
    //     setFullName(tempList);
    // }
    
    // const submitHandle = () => {
    //     let fullnameObject = {}
    //     fullnameObject["fname"] = fname;
    //     fullnameObject["lname"] = lname;
    //     fullnameObject["email"] = email;
    //     fullnameObject["phone"] = phone;
    //     fullnameObject["address"] = address;
    //     fullnameObject["details"] = details;
    //     save(fullnameObject);
    //     console.log(fullname);
    //     alert("From Submitted!");
    // }
    
    // const handleChange = (e) => {
    //     const {name,value} = e.target;
    //     if (name === "fname"){
    //         setfName(value);
    //     }else if (name === "lname"){
    //         setlName(value);
    //     }else if (name === "email"){
    //         setEmail(value);
    //     }else if (name === "phone"){
    //         setPhone(value);
    //     }else if (name === "address"){
    //         setAddress(value);
    //     }else if (name === "details"){
    //         setDetails(value);
    //     }
    // }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputData, setInputData] = React.useState({ 
        fname: '', 
        lname: '',
        email:'',
        phone:'',
        address:'',
        details:''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addActionList.addData(inputData));
        alert('Data added successfully');
        navigate('/');
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
                                        <Input type="string" name="fname" onChange={(e) => setInputData({ ...inputData, name: e.target.value })}/>
                                    </FormControl>
                                    <FormControl className='register-input-label' >
                                        <InputLabel>Last Name</InputLabel>
                                        <Input type="string" name="lname" onChange={(e) => setInputData({ ...inputData, name: e.target.value })}/>
                                    </FormControl>
                                    <FormControl className='register-input-label' >
                                        <InputLabel>Email</InputLabel>
                                        <Input type="email" name="email" onChange={(e) => setInputData({ ...inputData, name: e.target.value })}/>
                                    </FormControl>                
                                    <FormControl className='register-input-label' >
                                        <InputLabel>Phone</InputLabel>
                                        <Input type="number" name="phone" onChange={(e) => setInputData({ ...inputData, name: e.target.value })} />
                                    </FormControl>
                                    <FormControl className='register-input-label' >
                                        <InputLabel>Address</InputLabel>
                                        <Input type="string" name="address" onChange={(e) => setInputData({ ...inputData, name: e.target.value })}/>
                                    </FormControl>                
                                    <FormControl className='register-input-label' >
                                        <InputLabel>Details</InputLabel>
                                        <Input type="string" name="details" onChange={(e) => setInputData({ ...inputData, name: e.target.value })} />
                                    </FormControl> 
                                    <FormControl style={{display:"flex","justify-content":"space-evenly",alignItems:"center","flex-direction":"row"}}>
                                        <Button className='register-myBtn' variant="contained" type="submit" value="submit" > SignUp </Button>
                                        <Button className='register-myBtn' variant="contained" type="submit" value="submit" > LogIn </Button>
                                    </FormControl>
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