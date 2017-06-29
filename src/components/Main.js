import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import List from './List';

require('normalize.css/normalize.css');
require('styles/App.scss');

class AppComponent extends React.Component {
  /**
   * Constructor for AppComponent
   * @param  {Object} props React props object
   */
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      userList: [],
      userListSize: 0
    };
    this.selectedUsers = [];
    this.selectUser = this.selectUser.bind(this);
    this.showUserList = this.showUserList.bind(this);
  }

  /**
   * Lifecycle component method
   */
  componentWillMount() {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(users => {
        this.setState({
          users: _.orderBy(users.data, ['name'], ['asc'])
        });
      });
  }

  /**
   * Store or remove user from list
   * @param  {strinf} user User name
   */
  selectUser(user) {
    if (this.selectedUsers.indexOf(user) !== -1) {
      _.pull(this.selectedUsers, user);
    } else {
      this.selectedUsers.push(user);
    }
    this.setState({
      userListSize: this.selectedUsers.length
    });
  }

  /**
   * Set state for user list
   */
  showUserList() {
    this.setState({
      userList: _.sortBy(this.selectedUsers)
    });
  }

  /**
   * React render component method
   * @return {Object} React component
   */
  render() {
    const { users } = this.state;
    const { userList } = this.state;
    const { userListSize } = this.state;
    return (
      <div className='index'>
        <p className={userListSize === 0 ? 'hidden' : ''}>
          {userListSize} of {users.length} selected
        </p>
        {users.map(user => {
            return <List
              key={user.id}
              user={user}
              onSelectUser={this.selectUser} />
          })
        }
        <button
          className='btn btn--aqua'
          onClick={this.showUserList}>
          Confirm
        </button>
        <div>
          {userList.map(user => {
              return <p key={user}>{user}</p>
            })
          }
        </div>
      </div>
    );
  }
}

export default AppComponent;
