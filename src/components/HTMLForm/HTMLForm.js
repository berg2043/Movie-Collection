import React, { useState } from 'react';

function HTMLForm(){
  // States
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  function submit(event){
    event.preventDefault();
    console.log(name, genre, date,time);
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
      />
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
};

export default HTMLForm;