import React, { Component } from 'react';
import Post from '../Post/Post.jsx';
import NewPostWindow from '../NewPostWindow';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './style.css';
import actions from '../../actions/data.js';
import { Route } from 'react-router-dom';

class PostList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { posts, logIn, match } = this.props;
        const { deletePost } = this.props.actions;
        const userChecked =  logIn && <NewPostWindow posts={posts} match={match}/>;

        const list = posts.map(post => {
            const { id } = post;
            return <div key={id}>
                <Post {...post}
                      logIn={logIn}
                      deletePost={deletePost}
                />
            </div>
        });
        return (
            <div className='u-border'>
                <Route
                    path={`/posts`}
                    exact
                    render={() => {
                        return (
                            <div className='u-border'>
                                <div className='label'>
                                    <h2>Список постов</h2>
                                    {userChecked}
                                </div>
                                {list}
                            </div>
                        );
                    }}
                />
                <Route
                    path={`/users/:id`}
                    exact
                    render={() => {
                        return (
                            <div>
                                <div className='label'>
                                    <h2>Посты пользователя</h2>
                                    {userChecked}
                                </div>
                                {list}
                            </div>
                        );
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
   logIn: state.data.logIn
});

const mapDispatchToProps = dispatch => ({
   actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);