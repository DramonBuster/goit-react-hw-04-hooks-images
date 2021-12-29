import PropTypes from 'prop-types';
import styled from 'styled-components';

const LoadMore = styled.button`
  display: block;
  margin: 0 auto;
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

const Button = ({ onClick }) => {
  return (
    <LoadMore type="button" onClick={onClick} >Load More</LoadMore>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;