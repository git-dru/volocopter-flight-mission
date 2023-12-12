import axios from 'axios';

export default axios.create({
    baseURL: 'https:localhost:8000/',
    timeout: 1000,
  });