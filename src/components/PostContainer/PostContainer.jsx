import React from 'react';
import Post from '../Post';
import PostList from '../PostList';
import { Route } from 'react-router-dom';

const PostContainer = (props) => {

        const { posts, comments, logIn, deletePost } = props;
        return (
            <div>
                <Route
                    path='/posts/'
                    exact
                    render={() => {
                        return <PostList
                            posts={posts}
                            deletePost={deletePost}
                        />
                    }}
                />
                <Route
                    path='/posts/:id'
                    exact
                    render={({ match }) => {
                        const { id } = match.params;
                        const post = posts.find(post => post.id === +id);
                        return <Post {...post}
                                     matchId={+id}
                                     logIn={logIn}
                                     comments={comments}
                                     deletePost={deletePost} />
                    }}
                />
            </div>
        );
};
export default PostContainer;