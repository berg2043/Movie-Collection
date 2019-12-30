import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import HTMLPage from '../MoviePage/MoviePage'
import Nav from '../Nav/Nav';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav/>
        <Route path='/' render={(props)=><HTMLPage {...props}/>}/>
      </Router>
    </div>
  );
}

export default App;
