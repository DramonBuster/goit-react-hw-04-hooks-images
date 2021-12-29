import './App.css';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageFinder from './Components/ImageFinder/ImageFinder';

const Container = styled.div`
  margin: 0 auto;
  padding: 0 40px;
  min-width: 1340px;
`;

function App() {
  return (
      <>
        <Container>
          <ImageFinder />
        </Container>
        <ToastContainer />
      </>
    );

}

export default App;
