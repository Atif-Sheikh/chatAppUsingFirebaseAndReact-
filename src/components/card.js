import React, { Component } from 'react';
import * as firebase from 'firebase';

class Card extends Component{
    constructor(props){
        super(props);
        this.db = firebase.database().ref().child(`Users`);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onButtonPress= this.onButtonPress.bind(this);
        this.ScrollDiv = this.ScrollDiv.bind(this);
        this.state = {
            messages: [],
            recieverMsgs: [],
            currentMessage: '',
            senderUserEmail: '',
            recieverKey: this.props.currentUser,
            senderKey: this.props.signInUserKey,
            keys: [],
            currentUserName: this.props.users[this.props.index],
        };
    };
    componentDidMount(){
        var recieverKey = this.state.recieverKey;
        var senderKey = this.state.senderKey;
        var signInUserEmail = this.props.signInUserEmail;
        firebase.database().ref().child(`Users/${senderKey}/${recieverKey}`).on(('value'), snap => {
            var obj = snap.val();
            var currentMsg = '';
            var msgs = [];
            for(let key in obj){
                    currentMsg = obj[key];
                    msgs.push(currentMsg);
                    console.log('surrent',currentMsg);
            }
            this.setState({
                messages: msgs,
                signInUserEmail, 
            });
        });
    };
    onChangeMessage(e){
        this.setState({currentMessage: e.target.value});
    };
    ScrollDiv(){
              document.querySelector('#cardBody').scrollTop = 9999999999
     };     
    onButtonPress(e){
        e.preventDefault();
        const { currentMessage, recieverKey, senderKey, signInUserEmail } = this.state;
        console.log('reciever: ', recieverKey, 'Sender: ', signInUserEmail);
            if(currentMessage !== ''){
                firebase.database().ref(`Users/${senderKey}/`).child(recieverKey).push({currentMessage, signInUserEmail});
                firebase.database().ref(`Users/${recieverKey}/`).child(senderKey).push({currentMessage, signInUserEmail});
            }       
            this.setState({
                currentMessage: '',
            });
    };
    render(){
        return(
                <div className="card" style={{width: "300px", height: '370px', float: 'right'}}>
                    <header style={{width: '100%', height: '30px', marginTop: '-5px', borderTopLeftRadius:'5px', borderTopRightRadius:'5px', textAlign: 'center', fontSize: '25px', background: 'rgb(37, 116, 169)'}}>{ this.state.currentUserName }</header>
                    <div style={{flex: '1', background: 'skyblue', overflowY: 'auto'}} id='cardBody' className='card-body'>
                        <div style={{width: '100%'}}>
                            {
                            this.state.messages.map((msg,index)=>{
                                return msg.signInUserEmail === this.props.signInUserEmail ? <p style={{color: 'white', float: 'right', marginTop: '2px', borderRadius: '5px', padding: '5px', width: '130px', background: 'rgba(0,0,0,0.4)'}} key={index}>{msg.currentMessage}</p>
                                : <p key={index} style={{color: 'white' , float: 'left', borderRadius: '5px', padding: '5px', width: '130px', background: 'rgba(0,0,0,0.5)'}}>{ msg.currentMessage }</p>
                            })
                        }
                        </div>
                    </div>
                    <div className='card-text' style={{background: 'rgba(0,0,0,0.1)'}}>
                        <form onSubmit={this.onButtonPress}>
                        <input type='text' value={this.state.currentMessage} onKeyUp={this.ScrollDiv} onMouseOver={this.ScrollDiv} onChange={this.onChangeMessage} style={{width: '70%', height: '38px', background: 'rgba(0,0,0,0.3)', borderRadius: '5px'}} className='form-control"' placeholder='Enter Your Message...' />
                        <button style={{width: '30%', marginTop: '-5px', marginLeft: '-5px'}} type='submit' className='btn btn-primary'>Send.</button>
                        </form>
                    </div>
                </div>
        );
    }
}

export default Card;