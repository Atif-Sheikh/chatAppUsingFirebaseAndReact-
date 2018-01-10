import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { DotLoader } from 'react-spinners';
import '../App.css';
import * as firebase from 'firebase';
import { NavLink } from 'react-router-dom';

class SignupForm extends Component{
  constructor(){
    super();
    this.db = firebase.database().ref().child('Users');
    this.state = {
      displayName: '',
      email: '',
      password: '',
      passwordError: '',
      loader: false,
    }
  };
  // componentDidMount(){
  //   this.db.on(('value'), snap => {
  //     console.log(snap.val(), snap.displayName);
  //   });
  // };
  onChangeEmail(e){
    // console.log(e.target.value);
    this.setState({
      email: e.target.value,
      error: '',
    });
  };
  onchangeName(e){
    this.setState({
      displayName: e.target.value,
      error: '',
    });
  };
  onChangePassword(e){
    // console.log(e.target.value);    
    this.setState({
      password: e.target.value,
      error: '',      
    });
  };
  onButtonPress(e){
    e.preventDefault();
    const { displayName, email, password } = this.state;
    this.setState({
      error: '',
      loading: true,
    });
    if(displayName !== '' || email !== '' || password !=='' ){
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((e) => {
          console.log('then', e.uid);
          firebase.database().ref(`Users/${e.uid}`).set({
            displayName: displayName, email: email
          })
          // this.db.set({ displayName: displayName, email: email});
          this.props.history.push('/home');
          this.setState({
            loading: false,
          });
  
        })
        .catch((e) => {
          console.log('catch', e);
          this.setState({
            error: e.message,
            loading: false,
          });
        });
      } else{
        alert('please enter Field Correctly.');
        this.setState({
          loading: false,
        });
      };
  };
  render(){
    return(
      <Paper style={{width: '350px', paddingLeft: '50px'}} className='wrap' zDepth={4} rounded={false}>  
      <div className='signupForm'>
        <h1 style={{marginLeft: '50px'}}>Signup</h1>
        <form onSubmit={this.onButtonPress.bind(this)}>
            <TextField
            hintText="Enter name"
            floatingLabelText="Name"
            type="text"
            onChange={this.onchangeName.bind(this)}                  
          /><br />
          <TextField
            hintText="Enter Email"
            floatingLabelText="Email"
            type="text"
            onChange={this.onChangeEmail.bind(this)}      
          /><br />  
          <TextField
            hintText="Password"
            floatingLabelText="Password"
            type="password"
            onChange={this.onChangePassword.bind(this)}      
          /><p style={{color: 'red', margin: '2px'}}>{ this.state.error }</p>
            {
              this.state.loading ? <DotLoader
              color={'#123abc'}
              size={20} 
              loading={this.state.loading} 
            /> : <RaisedButton label="Submit" type='submit' primary={true} style={{margin: '10px', marginLeft: '50px'}} /> 
            }
        </form>
          <p><NavLink to='/'>Already Have an account ?</NavLink></p>        
      </div>
      </Paper>
    );
  }
}

export default SignupForm;