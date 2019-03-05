import React from 'react';
import '../css/MessageBoardApp.css';
import CommentList from './CommentList';
import commentData from '../data';

/*
  pass comments down to Commentlist (using props)
  create a commentItem component
  render a single commentItem with the data from the first comment (aka comment[0])
  don't forget css
*/

class MessageBoardApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: commentData,
    };
  }
  render() {
    return (
      <div className="message-board-app">
        <nav>
          <form>
            <input type="text" name="search" placeholder="Search here" />
          </form>
        </nav>
        <CommentList comments={this.state.comments} />
        <div className="add-comment">
          <form>
            <input type="text" name="comment" placeholder="Your opinion here" />
            <button type="submit">Comment</button>
          </form>
        </div>
      </div>
    );
  }
}

export default MessageBoardApp;
