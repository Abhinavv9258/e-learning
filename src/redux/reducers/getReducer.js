import { Actions } from '../actions/getAction';

export const apiDataReducer = (state = {}, action) => {
    switch (action.type) {
        case Actions.GET_API_DATA_LOADING:
        case Actions.GET_API_DATA_ERROR:
        case Actions.GET_API_DATA_SUCCESS:
            return { ...state, ...action.payload };
        case Actions.CLEAR_GET_API_DATA:
            return { ...action.payload };
        default:
            // no case matched then return empty state
            return state;
    }
}

