import axios from 'axios';

// Define the base URL for the Google Books API
const BASE_URL = 'https://www.googleapis.com/books/v1/volumes';

// Function to fetch initial books data
export const getBooks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}?q=%22%22`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching books');
  }
};

// Function to fetch detailed information about a specific book by its ID
export const getBookDetails = async (bookId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${bookId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching book details');
  }
};
