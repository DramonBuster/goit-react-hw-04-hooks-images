import React, { Component } from 'react';
import styled from 'styled-components';
import SearchBar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Toastify from '../Toastify/Toastify';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import API from '../../data/services';

const ImageFinderWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
};

const scrollToTheBottom = () => {
  let offsetHeight = document.documentElement.offsetHeight - 965;
  window.scrollTo({
    top: offsetHeight,
    behavior: 'smooth',
  });
};

const scrollToTheTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const ToTheTopButton = styled.button`
  position: fixed;
  right: 24px;
  bottom: 24px;
  display: block;
  min-width: 80px;
  max-width: 140px;
  padding: 8px 16px;
  font-size: 18px;
  font-weight: 500;
  text-decoration: none;
  text-align: center;
  color: #fff;
  line-height: 1;
  border: 0;
  border-radius: 2px;
  background-color: #3f51b5;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  :hover {
    background-color: #303f9f;
  }
`;


class ImageFinder extends Component {
  state = {
    searchQuery: '',
    images: [],
    status: null,
    showModal: false,
    alt: null,
    fullSize: null,
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { PENDING, RESOLVED } = Status;
    const { searchQuery, images, page } = this.state;
    if (prevState.searchQuery === searchQuery && prevState.page === page)
      return;
    this.setState({ status: PENDING });
    await API(searchQuery, page)
      .then(responseImages => {
        if (responseImages.length === 0) {
          Toastify(
            'warning',
            'Sorry, there are no images matching your search query. Please try again.',
          );
          this.setState({
            images: [],
          });
        } else if (prevState.searchQuery === searchQuery) {
          this.setState({
            images: [...images, ...responseImages],
          });
        } else {
          this.setState({
            images: responseImages,
          });
        }
        return this.setState({
          status: RESOLVED,
        });
      })
      .catch(error => {
        this.setState({ status: null });
        Toastify('error', `${error}`);
      });
    if (prevState.searchQuery === searchQuery) scrollToTheBottom();
  }

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1 });
  };

  handleClick = event => {
    const { showModal } = this.state;
    if (showModal) {
      this.setState({
        showModal: !showModal,
        alt: null,
        fullSize: null,
      });
    } else {
      if (event.target.nodeName !== 'IMG') return;
      this.setState({
        showModal: !showModal,
        alt: event.target.alt,
        fullSize: event.target.dataset.fullsize,
      });
    }
  };

  getLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, status, showModal, alt, fullSize } = this.state;
    return (
      <ImageFinderWrapper>
        <SearchBar onSubmit={this.handleFormSubmit} />
        {status === 'pending' && <Loader />}
        {status === 'resolved' && (
          <ImageGallery images={images} onClick={this.handleClick} />
        )}
        {images.length > 11 && status === 'resolved' && (
          <Button onClick={this.getLoadMore} />
        )}
        {images.length > 11 && (
          <ToTheTopButton onClick={scrollToTheTop}>Up</ToTheTopButton>
        )}
        {showModal && (
          <Modal onClose={this.handleClick} fullSize={fullSize} name={alt} />
        )}
      </ImageFinderWrapper>
    );
  }
}

export default ImageFinder;