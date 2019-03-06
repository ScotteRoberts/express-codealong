import React from 'react';
import Axios from 'axios';
import '../css/MessageBoardApp.css';
import SearchCommentList from './SearchCommentList';
import CommentList from './CommentList';
import AddCommentForm from './AddCommentForm';

/*
  pass comments down to Commentlist (using props)
  create a commentItem component
  render a single commentItem with the data from the first comment (aka comment[0])
  don't forget css
*/

class MessageBoardApp extends React.Component {
  constructor(props) {
    super(props);

    // set initial state
    this.state = {
      comments: [],
    };
  }

  // lifecycle hook: run after mount to DOM
  componentDidMount() {
    Axios.get('https://roberts-express-codealong.herokuapp.com/api/comments')
      .then(response => this.setState({ comments: response.data }))
      .catch(error => console.error(error));
  }

  handleDelete = id => {
    Axios.delete(`https://roberts-express-codealong.herokuapp.com/api/comments/${id}`)
      .then(response => this.setState({ comments: response.data.comments }))
      .catch(error => console.error(error));
  };

  handleAddComment = commentText => {
    Axios.post(`https://roberts-express-codealong.herokuapp.com/api/comments`, {
      text: commentText,
    })
      .then(response => this.setState({ comments: response.data.comments }))
      .catch(error => {
        if (error.response && error.response.status === 400) {
          alert('Please enter comment text!');
        }
      });
  };

  handleSearchComment = searchText => {
    Axios.get(`https://roberts-express-codealong.herokuapp.com/api/comments?filter=${searchText}`)
      .then(response => this.setState({ comments: response.data }))
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div className="message-board-app">
        <nav>
          <SearchCommentList onSearchCommentList={this.handleSearchComment} />
        </nav>

        <CommentList comments={this.state.comments} onDelete={this.handleDelete} />
        <AddCommentForm onAddComment={this.handleAddComment} />
      </div>
    );
  }
}

export default MessageBoardApp;
