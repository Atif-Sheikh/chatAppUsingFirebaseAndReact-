import React, { Component } from 'react';
import '../App.css';
import * as firebase from 'firebase';
import Card from './card';
import './home.css';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

class Home extends Component {
    constructor(){
        super();
        this.state = {
            loading: false,
            users: [],
            uids: [],
            currentKey: null,
            index: null,
            chatBox: false,
            signInUserEmail: '',
            signInUserUid: '',
        };
    };
    componentDidMount(){
        var email = '';
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              email = user.email;
              console.log(user.email);
            }
        firebase.database().ref().child('Users').on(('value'), snap => {
            var users = [];
            var uids = [];
            var uid = '';
            var user = '';
            var signInUser = '';
            var signInUserUid = ''; 
            var obj = snap.val();
            for(let k in obj){
                if(email !== obj[k].email && users.displayName !== ''){
                user = obj[k];
                uid = k;
                uids.push(uid)
                    users.push(user.displayName)
                }else if(obj[k].email !== ''){
                    signInUser = obj[k];
                    signInUserUid = k;
                };
            };
            this.setState({users, uids, signInUser, signInUserUid, signInUserEmail: email});
        });
});
    };
    onClickButton(e){
            e.preventDefault();
            firebase.auth().signOut()
              .then(() => {
                this.props.history.push('/');                                
            });
    };
    chatBox = (index) => {
        var current = this.state.users[index];
        this.setState({
            index: index,
            currentUser: current,
            chatBox: !this.state.chatBox,
            currentKey: this.state.uids[index],
        });
        console.log('currentUID', this.state.uids[index]);
    };
    render(){
        return(<div className='main'>
                <AppBar title="Chat App" 
                    style={{padding:'20px', borderRadius: '15px'}}
                    iconElementRight={<RaisedButton className='logoutButton' 
                    onClick={this.onClickButton.bind(this)}>Logout</RaisedButton>} 
                />
                    <h4 className='userEmail'> User: { this.state.signInUserEmail } </h4>
                    <div className='listDiv'>
                        <b className='chats'>Chats:</b> {
                            this.state.users.map((user, index) => {
                                return <ul key={index} className="list-group">
                                    <li className='list-group-item' onClick={ () => this.chatBox(index)}>
                                        { user }
                                    </li>
                                </ul>
                            })
                        }
                    </div>
                    { this.state.chatBox ? <Card signInUserKey={this.state.signInUserUid} 
                                                 curentKey={this.state.currentKey} 
                                                 index={this.state.index}
                                                 users={this.state.users} 
                                                 currentUser={this.state.currentKey}
                                                 signInUserEmail={this.state.signInUserEmail}/> : 
                    '' }
                </div>);
    }
}

export default Home;