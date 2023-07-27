import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';
import createSagaMiddleware from 'redux-saga';
import apiSaga from './saga/index';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({ reducer: rootReducer, middleware: () => [sagaMiddleware] });
sagaMiddleware.run(apiSaga);

export default store; 
