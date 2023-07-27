import { successSideEffectState, errorAction, loadingAction } from "../general/index";

export const Actions = {
    GET_API_DATA: 'GET_API_DATA',
    GET_API_DATA_ERROR: 'GET_API_DATA_ERROR',
    GET_API_DATA_SUCCESS: 'GET_API_DATA_SUCCESS',
    GET_API_DATA_LOADING: 'GET_API_DATA_LOADING',
    CLEAR_GET_API_DATA: 'CLEAR_GET_API_DATA',
}

export const getData = () => {
    return {
        type: Actions.GET_API_DATA,
    }
}

export const getDataLoadingAction = () =>
    loadingAction(Actions.GET_API_DATA_LOADING);

export const getDataErrorAction = (error) =>
    errorAction(Actions.GET_API_DATA_ERROR, error);

export const getDataSuccessAction = (data) => {
    const payload = {
        response: data,
        ...successSideEffectState,
    };

    return {
        type: Actions.GET_API_DATA_SUCCESS,
        payload: payload,
    };
};

export const clearGetApiData = () => {
    return {
        type: Actions.CLEAR_GET_API_DATA,
        payload: {}
    }
}