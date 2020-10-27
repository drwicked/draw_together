import React from "react";
import './UsersList.css';

export default class UserList extends React.Component{
    constructor(props) {
      super(props);

      this.state = {
        username: props.username,
        userList: []
      };

      this.socket = props.socket;
      this.socket.on('connect', () => {

        this.socket.emit('ENTER_LOBBY', {
          username: this.state.username,
          socketId: this.socket.id
        });

      });
      
      this.socket.on('ENTER_LOBBY', (newUsersList) => {
        updateUserList(newUsersList);
      });

      this.socket.on('EXIT_LOBBY', (newUsersList) => {
        updateUserList(newUsersList);
      });

      const updateUserList = (newUsersList) => {
        this.setState({userList: newUsersList});
      };


    }

    handleLeavePage(event) {
      this.socket.emit('EXIT_LOBBY', {
        username: this.state.username,
        socketId: this.socket.id
      });
    }
    componentDidMount() {
      window.addEventListener('beforeunload', this.handleLeavePage.bind(this));
    }

    componentWillUnmount() {
      window.removeEventListener('beforeunload', this.handleLeavePage.bind(this));
    }

    render() {
      return (
        <div className="container-fluid h-100">
          <div className="row h-100">
            <div className="card w-100 h-100">
              <div className="card-body">
                <div className="card-title">Users</div>
                <hr/>
                <div id="messages" className="UsersList-box pre-scrollable h-100">
                  {this.state.userList.map((user, i) => (<div key={i}>{user.username}</div>))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}
