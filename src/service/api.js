import axios from 'axios';
const URL = 'http://localhost:3030';

export const addUser = async (data) => {
    try{
        await axios.post(`${URL}/user/register`, data);
    }catch(error){
        console.log('Error while calling Api', error);
    }
}

export const addAdmin = async (data) => {
    try{
        await axios.post(`${URL}/admin/register`, data);
    }catch(error){
        console.log('Error while calling Api', error);
    }
}


export const userLogin = async ({ username, password }) => {
    try{
        // console.log(data);
        // await axios.get(`${URL}/login`, { username, password });
        await axios.post(`${URL}/user/login`, { username, password });
        // if (response.data.success) {
        //     alert(response.data.message);
        // } else {
        //     alert(response.data.message);
        // }
    }catch(error){
        console.log('Error while calling Api', error);
    }
}

export const adminLogin = async ({ username, password }) => {
    try{
        console.log( username, password );
        await axios.post(`${URL}/admin/login`, { username, password });
    }catch(error){
        console.log('Error while calling Api', error);
    }
}