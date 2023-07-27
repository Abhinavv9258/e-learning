import axios from 'axios';
import * as actionCreators from '../actions/getAction';
import { takeEvery, put } from 'redux-saga/effects';
import { httpGet } from '../general/apiCall';

// generator function
function* getApiData() {
    try {
        yield put(actionCreators.getDataLoadingAction());
        let { data } = yield httpGet("http://localhost:3030/users");

        // let {data} = yield axios.get('http://localhost:3030/users');
        // yield put({ type: Actions.SET_API_DATA, data: data });
        yield put(actionCreators.getDataSuccessAction(data));
    } catch (err) {
        yield put(actionCreators.getDataErrorAction(err));
        // console.log(err);
    }
}

// watcher function
function* watchApiSaga() {
    yield takeEvery(actionCreators.Actions.GET_API_DATA, getApiData);
}

export default watchApiSaga;