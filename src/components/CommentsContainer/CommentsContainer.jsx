import React from 'react';
import { Route } from "react-router-dom";
import CommentsList from '../CommentsList';
import Comment from '../Comment';

const CommentsContainer = (props) => {

        const { comments, posts } = props;
        return (
            <div>
                <Route
                    path='/comments'
                    exact
                    render={() => {
                       return <CommentsList comments={comments} />
                    }}
                />
                <Route
                    path='/comments/:id'
                    exact
                    render={({ match }) => {
                        const { id } = match.params;
                        const comment = comments.find(comment => comment.id === +id);
                        return <Comment {...comment}
                                        match={+id}
                                        comments={comments}
                                        posts={posts} />
                    }}
                />
            </div>
        );
};
export default CommentsContainer;