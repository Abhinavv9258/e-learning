import { successSideEffectState, errorAction, loadingAction } from "../general/index";
export const Actions = {
    ADD_API_DATA: 'ADD_API_DATA',
    ADD_API_DATA_ERROR: 'ADD_API_DATA_ERROR',
    ADD_API_DATA_SUCCESS: 'ADD_API_DATA_SUCCESS',
    ADD_API_DATA_LOADING: 'ADD_API_DATA_LOADING',
    CLEAR_ADD_API_DATA: 'CLEAR_ADD_API_DATA'
}

export const addData = (data) => {
    return {
        type: Actions.ADD_API_DATA,
        payload: data
    }
}

export const addDataLoadingAction = () =>
    loadingAction(Actions.ADD_API_DATA_LOADING);

export const addDataErrorAction = (error) =>
    errorAction(Actions.ADD_API_DATA_ERROR, error);

export const addDataSuccessAction = (data) => {
    const payload = {
        response: data,
        ...successSideEffectState,
    };

    return {
        type: Actions.ADD_API_DATA_SUCCESS,
        payload: payload,
    };
};

export const clearAddApiData = () => {
    return {
        type: Actions.CLEAR_ADD_API_DATA,
        payload: {}
    }
}