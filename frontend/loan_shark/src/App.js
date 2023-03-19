import React, {Component} from 'react';

import Header from './components/Header'

import './App.css';
import {Container} from 'react-bootstrap';
import {Route} from 'react-router-dom'

import Home from './pages/bank/Home';
import Login from './pages/auth/Login';
import Join from './pages/auth/Join';
import Calculator from './pages/bank/Calculator';
import Calendar from './pages/bank/Calendar';
import Statements from './pages/bank/Statements';

function App() {
  return (
    <div>
      <Header/>
      <Container>
        <Route path="/login" exact={true} component={Login}/>
        <Route path="/join" exact={true} component={Join}/>


        <Route path="/" exact={true} component={Home}/>
        <Route path="/Calculator" exact={true} component={Calculator}/>
        <Route path="/Calendar" exact={true} component={Calendar}/>
        <Route path="/Statements" exact={true} component={Statements}/>
      </Container>    
    </div>
  );
}

export default App;
