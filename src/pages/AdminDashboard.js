import React,{useEffect,useState} from 'react';
import { useParams } from "react-router";
import { findAllUser } from '../service/api';
import AdminNavbar from '../components/AdminNavbar'
import Footer from '../components/Footer'
import AdminCarousels from '../components/AdminCarousels'
import { Typography } from '@mui/material';

const AdminDashboard = () => {
    const { id } = useParams();
    const [input, setinput] = useState("");
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        getAllUser();
    }, []); 

    const getAllUser = async () => {
        let response = await findAllUser();
    }

    // return (
    //     <>
    //         <AdminNavbar />
    //         <div>            
    //             <AdminCarousels />
    //         </div>
    //         <div style={{background:"#f5f5f5"}}>
    //             <Typography variant="h5" gutterBottom> Top Courses</Typography>
    //         </div>
    //         <Typography variant="h5" gutterBottom> Top Universities Course</Typography>
    //         <div style={{background:"#f5f5f5"}}>
    //             <Typography variant="h5" gutterBottom> About Us</Typography>
    //         </div>
    //         <Footer />
    //     </>
    // );
    return (
        <>
            <div>
                
            </div>
        </>
    );
};

export default AdminDashboard;