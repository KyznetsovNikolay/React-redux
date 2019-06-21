import React, { Component } from 'react';
import './style.css';
import { Link, Route } from 'react-router-dom';
import EditPostWindow from '../EditPostWindow';
import CommentsList from "../CommentsList";
import photos from '../image.js';
import NewCommentWindow from "../NewCommentWindow";
import { Button } from 'react-bootstrap';

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    openText = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    opened = () => {
      this.setState({ isOpen: true });
    };

    render() {
        const {title, body, userId, id, postId, comments, logIn, deletePost } = this.props;
        const { isOpen } = this.state;
        const posts = <div className='post'>
            <div className='pointer'>
                <h4 onClick={this.openText}>{title}</h4>
            </div>
            <div>
                <img className='img' src={photos.photo} alt="photo"/>
                <p className='text'>{body}</p>
                <div className='but'>
                    {logIn && <EditPostWindow title={title} body={body} id={id} userId={userId} />}<div className='div' />
                    <Link to={`/posts/${id}`} onClick={this.opened}><Button variant="outline-secondary">Подробнее</Button></Link><div className='div' />
                    <div className='del'>
                        <div/>
                        { logIn && <Button variant="outline-secondary" onClick={() => deletePost(id)}>X</Button> }
                    </div>
                </div>
            </div>
        </div>;
        const userPost = <div className='post-id'>
            <h4 onClick={this.openText} className='pointer'>{title}</h4>
            <div className='pad'>
                { isOpen && <div>
                    <p className='text'>{body}</p>
                    <div className='but'>
                        {logIn && <EditPostWindow title={title} body={body} id={id} userId={userId} />}<div className='div' />
                        <Link to={`/posts/${id}`} onClick={this.opened}><Button variant="outline-secondary">Подробнее</Button></Link><div className='div' />
                        <div className='del'>
                            <div/>
                            { logIn && <Button variant="outline-secondary" onClick={() => deletePost(id)}>X</Button> }
                        </div>
                    </div>
                </div> }
            </div>
        </div>;

        return (
            <div>
                <Route
                    path='/posts'
                    exact
                    render={() => {
                        return  posts;
                    }}
                />
                <Route
                    path='/users/:id'
                    exact
                    render={() => {
                        return  userPost;
                    }}
                />
                <Route
                    path={'/posts/:id'}
                    exact
                    render={() => {
                        const userComments = comments.filter(comment => comment.postId === id);
                        return (
                            <div>
                                <div className='post'>
                                    <div className='pointer'>
                                        <h4>{title}</h4>
                                    </div>
                                    <div>
                                        <p className='text'>{body}</p>
                                        <div className='but'>
                                            {logIn && <EditPostWindow title={title} body={body} id={id} postId={postId} />}<div className='div' />
                                            {logIn && <NewCommentWindow postId={id} />}<div className='div' />
                                            <Link to={`/users/${userId}`}><Button variant="outline-secondary">Автор поста</Button></Link><div className='div' />
                                            <div className='del-to'>
                                                <div/>
                                                { logIn && <Link to={`/posts`}><Button variant="outline-secondary" onClick={() => deletePost(id)}>X</Button></Link> }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <CommentsList comments={userComments} postId={id}/>
                            </div>
                        );
                    }}
                />
            </div>
        );
    }
}

export default Post;