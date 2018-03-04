import React from 'react';
import moment from 'moment';
import Link from '../asyncLink'; // eslint-disable-line

const KEY_DEL = 46;

const Comments = ({ user, comments, deleteComment }) => comments.map((comment, index) => (
  <div className="card" key={comment.id}>
    <div className="card-block">
      <p className="card-text">
        {comment.body}
      </p>
    </div>
    <div className="card-footer">
      <Link to={`/author/${comment.author.username}`} className="comment-author">
        <img alt="" src={comment.author.image} className="comment-author-img" />
      </Link>
      &nbsp;
      <Link to={`/author/${comment.author.username}`} className="comment-author">{comment.author.username}</Link>
      <span className="date-posted">{moment(comment.updatedAt).format('ddd MMM DD YYYY HH:mm')}</span>
      {
        comment.author.username === (user && user.username) ?
          <span
            className="mod-options"
            tabIndex={-2 - index}
            role="button"
            onClick={() => deleteComment(comment.id)}
            onKeyUp={event => (
              event.keyCode === KEY_DEL ?
                deleteComment(comment.id)
              :
                undefined
            )}
          >
            <i className="ion-trash-a" />
          </span>
        :
          null
      }
    </div>
  </div>
));

export default Comments;
