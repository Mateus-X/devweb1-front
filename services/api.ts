require('dotenv').config();

import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL, 
  timeout: 5000,
});

