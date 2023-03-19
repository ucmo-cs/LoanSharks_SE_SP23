import React, { Component } from 'react';
import './App.css';
// import InstructorApp from './component/InstructorApp.jsx';
import RouterManager from './components/RouterManager';

class App extends Component {
  render() {
    return (
      <div className="container">
        <RouterManager />
      </div>
    );
  }
}

export default App;