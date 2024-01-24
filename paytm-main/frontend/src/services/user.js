import axios from 'axios';

const url = 'http://localhost:3000/api/v1/user';

export const signup = async (userData) => {
  const res = await axios.post(`${url}/signup`, userData);
  return res.data;
};

export const signin = async (userData) => {
  const res = await axios.post(`${url}/signin`, userData);
  return res.data;
};

export const fetchUsers = async (token) => {
  const res = await axios.get(`${url}/bulk`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  return res.data.user;
};

export const fetchUser = async (token) => {
  const res = await axios.get(`${url}/`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  console.log('user data ', res.data);
  return res.data;
};
