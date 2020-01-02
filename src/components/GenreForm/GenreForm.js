import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core/';

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

function GenreForm(){
  // Adds material-ui styling
  const classes = useStyles();

  // States
  const [project, setProject] = useState('');

  // Dispatch set up
  const dispatch = useDispatch();

  // Sends form to server then to DB
  function submit(event){
    event.preventDefault();
    dispatch({
      type: 'POST_GENRE',
      payload: {
        project: project,
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
      <h2 style={{margin: 10, textAlign: 'center'}}>Add New Genre</h2>
      <form onSubmit={(event)=>{submit(event)}}>
        <TextField
          type='text'
          onChange={(event)=>{setProject(event.target.value)}}
          value={project}
          label='project'
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

export default GenreForm;