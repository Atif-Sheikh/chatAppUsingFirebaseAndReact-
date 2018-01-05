import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import '../App.css';
import logo from '../chat.png';
import { NavLink } from 'react-router-dom';
import { DotLoader } from 'react-spinners';
import * as firebase from 'firebase';

class Form extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false,
    };
  };
  onChangeEmail(evt){
    console.log(evt.target.value);
    this.setState({
      email: evt.target.value,
      error: '',
    });
  };
  onChangePassword(evt){
    console.log(evt.target.value);
    this.setState({
      password: evt.target.value,
      error: '',      
    });
  };
  onButtonPress(evt){
    evt.preventDefault();
    const { email, password } = this.state;
    this.setState({
      error: '',
      loading: true,
    });
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      this.setState({
        email: '',
        password: '',
        error: '',
        loading: false,
      });
      this.props.history.push('/home');
      })
      .catch((e) => {
        // console.log('OnbuttonPress',e)
        this.setState({
          email: '', 
          password: '', 
          error: e.message, 
          loading: false,
        });
      });
  };
  render(){    
    return(
      <Paper className='wrap' zDepth={4} rounded={false}>
      <h1 className='heading'><img alt='' style={{width: 50, height: 50}}  src={logo} />Chat App</h1>
      <div className='formComponent'>
        <form onSubmit={this.onButtonPress.bind(this)}>
          <TextField
            hintText="Enter Email"
            floatingLabelText="Email address"
            type="text"
            onChange={this.onChangeEmail.bind(this)}
          /><br />  
          <TextField
            hintText="Enter Password"
            floatingLabelText="Password"
            type="password"            
            onChange={this.onChangePassword.bind(this)}
          />
          <p style={{color: 'red'}}>{ this.state.error }</p>
          {
            this.state.loading ? <DotLoader
            color={'#123abc'}
            size={20} 
          /> : <RaisedButton label="Submit" type='submit' to='/home' primary={true} style={{margin: '10'}} /> 
          }
          <br /> <br />
          <p><NavLink to='/signup'>Signup</NavLink></p>
        </form>
      </div>
    </Paper>
    );
  }
}

export default Form;