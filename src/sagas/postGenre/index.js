import Axios from 'axios';
import { put } from 'redux-saga/effects';

function* postGenre(action){
  try {
    yield Axios.post('/api/genres', action.payload);
    yield put({type:"GET_GENRES"});
  } catch (error) {
    console.log('error posting genres', error);
  }
}

export default postGenre;