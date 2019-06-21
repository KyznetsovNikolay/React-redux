import React from 'react';
import User from '../User';
import './style.css';

const UsersList = (props) => {
    const { users } = props;

    const list = users.map(user => {
        const { id } = user;
        return (
            <div key={id}>
              <User {...user} id={id}/>
          </div>
        );
    });

  return (
      <div className='user-border'>
          <div className='post-label'>
              <h3>Пользователи</h3>
          </div>
        {list}
      </div>
    );
};
export default UsersList;