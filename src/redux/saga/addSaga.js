import axios from 'axios';
import * as actionCreators from '../actions/addAction';
import { takeEvery, put } from 'redux-saga/effects';
import { httpPost } from '../general/apiCall';

// generator function

function* addApiData(action) {
    try {
        yield put(actionCreators.addDataLoadingAction());
        let { data } = yield httpPost("http://localhost:3030/users", action.payload);
        // let { data } = yield axios.post(`http://localhost:3030/users`, action.payload);
        // yield put({ type: Actions.SET_API_DATA, data: data })

        yield put(actionCreators.addDataSuccessAction(data));
    } catch (err) {
        yield put(actionCreators.addDataErrorAction(err));
        // console.log(err);
    }
}

// watcher function
function* watchAddSaga() {
    yield takeEvery(actionCreators.Actions.ADD_API_DATA, addApiData);
}

export default watchAddSaga;