import React, { Component } from 'react';
import * as firebase from 'firebase';
import close from '../close.png';

class Card extends Component{
    constructor(props){
        super(props);
        // this.db = firebase.database().ref().child(`Users`);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onButtonPress= this.onButtonPress.bind(this);
        this.ScrollDiv = this.ScrollDiv.bind(this);
        this.state = {
            messages: [],
            recieverMsgs: [],
            currentMessage: '',
            senderUserEmail: '',
            recieverKey: '',
            senderKey: '',
            keys: [],
            currentUserName: '',
        };
    };
    // componentWillReceiveProps(a){
    //     console.log(a);
    // };
    componentWillReceiveProps(props){
        console.log(props);
        // var recieverKey = this.props.curentKey;
        // var senderKey = this.props.signInUserKey;
        // var signInUserEmail = this.props.signInUserEmail;
        // var currentUserName = this.props.currentUser;
        firebase.database().ref().child(`Users/${props.signInUserKey}/${props.curentKey}`).on(('value'), snap => {
            var obj = snap.val();
            var currentMsg = '';
            var msgs = [];
            for(let key in obj){
                    currentMsg = obj[key];
                    msgs.push(currentMsg);
                    // console.log('surrent',currentMsg);
            }
            this.setState({
                messages: msgs,
                // signInUserEmail,
                // recieverKey,
                // senderKey,
                // currentUserName, 
            });
            this.ScrollDiv();                        
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
        let signInUserEmail = this.props.signInUserEmail;
        const { currentMessage } = this.state;
        console.log('reciever: ', this.props.curentKey, 'Sender: ', this.props.signInUserKey, signInUserEmail);
            if(currentMessage !== '' && signInUserEmail){
                firebase.database().ref(`Users/${this.props.signInUserKey}/`).child(this.props.curentKey).push({currentMessage, signInUserEmail});
                firebase.database().ref(`Users/${this.props.curentKey}/`).child(this.props.signInUserKey).push({currentMessage, signInUserEmail});
            }
            else{
                alert('Error');
            }       
            this.setState({
                currentMessage: '',
            });
    };
    render(){
        // console.log(this.props);
        return(
                <div className="card" onMouseOver={this.ScrollDiv} style={{width: "70%", height: '80%', float: 'right',position: 'absolute', left:'300px' ,bottom: '5px'}}>
                    <header style={{paddingLeft: '20px', width: '100%', height: '60px', marginTop: '-5px', borderTopLeftRadius:'5px', borderTopRightRadius:'5px', textAlign: 'Left', fontSize: '40px', background: 'rgb(37, 116, 169)'}}>{ this.props.currentUser }<span><img onClick={this.props.closeButton} style={{width: '40px', height:'40px', float: 'right', marginRight: '20px', marginTop: '10px', cursor: 'pointer'}} alt='close' src={close} /></span></header>
                    <div style={{ background: 'skyblue', overflowY: 'auto'}} id='cardBody' className='card-body'>
                        <div style={{width: '100%'}}>
                            {
                            this.state.messages.map((msg,index)=>{
                                return msg.signInUserEmail === this.props.signInUserEmail ? <p style={{lineHeight: '40px', minHeight: '50px', color: 'white', float: 'right', marginTop: '2px', borderRadius: '5px', width: '550px', padding: '5px', maxWidth: 'auto', right: '0px', background: 'rgba(0,0,0,0.4)'}} key={index}>{msg.currentMessage}</p>
                                : <p key={index} style={{color: 'white', lineHeight: '40px', minHeight: '50px', float: 'left', borderRadius: '5px', padding: '5px', width: '550px', background: 'rgba(0,0,0,0.5)'}}>{ msg.currentMessage }</p>
                            })
                        }
                        </div>
                    </div>
                    <div className='card-text' style={{background: 'rgba(0,0,0,0.1)'}}>
                        <form onSubmit={this.onButtonPress}>
                        <input type='text' value={this.state.currentMessage} onKeyUp={this.ScrollDiv} onChange={this.onChangeMessage} style={{width: '70%', height: '65px', background: 'white', borderRadius: '5px'}} className='form-control"' placeholder='Enter Your Message...' />
                        <button style={{width: '30%', height: '65px', marginTop: '-1px', marginLeft: '0px'}} type='submit' className='btn btn-primary'>Send.</button>
                        </form>
                    </div>
                </div>
        );
    }
}

export default Card;