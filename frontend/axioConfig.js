import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5001/api', // Your backend API base URL
});

export default instance;
