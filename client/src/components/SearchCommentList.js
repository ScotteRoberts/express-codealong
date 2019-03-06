import React from 'react';

class SearchCommentList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTextValue: '',
    };
  }

  handleChange = event => {
    this.setState({ searchTextValue: event.target.value });
  };

  handleSearch = event => {
    event.preventDefault();
    this.props.onSearchCommentList(this.state.searchTextValue);
  };

  render() {
    return (
      <form onSubmit={this.handleSearch}>
        <input
          type="text"
          name="search"
          placeholder="Search here"
          value={this.state.searchTextValue}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default SearchCommentList;
