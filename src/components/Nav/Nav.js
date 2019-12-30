import React from 'react';
import { useHistory } from 'react-router-dom';
import './Nav.css';

function Nav(){
  let history = useHistory();
  return(
    <ul>
      <li><button onClick={(event)=>{history.push('/')}}>Movies</button></li>
      <li><button onClick={(event)=>{history.push('/genres/')}}>Genres</button></li>
    </ul>
  );
}

export default Nav;