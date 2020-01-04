import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardActions, Button, CardHeader, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core/';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  input: {
    margin: theme.spacing(1),
  },
}))

function MovieCard(props) {
  // States for edditing
  const [name, setName] = useState(props.movie.name);
  const [project, setProject] = useState(props.movie.project);
  const [run_time, setRun_time] = useState(props.movie.run_time);
  const [release, setRelease] = useState(props.movie.release);
  const [editMode, setEditMode] = useState(false);

  // Adds material-ui styling
  const classes = useStyles();

  // Dispatch set up
  const dispatch = useDispatch();

  // Sends the vote to the server
  function votes(id, dirrection) {
    dispatch({
      type: 'VOTE', payload: {
        id,
        dirrection
      }
    })
  }

  const genres = useSelector(state => state.genreList);

  function edditing() {
    setEditMode(true);
  }

  function save(event) {
    event.preventDefault();
    dispatch({
      type: 'EDIT_MOVIE', payload: {
        id: props.movie.id,
        name,
        project,
        run_time,
        release,
      }
    })
    setEditMode(false);
  }

  // Conditionally renders either the card or editmode
  function editView() {
    if (editMode) {
      // Edit View
      return (
        <Card className={classes.card}>
          <form onSubmit={(event) => { save(event) }}>
            <TextField
              type='text'
              onChange={(event) => { setName(event.target.value) }}
              value={name}
              label='Name'
              className={classes.input}
            />
            <CardContent>
              <FormControl className={classes.formControl}>
                <InputLabel id='genre-label'>Genre</InputLabel>
                <Select
                  onChange={(event) => { setProject(event.target.value) }}
                  value={project}
                  labelId='genre-label'
                >
                  {genres.map(genre => {
                    return (
                      <MenuItem key={genre.id} value={genre.project}>{genre.project}</MenuItem >
                    )
                  })}
                </Select>
              </FormControl>
              <br />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant='inline'
                  format='MM/dd/yyyy'
                  margin='normal'
                  onChange={(release) => { setRelease(release) }}
                  value={release}
                  label='Release Date'
                  className={classes.input}
                />
              </MuiPickersUtilsProvider>
              <br />
              <TextField
                type='text'
                maxLength='5'
                pattern='\d{1,2}:\d{2}'
                title='h:mm or hh:mm.'
                label='Run Time hh:mm'
                onChange={(event) => { setRun_time(event.target.value) }}
                value={run_time}
                className={classes.input}
              />
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
                color="primary"
                className={classes.pos + ' ' + classes.delete}
                type="submit"
                onClick={(event) => { save(event); }}
              >
                Save
            </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.pos + ' ' + classes.delete}
                onClick={(event) => { dispatch({ type: 'DELETE_MOVIE', payload: props.movie.id }) }}
              >
                Delete
            </Button>
            </CardActions>
          </form>
        </Card>
      )
    } else {
      // Regular View
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
              color="primary"
              className={classes.pos + ' ' + classes.delete}
              onClick={edditing}
            >
              Edit
            </Button>
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
      )
    }
  }

  return (
    <>
      {editView()}
    </>
  );
}


export default MovieCard;