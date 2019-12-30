import Axios from 'axios';
import { put } from 'redux-saga/effects';

function* postMovie(action){
  try {
    yield Axios.post('/api/movies', action.payload);
    yield put({type:"GET_MOVIES"});
  } catch (error) {
    console.log('error posting movie', error);
  }
}

export default postMovie;