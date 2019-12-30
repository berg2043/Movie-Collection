import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { takeEvery } from 'redux-saga/effects'
import logger from 'redux-logger';
// Reducers
import movieList from './reducers/movieList';
// Sagas
import getMovies from './sagas/getMovies';
import postMovie from './sagas/postMovie';
import deleteMovie from './sagas/deleteMovie';

function* rootSaga(){
  yield takeEvery('GET_MOVIES', getMovies);
  yield takeEvery('POST_MOVIE', postMovie);
  yield takeEvery('DELETE_MOVIE', deleteMovie)
}

// Create sagamiddleware
const sagaMiddleware = createSagaMiddleware();

// Creates redux store
const storeInstance = createStore(
  combineReducers({
    movieList
  }), applyMiddleware(logger, sagaMiddleware)
);

// Start sagaMiddleware
sagaMiddleware.run(rootSaga)

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
