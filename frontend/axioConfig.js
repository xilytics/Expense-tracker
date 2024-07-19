import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://expense-tracker-skm7.onrender.com/'
});

export default instance;
