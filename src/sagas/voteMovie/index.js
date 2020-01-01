import Axios from 'axios';
import { put } from 'redux-saga/effects';

function* voteMovie(action){
  try {
    yield Axios.put('/api/movies/'+action.payload.id, action.payload);
    yield put({type:"GET_MOVIES"});
  } catch (error) {
    console.log('error voting movie', error);
  }
}

export default voteMovie;