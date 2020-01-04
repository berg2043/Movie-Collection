import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardActions, Button, CardHeader } from '@material-ui/core/';

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
  delete: {
    margin: "auto",
    marginTop: 0,
    backgroundColor: '#50514f',
    color: '#cbd4c2',
  },
}))

function MovieCard(props) {
  // Adds material-ui styling
  const classes = useStyles();

  // Dispatch set up
  const dispatch = useDispatch();

  function votes(id, dirrection) {
    dispatch({
      type: 'VOTE', payload: {
        id,
        dirrection
      }
    })
  }
  return (
    <Card className={classes.card}>
      <CardHeader title={props.movie.name} />
      <CardContent>
        Genre: {props.movie.project}
        <br />
        Date Released: {new Date(props.movie.release).toLocaleDateString()}
        <br />
        Movie Run Time: {props.movie.run_time.split(':')[0] + ':' + props.movie.run_time.split(':')[1]}
      </CardContent>

      <CardActions>
        <h5>Votes: {props.movie.votes}</h5>
        <Button
          variant="contained"
          className={classes.pos}
          onClick={(event) => { votes(props.movie.id, 1) }}
        >
          &uarr;
        </Button>
        <Button
          variant="contained"
          className={classes.pos}
          onClick={(event) => { votes(props.movie.id, -1) }}
        >
          &darr;
        </Button>
      </CardActions>
      <CardActions>
        <Button
          variant="contained"
          color="secondary"
          className={classes.pos + ' ' + classes.delete}
          onClick={(event) => { dispatch({ type: 'DELETE_MOVIE', payload: props.movie.id }) }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}


export default MovieCard;