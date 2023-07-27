import { combineReducers } from "redux";
import { apiDataReducer } from './getReducer';
import { apiAddDataReducer } from './addReducer'
// import { apiDeleteDataReducer } from "./deleteReducer";
// import { apiUpdateDataReducer } from "./updateReducer";
import {authReducer} from './authReducer'


export default combineReducers({ 
    apiDataReducer, 
    apiAddDataReducer, 
    authReducer,
    // apiDeleteDataReducer, 
    // apiUpdateDataReducer 
});