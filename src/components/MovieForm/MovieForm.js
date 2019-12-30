import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';

function MovieForm(){
  // States
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [date, setDate] = useState('');
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
    <form onSubmit={(event)=>{submit(event)}}>
      <input
        type='text'
        onChange={(event)=>{setName(event.target.value)}}
        value={name}
        placeholder='Name'
      />
      <select
        onChange={(event)=>{setGenre(event.target.value)}}
        value={genre}
        placeholder='Genre'
      >
        {genres.map(genre=>{
          return(
            <option value={genre.project}>{genre.project}</option>
          )
        })}
      </select>
      <input
        type='date'
        onChange={(event)=>{setDate(event.target.value)}}
        value={date}
        placeholder='Release Date'
      />
      <input 
        type="text" 
        maxLength='5' 
        pattern="\d{1,2}:\d{2}"
        title="h:mm or hh:mm."
        placeholder="Run Time hh:mm"
        onChange={(event)=>{setTime(event.target.value)}}
        value={time}/>
      <button>Submit</button>
    </form>
  );
}

export default MovieForm;