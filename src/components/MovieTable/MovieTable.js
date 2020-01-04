import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@material-ui/core/';
import MovieCard from '../MovieCard/MovieCard';


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
    <Grid 
      container spacing={3} 
      direction="row"
      justify="center"
      alignItems="stretch"
    >
      {movies.map(movie=>{
            return(
              <Grid item key={movie.id}>
                <MovieCard movie={movie}/>
              </Grid>
            );
          })}
    </Grid>
  );
}

export default MovieTable;