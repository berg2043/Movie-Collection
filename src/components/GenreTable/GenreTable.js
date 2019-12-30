import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function GenreTable(){
  // Dispatch set up
  const dispatch = useDispatch();

  // Gets all the genres on load
  useEffect(()=>{
    dispatch({type: 'GET_GENRES'})
  }, [dispatch]);  

  // Gains access to genres reducer
  const genres = useSelector(state=>state.genreList) || [];

  return(
    <div>
      <table>
        <thead>
          <tr>
            <th>Project</th>
            <th>Total Movies</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {genres.map(genre=>{
            return(
              <tr key={genre.id}>
                <td>{genre.project}</td>
                <td></td>
                <td>
                  <button 
                    onClick={(event)=>{dispatch({type: 'DELETE_GENRE', payload: genre.id})}}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default GenreTable;