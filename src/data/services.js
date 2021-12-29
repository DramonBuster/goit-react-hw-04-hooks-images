import axios from 'axios';

const KEY = '22657812-5b6312e522363c98c02137a18';
const BASE_URL = 'https://pixabay.com/api';


const fetchImages = async (searchQuery, page) => {
  const response = await axios.get(
    `${BASE_URL}/?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );
  if (response.status === 200) return response.data.hits;
  throw new Error(response.status);
};

export default fetchImages;