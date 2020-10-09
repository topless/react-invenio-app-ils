import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';

// NOTE: Deprecated, when the last 2 cases are addressed AvailableItems in LoanDetails
// and ItemSearch in PatronDetails this file will be deleted.
class SearchBar extends Component {
  constructor(props) {
    super(props);
    const { queryString } = this.props;
    this.state = {
      currentValue: queryString || '',
    };
  }

  componentDidMount() {
    if (this.searchInput) {
      this.searchInput.focus();
    }
  }

  onInputChange = queryString => {
    const { updateQueryOnChange, updateQueryString } = this.props;
    if (updateQueryOnChange) {
      updateQueryString(queryString);
    }
    this.setState({
      currentValue: queryString,
    });
  };

  onKeyPressHandler = event => {
    if (event.key === 'Enter') {
      this.executeSearch();
    }
  };

  executeSearch = () => {
    const { updateQueryString } = this.props;
    const { currentValue } = this.state;
    updateQueryString(currentValue);
  };

  render() {
    const {
      currentQueryString,
      executeSearch: parentSearch,
      onKeyPressHandler,
      placeholder,
      queryString,
      updateQueryOnChange,
      updateQueryString,
      ...otherProps
    } = this.props;
    const { currentValue } = this.state;
    const searchAction = parentSearch || this.executeSearch;
    return (
      <Input
        action={{
          icon: 'search',
          onClick: searchAction,
        }}
        size="big"
        fluid
        placeholder={placeholder}
        onChange={(e, { value }) => this.onInputChange(value)}
        value={currentValue}
        onKeyPress={event =>
          onKeyPressHandler
            ? onKeyPressHandler(event)
            : this.onKeyPressHandler(event)
        }
        ref={input => {
          this.searchInput = input;
        }}
        {...otherProps}
        className={`${otherProps.className} ils-searchbar`}
      />
    );
  }
}

SearchBar.propTypes = {
  currentQueryString: PropTypes.string,
  executeSearch: PropTypes.func,
  onInputChange: PropTypes.func,
  onKeyPressHandler: PropTypes.func,
  placeholder: PropTypes.string,
  queryString: PropTypes.string,
  updateQueryOnChange: PropTypes.bool,
  updateQueryString: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
  currentQueryString: null,
  executeSearch: null,
  onInputChange: null,
  onKeyPressHandler: null,
  placeholder: 'Search for books, series, articles, publications...',
  queryString: '',
  updateQueryOnChange: false,
};

export default SearchBar;
