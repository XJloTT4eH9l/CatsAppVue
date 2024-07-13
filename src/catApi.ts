const API_URL: string = 'https://api.thecatapi.com/v1/';
const API_KEY: string = import.meta.env.VITE_API_KEY;

const VOTING_IMG: string = `${API_URL}images/search?api_key=${API_KEY}`;
const BREEDS: string = `${API_URL}breeds?api_key=${API_KEY}`;
const BREEDS_ITEM: string = `${API_URL}breeds/id?api_key=${API_KEY}`;

export { API_URL, VOTING_IMG, BREEDS, API_KEY, BREEDS_ITEM }