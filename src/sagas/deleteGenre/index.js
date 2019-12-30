import Axios from 'axios';
import {put} from 'redux-saga/effects';

function* deleteGenre(action){
  try {
    yield Axios.delete('/api/genres/'+action.payload)
    yield put({type: 'GET_GENRES'})
  } catch (error) {
    console.log('error Deleting genres', error)
  }
}

export default deleteGenre;