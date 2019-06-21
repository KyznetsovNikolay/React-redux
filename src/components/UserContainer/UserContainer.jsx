import React from 'react';
import UserList from '../UsersList';
import User from '../User';
import { Route } from 'react-router-dom';

const UserContainer = (props) => {

        const { users, posts } = props;

        return (
            <div>
                <Route
                    path='/users/'
                    exact
                    render={() => {
                        return <UserList users={users}/>
                    }}
                />
                <Route
                    path='/users/:id'
                    exact
                    render={({ match }) => {
                        const { id } = match.params;
                        const user = users.find(user => user.id === +id);
                        return <User {...user} match={+id} posts={posts}/>
                    }}
                />
            </div>
        );
};
export default UserContainer;