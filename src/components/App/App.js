import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import HTMLPage from '../MoviePage/MoviePage'

function App() {
  return (
    <div className="App">
      <Router>
        <Route path='/' render={(props)=><HTMLPage {...props}/>}/>
      </Router>
    </div>
  );
}

export default App;
