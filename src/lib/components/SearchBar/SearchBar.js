import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';

/** This SearchBar overrides the search bar of react-searchkit */
export class RSKSearchBar extends Component {
  componentDidMount() {
    if (this.focusInput) {
      this.focusInput.focus();
    }
  }

  render() {
    const {
      onBtnSearchClick,
      onInputChange,
      onKeyPress,
      placeholder,
      queryString,
    } = this.props;

    return (
      <Input
        action={{
          icon: 'search',
          onClick: onBtnSearchClick,
        }}
        fluid
        size="big"
        className="ils-searchbar"
        placeholder={placeholder}
        onChange={(event, { value }) => {
          onInputChange(value);
        }}
        value={queryString}
        onKeyPress={onKeyPress}
        ref={input => {
          this.focusInput = input;
        }}
      />
    );
  }
}

RSKSearchBar.propTypes = {
  onBtnSearchClick: PropTypes.func,
  onKeyPress: PropTypes.func,
  onInputChange: PropTypes.func,
  placeholder: PropTypes.string,
  queryString: PropTypes.string,
};

RSKSearchBar.defaultProps = {
  onBtnSearchClick: null,
  onInputChange: null,
  onKeyPress: null,
  placeholder: null,
  queryString: null,
};

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
