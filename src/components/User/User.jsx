import React from 'react';
import {Link, Route} from "react-router-dom";
import PostList from '../PostList';
import { Button } from 'react-bootstrap';
import './style.css';

const User = (props) => {

        const { name, email, match, posts, username, website, phone, id } = props;
        return (
            <div className='po-border'>
                <Route
                    path={'/users/:id'}
                    exact
                    render={() => {
                        const userPosts = posts.filter(post => post.userId === match);
                        return (
                            <div>
                                <h2>Информация о пользователе</h2>
                                <div className='user-id'>
                                    <h4 className='header'>{username}</h4>
                                    <div className='p'>
                                        <strong><p>{name}</p></strong>
                                        <p>Email: {email}</p>
                                        <p>Site: {website}</p>
                                        <p>Phone: {phone}</p>
                                    </div>
                                </div>
                                <PostList posts={userPosts} match={match}/>
                            </div>
                        );
                    }}
                />
                <Route
                    path={`/users`}
                    exact
                    render={() => {
                        return (
                            <div className='user-id2'>
                                <h4 className='header'>{name}</h4>
                                <div className='p'>
                                    <p>Email: {email}</p>
                                    <p>Phone: {phone}</p>
                                    <Link to={`/users/${id}`}><Button variant="outline-secondary">Подробнее</Button></Link>
                                </div>
                            </div>
                        );
                    }}
                />
            </div>
        );
};

export default User;