import React, { Component } from 'react';
// import Paper from 'material-ui/Paper';
import '../App.css';
import * as firebase from 'firebase';
// import UserList from './UserList';
import Card from './card';
// import Form from './form';
import './home.css';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

class Home extends Component {
    constructor(){
        super();
        this.db = firebase.database().ref().child('users');
        this.state = {
            // user: null,
            // loggedIn: true,
            loading: false,
            users: [],
            keys: [],
            currentKey: null,
            index: null,
            currentUser: '',
            chatBox: false,
            signInUser: '',
        };
    };
    componentDidMount(){
        this.db.on(('value'), snap => {
            var users = [];
            var keys = [];
            var key = '';
            var user = ''; 
            var obj = snap.val();
            for(let k in obj){
                console.log(obj[k]);
                user = obj[k];
                key = k;
                keys.push(key);
                if(user.displayName){
                    users.push(user.displayName)
                };
            };
            var signIn = firebase.auth().currentUser;
            this.setState({users, keys, signInUser: signIn});
            console.log(this.state.users);
        });
    //    var currentObj = firebase.auth().currentUser;
    //    console.log('current User', currentObj.email);
        // this.setState({
        //     currentUser: currentObj.email,
        // });
        // console.log(firebase.auth().currentUser());
        // this.setState({loading: true});
        // firebase.auth().onAuthStateChanged((user) => {
        //     if(user){
        //         this.setState({loading: false});
        //     }else{
        //         this.setState({loading: false});                
        //     }
        // });
    };
    onClickButton(){
            firebase.auth().signOut()
              .then(() => {
                // this.setState({
                //   loggedIn: false
                // });
                this.props.history.push('/');                                
            });
    };
    chatBox = (index) => {
        var current = this.state.users[index];
        this.setState({
            index: index,
            currentUser: current,
            chatBox: !this.state.chatBox,
            currentKey: this.state.keys[index]
        });
        // console.log('currentKey', this.state.keys[index]);
    };
    render(){
        return(
            // <Paper className='wrap' zDepth={4} rounded={false}>            
                <div>
                <AppBar title="Chat App" 
                    iconElementRight={<RaisedButton className='logoutButton' 
                    onClick={this.onClickButton.bind(this)}>Logout</RaisedButton>} 
                />
                    <h4>Current User: { this.state.signInUser.email }</h4>
                    <div className='listDiv'>
                        Users: {
                            this.state.users.map((user, index) => {
                                return <ul key={this.state.keys[index]} className="list-group">
                                    <li className='list-group-item' onClick={ () => this.chatBox(index)}>
                                        { user }
                                    </li>
                                </ul>
                            })
                        }
                    </div>
                    <br />                        
                    { this.state.chatBox ? <Card currentKey={this.state.currentKey} keys={this.state.keys} index={this.state.index} currentUser={this.state.currentUser}/> : '' } 
                    <br />
                </div>
            // </Paper>
        );
    }
}

export default Home;