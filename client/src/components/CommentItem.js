import React from 'react';
import '../css/CommentItem.css';

export default class CommentItem extends React.Component {
  render() {
    return (
      <div className="message-board-comment-item">
        <p>{this.props.comment.text}</p>
        <button type="button" className="delete-button">
          x
        </button>
      </div>
    );
  }
}
