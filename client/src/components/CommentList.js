import React from 'react';
import '../css/CommentList.css';
import CommentItem from './CommentItem';

export default class CommentList extends React.Component {
  render() {
    const { comments } = this.props;
    return (
      <div className="message-board-comment-list">
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    );
  }
}
