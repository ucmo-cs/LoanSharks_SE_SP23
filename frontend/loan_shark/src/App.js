import React, {Component} from 'react';

import Header from './components/Header'

import './App.css';
import {Container} from 'react-bootstrap';
import {Route, Switch} from 'react-router-dom'

import Home from './pages/bank/Home';
import Login from './pages/auth/Login';
import Join from './pages/auth/Join';
import Calculator from './pages/bank/Calculator';
import Calendar from './pages/bank/Calendar';
import Statements from './pages/bank/Statements';

import { AuthService } from './services/AuthService';
import Debug from './pages/debug/debug';

function Authenticated() {
  if(!AuthService.isLoggedIn()) {
    return <>
      <Switch>
        <Route path="/join" exact={true} component={Join}/>
        <Route path="/debug/Calculator" exact={true} component={Calculator}/>
        <Route path="/debug/Calendar" exact={true} component={Calendar}/>
        <Route path="/debug/Statements" exact={true} component={Statements}/>
        <Route path="/secretdebugpage" exact={true} component={Debug}/>
        <Route path="*"  component={Login}/>
      </Switch>
    </>
  }
  else {
   return <>
      <Route path="/" exact={true} component={Calendar}/>
      <Route path="/Calculator" exact={true} component={Calculator}/>
      <Route path="/Calendar" exact={true} component={Calendar}/>
      <Route path="/Statements" exact={true} component={Statements}/>
      <Route path="/secretdebugpage" exact={true} component={Debug}/>
    </>
  }
}

function App() {
  return (
    <div style={{height: "100vh", display: "flex", flexDirection: "column"}}>
      <Header/>
      <Container style={{flex: 1}}>
        <Authenticated/>
      </Container>    
    </div>
  );
}

export default App;
