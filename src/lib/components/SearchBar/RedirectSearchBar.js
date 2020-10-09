import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';

export class RedirectSearchBar extends Component {
  state = { currentValue: '' };

  render() {
    const {
      onSearch,
      placeholder,
      className: parentClass,
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
        fluid
        size="big"
        placeholder={placeholder}
        className={`${parentClass} ils-searchbar`}
        {...rest}
      />
    );
  }
}

RedirectSearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

RedirectSearchBar.defaultProps = {
  placeholder: '',
  className: '',
};
