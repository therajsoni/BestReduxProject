import axios from 'axios';

export const login = async (credentials) => {
  return await axios.post('https://dummyjson.com/auth/login', credentials);
};

export const signup = async (userData) => {
  return await axios.post('https://dummyjson.com/auth/signup', userData);
};

export const logout = async () => {
  return await axios.post('https://dummyjson.com/auth/logout');
};
