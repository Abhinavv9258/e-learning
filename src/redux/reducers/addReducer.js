import { Actions } from '../actions/addAction';

export const apiAddDataReducer = (state = {}, action) => {
    console.log('reducer', action.payload);
    switch (action.type) {
        case Actions.ADD_API_DATA_LOADING:
        case Actions.ADD_API_DATA_ERROR:
        case Actions.ADD_API_DATA_SUCCESS:
            return { ...state, ...action.payload };
        case Actions.CLEAR_ADD_API_DATA:
            return { ...action.payload };
        default:
            // no case matched then return empty state
            return state;
    }
}

