import React from "react";
import "./Chat.css";

export default class Chat extends React.Component{
    constructor(props) {
      super(props);

      this.state = {
        username: props.username,
        message: '',
        messages: []
      };

      this.socket = props.socket;

      this.socket.on('RECEIVE_MESSAGE', (data) => {
        addMessage(data);
        updateScroll();
      });

      const addMessage = (data) => {
        this.setState({messages: [...this.state.messages, data]});
      };

      const updateScroll = () =>{
        var element = document.getElementById("messages");
        element.scrollTop = element.scrollHeight;
      };

      this.sendMessage = (event) => {
        // event.preventDefault();
        this.socket.emit('SEND_MESSAGE', {
          author: this.state.username,
          message: this.state.message
        });
        this.setState({message: ''});
      };

      this.onEnterKey = (event => {
        if (event.key === 'Enter') {
          this.sendMessage(event);
        }
      });
    }

    render(){
      return (
        <div className="container-fluid h-100">
          <div className="row h-100">
            <div className="card w-100 h-100">
              <div className="card-body">
                <div className="card-title">Chat</div>
                  <hr/>
                  <div id="messages" className="Chat-messages pre-scrollable h-100">
                    {this.state.messages.map((message, i) => {
                      return (
                        <div key={i}>{message.author}: {message.message}</div>
                      )
                    })}
                </div>
              </div>

              <div className="card-footer">
                <input
                  type="text"
                  placeholder="Message"
                  className="form-control"
                  value={this.state.message}
                  onChange={event => this.setState({message: event.target.value})}
                  onKeyPress={this.onEnterKey}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

}
