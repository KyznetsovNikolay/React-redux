import React from 'react';
import Comment from '../Comment';

const CommentsList = (props) => {
    const { comments, posts, postId } = props;
    const commentsList = comments.map(comment => {
        const { name } = comment;
        return (
            <div key={name}>
                <Comment {...comment}
                         posts={posts}
                         postId={postId} />
            </div>
        );
    });
    return (
        <div className='com-border'>
            <div className='com-lay'>
                <h2>Комментарии</h2>
            </div>
            {commentsList}
        </div>
    );
};
export default CommentsList;