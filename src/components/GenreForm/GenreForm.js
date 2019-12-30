import React, { useState } from 'react';
import {useDispatch} from 'react-redux';

function GenreForm(){
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
    <form onSubmit={(event)=>{submit(event)}}>
      <input
        type='text'
        onChange={(event)=>{setProject(event.target.value)}}
        value={project}
        placeholder='project'
      />
      <button>Submit</button>
    </form>
  );
}

export default GenreForm;