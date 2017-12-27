import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as firebase from 'firebase';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

var config = {
  apiKey: "AIzaSyC3LBs0CeUS6U3h746BvI0TDvpHi7KeHBM",
  authDomain: "chatapp-114a5.firebaseapp.com",
  databaseURL: "https://chatapp-114a5.firebaseio.com",
  projectId: "chatapp-114a5",
  storageBucket: "",
  messagingSenderId: "532152435017"
};
firebase.initializeApp(config);

ReactDOM.render(<MuiThemeProvider >
    <App />  
  </MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
