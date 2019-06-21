import React from 'react';
import './style.css';

const Comment = (props) => {
    const { name, body, date } = props;
  return (
    <div >
        <div className='comments-post'>
            <h3 className='com-head'>{name}</h3>
            <div className='pad'>
                <p>{body}</p>
                <i>{date}</i>
            </div>
        </div>
    </div>
  );
};
export default Comment;