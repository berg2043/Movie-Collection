import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardContent, CardActions, Button, CardHeader } from '@material-ui/core/';

// Material-ui styling
const useStyles = makeStyles(theme => ({
  card: {
      minWidth: 275,
      backgroundColor: '#c63901',
      color: '#cbd4c2',
  },
  pos: {
      marginBottom: 12,
      margin: theme.spacing(1),
      backgroundColor: '#cbd4c2',
      color: '#50514f',
  },
  delete:{
    margin: "auto",
    marginTop: 0,
    backgroundColor: '#50514f',
    color: '#cbd4c2',
  },
}))

function MovieTable(){
  // Adds material-ui styling
  const classes = useStyles();

  // Dispatch set up
  const dispatch = useDispatch();

  // Gets all the movies on load
  useEffect(()=>{
    dispatch({type: 'GET_MOVIES'})
  }, [dispatch]);  

  // Gains access to movies reducer
  const movies = useSelector(state=>state.movieList);

  function votes(id, dirrection){
    dispatch({type: 'VOTE', payload: {
      id,
      dirrection
    }})
  }
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
                <Card className={classes.card}>
                  <CardHeader title={movie.name}/>
                  <CardContent>
                    Genre: {movie.project}
                    <br/>
                    Date Released: {new Date(movie.release).toLocaleDateString()}
                    <br/>
                    Movie Run Time: {movie.run_time.split(':')[0]+':'+movie.run_time.split(':')[1]}
                  </CardContent>
                  
                  <CardActions>
                    <h5>Votes: {movie.votes}</h5>
                    <Button 
                      variant="contained"
                      className={classes.pos}
                      onClick={(event)=>{votes(movie.id, 1)}}
                    >
                      &uarr;
                    </Button>
                    <Button 
                      variant="contained"
                      className={classes.pos}
                      onClick={(event)=>{votes(movie.id, -1)}}
                    >
                      &darr;
                    </Button>
                  </CardActions>
                  <CardActions>
                    <Button 
                      variant="contained"
                      color="secondary"
                      className={classes.pos + ' ' + classes.delete}
                      onClick={(event)=>{dispatch({type: 'DELETE_MOVIE', payload: movie.id})}}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
    </Grid>
  );
}

export default MovieTable;