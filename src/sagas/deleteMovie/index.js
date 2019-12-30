import Axios from 'axios';
import {put} from 'redux-saga/effects';

function* deleteMovie(action){
  try {
    yield Axios.delete('/api/movies/'+action.payload)
    yield put({type: 'GET_MOVIES'})
  } catch (error) {
    console.log('error Deleting movies', error)
  }
}

export default deleteMovie;