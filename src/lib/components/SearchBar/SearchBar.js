import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';

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
      queryHelperFields,
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
  children: PropTypes.node,
  executeSearch: PropTypes.func,
  currentQueryString: PropTypes.string,
  onKeyPressHandler: PropTypes.func,
  placeholder: PropTypes.string,
  queryHelperFields: PropTypes.array,
  queryString: PropTypes.string,
  updateQueryOnChange: PropTypes.bool,
  updateQueryString: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
  children: null,
  currentQueryString: null,
  executeSearch: null,
  onKeyPressHandler: null,
  placeholder: 'Search for books, series, articles, publications...',
  queryHelperFields: [],
  queryString: '',
  updateQueryOnChange: false,
};

export default SearchBar;

// export const SearchBarElement
/* {queryHelperFields.length > 0 && (
  <QueryBuildHelper
    fields={queryHelperFields}
    currentQueryString={currentQueryString || queryString}
    updateQueryString={this.onInputChange}
  />
)}
</> */

export const SearchBarElement = props => {
  const {
    executeSearch,
    placeholder,
    onKeyPress,
    onInputChange,
    queryString,
    queryBuilder,
    children,
    ...rest
  } = props;
  const { className } = rest;
  //eslint-disable-next-line
  // debugger;
  return (
    <>
      <Input
        action={{
          icon: 'search',
          onClick: executeSearch,
        }}
        fluid
        size="big"
        className={`${className} ils-searchbar`}
        placeholder={placeholder}
        onChange={(event, { value }) => {
          onInputChange(value);
        }}
        value={queryString}
        onKeyPress={onKeyPress}
      />
      {queryBuilder}
      {children}
    </>
  );
};

SearchBarElement.propTypes = {
  children: PropTypes.node,
  queryBuilder: PropTypes.node,
  executeSearch: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  placeholder: PropTypes.node.isRequired,
  queryString: PropTypes.string.isRequired,
  className: PropTypes.string,
};

SearchBarElement.defaultProps = {
  queryBuilder: null,
  className: '',
  children: null,
};
