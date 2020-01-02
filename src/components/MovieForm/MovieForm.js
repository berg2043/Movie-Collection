import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Select, FormControl, MenuItem, Button, TextField, InputLabel } from '@material-ui/core/';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

// Material-ui styling
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  input: {
    margin: theme.spacing(1),
  }
}));

function MovieForm(){
  // Adds material-ui styling
  const classes = useStyles();
  
  // States
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [date, setDate] = useState(null);
  const [time, setTime] = useState('');

  // Dispatch set up
  const dispatch = useDispatch();

  // Gets all the genres on load
  useEffect(()=>{
    dispatch({type: 'GET_GENRES'})
  }, [dispatch]);  

  // Gains access to genres
  const genres = useSelector(state=>state.genreList);

  // Sends form to server then to DB
  function submit(event){
    event.preventDefault();
    dispatch({
      type: 'POST_MOVIE',
      payload: {
        name: name,
        genre: genre,
        date: date,
        time: time
      }
    })
  }

  return(
    <div style={{
      backgroundColor: '#c63901', 
      color: '#cbd4c2', 
      width: 'max-content', 
      borderRadius: 5,
      margin: 'auto',
      marginBottom: 10,
    }}>
      <h2 style={{margin: 10, textAlign: 'center'}}>Add New Movie</h2>
      <form onSubmit={(event)=>{submit(event)}}>
        <TextField
          type='text'
          onChange={(event)=>{setName(event.target.value)}}
          value={name}
          label='Name'
          className={classes.input}
        />
        <FormControl className={classes.formControl}>
        <InputLabel id='genre-label'>Genre</InputLabel>
          <Select
            onChange={(event)=>{setGenre(event.target.value)}}
            value={genre}
            labelId='genre-label'
          >
            {genres.map(genre=>{
              return(
                <MenuItem  key={genre.id} value={genre.project}>{genre.project}</MenuItem >
              )
            })}
          </Select>
        </FormControl>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant='inline'
            format='MM/dd/yyyy'
            margin='normal'
            onChange={(date)=>{setDate(date)}}
            value={date}
            label='Release Date'
            className={classes.input}
          />
        </MuiPickersUtilsProvider>
        <TextField 
          type='text' 
          maxLength='5' 
          pattern='\d{1,2}:\d{2}'
          title='h:mm or hh:mm.'
          label='Run Time hh:mm'
          onChange={(event)=>{setTime(event.target.value)}}
          value={time}
          className={classes.input}
        />
        <Button
          type="submit"
          className={classes.input}
          varient="contained"
          style={{backgroundColor:'#cbd4c2', color: '#50514f',}}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default MovieForm;