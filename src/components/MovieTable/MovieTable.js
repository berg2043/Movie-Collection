import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function MovieTable(){
  // Dispatch set up
  const dispatch = useDispatch();

  // Gets all the movies on load
  useEffect(()=>{
    dispatch({type: 'GET_MOVIES'})
  }, [dispatch]);  

  // Gains access to movies reducer
  const movies = useSelector(state=>state.movieList);

  return(
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Release Date</th>
            <th>Rune Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {movies.map(movie=>{
            return(
              <tr key={movie.id}>
                <td>{movie.name}</td>
                <td>{new Date(movie.release).toLocaleDateString()}</td>
                <td>{movie.run_time.split(':')[0]+':'+movie.run_time.split(':')[1]}</td>
                <td>
                  <button 
                    onClick={(event)=>{dispatch({type: 'DELETE_MOVIE', payload: movie.id})}}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MovieTable;