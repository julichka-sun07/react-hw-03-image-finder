import axios from 'axios';

export const fetchImage = async (query, page) => {
  const URL = 'https://pixabay.com/api';
  const OPTIONS = `q=${query}&page=${page}&key=38223568-f36870e0921891bdd2298cd99&image_type=photo&orientation=horizontal&per_page=12`;
  const response = await axios.get(`${URL}/?${OPTIONS}`);
  return response.data;
};
