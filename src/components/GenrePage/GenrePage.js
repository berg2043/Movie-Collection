import React from 'react';
import GenreForm from '../GenreForm/GenreForm';
import GenreTable from '../GenreTable/GenreTable';

function GenrePage(){
  return(
    <div>
      <GenreForm />
      <GenreTable/>
    </div>
  );
}

export default GenrePage;