import React, { Component } from 'react';
import * as firebase from 'firebase';

class Card extends Component{
    constructor(){
        super();
        this.db = firebase.database().ref().child('users').child('messages');
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onButtonPress= this.onButtonPress.bind(this);
        this.state = {
            currentMessage: ''
        };
    };
    componentDidMount(){
        this.db.on(('value'), snap => {
            console.log('snap', snap.val(), 'currentKey', this.props.currentKey);
        });
    };
    onChangeMessage(e){
        this.setState({currentMessage: e.target.value});
        console.log(this.state.currentMessage);
    };
    onButtonPress(){
        const { currentMessage } = this.state;
        this.db.push({currentMessage});
    };
    render(){
        return(
                <div className="card" style={{width: "300px", height: '370px', float: 'right'}}>
                    <header style={{width: '100%', height: '30px', textAlign: 'center', background: 'rgba(0,0,0,0.2)'}}>{ this.props.currentUser }</header>
                    <div className='card-body'></div>
                    <div className='card-text'>
                        <input type='text' onChange={this.onChangeMessage} style={{width: '70%', borderRadius: '5px'}} className='form-control"' placeholder='Enter Your Message...' />
                        <button style={{width: '30%'}} onClick={this.onButtonPress} className='btn btn-primary'>Send.</button>
                    </div>
                </div>
        );
    }
}

export default Card;