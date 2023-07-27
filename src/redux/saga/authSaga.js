import * as authCreators from '../actions/authAction';
import { takeEvery, put } from 'redux-saga/effects';
import { httpPost } from '../general/apiCall';

// generator function

function* addApiData(action) {
    try {
        // yield put(authCreators.addDataLoadingAction());
        let { data } = yield httpPost("http://localhost:3030/users", action.payload);
        // let { data } = yield axios.post(`http://localhost:3030/users`, action.payload);
        // yield put({ type: Actions.SET_API_DATA, data: data })

        yield put(authCreators.addDataSuccessAction(data));
    } catch (err) {
        yield put(authCreators.addDataErrorAction(err));
        // console.log(err);
    }
}

// watcher function
function* watchAuthSaga() {
    yield takeEvery(authCreators.Actions.ADD_API_DATA, addApiData);
}

export default watchAuthSaga;