import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { ImSearch } from 'react-icons/im';
import Toastify from '../Toastify/Toastify';

const Header = styled.header`
  top: 0;
  left: 0;
  position: sticky;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 64px;
  padding: 12px 24px;
  color: #fff;
  background-color: #3f51b5;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  padding: 8px;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
`;

const SearchButton = styled.button`
  margin-right: 10px;
  padding: 0;
  border: 0;
  opacity: 0.6;
  background-color: transparent;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);

  :hover {
    opacity: 1;
  }
`;

const SearchLabel = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  clip-path: inset(50%);
  border: 0;
`;

const SearchInput = styled.input`
  display: inline-block;
  width: 100%;
  font-size: 22px;
  border: none;
  outline: none;
`;

export default class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchQuery: '',
  };

  handleChange = event => {
    this.setState({
      searchQuery: event.target.value.toLowerCase(),
    });
  };

  handleSubmit = event => {
    const { searchQuery } = this.state;
    event.preventDefault();
    if (searchQuery.trim() === '') {
      Toastify('warning', 'Enter the name of the picture or photo!');
    } else {
      this.props.onSubmit(searchQuery.trim());
      this.setState({ searchQuery: '' });
    }
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <ImSearch style={{ width: 22, height: 22 }} />
            <SearchLabel>Search</SearchLabel>
          </SearchButton>
          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={this.handleChange}
          />
        </SearchForm>
      </Header>
    );
  }
}