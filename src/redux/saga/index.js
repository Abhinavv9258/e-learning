import { all } from "redux-saga/effects";
import watchApiSaga from "./getSaga";
import watchAddSaga from "./addSaga";
// import watchUpdateSaga from "./updateSaga";
// import watchDeleteSaga from "./deleteSaga";
// import watchSearchApiSaga from "./searchSaga";

function* apiSaga() {
    yield all([
        watchApiSaga(),
        watchAddSaga(),
        // watchUpdateSaga(),
        // watchDeleteSaga(),
        // watchSearchApiSaga()
    ]);
}

export default apiSaga;
