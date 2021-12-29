import PropTypes from 'prop-types';
import styled from 'styled-components';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const Gallery = styled.ul`
  display: grid;
  width: 1200px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-auto-rows: 260px;
  grid-gap: 12px;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

const ImageGallery = ({ images, onClick }) => {
  return (
    <Gallery onClick={onClick}>
      {images.map(image => 
        <ImageGalleryItem
          key={image.id}
          webformatURL={image.webformatURL}
          largeImageURL={image.largeImageURL}
          user={image.user}
        />
      )}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;