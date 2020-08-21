import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Cards from './components/Cards';
import Form from './components/Form/Form'
import './App.css';

function App() {

  let [confirm, setConfirm] = useState()

  return (
    <div className="App">
      <Switch>
        <Route path="/pizza">
          <Form setConfirm={setConfirm}/>
        </Route>
        <Route path="/">
          <Header/>
          <div className="hero-container">
          <Link to="/pizza">
            <button className="pizza-button">Pizza?!</button>
          </Link>
          </div>
          <Cards/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
