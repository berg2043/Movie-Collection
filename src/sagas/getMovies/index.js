import Axios from 'axios';
import { put } from 'redux-saga/effects';

function* getMovies(action){
  try {
    const movies = yield Axios.get('/api/movies')
    yield put({type: 'MOVIE_LIST', payload: movies});
  } catch (error) {
    console.log('error getting movies', error)
  }
}

export default getMovies;