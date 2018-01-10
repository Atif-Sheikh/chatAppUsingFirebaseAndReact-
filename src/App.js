import React, { Component } from 'react';
import Form from './components/form';
import SignupForm from './components/signup';
import Home from './components/home';
import './App.css';
// import * as firebase from 'firebase';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {  
  render() {
    return (
      <BrowserRouter>
        <div className="App">
            <Route exact path='/' component={Form} />
            <Route path='/signup' component={SignupForm} />
            <Route path='/home' component={Home} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
