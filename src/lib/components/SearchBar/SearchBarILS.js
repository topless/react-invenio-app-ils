import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';

export class SearchBarILS extends Component {
  state = { currentValue: '' };

  componentDidMount() {
    if (this.focusInput) {
      this.focusInput.focus();
    }
  }

  onKeyPress = (event, input) => {
    const { onSearch } = this.props;
    if (event.key === 'Enter') {
      const { currentValue } = this.state;
      onSearch(currentValue);
    }
  };

  onPaste = event => {
    const { onSearch } = this.props;
    const queryString = (event.clipboardData || window.clipboardData).getData(
      'text'
    );
    onSearch(queryString);
  };

  render() {
    const {
      className: parentClass,
      onKeyPress: parentKeyPress,
      onSearch,
      onPaste,
      placeholder,
      ...rest
    } = this.props;
    const { currentValue } = this.state;
    return (
      <Input
        action={{
          icon: 'search',
          onClick: () => onSearch(currentValue),
        }}
        onChange={(event, { value }) => {
          this.setState({ currentValue: value });
        }}
        onKeyPress={parentKeyPress || this.onKeyPress}
        onPaste={onPaste || this.onPaste}
        fluid
        size="big"
        placeholder={placeholder}
        className={`${parentClass} ils-searchbar`}
        ref={input => {
          this.focusInput = input;
        }}
        {...rest}
      />
    );
  }
}

SearchBarILS.propTypes = {
  onKeyPress: PropTypes.func,
  onPaste: PropTypes.func,
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

SearchBarILS.defaultProps = {
  onKeyPress: null,
  onPaste: null,
  placeholder: '',
  className: '',
};
