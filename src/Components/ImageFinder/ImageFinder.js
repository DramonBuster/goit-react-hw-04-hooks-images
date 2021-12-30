import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import SearchBar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Loader from '../Loader/Loader';
import Toastify from '../Toastify/Toastify';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import API from '../../data/services';
import ImageNotFound from '../ImageNotFound/ImageNotFound';

const ImageFinderWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  padding-bottom: 24px;
`;

const Status = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  NOTFOUND: 'notFound',
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


const ImageFinder = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(null);
  const [showModal, setShowModal] = useState();
  const [alt, setAlt] = useState(null);
  const [fullSize, setFullSize] = useState(null);
  const [page, setPage] = useState(1);

  const galleryRef = useRef();

  const scrollToTheBottom = () => {
    galleryRef.current.scrollIntoView({behavior: "smooth", block: "end" })
  };

  const scrollToTheTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    async function fetchData() {
      if (!searchQuery) return;
      const { PENDING, RESOLVED, NOTFOUND } = Status;
      setStatus(PENDING);
      await API(searchQuery, page)
        .then(responseImages => {
          if (responseImages.length === 0) {
            setStatus(NOTFOUND);
            Toastify(
              'warning',
              'Sorry, there are no images matching your search query. Please try again.',
            );
          } else {
            setImages(images => [...images, ...responseImages]);
            setStatus(RESOLVED);
          }
        })
        .catch(error => {
          setStatus(NOTFOUND);
          Toastify('error', `${error}`);
        });
      if (page > 1) scrollToTheBottom();
    }
    fetchData();
  }, [searchQuery, page]);
    
    
    
  const handleFormSubmit = query => {
    if (query !== searchQuery) {
      setImages([]);
      setSearchQuery(query);
      setPage(1);
    }
  };

  const handleClick = event => {
    if (showModal) {
      setShowModal(!showModal);
      setAlt(null);
      setFullSize(null);
    } else {
      if (event.target.nodeName !== 'IMG') return;
      setShowModal(!showModal);
      setAlt(event.target.alt);
      setFullSize(event.target.dataset.fullsize);
    }
  };

  const getLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <ImageFinderWrapper>
      <SearchBar onSubmit={handleFormSubmit} />
      {status === 'pending' && <Loader />}
      <ImageGallery images={images} onClick={handleClick}/>
      {images.length > 11 && status === 'resolved' && (
        <div ref={galleryRef} ><Button onClick={getLoadMore} /></div>
      )}
      {images.length > 11 && (
        <ToTheTopButton onClick={scrollToTheTop}>Up</ToTheTopButton>
      )}
      {status === 'notFound' && <ImageNotFound />}
      {showModal && (
        <Modal onClose={handleClick} fullSize={fullSize} name={alt} />
      )}
    </ImageFinderWrapper>
  );
};

export default ImageFinder;