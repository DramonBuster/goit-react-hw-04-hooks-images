import styled from 'styled-components';

const NotFoundMessage = styled.h4`
  margin-left: auto;
  margin-right: auto;
  padding-top: 50px;
  text-align: center;
  font-size: 70px;
  font-weight: bold;
  color: red;
`;

const ImageNotFound = () => {
    return (
        <NotFoundMessage>No images found. <br /> Please, try again.</NotFoundMessage>
    );
};

export default ImageNotFound;