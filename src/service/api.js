import axios from 'axios';
const URL = 'http://localhost:3030';

export const addUser = async (data) => {
    try{
        console.log(data);
        await axios.post(`${URL}/RegisterPage`, data);
    }catch(error){
        console.log('Error while calling Api', error);
    }
}

export const userLogin = async ({ username, password }) => {
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
}

export const adminLogin = async ({ username, password }) => {
    try{
        // console.log(data);
        await axios.post(`${URL}/login`, { username, password });
    }catch(error){
        console.log('Error while calling Api', error);
    }
}



