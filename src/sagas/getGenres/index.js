import Axios from 'axios';
import { put } from 'redux-saga/effects';

function* getGenres(action){
  try {
    const genres = yield Axios.get('/api/genres')
    yield put({type: 'GENRE_LIST', payload: genres.data});
  } catch (error) {
    console.log('error getting Genres', error)
  }
}

export default getGenres;