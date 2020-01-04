import Axios from 'axios';
import { put } from 'redux-saga/effects';

function* editMovie(action){
  try {
    yield Axios.put('/api/movies', action.payload);
    yield put({type:"GET_MOVIES"});
  } catch (error) {
    console.log('error editting movie', error);
  }
}

export default editMovie;