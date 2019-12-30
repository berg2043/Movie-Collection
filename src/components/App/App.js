import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Nav from '../Nav/Nav';
import MoviePage from '../MoviePage/MoviePage'
import GenrePage from '../GenrePage/GenrePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav/>
        <Route exact path='/' render={(props)=><MoviePage {...props}/>}/>
        <Route exact path='/genres' render={(props)=><GenrePage {...props}/>}/>
      </Router>
    </div>
  );
}

export default App;
